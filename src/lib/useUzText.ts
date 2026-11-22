import { formatUzbek } from '@/lib/alphabet';
import { useSettings } from '@/store/useSettings';

export function useUzText() {
  const alphabet = useSettings((s) => s.alphabet);
  return (text: string) => formatUzbek(text, alphabet);
}
