#!/usr/bin/env node
import { resolve } from "node:path";
import { analyzeFrontendBoundaries } from "./architecture/frontend-boundaries.mjs";
import { discoverFrontendProductionSources } from "./architecture/source-inventory.mjs";

const root = resolve(process.cwd());
const files = discoverFrontendProductionSources(root);
const diagnostics = analyzeFrontendBoundaries({ root, files });
for (const item of diagnostics) console.error(`${item.file}:${item.line}:${item.column} ${item.ruleId} ${item.message}`);
if (diagnostics.length > 0) {
  console.error(`Frontend architecture: ${diagnostics.length} violation(s) across ${files.length} production files.`);
  process.exitCode = 1;
} else {
  console.log(`Frontend architecture: PASS (${files.length} production files, 0 violations).`);
}
