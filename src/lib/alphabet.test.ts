import { describe, expect, it } from 'vitest';
import { formatUzbek, toCyrillic, toNewLatin } from './alphabet';

describe('toNewLatin', () => {
  it('converts lowercase oʻ and gʻ to ö and ğ', () => {
    expect(toNewLatin('oʻzbek')).toBe('özbek');
    expect(toNewLatin('gʻoz')).toBe('ğoz');
    expect(toNewLatin('bogʻ')).toBe('boğ');
  });

  it('converts uppercase Oʻ and Gʻ to Ö and Ğ', () => {
    expect(toNewLatin('Oʻzbekiston')).toBe('Özbekiston');
    expect(toNewLatin('Gʻolib')).toBe('Ğolib');
  });

  it('converts sh and ch digraphs preserving capitalization', () => {
    expect(toNewLatin('shahar')).toBe('şahar');
    expect(toNewLatin('Shahar')).toBe('Şahar');
    expect(toNewLatin('SHAHAR')).toBe('ŞAHAR');
    expect(toNewLatin('choy')).toBe('çoy');
    expect(toNewLatin('Chorsu')).toBe('Çorsu');
    expect(toNewLatin('CHOY')).toBe('ÇOY');
  });

  it('keeps sʼh separated by tutuq belgisi unchanged', () => {
    expect(toNewLatin('Isʼhoq')).toBe('Isʼhoq');
    expect(toNewLatin('asʼhob')).toBe('asʼhob');
  });

  it('keeps ng unchanged', () => {
    expect(toNewLatin('tong')).toBe('tong');
    expect(toNewLatin('rang')).toBe('rang');
    expect(toNewLatin('oʻng')).toBe('öng');
  });

  it('handles full sentences with mixed special characters and tutuq', () => {
    expect(toNewLatin('Oʻgʻiloy choy va shirinlik oldi.')).toBe(
      'Öğiloy çoy va şirinlik oldi.'
    );
    expect(toNewLatin('Maʼno va taʼlim.')).toBe('Maʼno va taʼlim.');
  });
});

describe('toCyrillic', () => {
  it('converts basic words and digraphs sh, ch', () => {
    expect(toCyrillic('shahar')).toBe('шаҳар');
    expect(toCyrillic('choy')).toBe('чой');
    expect(toCyrillic('kitob')).toBe('китоб');
  });

  it('converts oʻ and gʻ to ў and ғ', () => {
    expect(toCyrillic('oʻzbek')).toBe('ўзбек');
    expect(toCyrillic('Oʻzbekiston')).toBe('Ўзбекистон');
    expect(toCyrillic('bogʻ')).toBe('боғ');
    expect(toCyrillic('Gʻolib')).toBe('Ғолиб');
  });

  it('distinguishes q, h, and x properly', () => {
    expect(toCyrillic('qalam')).toBe('қалам');
    expect(toCyrillic('hafta')).toBe('ҳафта');
    expect(toCyrillic('xona')).toBe('хона');
  });

  it('converts tutuq belgisi (ʼ) to ъ', () => {
    expect(toCyrillic('qalʼa')).toBe('қалъа');
    expect(toCyrillic('taʼlim')).toBe('таълим');
    expect(toCyrillic('maʼno')).toBe('маъно');
  });

  it('converts word-initial and post-vowel e to э, and post-consonant e to е', () => {
    expect(toCyrillic('ertak')).toBe('эртак');
    expect(toCyrillic('Erkin')).toBe('Эркин');
    expect(toCyrillic('men')).toBe('мен');
    expect(toCyrillic('eʼlon')).toBe('эълон');
  });

  it('converts yo, yu, ya, ye appropriately', () => {
    expect(toCyrillic('yoz')).toBe('ёз');
    expect(toCyrillic('yulduz')).toBe('юлдуз');
    expect(toCyrillic('yaxshi')).toBe('яхши');
    expect(toCyrillic('yer')).toBe('ер');
  });

  it('handles Isʼhoq without merging s and h into ш', () => {
    expect(toCyrillic('Isʼhoq')).toBe('Исъҳоқ');
  });

  it('converts known ts loanwords to ц while keeping regular t+s separate', () => {
    expect(toCyrillic('tsirk')).toBe('цирк');
    expect(toCyrillic('konstitutsiya')).toBe('конституция');
    expect(toCyrillic('ketsa')).toBe('кетса');
  });

  it('handles full sentences and punctuation', () => {
    expect(toCyrillic('Assalomu alaykum, doʻstim!')).toBe('Ассалому алайкум, дўстим!');
  });
});

describe('formatUzbek', () => {
  it('formats according to selected alphabet mode', () => {
    const sample = 'Oʻzbek tili — chiroyli til.';
    expect(formatUzbek(sample, 'latin')).toBe(sample);
    expect(formatUzbek(sample, 'new-latin')).toBe('Özbek tili — çiroyli til.');
    expect(formatUzbek(sample, 'cyrillic')).toBe('Ўзбек тили — чиройли тил.');
  });
});
