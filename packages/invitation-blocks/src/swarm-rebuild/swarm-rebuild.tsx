'use client';

import * as React from 'react';
import type {
  SwarmCollaborator,
  SwarmWave,
  SwarmSubPhase,
  SwarmCursorLiveState,
} from './types';
import { scanDOMForRebuild } from './dom-scanner';
import { scheduleSwarmWaves } from './swarm-scheduler';
import { FloralConfettiShower } from './floral-confetti';

export const DEFAULT_COLLABORATORS_4: SwarmCollaborator[] = [
  {
    id: 'arif',
    name: 'Arif',
    role: 'Header & Jadwal',
    color: '#0F766E', // Teal
    badgeBg: 'bg-teal-700',
    accentRing: 'border-teal-500',
  },
  {
    id: 'windi',
    name: 'Windi',
    role: 'Foto & Tipografi',
    color: '#D97706', // Amber
    badgeBg: 'bg-amber-600',
    accentRing: 'border-amber-500',
  },
  {
    id: 'rian',
    name: 'Rian',
    role: 'Frame & Grid Kartu',
    color: '#4F46E5', // Indigo
    badgeBg: 'bg-indigo-600',
    accentRing: 'border-indigo-500',
  },
  {
    id: 'siti',
    name: 'Siti',
    role: 'Ikon & Ornamen',
    color: '#E11D48', // Rose
    badgeBg: 'bg-rose-600',
    accentRing: 'border-rose-500',
  },
];

export interface SwarmRebuildProps {
  targetRef: React.RefObject<HTMLElement | null>;
  collaborators?: SwarmCollaborator[];
  enabled?: boolean;
  onComplete?: () => void;
}

export const SwarmRebuild: React.FC<SwarmRebuildProps> = ({
  targetRef,
  collaborators = DEFAULT_COLLABORATORS_4,
  enabled = true,
  onComplete,
}) => {
  const [waves, setWaves] = React.useState<SwarmWave[]>([]);
  const [waveIndex, setWaveIndex] = React.useState<number>(0);
  const [subPhase, setSubPhase] = React.useState<SwarmSubPhase>('idle');
  const [isFinished, setIsFinished] = React.useState<boolean>(false);
  const [isScattering, setIsScattering] = React.useState<boolean>(false);
  const [scrollBoost, setScrollBoost] = React.useState<number>(1);
  const [showFloralConfetti, setShowFloralConfetti] = React.useState<boolean>(false);

  // Dynamic animation progress inside current wave
  const [dragProgress, setDragProgress] = React.useState<number>(0);
  const [, setTypingProgress] = React.useState<number>(0);
  const [, setTypedTexts] = React.useState<Record<string, string>>({});

  // 4 Collaborative cursors live position (Clean, no name badges, no action text)
  const [cursorStates, setCursorStates] = React.useState<Record<string, SwarmCursorLiveState>>({
    arif: { x: 30, y: 15, isClicking: false, isStill: false, isDragging: false, action: '', visible: true, opacity: 1, scale: 1 },
    windi: { x: 120, y: 15, isClicking: false, isStill: false, isDragging: false, action: '', visible: true, opacity: 1, scale: 1 },
    rian: { x: 210, y: 15, isClicking: false, isStill: false, isDragging: false, action: '', visible: true, opacity: 1, scale: 1 },
    siti: { x: 300, y: 15, isClicking: false, isStill: false, isDragging: false, action: '', visible: true, opacity: 1, scale: 1 },
  });

  // Step 1: Immediate DOM Auto-Scanner (Zero-flash mounting)
  React.useEffect(() => {
    if (!enabled || !targetRef.current) return;

    // Scan immediately without artificial delay
    const scannedNodes = scanDOMForRebuild(targetRef.current);
    if (scannedNodes.length > 0) {
      const scheduledWaves = scheduleSwarmWaves(scannedNodes, collaborators);
      setWaves(scheduledWaves);
    }
  }, [enabled, targetRef, collaborators]);

  // Step 2: Dynamic Scroll Acceleration
  // As user scrolls ahead, the cursor swarm accelerates dynamically so it never lags behind
  React.useEffect(() => {
    if (!enabled || isFinished || waves.length === 0) return;

    const handleScroll = () => {
      if (!targetRef.current) return;
      const containerRect = targetRef.current.getBoundingClientRect();
      const currentWave = waves[waveIndex];
      if (!currentWave || currentWave.assignments.length === 0) return;

      const activeY = currentWave.assignments[0].node.rect.y;
      const waveAbsoluteY = containerRect.top + activeY;
      const viewportBottom = window.innerHeight;

      // How far ahead user has scrolled past the active wave
      const scrollLag = viewportBottom - waveAbsoluteY;

      if (scrollLag > 450) {
        setScrollBoost(3.8);
      } else if (scrollLag > 200) {
        setScrollBoost(2.2);
      } else {
        setScrollBoost(1.0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [enabled, isFinished, waves, waveIndex, targetRef]);

  const activeWave = waves[waveIndex] || null;

  // Auto-scroll target into viewport smoothly
  const scrollToActiveWave = React.useCallback(
    (wave: SwarmWave) => {
      if (!targetRef.current || wave.assignments.length === 0) return;
      const firstNode = wave.assignments[0].node;
      const containerRect = targetRef.current.getBoundingClientRect();
      const targetAbsoluteY = window.scrollY + containerRect.top + firstNode.rect.y;

      const currentScroll = window.scrollY;
      const targetScroll = targetAbsoluteY - window.innerHeight * 0.42;

      if (Math.abs(currentScroll - targetScroll) < window.innerHeight * 0.9) {
        window.scrollTo({
          top: Math.max(0, targetScroll),
          behavior: 'smooth',
        });
      }
    },
    [targetRef]
  );

  // Main 4-Cursor Parallel Wave Runner (High-Speed Execution)
  React.useEffect(() => {
    if (!enabled || isFinished || waves.length === 0) return;

    // When all waves complete: SCATTER & CELEBRATE!
    if (waveIndex >= waves.length) {
      setSubPhase('scattering');
      setIsScattering(true);
      setShowFloralConfetti(true);

      // Unmask all real DOM elements permanently
      waves.forEach((w) => {
        w.assignments.forEach((asg) => {
          if (asg.node.domElement) {
            asg.node.domElement.classList.add('swarm-revealed');
            asg.node.domElement.style.opacity = '1';
            asg.node.domElement.style.transform = 'scale(1)';
          }
        });
      });

      // Scatter 4 cursors outward away from container, then completely vanish!
      const containerHeight = targetRef.current?.clientHeight || 800;
      setCursorStates({
        arif: { x: -160, y: -120, isClicking: false, isStill: false, isDragging: false, action: '', visible: true, opacity: 0, scale: 0.2 },
        windi: { x: 540, y: -120, isClicking: false, isStill: false, isDragging: false, action: '', visible: true, opacity: 0, scale: 0.2 },
        rian: { x: -160, y: containerHeight + 120, isClicking: false, isStill: false, isDragging: false, action: '', visible: true, opacity: 0, scale: 0.2 },
        siti: { x: 540, y: containerHeight + 120, isClicking: false, isStill: false, isDragging: false, action: '', visible: true, opacity: 0, scale: 0.2 },
      });

      const finishTimer = setTimeout(() => {
        setIsFinished(true);
        setCursorStates((prev) => {
          const next = { ...prev };
          Object.keys(next).forEach((k) => {
            next[k].visible = false;
          });
          return next;
        });
        onComplete?.();
      }, 720);

      return () => clearTimeout(finishTimer);
    }

    const currentWave = waves[waveIndex];
    scrollToActiveWave(currentWave);

    let timer: ReturnType<typeof setTimeout>;
    let dragInterval: ReturnType<typeof setInterval>;
    let typeInterval: ReturnType<typeof setInterval>;

    const assignments = currentWave.assignments;
    const speedFactor = 3 * scrollBoost;
    const baseDuration = Math.max(160, currentWave.durationMs / speedFactor);

    // Phase 1: TRAVELING (Move all 4 cursors to their target top-left corners)
    setSubPhase('traveling');
    setDragProgress(0);
    setTypingProgress(0);

    setCursorStates((prev) => {
      const next = { ...prev };
      assignments.forEach((asg) => {
        next[asg.collaboratorId] = {
          x: asg.node.rect.x,
          y: asg.node.rect.y,
          isClicking: false,
          isStill: false,
          isDragging: false,
          action: '',
          visible: true,
          opacity: 1,
          scale: 1,
        };
      });
      return next;
    });

    const travelMs = 120 / scrollBoost;
    timer = setTimeout(() => {
      // Phase 2: DRAGGING (All 4 cursors drag diagonally in parallel lockstep)
      setSubPhase('dragging');
      const dragDuration = 180 / scrollBoost;
      const tickMs = 24;
      const totalTicks = Math.max(1, Math.floor(dragDuration / tickMs));
      let tick = 0;

      dragInterval = setInterval(() => {
        tick += 1;
        const p = Math.min(1, tick / totalTicks);
        setDragProgress(p);

        setCursorStates((prev) => {
          const next = { ...prev };
          assignments.forEach((asg) => {
            next[asg.collaboratorId] = {
              x: asg.node.rect.x + asg.node.rect.w * p,
              y: asg.node.rect.y + asg.node.rect.h * p,
              isClicking: true,
              isStill: false,
              isDragging: true,
              action: '',
              visible: true,
              opacity: 1,
              scale: 1,
            };
          });
          return next;
        });

        if (p >= 1) clearInterval(dragInterval);
      }, tickMs);

      timer = setTimeout(() => {
        clearInterval(dragInterval);
        setDragProgress(1);

        // Phase 3: SETTLING (Mouse release, Settle Pause)
        setSubPhase('settling');
        setCursorStates((prev) => {
          const next = { ...prev };
          assignments.forEach((asg) => {
            next[asg.collaboratorId] = {
              x: asg.node.rect.x + asg.node.rect.w,
              y: asg.node.rect.y + asg.node.rect.h,
              isClicking: false,
              isStill: true,
              isDragging: false,
              action: '',
              visible: true,
              opacity: 1,
              scale: 1,
            };
          });
          return next;
        });

        const settleMs = 90 / scrollBoost;
        timer = setTimeout(() => {
          // Phase 4: CLICKING (Click inside to enter edit/render mode)
          setSubPhase('clicking');
          setCursorStates((prev) => {
            const next = { ...prev };
            assignments.forEach((asg) => {
              next[asg.collaboratorId] = {
                x: asg.node.rect.x + Math.min(28, asg.node.rect.w * 0.25),
                y: asg.node.rect.y + asg.node.rect.h * 0.5,
                isClicking: true,
                isStill: false,
                isDragging: false,
                action: '',
                visible: true,
                opacity: 1,
                scale: 1,
              };
            });
            return next;
          });

          const clickMs = 70 / scrollBoost;
          timer = setTimeout(() => {
            // Phase 5: TYPING / RENDERING
            setSubPhase('typing');
            const typeTickMs = 28;
            const totalTypeTicks = Math.max(1, Math.floor(baseDuration / typeTickMs));
            let currentTypeTick = 0;

            setCursorStates((prev) => {
              const next = { ...prev };
              assignments.forEach((asg) => {
                next[asg.collaboratorId] = {
                  x: asg.node.rect.x + asg.node.rect.w - 4,
                  y: asg.node.rect.y + asg.node.rect.h * 0.5,
                  isClicking: false,
                  isStill: true,
                  isDragging: false,
                  action: '',
                  visible: true,
                  opacity: 1,
                  scale: 1,
                };
              });
              return next;
            });

            typeInterval = setInterval(() => {
              currentTypeTick += 1;
              const p = Math.min(1, currentTypeTick / totalTypeTicks);
              setTypingProgress(p);

              const textsMap: Record<string, string> = {};
              assignments.forEach((asg) => {
                if (asg.node.text) {
                  const charCount = Math.max(1, Math.ceil(asg.node.text.length * p));
                  textsMap[asg.node.id] = asg.node.text.slice(0, charCount);
                }
              });
              setTypedTexts(textsMap);

              if (p >= 1) clearInterval(typeInterval);
            }, typeTickMs);

            timer = setTimeout(() => {
              clearInterval(typeInterval);
              setTypingProgress(1);

              // Phase 6: INSPECTING (Fast green validation pause)
              setSubPhase('inspecting');
              setCursorStates((prev) => {
                const next = { ...prev };
                assignments.forEach((asg) => {
                  next[asg.collaboratorId] = {
                    x: asg.node.rect.x + asg.node.rect.w - 2,
                    y: asg.node.rect.y + asg.node.rect.h * 0.5,
                    isClicking: false,
                    isStill: true,
                    isDragging: false,
                    action: '',
                    visible: true,
                    opacity: 1,
                    scale: 1,
                  };
                });
                return next;
              });

              const inspectMs = 110 / scrollBoost;
              timer = setTimeout(() => {
                // Phase 7: DESELECTING & REVEALING REAL DOM ELEMENT
                setSubPhase('deselecting');
                assignments.forEach((asg) => {
                  if (asg.node.domElement) {
                    asg.node.domElement.classList.add('swarm-revealed');
                    asg.node.domElement.style.opacity = '1';
                    asg.node.domElement.style.transform = 'scale(1)';
                  }
                });

                setCursorStates((prev) => {
                  const next = { ...prev };
                  assignments.forEach((asg, idx) => {
                    next[asg.collaboratorId] = {
                      x: idx % 2 === 0 ? asg.node.rect.x + asg.node.rect.w + 12 : asg.node.rect.x - 12,
                      y: asg.node.rect.y + asg.node.rect.h + 6,
                      isClicking: true,
                      isStill: false,
                      isDragging: false,
                      action: '',
                      visible: true,
                      opacity: 1,
                      scale: 1,
                    };
                  });
                  return next;
                });

                const deselectMs = 60 / scrollBoost;
                timer = setTimeout(() => {
                  setTypedTexts({});
                  setWaveIndex((prev) => prev + 1);
                }, deselectMs);
              }, inspectMs);
            }, baseDuration);
          }, clickMs);
        }, settleMs);
      }, dragDuration);
    }, travelMs);

    return () => {
      clearTimeout(timer);
      clearInterval(dragInterval);
      clearInterval(typeInterval);
    };
  }, [
    enabled,
    isFinished,
    waves,
    waveIndex,
    scrollBoost,
    collaborators,
    scrollToActiveWave,
    onComplete,
    targetRef,
  ]);

  if (!enabled || (isFinished && !showFloralConfetti)) return null;

  return (
    <>
      {/* 1. Celebratory Floral Confetti Shower */}
      <FloralConfettiShower active={showFloralConfetti} />

      {/* 2. Pristine Animation Overlay: Zero Toolbar, Zero Duplicate Noise */}
      {!isFinished && (
        <div data-swarm-overlay="true" data-swarm-ignore="true" className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
          {/* Smart Snap Center Guide Magenta Line */}
          {activeWave?.assignments.some((a) => a.node.isCenterAligned) &&
            subPhase === 'inspecting' && (
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-pink-500 z-40 pointer-events-none opacity-80" />
            )}

          {/* Clean Dashed Dragging Rectangles */}
          {subPhase === 'dragging' &&
            activeWave?.assignments.map((asg) => {
              const collab = collaborators.find((c) => c.id === asg.collaboratorId);
              const color = collab?.color || '#0F766E';

              return (
                <div
                  key={`drag-${asg.node.id}`}
                  className="absolute border-2 border-dashed pointer-events-none z-30 rounded-xl"
                  style={{
                    borderColor: color,
                    backgroundColor: `${color}15`,
                    left: `${asg.node.rect.x}px`,
                    top: `${asg.node.rect.y}px`,
                    width: `${Math.max(10, asg.node.rect.w * dragProgress)}px`,
                    height: `${Math.max(10, asg.node.rect.h * dragProgress)}px`,
                  }}
                />
              );
            })}

          {/* Clean Active Bounding Boxes (Corner Knobs, No Text Labels) */}
          {['settling', 'clicking', 'typing', 'inspecting'].includes(subPhase) &&
            activeWave?.assignments.map((asg) => {
              const collab = collaborators.find((c) => c.id === asg.collaboratorId);
              const color = collab?.color || '#0F766E';
              const isInspecting = subPhase === 'inspecting';

              return (
                <div
                  key={`box-${asg.node.id}`}
                  className={`absolute border-2 pointer-events-none z-30 rounded-xl transition-all duration-100 ${
                    isInspecting ? 'border-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.25)]' : ''
                  }`}
                  style={{
                    borderColor: isInspecting ? '#10B981' : color,
                    left: `${asg.node.rect.x - 2}px`,
                    top: `${asg.node.rect.y - 2}px`,
                    width: `${asg.node.rect.w + 4}px`,
                    height: `${asg.node.rect.h + 4}px`,
                  }}
                >
                  {/* Clean Corner Knobs */}
                  <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-stone-800" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-stone-800" />
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-stone-800" />
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-stone-800" />
                </div>
              );
            })}

          {/* 4 Multiplayer Cursors (Clean SVG Arrows with Scatter & Disappear Animation) */}
          {collaborators.map((c) => {
            const state = cursorStates[c.id];
            if (!state || !state.visible) return null;

            return (
              <div
                key={`cursor-${c.id}`}
                className={`absolute z-40 pointer-events-none flex flex-col items-start ${
                  isScattering
                    ? 'transition-all duration-700 ease-in'
                    : state.isStill || state.isDragging
                    ? 'transition-none'
                    : 'transition-all duration-150 ease-out'
                }`}
                style={{
                  left: `${state.x}px`,
                  top: `${state.y}px`,
                  opacity: state.opacity ?? 1,
                  transform: `scale(${state.scale ?? 1})`,
                }}
              >
                {state.isClicking && (
                  <div
                    className="absolute -top-2 -left-2 w-6 h-6 rounded-full border-2 animate-ping pointer-events-none"
                    style={{ borderColor: c.color, backgroundColor: `${c.color}30` }}
                  />
                )}

                {/* Clean, Crisp SVG Arrow with Shadow */}
                <svg
                  className="w-5 h-5 drop-shadow-md"
                  viewBox="0 0 24 24"
                  fill={c.color}
                  stroke="white"
                  strokeWidth="1.5"
                >
                  <path d="M5.5 3.5l14 7-6.5 2-2 6.5-5.5-15.5z" />
                </svg>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
