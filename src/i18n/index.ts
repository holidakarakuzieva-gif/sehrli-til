import { useEffect } from 'react';
import type { Lang } from '@/content/types';
import { useSettings } from '@/store/useSettings';
import { en } from './en';
import { ru } from './ru';
import { uz } from './uz';

const DICTIONARIES: Record<Lang, typeof uz> = {
  uz,
  ru,
  en,
};

export function useTranslation() {
  const lang = useSettings((s) => s.lang);
  const t = DICTIONARIES[lang] ?? ru;

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return { t, lang };
}
