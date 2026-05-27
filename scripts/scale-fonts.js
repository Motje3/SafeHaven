// One-shot script: multiply every `fontSize: N` literal in app/ and components/ by SCALE.
// Round to a whole pixel to keep values clean. Skips node_modules and this script's own folder.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SCALE = Number(process.argv[2] ?? 0.78);
const DIRS = ['app', 'components'];

let totalFiles = 0;
let totalReplacements = 0;

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (entry.isFile() && /\.(tsx|ts)$/.test(entry.name)) {
      yield full;
    }
  }
}

const seenValues = new Map();

for (const dirName of DIRS) {
  const dir = path.join(ROOT, dirName);
  if (!fs.existsSync(dir)) continue;

  for (const file of walk(dir)) {
    const original = fs.readFileSync(file, 'utf8');
    let fileReplacements = 0;

    const updated = original.replace(/fontSize:\s*(\d+(?:\.\d+)?)/g, (_match, num) => {
      const value = Number(num);
      const scaled = Math.max(1, Math.round(value * SCALE));
      seenValues.set(value, scaled);
      fileReplacements += 1;
      return `fontSize: ${scaled}`;
    });

    if (updated !== original) {
      fs.writeFileSync(file, updated);
      totalFiles += 1;
      totalReplacements += fileReplacements;
      console.log(`  ${path.relative(ROOT, file)}: ${fileReplacements} replacements`);
    }
  }
}

console.log(`\nDone. ${totalReplacements} replacements across ${totalFiles} files (scale ${SCALE}).`);
console.log('Value mapping:');
const sorted = [...seenValues.entries()].sort((a, b) => a[0] - b[0]);
for (const [from, to] of sorted) {
  console.log(`  ${from} -> ${to}`);
}
