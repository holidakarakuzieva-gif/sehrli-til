export interface SafeExternalLink {
  id: string;
  url: string;
  title: {
    uz: string;
    ru: string;
    en: string;
  };
  description: {
    uz: string;
    ru: string;
    en: string;
  };
  category: 'official' | 'legal' | 'parent-tool';
}

/**
 * Tashqi havolalar faqat «Ota-onalar burchagi»da (ota-ona darvozasidan keyin) koʻrsatiladi.
 * Bolalar zonasida tashqi havolalar ishlatilmaydi.
 */
export const SAFE_PARENT_LINKS: SafeExternalLink[] = [
  {
    id: 'uzedu',
    url: 'https://gov.uz/oz/uzedu',
    title: {
      uz: 'Maktabgacha va maktab taʼlimi vazirligi',
      ru: 'Министерство дошкольного и школьного образования РУз',
      en: 'Ministry of Preschool and School Education of Uzbekistan',
    },
    description: {
      uz: 'Rasmiy yangiliklar va tasdiqlangan oʻquv dasturlari',
      ru: 'Официальные новости и утверждённые учебные программы',
      en: 'Official news and approved school curricula',
    },
    category: 'official',
  },
  {
    id: 'lex',
    url: 'https://lex.uz',
    title: {
      uz: 'Oʻzbekiston Respublikasi Qonun hujjatlari (Lex.uz)',
      ru: 'Национальная база данных законодательства (Lex.uz)',
      en: 'National Legislation Database of Uzbekistan (Lex.uz)',
    },
    description: {
      uz: 'OʻRQ-444 (Bolalar axborot xavfsizligi) va OʻRQ-1184 (Alifbo) qonunlari',
      ru: 'Законы ЗРУ-444 (защита детей от вредной информации) и ЗРУ-1184 (алфавит)',
      en: 'Laws on child information safety and alphabet reform',
    },
    category: 'legal',
  },
];
