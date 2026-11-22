import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const WORDS_DIR = path.join(ROOT, 'public/images/words');
const REAL_DIR = path.join(ROOT, 'public/images/real');

console.log('Checking image asset directories...');
console.log(`Words image folder: ${fs.existsSync(WORDS_DIR) ? 'exists' : 'not yet created (SmartImage SVG/emoji fallback active)'}`);
console.log(`Real image folder:  ${fs.existsSync(REAL_DIR) ? 'exists' : 'not yet created (SmartImage SVG/emoji fallback active)'}`);
