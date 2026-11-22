import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const TARGET_DIRS = ['src/i18n', 'src/content'];

function walkDir(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(full, files);
    } else if (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx')) {
      files.push(full);
    }
  }
  return files;
}

/**
 * Extract string literal contents from a TS line so outer delimiters are never misread as apostrophes.
 */
function extractStringLiterals(line) {
  const literals = [];
  const regex = /'((?:\\.|[^'\\])*)'|"((?:\\.|[^"\\])*)"|`((?:\\.|[^`\\])*)`/g;
  let match;
  while ((match = regex.exec(line)) !== null) {
    literals.push(match[1] ?? match[2] ?? match[3] ?? '');
  }
  return literals;
}

let errors = 0;

for (const relDir of TARGET_DIRS) {
  const files = walkDir(path.join(ROOT, relDir));
  for (const file of files) {
    const relPath = path.relative(ROOT, file);
    if (relPath.endsWith('types.ts')) continue;

    const isEn = relPath.endsWith('en.ts');
    const isRu = relPath.endsWith('ru.ts');
    const lines = fs.readFileSync(file, 'utf8').split('\n');

    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('import ') || trimmed.startsWith('export type ') || trimmed.startsWith('//')) {
        return;
      }

      const literals = extractStringLiterals(line);
      for (const text of literals) {
        // Check wrong o'/g' (e.g. o', g', o`, g`, o‘, g‘) inside string contents
        const badOg = text.match(/(?:^|[^a-zA-Z])[oOgG]['`‘’]|([oOgG]['`‘’][a-zA-Z])/g);
        if (badOg) {
          // Allow English words ending in g' or o' followed by s? No, English contractions are like don't, I'm, let's, wasn't.
          // Specifically check for Uzbek o'/g' patterns (o'z, bo'l, g'oz, tog', sog', yo'q, etc.)
          if (isEn) {
            const uzInEn = text.match(/\b[oOgG]['`‘’][a-zA-Z]|(bog|tog|sog|yog|cho|yo|to|qo|xo|mo|so|bo)['`‘’]/gi);
            if (uzInEn) {
              console.error(`ERROR ${relPath}:${idx + 1}: Found "${uzInEn.join(', ')}" in "${text}" — Use U+02BB (ʻ)`);
              errors++;
            }
          } else {
            console.error(`ERROR ${relPath}:${idx + 1}: Found "${badOg.join(', ')}" in "${text}" — Use U+02BB (ʻ) for oʻ/gʻ`);
            errors++;
          }
        }

        // Check wrong tutuq belgisi inside Uzbek words (e.g. ma'no, qal'a, ta'lim, san'at)
        if (!isEn && !isRu) {
          const badTutuq = text.match(/[a-zA-Z]['`‘’][a-zA-Z]/g);
          if (badTutuq) {
            console.error(`ERROR ${relPath}:${idx + 1}: Found "${badTutuq.join(', ')}" in "${text}" — Use U+02BC (ʼ) for tutuq belgisi`);
            errors++;
          }
        }
      }
    });
  }
}

if (errors > 0) {
  console.error(`\nContent check failed with ${errors} orthography issue(s).`);
  process.exit(1);
} else {
  console.log('Content orthography check passed (0 issues).');
}
