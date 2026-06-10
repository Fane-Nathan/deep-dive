import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

/**
 * Ambient underwater soundscape, synthesized live with WebAudio — no audio
 * asset needed. Brown noise through a low-pass filter whose cutoff swells
 * slowly, like pressure and current. Off by default; starts only on the
 * user's explicit toggle (which also satisfies autoplay policies).
 */
export default function SoundToggle() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    return () => {
      ctxRef.current?.close();
    };
  }, []);

  const ensureGraph = () => {
    if (ctxRef.current) return;
    const ctx = new AudioContext();

    // 10s brown-noise loop. Edges are ramped to zero so the loop seam is a
    // soft swell instead of a click (brown noise drifts, a hard seam thumps).
    const seconds = 10;
    const len = ctx.sampleRate * seconds;
    const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.5;
    }
    const ramp = ctx.sampleRate * 0.5;
    for (let i = 0; i < ramp; i++) {
      const k = i / ramp;
      data[i] *= k;
      data[len - 1 - i] *= k;
    }

    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 240;
    filter.Q.value = 0.7;

    // Slow LFO on the cutoff = the "swell" of distant waves overhead.
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.07;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 110;
    lfo.connect(lfoGain).connect(filter.frequency);

    const gain = ctx.createGain();
    gain.gain.value = 0;

    src.connect(filter).connect(gain).connect(ctx.destination);
    src.start();
    lfo.start();

    ctxRef.current = ctx;
    gainRef.current = gain;
  };

  const toggle = () => {
    const next = !on;
    setOn(next);
    if (next) {
      ensureGraph();
      const ctx = ctxRef.current!;
      ctx.resume();
      gainRef.current!.gain.setTargetAtTime(0.3, ctx.currentTime, 0.8);
    } else if (ctxRef.current && gainRef.current) {
      gainRef.current.gain.setTargetAtTime(0, ctxRef.current.currentTime, 0.4);
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={on ? 'Mute ambient sound' : 'Play ambient sound'}
      title={on ? 'Mute ocean ambience' : 'Ocean ambience'}
      className="fixed bottom-6 right-6 z-40 p-3 rounded-2xl bg-slate-950/50 backdrop-blur-md border border-slate-800/60 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-all shadow-xl"
    >
      {on ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
    </button>
  );
}
