'use client';

import * as React from 'react';

interface FloralParticleSpec {
  id: number;
  leftPercent: number;
  kind: 'jasmine' | 'rose-petal' | 'sage-leaf' | 'golden-daisy';
  sizePx: number;
  fallDurationSec: number;
  swayDurationSec: number;
  delaySec: number;
  driftPx: number;
  swayPx: number;
  rotDeg: number;
}

const FLORAL_PARTICLES: FloralParticleSpec[] = Array.from({ length: 36 }, (_, idx) => {
  const kinds: FloralParticleSpec['kind'][] = ['jasmine', 'rose-petal', 'sage-leaf', 'golden-daisy'];
  return {
    id: idx,
    leftPercent: ((idx * 17 + 7) % 94) + 3,
    kind: kinds[idx % kinds.length],
    sizePx: 16 + (idx % 4) * 4,
    fallDurationSec: 6.2 + (idx % 5) * 1.15,
    swayDurationSec: 2.6 + (idx % 3) * 0.7,
    delaySec: (idx % 12) * 0.45,
    driftPx: (idx % 2 === 0 ? 1 : -1) * (20 + (idx % 4) * 12),
    swayPx: (idx % 2 === 0 ? 1 : -1) * (14 + (idx % 3) * 8),
    rotDeg: (idx % 2 === 0 ? 1 : -1) * (260 + (idx % 4) * 80),
  };
});

export const FloralConfettiShower: React.FC<{ active: boolean }> = ({ active }) => {
  if (!active) return null;

  return (
    <div
      data-swarm-ignore="true"
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none"
      aria-hidden="true"
    >
      {FLORAL_PARTICLES.map((p) => (
        <div
          key={p.id}
          className="absolute top-0 floral-particle"
          style={
            {
              left: `${p.leftPercent}%`,
              width: `${p.sizePx}px`,
              height: `${p.sizePx}px`,
              '--fall-duration': `${p.fallDurationSec}s`,
              '--sway-duration': `${p.swayDurationSec}s`,
              '--fall-delay': `${p.delaySec}s`,
              '--floral-drift': `${p.driftPx}px`,
              '--floral-sway': `${p.swayPx}px`,
              '--floral-rot': `${p.rotDeg}deg`,
            } as React.CSSProperties
          }
        >
          {p.kind === 'jasmine' && (
            <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-xs">
              <g fill="#FFFDF9" stroke="#E7E0D6" strokeWidth="0.8">
                <ellipse cx="16" cy="7" rx="4.2" ry="6.5" />
                <ellipse cx="16" cy="7" rx="4.2" ry="6.5" transform="rotate(72 16 16)" />
                <ellipse cx="16" cy="7" rx="4.2" ry="6.5" transform="rotate(144 16 16)" />
                <ellipse cx="16" cy="7" rx="4.2" ry="6.5" transform="rotate(216 16 16)" />
                <ellipse cx="16" cy="7" rx="4.2" ry="6.5" transform="rotate(288 16 16)" />
              </g>
              <circle cx="16" cy="16" r="3.4" fill="#F59E0B" />
              <circle cx="16" cy="16" r="1.6" fill="#FEF3C7" />
            </svg>
          )}

          {p.kind === 'rose-petal' && (
            <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-xs">
              <path
                d="M16 4C9 4 5 10 6 17C7 23 12 28 16 29C20 28 25 23 26 17C27 10 23 4 16 4Z"
                fill="#FDA4AF"
                stroke="#F43F5E"
                strokeWidth="0.7"
                fillOpacity="0.9"
              />
              <path
                d="M16 9C13 13 13 20 16 26"
                stroke="#FECDD3"
                strokeWidth="1"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          )}

          {p.kind === 'sage-leaf' && (
            <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-xs">
              <path
                d="M6 26C6 14 14 6 26 6C26 18 18 26 6 26Z"
                fill="#6EE7B7"
                stroke="#0F766E"
                strokeWidth="0.8"
                fillOpacity="0.85"
              />
              <path
                d="M7 25L23 9"
                stroke="#047857"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
          )}

          {p.kind === 'golden-daisy' && (
            <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-xs">
              <g fill="#FDE68A" stroke="#D97706" strokeWidth="0.7">
                <ellipse cx="16" cy="6.5" rx="3.2" ry="6" />
                <ellipse cx="16" cy="6.5" rx="3.2" ry="6" transform="rotate(60 16 16)" />
                <ellipse cx="16" cy="6.5" rx="3.2" ry="6" transform="rotate(120 16 16)" />
                <ellipse cx="16" cy="6.5" rx="3.2" ry="6" transform="rotate(180 16 16)" />
                <ellipse cx="16" cy="6.5" rx="3.2" ry="6" transform="rotate(240 16 16)" />
                <ellipse cx="16" cy="6.5" rx="3.2" ry="6" transform="rotate(300 16 16)" />
              </g>
              <circle cx="16" cy="16" r="3.5" fill="#B45309" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};

