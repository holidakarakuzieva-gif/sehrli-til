export type AlphabetMode = 'latin' | 'new-latin' | 'cyrillic';

const CYRILLIC_TS_WORDS = new Set([
  'sirk',
  'tsirk',
  'avtobus',
  'konsert',
  'tsitrus',
  'litsenziya',
  'vitse',
  'sement',
  'tsement',
  'tsellyuloza',
  'tsiferblat',
  'tsikl',
  'tsilindr',
  'reaksiya',
  'aksiya',
  'konstitutsiya',
  'stansiya',
  'politsiya',
  'militsiya',
  'meditsina',
  'operatsiya',
  'lektsiya',
  'seksiya',
  'diktatsiya',
  'abzats',
  'shprits',
]);

const VOWELS = new Set(['a', 'e', 'i', 'o', 'u', 'oʻ', 'A', 'E', 'I', 'O', 'U', 'Oʻ']);

function matchCase(source: string, target: string): string {
  if (source === source.toUpperCase() && source !== source.toLowerCase()) {
    return target.toUpperCase();
  }
  if (source[0] === source[0]?.toUpperCase()) {
    return target.charAt(0).toUpperCase() + target.slice(1);
  }
  return target;
}

/**
 * Amaldagi lotin yozuvidan 2026-yilgi yangi lotin alifbosiga (Ö, Ğ, Ş, Ç) oʻgirish.
 * Tutuq belgisi bilan ajratilgan sʼh (Isʼhoq) va ng birikmalari oʻzgarmaydi.
 */
export function toNewLatin(text: string): string {
  if (!text) return text;

  return text
    .replace(/oʻ/g, 'ö')
    .replace(/Oʻ/g, 'Ö')
    .replace(/gʻ/g, 'ğ')
    .replace(/Gʻ/g, 'Ğ')
    .replace(/sh/gi, (m) => {
      if (m === 'SH') return 'Ş';
      if (m === 'Sh') return 'Ş';
      if (m === 'sH') return 'ş';
      return 'ş';
    })
    .replace(/ch/gi, (m) => {
      if (m === 'CH') return 'Ç';
      if (m === 'Ch') return 'Ç';
      if (m === 'cH') return 'ç';
      return 'ç';
    });
}

function convertWordToCyrillic(word: string): string {
  const lower = word.toLowerCase();

  // Handle ts in known loanwords
  let result = '';
  let i = 0;

  while (i < word.length) {
    const rest = word.slice(i);
    const restLower = lower.slice(i);

    // oʻ / gʻ (U+02BB)
    if (restLower.startsWith('oʻ')) {
      result += word[i] === 'O' ? 'Ў' : 'ў';
      i += 2;
      continue;
    }
    if (restLower.startsWith('gʻ')) {
      result += word[i] === 'G' ? 'Ғ' : 'ғ';
      i += 2;
      continue;
    }

    // Digraphs sh, ch, yo, yu, ya, ye
    if (restLower.startsWith('sh')) {
      result += matchCase(rest.slice(0, 2), 'ш');
      i += 2;
      continue;
    }
    if (restLower.startsWith('ch')) {
      result += matchCase(rest.slice(0, 2), 'ч');
      i += 2;
      continue;
    }
    if (restLower.startsWith('yo')) {
      result += matchCase(rest.slice(0, 2), 'ё');
      i += 2;
      continue;
    }
    if (restLower.startsWith('yu')) {
      result += matchCase(rest.slice(0, 2), 'ю');
      i += 2;
      continue;
    }
    if (restLower.startsWith('ya')) {
      result += matchCase(rest.slice(0, 2), 'я');
      i += 2;
      continue;
    }
    if (restLower.startsWith('ye')) {
      const prevChar = i > 0 ? lower[i - 1] : '';
      if (i === 0 || VOWELS.has(prevChar) || prevChar === 'ʼ') {
        result += matchCase(rest.slice(0, 2), 'е');
        i += 2;
        continue;
      }
    }

    // ts loanwords check
    if (restLower.startsWith('ts') && CYRILLIC_TS_WORDS.has(lower.replace(/[^a-zʻʼ]/g, ''))) {
      result += matchCase(rest.slice(0, 2), 'ц');
      i += 2;
      continue;
    }

    const ch = word[i];
    const chLower = ch.toLowerCase();

    if (ch === 'ʼ') {
      result += 'ъ';
      i += 1;
      continue;
    }

    if (chLower === 'e') {
      const prev2 = i >= 2 ? lower.slice(i - 2, i) : '';
      const prev1 = i > 0 ? lower[i - 1] : '';
      if (i === 0 || prev2 === 'oʻ' || VOWELS.has(prev1) || prev1 === 'ʼ') {
        result += ch === 'E' ? 'Э' : 'э';
      } else {
        result += ch === 'E' ? 'Е' : 'е';
      }
      i += 1;
      continue;
    }

    const singleMap: Record<string, string> = {
      a: 'а',
      b: 'б',
      d: 'д',
      f: 'ф',
      g: 'г',
      h: 'ҳ',
      i: 'и',
      j: 'ж',
      k: 'к',
      l: 'л',
      m: 'м',
      n: 'н',
      o: 'о',
      p: 'п',
      q: 'қ',
      r: 'р',
      s: 'с',
      t: 'т',
      u: 'у',
      v: 'в',
      x: 'х',
      y: 'й',
      z: 'з',
    };

    const mapped = singleMap[chLower];
    if (mapped) {
      result += ch === ch.toUpperCase() ? mapped.toUpperCase() : mapped;
    } else {
      result += ch;
    }
    i += 1;
  }

  return result;
}

/**
 * Amaldagi lotin yozuvidan oʻzbek kirill yozuviga oʻgirish (ota-onalar uchun beta rejim).
 */
export function toCyrillic(text: string): string {
  if (!text) return text;
  return text.replace(/[a-zA-Zʻʼ]+/g, (word) => convertWordToCyrillic(word));
}

export function formatUzbek(text: string, mode: AlphabetMode): string {
  if (mode === 'new-latin') return toNewLatin(text);
  if (mode === 'cyrillic') return toCyrillic(text);
  return text;
}
