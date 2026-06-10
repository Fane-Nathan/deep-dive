import { useState } from 'react';
import { useScroll, useMotionValueEvent } from 'motion/react';

const MAX_DEPTH = 1100; // metres at the very bottom of the page

const ZONES = [
  { max: 200, name: 'SUNLIGHT ZONE', color: 'text-cyan-300', bar: 'bg-cyan-400' },
  { max: 1000, name: 'TWILIGHT ZONE', color: 'text-indigo-300', bar: 'bg-indigo-400' },
  { max: Infinity, name: 'MIDNIGHT ZONE', color: 'text-blue-200', bar: 'bg-blue-300' },
];

export default function DepthMeter() {
  const { scrollYProgress } = useScroll();
  const [depth, setDepth] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setDepth(Math.round(v * MAX_DEPTH));
  });

  const zone = ZONES.find((z) => depth < z.max) ?? ZONES[ZONES.length - 1];
  const progress = Math.min(1, depth / MAX_DEPTH);

  return (
    <div className="fixed bottom-6 left-6 z-40 pointer-events-none hidden sm:flex items-stretch gap-3 font-mono select-none rounded-2xl bg-slate-950/40 backdrop-blur-md border border-slate-800/60 px-4 py-3 shadow-xl">
      {/* Vertical depth gauge */}
      <div className="w-1.5 rounded-full bg-slate-800/70 border border-slate-700/50 overflow-hidden">
        <div
          className={`w-full ${zone.bar} transition-colors duration-700`}
          style={{ height: `${progress * 100}%`, opacity: 0.85 }}
        />
      </div>
      <div className="flex flex-col justify-center">
        <div className="text-[10px] tracking-[0.25em] text-slate-500 mb-1">DEPTH</div>
        <div className="text-2xl font-bold text-white tabular-nums leading-none mb-1.5">
          {String(depth).padStart(4, '0')}
          <span className="text-sm text-slate-500 ml-1">m</span>
        </div>
        <div className={`text-[10px] tracking-[0.2em] ${zone.color} transition-colors duration-700`}>
          {zone.name}
        </div>
      </div>
    </div>
  );
}
