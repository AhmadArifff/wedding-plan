'use client';

import * as React from 'react';

export type FloralTheme =
  | 'botanical-sage'
  | 'crimson-gold'
  | 'lavender-lilac'
  | 'golden-sunflower'
  | 'sakura-pastel';

export interface FloralThemeMeta {
  id: FloralTheme;
  name: string;
  subtitle: string;
  primaryColor: string;
  accentColor: string;
  badge: string;
  description: string;
}

export const FLORAL_THEMES: FloralThemeMeta[] = [
  {
    id: 'botanical-sage',
    name: 'Botanical Sage & Melati',
    subtitle: 'Jasmine, Daun Sage & Chamomile',
    primaryColor: '#0F766E',
    accentColor: '#FEF3C7',
    badge: '🌿 Teduh & Alami',
    description: 'Bunga melati putih dengan daun sage mint dan chamomile keemasan. Memberi kesan pernikahan suci dan asri.',
  },
  {
    id: 'crimson-gold',
    name: 'Royal Crimson Rose & Gold',
    subtitle: 'Mawar Merah Velvet & Serpihan Emas',
    primaryColor: '#BE123C',
    accentColor: '#F59E0B',
    badge: '👑 Megah & Mewah',
    description: 'Kelopak mawar merah crimson velvet dipadukan dengan serpihan emas 24k. Sangat anggun dan sakral.',
  },
  {
    id: 'lavender-lilac',
    name: 'Lavender Lilac Blossom',
    subtitle: 'Lavender, Lilac & Kristal Perak',
    primaryColor: '#7C3AED',
    accentColor: '#E9D5FF',
    badge: '💜 Lembut & Romantis',
    description: 'Rangkaian kelopak lavender ungu lilac yang menenangkan dengan sentuhan kilau kristal perak romantis.',
  },
  {
    id: 'golden-sunflower',
    name: 'Golden Sunflower & Aster',
    subtitle: 'Bunga Matahari & Aster Emas',
    primaryColor: '#D97706',
    accentColor: '#FDE68A',
    badge: '🌻 Hangat & Berkah',
    description: 'Kelopak bunga matahari cerah dan bunga aster emas yang memancarkan aura kegembiraan keluarga.',
  },
  {
    id: 'sakura-pastel',
    name: 'Sakura Cherry Blossom',
    subtitle: 'Sakura Pink Pastel & Peach Blossom',
    primaryColor: '#EC4899',
    accentColor: '#FCE7F3',
    badge: '🌸 Manis & Elegan',
    description: 'Kelopak bunga sakura musim semi dengan rona pink dan peach lembut melambangkan cinta abadi.',
  },
];

interface FloralParticleSpec {
  id: number;
  leftPercent: number;
  kindIndex: number;
  sizePx: number;
  fallDurationSec: number;
  swayDurationSec: number;
  delaySec: number;
  driftPx: number;
  swayPx: number;
  rotDeg: number;
}

const FLORAL_PARTICLES: FloralParticleSpec[] = Array.from({ length: 36 }, (_, idx) => {
  return {
    id: idx,
    leftPercent: ((idx * 17 + 5) % 92) + 4,
    kindIndex: idx % 4,
    sizePx: 16 + (idx % 4) * 4,
    fallDurationSec: 5.8 + (idx % 5) * 1.05,
    swayDurationSec: 2.4 + (idx % 3) * 0.6,
    delaySec: (idx % 12) * 0.35,
    driftPx: (idx % 2 === 0 ? 1 : -1) * (20 + (idx % 4) * 12),
    swayPx: (idx % 2 === 0 ? 1 : -1) * (14 + (idx % 3) * 8),
    rotDeg: (idx % 2 === 0 ? 1 : -1) * (260 + (idx % 4) * 80),
  };
});

export interface FloralConfettiShowerProps {
  active: boolean;
  theme?: FloralTheme;
}

export const FloralConfettiShower: React.FC<FloralConfettiShowerProps> = ({
  active,
  theme = 'botanical-sage',
}) => {
  if (!active) return null;

  return (
    <div
      data-swarm-ignore="true"
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Scoped Keyframes & Zero-Clump Guard Style */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes floralFallScoped {
          0% {
            transform: translate3d(0, -70px, 0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.95;
          }
          85% {
            opacity: 0.9;
          }
          100% {
            transform: translate3d(var(--floral-drift, 30px), 114vh, 0) rotate(var(--floral-rot, 360deg));
            opacity: 0;
          }
        }

        @keyframes floralSwayScoped {
          0%,
          100% {
            margin-left: 0px;
          }
          50% {
            margin-left: var(--floral-sway, 20px);
          }
        }

        .floral-confetti-particle {
          position: absolute;
          top: -65px;
          opacity: 0;
          pointer-events: none;
          will-change: transform, opacity;
          animation:
            floralFallScoped var(--fall-duration, 7s) linear var(--fall-delay, 0s) infinite both,
            floralSwayScoped var(--sway-duration, 3s) ease-in-out var(--fall-delay, 0s) infinite both;
        }
      `,
        }}
      />

      {FLORAL_PARTICLES.map((p) => (
        <div
          key={p.id}
          className="floral-confetti-particle"
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
          {/* THEME 1: BOTANICAL SAGE & MELATI */}
          {theme === 'botanical-sage' && (
            <>
              {p.kindIndex === 0 && (
                /* Melati / Jasmine Petals */
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

              {p.kindIndex === 1 && (
                /* Daun Sage Mint */
                <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-xs">
                  <path
                    d="M6 26C6 14 14 6 26 6C26 18 18 26 6 26Z"
                    fill="#6EE7B7"
                    stroke="#0F766E"
                    strokeWidth="0.8"
                    fillOpacity="0.85"
                  />
                  <path d="M7 25L23 9" stroke="#047857" strokeWidth="1" strokeLinecap="round" />
                </svg>
              )}

              {p.kindIndex === 2 && (
                /* Chamomile Petal */
                <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-xs">
                  <path
                    d="M16 4C10 4 6 10 7 17C8 23 13 28 16 29C19 28 24 23 25 17C26 10 22 4 16 4Z"
                    fill="#F8FAFC"
                    stroke="#CBD5E1"
                    strokeWidth="0.8"
                  />
                  <circle cx="16" cy="16" r="4.5" fill="#FBBF24" />
                </svg>
              )}

              {p.kindIndex === 3 && (
                /* Daun Eucalyptus */
                <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-xs">
                  <circle cx="16" cy="16" r="11" fill="#A7F3D0" stroke="#0D9488" strokeWidth="0.8" fillOpacity="0.8" />
                  <path d="M9 16H23" stroke="#0F766E" strokeWidth="1" strokeLinecap="round" />
                </svg>
              )}
            </>
          )}

          {/* THEME 2: ROYAL CRIMSON ROSE & GOLD */}
          {theme === 'crimson-gold' && (
            <>
              {p.kindIndex === 0 && (
                /* Kelopak Mawar Merah Crimson Velvet */
                <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-xs">
                  <path
                    d="M16 3C9 3 5 9 6 17C7 24 12 29 16 30C20 29 25 24 26 17C27 9 23 3 16 3Z"
                    fill="#BE123C"
                    stroke="#881337"
                    strokeWidth="0.9"
                    fillOpacity="0.95"
                  />
                  <path d="M16 8C13 13 13 21 16 27" stroke="#FDA4AF" strokeWidth="1" fill="none" strokeLinecap="round" />
                </svg>
              )}

              {p.kindIndex === 1 && (
                /* Serpihan Emas 24k Foil Shimmer */
                <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-xs">
                  <polygon
                    points="16,3 20,12 29,16 20,20 16,29 12,20 3,16 12,12"
                    fill="#FBBF24"
                    stroke="#D97706"
                    strokeWidth="0.9"
                  />
                  <circle cx="16" cy="16" r="3" fill="#FFFBEB" />
                </svg>
              )}

              {p.kindIndex === 2 && (
                /* Kelopak Mawar Burgundy */
                <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-xs">
                  <path
                    d="M8 8C14 4 22 6 25 13C27 18 24 25 18 27C11 28 6 22 5 16C5 12 6 10 8 8Z"
                    fill="#9F1239"
                    stroke="#4C0519"
                    strokeWidth="0.8"
                    fillOpacity="0.9"
                  />
                </svg>
              )}

              {p.kindIndex === 3 && (
                /* Golden Heart Foil */
                <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-xs">
                  <path
                    d="M16 28C16 28 5 20 5 12C5 8 8 5 12 5C14.5 5 16 7 16 7C16 7 17.5 5 20 5C24 5 27 8 27 12C27 20 16 28 16 28Z"
                    fill="#F59E0B"
                    stroke="#B45309"
                    strokeWidth="0.8"
                    fillOpacity="0.9"
                  />
                </svg>
              )}
            </>
          )}

          {/* THEME 3: LAVENDER LILAC BLOSSOM */}
          {theme === 'lavender-lilac' && (
            <>
              {p.kindIndex === 0 && (
                /* Sprig Bunga Lavender Ungu */
                <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-xs">
                  <path d="M16 28V6" stroke="#4C1D95" strokeWidth="1" strokeLinecap="round" />
                  <ellipse cx="14" cy="9" rx="3.5" ry="2.2" fill="#8B5CF6" />
                  <ellipse cx="18" cy="11" rx="3.5" ry="2.2" fill="#7C3AED" />
                  <ellipse cx="14" cy="15" rx="3.5" ry="2.2" fill="#A78BFA" />
                  <ellipse cx="18" cy="17" rx="3.5" ry="2.2" fill="#8B5CF6" />
                  <ellipse cx="16" cy="6" rx="2.5" ry="2.5" fill="#C4B5FD" />
                </svg>
              )}

              {p.kindIndex === 1 && (
                /* Kelopak Lilac Lembut */
                <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-xs">
                  <path
                    d="M16 4C10 4 6 10 7 17C8 23 13 28 16 29C19 28 24 23 25 17C26 10 22 4 16 4Z"
                    fill="#C084FC"
                    stroke="#7E22CE"
                    strokeWidth="0.8"
                    fillOpacity="0.88"
                  />
                  <path d="M16 9V24" stroke="#E9D5FF" strokeWidth="0.8" strokeLinecap="round" />
                </svg>
              )}

              {p.kindIndex === 2 && (
                /* Bunga Violet 4-Petal */
                <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-xs">
                  <g fill="#A855F7" stroke="#6B21A8" strokeWidth="0.7">
                    <circle cx="16" cy="9" r="4.5" />
                    <circle cx="23" cy="16" r="4.5" />
                    <circle cx="16" cy="23" r="4.5" />
                    <circle cx="9" cy="16" r="4.5" />
                  </g>
                  <circle cx="16" cy="16" r="2.8" fill="#FDE047" />
                </svg>
              )}

              {p.kindIndex === 3 && (
                /* Kristal Shimmer Perak Lilac */
                <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-xs">
                  <polygon
                    points="16,4 19,13 28,16 19,19 16,28 13,19 4,16 13,13"
                    fill="#E9D5FF"
                    stroke="#9333EA"
                    strokeWidth="0.8"
                  />
                  <circle cx="16" cy="16" r="2.2" fill="#FFFFFF" />
                </svg>
              )}
            </>
          )}

          {/* THEME 4: GOLDEN SUNFLOWER & ASTER */}
          {theme === 'golden-sunflower' && (
            <>
              {p.kindIndex === 0 && (
                /* Bunga Matahari Mini / Sunflower */
                <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-xs">
                  <g fill="#FBBF24" stroke="#D97706" strokeWidth="0.7">
                    <ellipse cx="16" cy="6" rx="3.2" ry="6" />
                    <ellipse cx="16" cy="6" rx="3.2" ry="6" transform="rotate(45 16 16)" />
                    <ellipse cx="16" cy="6" rx="3.2" ry="6" transform="rotate(90 16 16)" />
                    <ellipse cx="16" cy="6" rx="3.2" ry="6" transform="rotate(135 16 16)" />
                    <ellipse cx="16" cy="6" rx="3.2" ry="6" transform="rotate(180 16 16)" />
                    <ellipse cx="16" cy="6" rx="3.2" ry="6" transform="rotate(225 16 16)" />
                    <ellipse cx="16" cy="6" rx="3.2" ry="6" transform="rotate(270 16 16)" />
                    <ellipse cx="16" cy="6" rx="3.2" ry="6" transform="rotate(315 16 16)" />
                  </g>
                  <circle cx="16" cy="16" r="5" fill="#78350F" />
                  <circle cx="16" cy="16" r="2.5" fill="#451A03" />
                </svg>
              )}

              {p.kindIndex === 1 && (
                /* Kelopak Bunga Matahari Amber */
                <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-xs">
                  <path
                    d="M16 2C10 2 6 9 7 17C8 24 13 29 16 30C19 29 24 24 25 17C26 9 22 2 16 2Z"
                    fill="#F59E0B"
                    stroke="#B45309"
                    strokeWidth="0.8"
                    fillOpacity="0.9"
                  />
                  <path d="M16 6V26" stroke="#FEF3C7" strokeWidth="0.9" strokeLinecap="round" />
                </svg>
              )}

              {p.kindIndex === 2 && (
                /* Aster Emas / Golden Aster */
                <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-xs">
                  <g fill="#FDE68A" stroke="#CA8A04" strokeWidth="0.7">
                    <ellipse cx="16" cy="6.5" rx="3" ry="5.8" />
                    <ellipse cx="16" cy="6.5" rx="3" ry="5.8" transform="rotate(60 16 16)" />
                    <ellipse cx="16" cy="6.5" rx="3" ry="5.8" transform="rotate(120 16 16)" />
                    <ellipse cx="16" cy="6.5" rx="3" ry="5.8" transform="rotate(180 16 16)" />
                    <ellipse cx="16" cy="6.5" rx="3" ry="5.8" transform="rotate(240 16 16)" />
                    <ellipse cx="16" cy="6.5" rx="3" ry="5.8" transform="rotate(300 16 16)" />
                  </g>
                  <circle cx="16" cy="16" r="3.8" fill="#B45309" />
                </svg>
              )}

              {p.kindIndex === 3 && (
                /* Kilau Amber Sparkle */
                <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-xs">
                  <polygon
                    points="16,3 19.5,12.5 29,16 19.5,19.5 16,29 12.5,19.5 3,16 12.5,12.5"
                    fill="#FBBF24"
                    stroke="#D97706"
                    strokeWidth="0.8"
                  />
                  <circle cx="16" cy="16" r="2.8" fill="#FFFBEB" />
                </svg>
              )}
            </>
          )}

          {/* THEME 5: SAKURA CHERRY BLOSSOM */}
          {theme === 'sakura-pastel' && (
            <>
              {p.kindIndex === 0 && (
                /* Kelopak Sakura Berlekuk / Notched Petal */
                <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-xs">
                  <path
                    d="M16 4C13 4 8 8 7 15C6 22 12 28 16 29C20 28 26 22 25 15C24 8 19 4 16 4ZM16 4C15 5.5 16 7 16 7C16 7 17 5.5 16 4Z"
                    fill="#FBCFE8"
                    stroke="#DB2777"
                    strokeWidth="0.8"
                    fillOpacity="0.9"
                  />
                  <path d="M16 9V24" stroke="#F472B6" strokeWidth="0.8" strokeLinecap="round" />
                </svg>
              )}

              {p.kindIndex === 1 && (
                /* Bunga Sakura 5 Kelopak / Sakura Blossom */
                <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-xs">
                  <g fill="#FCE7F3" stroke="#EC4899" strokeWidth="0.8">
                    <ellipse cx="16" cy="7" rx="4.5" ry="6.5" />
                    <ellipse cx="16" cy="7" rx="4.5" ry="6.5" transform="rotate(72 16 16)" />
                    <ellipse cx="16" cy="7" rx="4.5" ry="6.5" transform="rotate(144 16 16)" />
                    <ellipse cx="16" cy="7" rx="4.5" ry="6.5" transform="rotate(216 16 16)" />
                    <ellipse cx="16" cy="7" rx="4.5" ry="6.5" transform="rotate(288 16 16)" />
                  </g>
                  <circle cx="16" cy="16" r="3.2" fill="#BE185D" />
                  <circle cx="16" cy="16" r="1.4" fill="#FDF2F8" />
                </svg>
              )}

              {p.kindIndex === 2 && (
                /* Peach Blossom Floret */
                <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-xs">
                  <path
                    d="M16 4C10 4 6 10 7 17C8 23 13 28 16 29C19 28 24 23 25 17C26 10 22 4 16 4Z"
                    fill="#FED7AA"
                    stroke="#EA580C"
                    strokeWidth="0.8"
                    fillOpacity="0.88"
                  />
                  <circle cx="16" cy="16" r="4.2" fill="#F43F5E" />
                </svg>
              )}

              {p.kindIndex === 3 && (
                /* Shimmer Bintang Pink Pastel */
                <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-xs">
                  <polygon
                    points="16,3 19,12 28,16 19,20 16,29 13,20 4,16 13,12"
                    fill="#FDF2F8"
                    stroke="#F472B6"
                    strokeWidth="0.8"
                  />
                  <circle cx="16" cy="16" r="2" fill="#BE185D" />
                </svg>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};
