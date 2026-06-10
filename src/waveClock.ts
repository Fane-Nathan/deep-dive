/**
 * Shared monotonic wave clock.
 *
 * The wave phase must only ever move forward. Scrolling (in either
 * direction) adds extra energy, but never rewinds the waves — this is
 * what previously froze/reversed the water when scrolling back up.
 *
 * Scene.tsx advances the clock once per frame; everyone else reads it.
 */

let waveTime = 0;
let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;

export function advanceWaveTime(delta: number): number {
  const scrollY = typeof window !== 'undefined' ? window.scrollY : lastScrollY;
  // Absolute delta: scrolling up churns the water just like scrolling down.
  const scrollDelta = Math.min(Math.abs(scrollY - lastScrollY), 120);
  lastScrollY = scrollY;

  waveTime += Math.min(delta, 0.1) * 0.3 + scrollDelta * 0.002;
  return waveTime;
}

export function getWaveTime(): number {
  return waveTime;
}
