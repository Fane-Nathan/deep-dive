import { useEffect, useRef, useState } from 'react';

const IDLE_MS = 30_000;

function SubmarineSVG() {
  return (
    <svg width="130" height="64" viewBox="0 0 130 64" fill="none" aria-hidden="true">
      {/* tail fin + propeller (left — sub swims right) */}
      <path d="M18 38 L4 28 L4 48 Z" fill="#eab308" />
      <rect x="2" y="33" width="4" height="10" rx="2" fill="#a16207">
        <animateTransform
          attributeName="transform"
          type="scale"
          values="1 1; 1 0.2; 1 1"
          dur="0.5s"
          repeatCount="indefinite"
          additive="sum"
        />
      </rect>
      {/* hull */}
      <ellipse cx="68" cy="38" rx="46" ry="18" fill="#facc15" />
      <ellipse cx="68" cy="33" rx="46" ry="13" fill="#fde047" opacity="0.5" />
      {/* conning tower + periscope */}
      <rect x="56" y="10" width="24" height="16" rx="5" fill="#eab308" />
      <rect x="64" y="2" width="3.5" height="10" fill="#eab308" />
      <rect x="64" y="0" width="12" height="3.5" rx="1.75" fill="#eab308" />
      {/* portholes */}
      <circle cx="48" cy="38" r="5" fill="#0ea5e9" stroke="#a16207" strokeWidth="2" />
      <circle cx="68" cy="38" r="5" fill="#0ea5e9" stroke="#a16207" strokeWidth="2" />
      <circle cx="88" cy="38" r="5" fill="#0ea5e9" stroke="#a16207" strokeWidth="2" />
    </svg>
  );
}

/**
 * Easter egg: after 30s with no user activity, a little yellow submarine
 * swims across the screen at a random height. Resets and waits again after
 * each crossing.
 */
export default function IdleSubmarine() {
  const [swim, setSwim] = useState<{ id: number; top: number } | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const nextId = useRef(0);

  const arm = () => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setSwim({ id: nextId.current++, top: 20 + Math.random() * 50 });
    }, IDLE_MS);
  };

  useEffect(() => {
    const events = ['pointermove', 'pointerdown', 'keydown', 'wheel', 'touchstart', 'scroll'];
    events.forEach((e) => window.addEventListener(e, arm, { passive: true }));
    arm();
    return () => {
      window.clearTimeout(timer.current);
      events.forEach((e) => window.removeEventListener(e, arm));
    };
  }, []);

  if (!swim) return null;

  return (
    <div
      key={swim.id}
      className="fixed left-0 z-40 pointer-events-none submarine-track"
      style={{ top: `${swim.top}vh` }}
      onAnimationEnd={(e) => {
        // Only the track's own swim animation ends the crossing (the bob
        // and propeller animations on children loop forever).
        if (e.target === e.currentTarget) {
          setSwim(null);
          arm();
        }
      }}
    >
      <div className="submarine-bob drop-shadow-[0_0_14px_rgba(250,204,21,0.25)]">
        <SubmarineSVG />
      </div>
    </div>
  );
}
