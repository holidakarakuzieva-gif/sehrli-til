let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return null;
  if (!audioCtx) {
    audioCtx = new Ctx();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function playTone(
  freq: number,
  duration: number,
  delay = 0,
  type: OscillatorType = 'sine',
  volume = 0.08
): void {
  const ctx = getCtx();
  if (!ctx) return;

  const now = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(volume, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + duration + 0.02);
}

export function playSfx(kind: 'pop' | 'success' | 'retry' | 'celebrate', enabled: boolean): void {
  if (!enabled) return;
  try {
    if (kind === 'pop') {
      playTone(540, 0.08, 0, 'sine', 0.06);
    } else if (kind === 'success') {
      playTone(523.25, 0.12, 0, 'triangle', 0.08);
      playTone(659.25, 0.16, 0.09, 'triangle', 0.08);
    } else if (kind === 'retry') {
      playTone(360, 0.14, 0, 'sine', 0.06);
      playTone(320, 0.16, 0.1, 'sine', 0.05);
    } else if (kind === 'celebrate') {
      playTone(523.25, 0.14, 0, 'triangle', 0.08);
      playTone(659.25, 0.14, 0.1, 'triangle', 0.08);
      playTone(783.99, 0.16, 0.2, 'triangle', 0.09);
      playTone(1046.5, 0.28, 0.32, 'triangle', 0.09);
    }
  } catch {
    // Audio playback silently ignored if blocked by autoplay policy
  }
}
