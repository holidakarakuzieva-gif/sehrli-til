export type ThemeMode = 'light' | 'dark' | 'system';
export type FontSizeMode = 'normal' | 'large' | 'xlarge';

export interface AvatarOption {
  id: string;
  emoji: string;
  bgClass: string;
  label: {
    uz: string;
    ru: string;
    en: string;
  };
}

export const AVATAR_OPTIONS: AvatarOption[] = [
  {
    id: 'humo',
    emoji: '🐦',
    bgClass: 'bg-amber-100 dark:bg-amber-900/40',
    label: { uz: 'Humocha', ru: 'Хумоча', en: 'Humocha' },
  },
  {
    id: 'snow-leopard',
    emoji: '🐆',
    bgClass: 'bg-sky-100 dark:bg-sky-900/40',
    label: { uz: 'Qor barsi', ru: 'Снежный барс', en: 'Snow leopard' },
  },
  {
    id: 'gazelle',
    emoji: '🦌',
    bgClass: 'bg-emerald-100 dark:bg-emerald-900/40',
    label: { uz: 'Jayron', ru: 'Джейран', en: 'Gazelle' },
  },
  {
    id: 'fox',
    emoji: '🦊',
    bgClass: 'bg-orange-100 dark:bg-orange-900/40',
    label: { uz: 'Tulki', ru: 'Лисёнок', en: 'Fox' },
  },
  {
    id: 'owl',
    emoji: '🦉',
    bgClass: 'bg-violet-100 dark:bg-violet-900/40',
    label: { uz: 'Boyoʻgʻli', ru: 'Совёнок', en: 'Owl' },
  },
  {
    id: 'hedgehog',
    emoji: '🦔',
    bgClass: 'bg-rose-100 dark:bg-rose-900/40',
    label: { uz: 'Tipratikan', ru: 'Ёжик', en: 'Hedgehog' },
  },
];

export const UNIT_COLOR_PALETTE: Record<
  string,
  { bg: string; border: string; iconBg: string; text: string }
> = {
  sunny: {
    bg: 'bg-[#FFF3E6] dark:bg-[#2B231E]',
    border: 'border-[#FFD4B0] dark:border-[#6B4628]',
    iconBg: 'bg-[#FF8A3D] text-[#1E1B18]',
    text: 'text-[#B34200] dark:text-[#FFB380]',
  },
  sky: {
    bg: 'bg-[#EAF6FF] dark:bg-[#1A293E]',
    border: 'border-[#B6E0FF] dark:border-[#2C4E78]',
    iconBg: 'bg-[#3BA9FF] text-[#0F172A]',
    text: 'text-[#0369A1] dark:text-[#7CC7FF]',
  },
  mint: {
    bg: 'bg-[#E9FAF7] dark:bg-[#162C2E]',
    border: 'border-[#ADECE4] dark:border-[#28595B]',
    iconBg: 'bg-[#2EC4B6] text-[#0F172A]',
    text: 'text-[#0F766E] dark:text-[#5FE0D3]',
  },
  grape: {
    bg: 'bg-[#F3EEFF] dark:bg-[#25203D]',
    border: 'border-[#D8C9FF] dark:border-[#4B3F7D]',
    iconBg: 'bg-[#8B5CF6] text-white',
    text: 'text-[#6D28D9] dark:text-[#C4B5FD]',
  },
  berry: {
    bg: 'bg-[#FFEDF3] dark:bg-[#341E2B]',
    border: 'border-[#FFC7D9] dark:border-[#6E3552]',
    iconBg: 'bg-[#FF5C8A] text-[#1E1B18]',
    text: 'text-[#BE185D] dark:text-[#FF8FB0]',
  },
  lemon: {
    bg: 'bg-[#FFFBE6] dark:bg-[#2D2A1B]',
    border: 'border-[#FFE994] dark:border-[#665B2A]',
    iconBg: 'bg-[#FFD23F] text-[#1E1B18]',
    text: 'text-[#925800] dark:text-[#FFE066]',
  },
};
