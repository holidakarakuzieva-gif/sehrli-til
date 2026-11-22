import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Lang } from '@/content/types';
import type { AlphabetMode } from '@/lib/alphabet';
import type { FontSizeMode, ThemeMode } from '@/config/theme';

function detectInitialLang(): Lang {
  if (typeof navigator === 'undefined') return 'ru';
  const raw = navigator.language.toLowerCase();
  if (raw.startsWith('uz')) return 'uz';
  if (raw.startsWith('en')) return 'en';
  return 'ru';
}

export interface SettingsState {
  lang: Lang;
  theme: ThemeMode;
  alphabet: AlphabetMode;
  fontSize: FontSizeMode;
  easyRead: boolean;
  reducedMotion: boolean;
  soundEnabled: boolean;
  magicGlasses: boolean;
  screenTimeLimitMin: number;
  setLang: (lang: Lang) => void;
  setTheme: (theme: ThemeMode) => void;
  setAlphabet: (alphabet: AlphabetMode) => void;
  setFontSize: (size: FontSizeMode) => void;
  setEasyRead: (enabled: boolean) => void;
  setReducedMotion: (enabled: boolean) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setMagicGlasses: (enabled: boolean) => void;
  setScreenTimeLimitMin: (minutes: number) => void;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      lang: detectInitialLang(),
      theme: 'light',
      alphabet: 'latin',
      fontSize: 'normal',
      easyRead: false,
      reducedMotion: false,
      soundEnabled: true,
      magicGlasses: false,
      screenTimeLimitMin: 25,
      setLang: (lang) => set({ lang }),
      setTheme: (theme) => set({ theme }),
      setAlphabet: (alphabet) => set({ alphabet }),
      setFontSize: (fontSize) => set({ fontSize }),
      setEasyRead: (easyRead) => set({ easyRead }),
      setReducedMotion: (reducedMotion) => set({ reducedMotion }),
      setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
      setMagicGlasses: (magicGlasses) => set({ magicGlasses }),
      setScreenTimeLimitMin: (screenTimeLimitMin) => set({ screenTimeLimitMin }),
    }),
    {
      name: 'sehrli-til-settings',
    }
  )
);
