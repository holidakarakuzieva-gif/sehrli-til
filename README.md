# Sehrli til — oʻzbek tilini sehrli oʻrgan ✨

Rus tilida taʼlim oluvchi umumtaʼlim maktablarining **2–3-sinf oʻquvchilari (8–9 yosh)** va ularning ota-onalari uchun moʻljallangan interaktiv oʻzbek tili platformasi. Asosiy eʼtibor lugʻat boyligi, tarjima va leksikologiyaga qaratilgan.

---

## Ishga tushirish / Запуск проекта

Talablar: **Node.js >= 20**

```bash
npm install
npm run dev
```

Brauzerda `http://localhost:3000` manzilini oching.

### Tekshirish va yigʻish / Проверка и сборка

```bash
npm run typecheck      # TypeScript tiplarini tekshirish
npm run check:content  # Oʻzbek imlo belgilari (U+02BB, U+02BC) nazorati
npm run test           # Vitest unit testlari
npm run build          # Ishlab chiqarish (production) yigʻish
npm run preview        # Yigʻilgan saytni koʻrish
```

---

## Kontent qoʻshish qoidalari / Правила добавления контента

1. **Oʻzbek imlosi**:
   - `oʻ` va `gʻ` harflarida faqat **U+02BB** (`ʻ`) belgisini ishlating.
   - Tutuq belgisi (`maʼno`, `qalʼa`, `taʼlim`) uchun faqat **U+02BC** (`ʼ`) belgisini ishlating.
   - Oddiy `'`, `` ` `` yoki `‘` (U+2018) belgilari taqiqlanadi — `npm run check:content` bularni avtomatik aniqlaydi.
2. **Alifbo**: Barcha asosiy matnlar amaldagi lotin yozuvida saqlanadi. Yangi lotin (`ö, ğ, ş, ç`) va kirill (`ў, ғ, қ, ҳ`) rejimlari `src/lib/alphabet.ts` orqali avtomatik konvertatsiya qilinadi.
3. **Rasmlar**:
   - Lugʻat rasmlari: `public/images/words/{wordId}.webp`
   - Real suratlar (shaharlar, bayramlar): `public/images/real/{id}.webp`
   - Yetishmayotgan rasmlarni tekshirish: `node scripts/check-images.mjs`
   - Rasm topilmasa, `<SmartImage>` chiroyli fon va emoji/SVG koʻrsatadi.
4. **Audio**:
   - Tayyor yozuvlar: `public/audio/{wordId}.mp3`
   - Fayl boʻlmasa, brauzerning `uz-UZ` nutq sintezi yoki ruscha talaffuz yordamchisi ishlatiladi.

---

## Bolalar xavfsizligi / Безопасность детей

- Bolalar zonasida tashqi havolalar, reklama, analitika, cookie va uchinchi tomon skriptlari **yoʻq**.
- Barcha maʼlumotlar faqat foydalanuvchi brauzerida (`localStorage`) saqlanadi.
- Oʻzbekiston Respublikasining OʻRQ-444 (2017) qonuniga muvofiq **0+** yosh belgisi qoʻyilgan.

---

## Vercel'da deploy qilish / Деплой на Vercel

Loyiha toʻliq statik (backend va API kalitlarisiz). GitHub repozitoriyini Vercel'ga ulang — `vercel.json` avtomatik SPA yoʻnaltirish va xavfsizlik sarlavhalarini taʼminlaydi.
