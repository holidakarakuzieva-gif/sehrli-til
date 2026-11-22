export interface AudioPlayResult {
  mode: 'mp3' | 'speech' | 'pronunciation-hint';
}

export function hasUzbekSpeechVoice(): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }
  const voices = window.speechSynthesis.getVoices();
  return voices.some((v) => v.lang.toLowerCase().startsWith('uz'));
}

/**
 * Avval /audio/{wordId}.mp3 faylini tekshiradi.
 * Boʻlmasa — faqat uz-UZ ovoz mavjud boʻlganda Web Speech API ishlatadi.
 * Ruscha yoki turkcha ovoz bilan oʻzbekcha soʻzni OʻQITMAYDI — oʻrniga talaffuz yordamchisini koʻrsatish signalini qaytaradi.
 */
export async function playWordAudio(
  wordId: string,
  uzText: string,
  soundEnabled: boolean
): Promise<AudioPlayResult> {
  if (!soundEnabled) {
    return { mode: 'pronunciation-hint' };
  }

  const audioUrl = `/audio/${encodeURIComponent(wordId)}.mp3`;
  try {
    const head = await fetch(audioUrl, { method: 'HEAD' });
    const contentType = head.headers.get('content-type') || '';
    if (head.ok && contentType.startsWith('audio/')) {
      const audio = new Audio(audioUrl);
      await audio.play();
      return { mode: 'mp3' };
    }
  } catch {
    // MP3 not present, fall through to uz-UZ speech check
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    const voices = window.speechSynthesis.getVoices();
    const uzVoice = voices.find((v) => v.lang.toLowerCase().startsWith('uz'));
    if (uzVoice) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(uzText);
      utterance.voice = uzVoice;
      utterance.lang = 'uz-UZ';
      utterance.rate = 0.88;
      window.speechSynthesis.speak(utterance);
      return { mode: 'speech' };
    }
  }

  return { mode: 'pronunciation-hint' };
}
