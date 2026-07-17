import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, join, normalize, relative, resolve, sep } from "node:path";
import ts from "typescript";
import {
  BROWSER_STORAGE_ALLOWLIST,
  COMMERCE_ENVIRONMENT_ALLOWLIST,
  COMPOSITION_ALLOWLIST,
} from "./frontend-boundary-policy.mjs";
import { discoverFrontendProductionSources } from "./source-inventory.mjs";

const SCRIPT_KINDS = new Map([[".tsx", ts.ScriptKind.TSX], [".jsx", ts.ScriptKind.JSX], [".js", ts.ScriptKind.JS], [".mjs", ts.ScriptKind.JS], [".cjs", ts.ScriptKind.JS]]);
const EXTENSIONS = [".ts", ".tsx", ".mts", ".cts", ".js", ".jsx", ".mjs", ".cjs"];
const normalized = (path) => path.split(sep).join("/");

function diagnostic(ruleId, file, sourceFile, node, message) {
  const position = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
  return { ruleId, file, line: position.line + 1, column: position.character + 1, message };
}

function importsIn(sourceFile) {
  const imports = [];
  const visit = (node) => {
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
      imports.push({ value: node.moduleSpecifier.text, node: node.moduleSpecifier });
    }
    if (ts.isCallExpression(node) && node.arguments.length === 1 && ts.isStringLiteral(node.arguments[0])
      && ((ts.isIdentifier(node.expression) && node.expression.text === "require") || node.expression.kind === ts.SyntaxKind.ImportKeyword)) {
      imports.push({ value: node.arguments[0].text, node: node.arguments[0] });
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  return imports;
}

function conditionalExportTarget(value) {
  if (typeof value === "string") return value;
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  for (const condition of ["types", "import", "default", "require"]) {
    const target = conditionalExportTarget(value[condition]);
    if (target) return target;
  }
  return null;
}

function packageExportBase(root, packageName, subpath) {
  const packageDirectory = resolve(root, `packages/${packageName}`);
  const manifestPath = join(packageDirectory, "package.json");
  if (!existsSync(manifestPath)) return null;
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  if (!manifest.exports) return resolve(packageDirectory, "src", subpath || "index");
  const exportKey = subpath ? `./${subpath}` : ".";
  let target = conditionalExportTarget(manifest.exports[exportKey]);
  if (!target) {
    for (const [pattern, value] of Object.entries(manifest.exports)) {
      if (!pattern.includes("*")) continue;
      const [prefix, suffix] = pattern.split("*");
      if (!exportKey.startsWith(prefix) || !exportKey.endsWith(suffix)) continue;
      const matched = exportKey.slice(prefix.length, exportKey.length - suffix.length);
      const patternTarget = conditionalExportTarget(value);
      if (patternTarget) target = patternTarget.replace("*", matched);
      if (target) break;
    }
  }
  return target ? resolve(packageDirectory, target) : null;
}

function resolveInternal(root, file, specifier) {
  let base = null;
  if (specifier.startsWith(".")) base = resolve(root, dirname(file), specifier);
  else if (specifier.startsWith("apps/") || specifier.startsWith("packages/")) base = resolve(root, specifier);
  else if (specifier.startsWith("@/")) {
    const match = file.match(/(?:^|\/)apps\/([^/]+)\//);
    if (match) {
      const appRelative = resolve(root, `apps/${match[1]}`, specifier.slice(2));
      const sourceRelative = resolve(root, `apps/${match[1]}/src`, specifier.slice(2));
      base = EXTENSIONS.some((extension) => existsSync(sourceRelative + extension)) || existsSync(sourceRelative)
        ? sourceRelative
        : appRelative;
    }
    if (!match) return { internal: true, path: null };
  } else {
    const packageMatch = specifier.match(/^@nexoraxs\/([^/]+)(?:\/(.*))?$/);
    if (packageMatch) {
      base = packageExportBase(root, packageMatch[1], packageMatch[2] || "");
      if (!base) return { internal: true, path: null };
    }
  }
  if (!base) return { internal: false, path: null };
  const candidates = [base, ...EXTENSIONS.map((extension) => base + extension), ...EXTENSIONS.map((extension) => join(base, `index${extension}`))];
  const found = candidates.find((candidate) => existsSync(candidate) && statSync(candidate).isFile());
  return { internal: true, path: found ? normalized(relative(root, found)) : null };
}

function appName(path) { return path.match(/^apps\/([^/]+)\//)?.[1] ?? null; }
function isApplication(path) { return path.includes("/application/") || /application-[^/]+\.[cm]?[jt]s$/.test(path); }
function isUi(path) { return /\/(?:app|components|hooks|providers?)\//.test(path) || /Provider\.tsx$/.test(path) || /hook-[^/]+\.[cm]?[jt]s$/.test(path); }
function isRepository(path) { return /Repository\.[cm]?[jt]s$/.test(path) || path.includes("repository-provider"); }

function createDependencyClosure(root) {
  const memo = new Map();
  return function dependencyClosure(file, ancestors = new Set()) {
    if (memo.has(file)) return memo.get(file);
    if (ancestors.has(file)) return { paths: [], specifiers: [] };
    const absolute = join(root, file);
    if (!existsSync(absolute)) return { paths: [], specifiers: [] };
    const nextAncestors = new Set(ancestors).add(file);
    const text = readFileSync(absolute, "utf8");
    const sourceFile = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, SCRIPT_KINDS.get(extname(file)) ?? ts.ScriptKind.TS);
    const paths = [];
    const specifiers = [];
    for (const imported of importsIn(sourceFile)) {
      specifiers.push(imported.value);
      const resolution = resolveInternal(root, file, imported.value);
      if (!resolution.path) continue;
      paths.push(resolution.path);
      const nested = dependencyClosure(resolution.path, nextAncestors);
      paths.push(...nested.paths);
      specifiers.push(...nested.specifiers);
    }
    const result = {
      paths: [...new Set(paths)].sort((left, right) => left.localeCompare(right, "en")),
      specifiers: [...new Set(specifiers)].sort((left, right) => left.localeCompare(right, "en")),
    };
    memo.set(file, result);
    return result;
  };
}

export function analyzeFrontendBoundaries({ root, files = discoverFrontendProductionSources(root) }) {
  const diagnostics = [];
  const known = new Set(files);
  const dependencyClosure = createDependencyClosure(root);
  for (const file of files) {
    const absolute = join(root, file);
    const text = readFileSync(absolute, "utf8");
    const sourceFile = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, SCRIPT_KINDS.get(extname(file)) ?? ts.ScriptKind.TS);
    const imports = importsIn(sourceFile);

    for (const imported of imports) {
      const resolution = resolveInternal(root, file, imported.value);
      const closure = resolution.path ? dependencyClosure(resolution.path) : { paths: [], specifiers: [] };
      const dependencyPaths = resolution.path ? [resolution.path, ...closure.paths] : [];
      const dependencySpecifiers = [imported.value, ...closure.specifiers];
      if (resolution.internal && !resolution.path) diagnostics.push(diagnostic("ARCH-RESOLUTION-001", file, sourceFile, imported.node, `Unresolved internal import '${imported.value}'.`));
      if (resolution.internal && !resolution.path && imported.value.startsWith("@nexoraxs/sdk/")) {
        diagnostics.push(diagnostic("ARCH-SDK-001", file, sourceFile, imported.node, "SDK subpath is not part of the public exports map."));
      }
      if (resolution.path && known.has(resolution.path)) {
        const fromApp = appName(file), toApp = appName(resolution.path);
        if (fromApp && toApp && fromApp !== toApp) diagnostics.push(diagnostic("ARCH-CROSS-APP-001", file, sourceFile, imported.node, `Cross-app import targets ${toApp}.`));
      }
      const fromApp = appName(file);
      const transitiveCrossApp = fromApp && dependencyPaths.some((path) => {
        const targetApp = appName(path);
        return targetApp && targetApp !== fromApp;
      });
      if (transitiveCrossApp) diagnostics.push(diagnostic("ARCH-CROSS-APP-001", file, sourceFile, imported.node, "Import barrel reaches another application."));
      if (isApplication(file) && (dependencySpecifiers.some((specifier) => /^(react|@tanstack\/react-query)(\/|$)/.test(specifier)
        || specifier.includes("/hooks/") || specifier.includes("query-keys") || specifier === "@nexoraxs/sdk" || specifier.startsWith("@nexoraxs/sdk/"))
        || dependencyPaths.some((path) => path.includes("/hooks/") || path.includes("query-keys")))) {
        diagnostics.push(diagnostic("ARCH-APP-001", file, sourceFile, imported.node, "Application code may depend only on inward contracts and domain/application modules."));
      }
      if (isApplication(file) && (dependencySpecifiers.some((specifier) => /^(?:@tanstack\/react-query)(?:\/|$)/.test(specifier)
        || specifier.includes("query-keys")) || dependencyPaths.some((path) => path.includes("query-keys")))) {
        diagnostics.push(diagnostic("ARCH-CACHE-001", file, sourceFile, imported.node, "React Query and query-key mapping belong in an outer adapter."));
      }
      if ((file.startsWith("packages/contracts/") || file.includes("contract-sdk")) && dependencySpecifiers.some((specifier) => /^(react|@tanstack\/react-query)(\/|$)/.test(specifier)
        || specifier.includes("sdk") || specifier.startsWith("apps/"))) {
        diagnostics.push(diagnostic("ARCH-CONTRACT-001", file, sourceFile, imported.node, "Contracts cannot depend on outward implementations or frameworks."));
      }
      if (isRepository(file) && dependencyPaths.some((path) => /\/(?:app|components|hooks|lib\/store)\//.test(path))) {
        diagnostics.push(diagnostic("ARCH-REPOSITORY-001", file, sourceFile, imported.node, "Repository implementation cannot depend on UI, hooks, or providers."));
      }
      if (isUi(file) && (imported.value === "@nexoraxs/sdk/testing" || /\/(?:Mock|Memory|BrowserStorage|BrowserLegacy|Legacy.*Facade)/.test(imported.value))) {
        diagnostics.push(diagnostic("ARCH-UI-001", file, sourceFile, imported.node, "UI and hooks cannot import concrete infrastructure."));
      }
      if (!/\.(?:test|spec)\./.test(file) && imported.value === "@nexoraxs/sdk/testing") {
        diagnostics.push(diagnostic("ARCH-SDK-001", file, sourceFile, imported.node, "The SDK testing surface is test-only."));
      }
      if ((file.startsWith("apps/commerce/") && resolution.path?.startsWith("apps/core-platform/"))
        || (file.startsWith("apps/core-platform/") && resolution.path?.startsWith("apps/commerce/"))) {
        diagnostics.push(diagnostic("ARCH-CROSS-APP-001", file, sourceFile, imported.node, "Core and Commerce may consume only governed package contracts."));
      }
      if (imported.value.startsWith("apps/core-platform/") || imported.value.startsWith("apps/commerce/")) {
        diagnostics.push(diagnostic("ARCH-CROSS-APP-001", file, sourceFile, imported.node, "Apps cannot import another app source directly."));
      }
    }

    const firstNode = sourceFile.statements[0] ?? sourceFile;
    if (isApplication(file) && /\b(?:localStorage|sessionStorage|File|Blob|window\s*\.|document\s*\.)/.test(text)) {
      diagnostics.push(diagnostic("ARCH-APP-001", file, sourceFile, firstNode, "Application code contains a browser/framework dependency."));
    }
    if (/\b(?:localStorage|sessionStorage)\b/.test(text) && !BROWSER_STORAGE_ALLOWLIST.includes(file) && !file.includes("fixtures/valid/outer-adapters")
      && !file.endsWith("schema.ts")) diagnostics.push(diagnostic("ARCH-STORAGE-001", file, sourceFile, firstNode, "Browser storage access must be isolated to an approved adapter."));
    if (/process\.env|import\.meta\.env/.test(text) && (file.startsWith("apps/commerce/") || file.includes("environment-read")) && !COMMERCE_ENVIRONMENT_ALLOWLIST.includes(file)) {
      diagnostics.push(diagnostic("ARCH-ENV-001", file, sourceFile, firstNode, "Commerce environment reads belong only in runtime configuration."));
    }
    if (/\bnew\s+(?:Mock\w+Repository|BrowserStorage\w+Store|BrowserLegacy\w+Store|Legacy\w+Facade)\b/.test(text)
      && !COMPOSITION_ALLOWLIST.includes(file) && !file.startsWith("packages/sdk/src/commerce/runtime/")) {
      diagnostics.push(diagnostic("ARCH-COMPOSITION-001", file, sourceFile, firstNode, "Concrete implementation selection belongs in a composition root."));
    }
    if (/\bcreate(?:CommerceServices|CommerceProjectionPort|CoreStorageCoordination|CorePlatformCompatibility)\s*\(/.test(text)
      && !COMPOSITION_ALLOWLIST.includes(file) && !file.startsWith("packages/sdk/src/commerce/runtime/")
      && !file.includes("fixtures/valid/composition-root")) {
      diagnostics.push(diagnostic("ARCH-COMPOSITION-001", file, sourceFile, firstNode, "SDK composition factories may be called only from an exact composition root."));
    }
    if ((file.startsWith("apps/core-platform/") || file.includes("core-commerce-writer")) && /writeCollection\(STORAGE_KEYS\.(?:products|customers|orders|invoices|commerceSetups|branchInventory|stockMovements|stockTransfers|commerceReturns)/.test(text)) {
      diagnostics.push(diagnostic("ARCH-OWNER-001", file, sourceFile, firstNode, "Core cannot persist Commerce operational records."));
    }
    if ((file === "apps/commerce/lib/store/AppProvider.tsx" || file.includes("commerce-core-writer")) && /writeCollection\(STORAGE_KEYS\.(?:users|workspaces|businessUnits|branches|osSubscriptions|osEnablements)/.test(text)) {
      diagnostics.push(diagnostic("ARCH-OWNER-002", file, sourceFile, firstNode, "Commerce cannot persist Core-owned identity records."));
    }
    if ((file.startsWith("packages/shared/") || file.includes("shared-owner-policy")) && /\b(?:CommerceProduct|CommerceOrder|CommerceInvoice|CommerceCustomer|CommerceReturn|CommerceSetup|StockMovement|StockTransfer|BranchInventory|ensureCommerceBusinessEnablement|DEFAULT_SETUP)\b/.test(text)) {
      diagnostics.push(diagnostic("ARCH-SHARED-001", file, sourceFile, firstNode, "Shared contains owner-specific Commerce policy or data."));
    }
    if ((file.endsWith("AppProvider.tsx") || file.includes("provider-business-rule")) && /\b(?:buildStockMovement|buildStockTransfer|buildCommerceReturn|computeReturnTotals|legacyReturnTotals|createLegacyOrder)\b/.test(text)) {
      diagnostics.push(diagnostic("ARCH-PROVIDER-001", file, sourceFile, firstNode, "Provider contains owner business rules instead of delegation."));
    }
  }
  return diagnostics.sort((left, right) => left.file.localeCompare(right.file, "en") || left.line - right.line || left.column - right.column || left.ruleId.localeCompare(right.ruleId, "en"));
}
