import { useEffect, useState, useRef } from 'react';

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  dx: number;
  duration: number;
  delay: number;
}

/**
 * Spawns a small burst of rising bubbles wherever the user clicks/taps.
 * Purely decorative: the layer is pointer-events-none, listeners are global.
 */
export default function BubbleLayer() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    const spawn = (e: PointerEvent) => {
      const count = 4 + Math.floor(Math.random() * 4);
      const burst: Bubble[] = Array.from({ length: count }, () => ({
        id: nextId.current++,
        x: e.clientX + (Math.random() - 0.5) * 24,
        y: e.clientY + (Math.random() - 0.5) * 12,
        size: 4 + Math.random() * 10,
        dx: (Math.random() - 0.5) * 60,
        duration: 0.9 + Math.random() * 0.9,
        delay: Math.random() * 0.15,
      }));
      // Cap total bubbles so rapid clicking can't flood the DOM.
      setBubbles((prev) => [...prev.slice(-40), ...burst]);
    };

    window.addEventListener('pointerdown', spawn);
    return () => window.removeEventListener('pointerdown', spawn);
  }, []);

  const remove = (id: number) => {
    setBubbles((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden" aria-hidden="true">
      {bubbles.map((b) => (
        <span
          key={b.id}
          onAnimationEnd={() => remove(b.id)}
          className="bubble"
          style={{
            left: b.x,
            top: b.y,
            width: b.size,
            height: b.size,
            ['--dx' as any]: `${b.dx}px`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
