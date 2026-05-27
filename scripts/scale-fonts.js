// Re-scale fontSize across the codebase from ORIGINAL values, not from already-scaled ones.
// For each .tsx/.ts under app/ and components/, the pre-scaling version is read from a git ref
// so we never compound rounding. Files that didn't exist at that ref keep their current values.
//
// Usage: node scripts/scale-fonts.js <scale> [<gitRef>]
//   e.g. node scripts/scale-fonts.js 0.75 380ef5a

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const SCALE = Number(process.argv[2] ?? 0.75);
const PRE_SCALE_REF = process.argv[3] ?? '380ef5a';
const DIRS = ['app', 'components'];

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

function readFromGit(repoPath) {
  try {
    return execSync(`git show ${PRE_SCALE_REF}:"${repoPath.replace(/\\/g, '/')}"`, {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'ignore'],
    });
  } catch {
    return null;
  }
}

const valueMap = new Map();
let filesUpdated = 0;
let totalReplacements = 0;
let filesFromGit = 0;
let filesFallback = 0;

for (const dirName of DIRS) {
  const dir = path.join(ROOT, dirName);
  if (!fs.existsSync(dir)) continue;

  for (const file of walk(dir)) {
    const current = fs.readFileSync(file, 'utf8');
    const relPath = path.relative(ROOT, file);
    const original = readFromGit(relPath);

    // Pull fontSize values from the source-of-truth (original if available, else current)
    const sourceOriginalValues = (original ?? current).match(/fontSize:\s*(\d+(?:\.\d+)?)/g) || [];
    const originalNums = sourceOriginalValues.map((m) => Number(m.match(/(\d+(?:\.\d+)?)/)[1]));

    // Build the replacement list (one scaled value per occurrence, in order)
    const scaledNums = originalNums.map((v) => {
      const scaled = Math.max(1, Math.round(v * SCALE));
      valueMap.set(v, scaled);
      return scaled;
    });

    let idx = 0;
    const updated = current.replace(/fontSize:\s*(\d+(?:\.\d+)?)/g, () => {
      const replacement = scaledNums[idx] ?? Math.max(1, Math.round(Number(arguments?.[1] ?? 14) * SCALE));
      idx += 1;
      return `fontSize: ${replacement}`;
    });

    // If counts differ, fall back to per-occurrence scaling of current values
    const currentCount = (current.match(/fontSize:\s*\d/g) || []).length;
    let finalContent = updated;
    let source = 'git';
    if (originalNums.length !== currentCount) {
      source = 'current-fallback';
      finalContent = current.replace(/fontSize:\s*(\d+(?:\.\d+)?)/g, (_m, n) => {
        const v = Number(n);
        const scaled = Math.max(1, Math.round((v / 0.78) * SCALE));
        valueMap.set(v, scaled);
        return `fontSize: ${scaled}`;
      });
    }

    if (finalContent !== current) {
      fs.writeFileSync(file, finalContent);
      filesUpdated += 1;
      totalReplacements += currentCount;
      if (source === 'git') filesFromGit += 1;
      else filesFallback += 1;
      console.log(`  [${source}] ${relPath}: ${currentCount} replacements`);
    }
  }
}

console.log(`\nDone. ${filesUpdated} files updated, ${totalReplacements} replacements.`);
console.log(`  from-git: ${filesFromGit}, current-fallback: ${filesFallback}`);
console.log(`Scale: ${SCALE}, pre-scale ref: ${PRE_SCALE_REF}`);
console.log('Value mapping (source → new):');
const sorted = [...valueMap.entries()].sort((a, b) => a[0] - b[0]);
for (const [from, to] of sorted) {
  console.log(`  ${from} -> ${to}`);
}
