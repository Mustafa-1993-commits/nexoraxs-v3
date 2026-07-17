import { existsSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative, sep } from "node:path";
import {
  FRONTEND_EXCLUDED_SEGMENTS,
  FRONTEND_SOURCE_EXTENSIONS,
  FRONTEND_SOURCE_ROOTS,
} from "./frontend-boundary-policy.mjs";

function normalized(path) { return path.split(sep).join("/"); }

export function discoverFrontendProductionSources(root, options = {}) {
  const roots = options.roots ?? FRONTEND_SOURCE_ROOTS;
  const excluded = new Set(options.excludedSegments ?? FRONTEND_EXCLUDED_SEGMENTS);
  const extensions = new Set(options.extensions ?? FRONTEND_SOURCE_EXTENSIONS);
  const result = [];
  for (const sourceRoot of roots) {
    const absoluteRoot = join(root, sourceRoot);
    if (!existsSync(absoluteRoot)) throw new Error(`architecture.source_root_missing:${sourceRoot}`);
    walk(absoluteRoot);
  }
  return result.sort((left, right) => left.localeCompare(right, "en"));

  function walk(directory) {
    for (const name of readdirSync(directory).sort((left, right) => left.localeCompare(right, "en"))) {
      if (excluded.has(name)) continue;
      const absolute = join(directory, name);
      const info = statSync(absolute);
      if (info.isDirectory()) { walk(absolute); continue; }
      if (!info.isFile() || !extensions.has(extname(name))) continue;
      const path = normalized(relative(root, absolute));
      if (/\.(?:test|spec|stories)\.[cm]?[jt]sx?$/.test(path)) continue;
      if (path.endsWith("/next-env.d.ts") || path.includes(".generated.")) continue;
      result.push(path);
    }
  }
}
