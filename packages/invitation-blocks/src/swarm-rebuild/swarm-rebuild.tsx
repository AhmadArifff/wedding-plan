'use client';

import * as React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  FastForward,
  CheckCircle,
  Flower2,
  Sparkles,
} from 'lucide-react';
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
    name: 'Arif (Mempelai Pria)',
    role: 'Header & Jadwal',
    color: '#0F766E',
    badgeBg: 'bg-teal-700',
    accentRing: 'border-teal-500',
  },
  {
    id: 'windi',
    name: 'Windi (Mempelai Wanita)',
    role: 'Foto & Tipografi',
    color: '#D97706',
    badgeBg: 'bg-amber-600',
    accentRing: 'border-amber-500',
  },
  {
    id: 'rian',
    name: 'Rian (Layout Specialist)',
    role: 'Frame & Grid Kartu',
    color: '#4F46E5',
    badgeBg: 'bg-indigo-600',
    accentRing: 'border-indigo-500',
  },
  {
    id: 'siti',
    name: 'Siti (Visual & Badges)',
    role: 'Ikon & Ornamen Kasih',
    color: '#E11D48',
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
  const [isPlaying, setIsPlaying] = React.useState<boolean>(true);
  const [userSpeedMultiplier, setUserSpeedMultiplier] = React.useState<number>(1);
  const [scrollBoost, setScrollBoost] = React.useState<number>(1);
  const [showFloralConfetti, setShowFloralConfetti] = React.useState<boolean>(false);

  // Dynamic animation progress inside current wave
  const [dragProgress, setDragProgress] = React.useState<number>(0);
  const [typingProgress, setTypingProgress] = React.useState<number>(0);
  const [typedTexts, setTypedTexts] = React.useState<Record<string, string>>({});

  // 4 Collaborative cursors live position & actions
  const [cursorStates, setCursorStates] = React.useState<Record<string, SwarmCursorLiveState>>({
    arif: { x: 30, y: 15, isClicking: false, isStill: false, isDragging: false, action: 'Siap', visible: true },
    windi: { x: 120, y: 15, isClicking: false, isStill: false, isDragging: false, action: 'Siap', visible: true },
    rian: { x: 210, y: 15, isClicking: false, isStill: false, isDragging: false, action: 'Siap', visible: true },
    siti: { x: 300, y: 15, isClicking: false, isStill: false, isDragging: false, action: 'Siap', visible: true },
  });

  // Step 1: DOM Auto-Scanner (Reverse Engineering Anything)
  // Mask initial elements smoothly to avoid duplicate/ghosting noise
  React.useEffect(() => {
    if (!enabled || !targetRef.current) return;

    const timer = setTimeout(() => {
      if (!targetRef.current) return;
      const scannedNodes = scanDOMForRebuild(targetRef.current);
      if (scannedNodes.length > 0) {
        // Mask all scanned nodes initially so there is NO double-text or noisy outlines
        scannedNodes.forEach((node) => {
          if (node.domElement) {
            node.domElement.style.transition = 'opacity 0.28s ease-out, transform 0.28s ease-out';
            node.domElement.style.opacity = '0';
            node.domElement.style.transform = 'scale(0.96)';
          }
        });

        const scheduledWaves = scheduleSwarmWaves(scannedNodes, collaborators);
        setWaves(scheduledWaves);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [enabled, targetRef, collaborators]);

  // Step 2: Scroll-Chasing Acceleration
  // As user scrolls, the cursor swarm accelerates dynamically so it never lags behind
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

      if (scrollLag > 480) {
        // User scrolled far ahead: Super Boost 3.5x to catch up immediately!
        setScrollBoost(3.5);
      } else if (scrollLag > 220) {
        // User scrolled ahead: Boost 2x
        setScrollBoost(2.0);
      } else {
        // Normal pace
        setScrollBoost(1.0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [enabled, isFinished, waves, waveIndex, targetRef]);

  const activeWave = waves[waveIndex] || null;

  // Auto-scroll target into viewport smoothly (gentle nudge)
  const scrollToActiveWave = React.useCallback(
    (wave: SwarmWave) => {
      if (!targetRef.current || wave.assignments.length === 0) return;
      const firstNode = wave.assignments[0].node;
      const containerRect = targetRef.current.getBoundingClientRect();
      const targetAbsoluteY = window.scrollY + containerRect.top + firstNode.rect.y;

      // Only auto-scroll if user has not manually scrolled far ahead
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

  // Main 4-Cursor Parallel Wave Runner (3x Baseline Speed)
  React.useEffect(() => {
    if (!enabled || isFinished || !isPlaying || waves.length === 0) return;

    if (waveIndex >= waves.length) {
      setIsFinished(true);
      setSubPhase('celebrating');
      setShowFloralConfetti(true);

      // Unmask all remaining DOM elements to ensure 100% complete page view
      waves.forEach((w) => {
        w.assignments.forEach((asg) => {
          if (asg.node.domElement) {
            asg.node.domElement.style.opacity = '1';
            asg.node.domElement.style.transform = 'scale(1)';
          }
        });
      });

      onComplete?.();
      return;
    }

    const currentWave = waves[waveIndex];
    scrollToActiveWave(currentWave);

    let timer: ReturnType<typeof setTimeout>;
    let dragInterval: ReturnType<typeof setInterval>;
    let typeInterval: ReturnType<typeof setInterval>;

    const assignments = currentWave.assignments;
    // Base 3x speed * scrollBoost * user multiplier
    const speedFactor = 3 * userSpeedMultiplier * scrollBoost;
    const baseDuration = Math.max(260, currentWave.durationMs / speedFactor);

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
          action: `${asg.node.type} (${asg.node.rect.w}x${asg.node.rect.h})`,
          visible: true,
        };
      });
      return next;
    });

    const travelMs = 180 / (userSpeedMultiplier * scrollBoost);
    timer = setTimeout(() => {
      // Phase 2: DRAGGING (All 4 cursors drag diagonally in lockstep)
      setSubPhase('dragging');
      const dragDuration = 280 / (userSpeedMultiplier * scrollBoost);
      const tickMs = 32;
      const totalTicks = Math.max(1, Math.floor(dragDuration / tickMs));
      let tick = 0;

      dragInterval = setInterval(() => {
        tick += 1;
        const p = Math.min(1, tick / totalTicks);
        setDragProgress(p);

        setCursorStates((prev) => {
          const next = { ...prev };
          assignments.forEach((asg) => {
            const collab = collaborators.find((c) => c.id === asg.collaboratorId);
            const prefix = collab ? collab.name.split(' ')[0] : asg.collaboratorId;
            next[asg.collaboratorId] = {
              x: asg.node.rect.x + asg.node.rect.w * p,
              y: asg.node.rect.y + asg.node.rect.h * p,
              isClicking: true,
              isStill: false,
              isDragging: true,
              action: `${prefix}: ${Math.round(asg.node.rect.w * p)}x${Math.round(asg.node.rect.h * p)}px`,
              visible: true,
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
              action: `✓ ${asg.actionSettleLabel}`,
              visible: true,
            };
          });
          return next;
        });

        const settleMs = 180 / (userSpeedMultiplier * scrollBoost);
        timer = setTimeout(() => {
          // Phase 4: CLICKING (Click inside to enter edit mode)
          setSubPhase('clicking');
          setCursorStates((prev) => {
            const next = { ...prev };
            assignments.forEach((asg) => {
              next[asg.collaboratorId] = {
                x: asg.node.rect.x + Math.min(36, asg.node.rect.w * 0.25),
                y: asg.node.rect.y + asg.node.rect.h * 0.5,
                isClicking: true,
                isStill: false,
                isDragging: false,
                action: asg.actionClickLabel,
                visible: true,
              };
            });
            return next;
          });

          const clickMs = 140 / (userSpeedMultiplier * scrollBoost);
          timer = setTimeout(() => {
            // Phase 5: TYPING (Cursors park still while text types swiftly)
            setSubPhase('typing');
            const typeTickMs = 36;
            const totalTypeTicks = Math.max(1, Math.floor(baseDuration / typeTickMs));
            let currentTypeTick = 0;

            setCursorStates((prev) => {
              const next = { ...prev };
              assignments.forEach((asg) => {
                next[asg.collaboratorId] = {
                  x: asg.node.rect.x + asg.node.rect.w - 6,
                  y: asg.node.rect.y + asg.node.rect.h * 0.5,
                  isClicking: false,
                  isStill: true,
                  isDragging: false,
                  action: asg.actionTypeLabel,
                  visible: true,
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

              // Phase 6: INSPECTING (Fast verification pause)
              setSubPhase('inspecting');
              setCursorStates((prev) => {
                const next = { ...prev };
                assignments.forEach((asg) => {
                  next[asg.collaboratorId] = {
                    x: asg.node.rect.x + asg.node.rect.w - 4,
                    y: asg.node.rect.y + asg.node.rect.h * 0.5,
                    isClicking: false,
                    isStill: true,
                    isDragging: false,
                    action: `✓ ${asg.actionInspectLabel}`,
                    visible: true,
                  };
                });
                return next;
              });

              const inspectMs = 200 / (userSpeedMultiplier * scrollBoost);
              timer = setTimeout(() => {
                // Phase 7: DESELECTING
                // REVEAL THE ACTUAL REAL DOM ELEMENT SMOOTHLY! (ZERO GHOSTING / ZERO NOISE!)
                setSubPhase('deselecting');
                assignments.forEach((asg) => {
                  if (asg.node.domElement) {
                    asg.node.domElement.style.opacity = '1';
                    asg.node.domElement.style.transform = 'scale(1)';
                  }
                });

                setCursorStates((prev) => {
                  const next = { ...prev };
                  assignments.forEach((asg, idx) => {
                    next[asg.collaboratorId] = {
                      x: idx % 2 === 0 ? asg.node.rect.x + asg.node.rect.w + 14 : asg.node.rect.x - 14,
                      y: asg.node.rect.y + asg.node.rect.h + 8,
                      isClicking: true,
                      isStill: false,
                      isDragging: false,
                      action: 'Kunci Elemen',
                      visible: true,
                    };
                  });
                  return next;
                });

                const deselectMs = 120 / (userSpeedMultiplier * scrollBoost);
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
    isPlaying,
    waves,
    waveIndex,
    userSpeedMultiplier,
    scrollBoost,
    collaborators,
    scrollToActiveWave,
    onComplete,
  ]);

  const handleSkipToGoLive = () => {
    setIsFinished(true);
    setSubPhase('celebrating');
    setShowFloralConfetti(true);

    // Immediately unmask all DOM elements
    waves.forEach((w) => {
      w.assignments.forEach((asg) => {
        if (asg.node.domElement) {
          asg.node.domElement.style.opacity = '1';
          asg.node.domElement.style.transform = 'scale(1)';
        }
      });
    });

    onComplete?.();
  };

  const handleReplay = () => {
    // Re-mask elements for replay
    waves.forEach((w) => {
      w.assignments.forEach((asg) => {
        if (asg.node.domElement) {
          asg.node.domElement.style.opacity = '0';
          asg.node.domElement.style.transform = 'scale(0.96)';
        }
      });
    });

    setWaveIndex(0);
    setIsFinished(false);
    setIsPlaying(true);
    setShowFloralConfetti(false);
  };

  if (!enabled) return null;

  const totalWaves = waves.length;
  const progressPercent =
    totalWaves > 0 ? Math.round(((waveIndex + (isFinished ? 1 : 0)) / totalWaves) * 100) : 0;

  return (
    <>
      <FloralConfettiShower active={showFloralConfetti} />

      {/* Top Application Bar (Swarm Rebuild Controller) */}
      <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-[#161616]/95 backdrop-blur-md text-white border border-stone-800 rounded-2xl px-3 py-1.5 shadow-2xl flex items-center gap-2 sm:gap-3 text-xs select-none">
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-teal-400 font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-300" />
          <span>Swarm Rebuild · 4 Cursors</span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 bg-stone-900 px-2 py-0.5 rounded-lg border border-stone-800 text-[10px] font-mono">
          <span className="text-stone-400">Tahap:</span>
          <span className="text-teal-300 font-bold">
            {Math.min(waveIndex + 1, totalWaves || 1)}/{totalWaves || 1}
          </span>
          <span className="text-stone-500">({progressPercent}%)</span>
        </div>

        {scrollBoost > 1.2 && !isFinished && (
          <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.2 rounded-full text-[9px] font-mono font-semibold animate-pulse">
            Scroll Chasing {scrollBoost.toFixed(1)}x
          </span>
        )}

        <div className="flex items-center gap-1">
          {/* Speed Toggle */}
          <button
            type="button"
            onClick={() =>
              setUserSpeedMultiplier((prev) => (prev === 1 ? 1.5 : prev === 1.5 ? 2 : 1))
            }
            className="px-2 py-0.5 rounded-md bg-stone-800 hover:bg-stone-700 text-[10px] font-mono text-stone-300 transition-colors cursor-pointer"
            title="Kecepatan Manual"
          >
            {userSpeedMultiplier}x
          </button>

          {/* Play/Pause */}
          {!isFinished && (
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors cursor-pointer"
              title={isPlaying ? 'Jeda' : 'Lanjutkan'}
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Play className="w-3.5 h-3.5 text-emerald-400" />
              )}
            </button>
          )}

          {/* Replay */}
          <button
            type="button"
            onClick={handleReplay}
            className="p-1 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors cursor-pointer"
            title="Putar Ulang dari Awal"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Go Live / Skip */}
          <button
            type="button"
            onClick={handleSkipToGoLive}
            className={`px-2.5 py-1 rounded-xl text-[10px] font-semibold flex items-center gap-1 shadow-xs transition-all active:scale-95 cursor-pointer ${
              isFinished
                ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                : 'bg-teal-700 text-white hover:bg-teal-600'
            }`}
          >
            {isFinished ? (
              <>
                <CheckCircle className="w-3 h-3" />
                <span>Go Live</span>
              </>
            ) : (
              <>
                <span>Lewati</span>
                <FastForward className="w-3 h-3 text-teal-300" />
              </>
            )}
          </button>

          {isFinished && (
            <button
              type="button"
              onClick={() => {
                setShowFloralConfetti(false);
                setTimeout(() => setShowFloralConfetti(true), 60);
              }}
              className="px-2 py-1 rounded-xl bg-pink-900/60 hover:bg-pink-900/80 text-pink-200 border border-pink-500/40 text-[10px] font-semibold flex items-center gap-1 transition-all cursor-pointer"
              title="Tabur Ulang Bunga Perayaan"
            >
              <Flower2 className="w-3 h-3 text-pink-300" />
              <span className="hidden sm:inline">Bunga</span>
            </button>
          )}
        </div>
      </div>

      {/* Clean Overlay Canvas: NO DUPLICATE REPLICA BOXES, NO GHOSTING TEXT! */}
      {!isFinished && (
        <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
          {/* Center Vertical Smart Guide Magenta Line */}
          {activeWave?.assignments.some((a) => a.node.isCenterAligned) &&
            subPhase === 'inspecting' && (
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-pink-500 z-40 pointer-events-none opacity-90 animate-in fade-in">
                <span className="absolute top-16 left-2 text-[8px] font-mono font-bold bg-pink-600 text-white px-1.5 py-0.5 rounded-xs shadow-xs">
                  Smart Snap X: Center
                </span>
              </div>
            )}

          {/* Dynamic Dragging Rectangles (Dashed lines expand in lockstep with 4 Cursors) */}
          {subPhase === 'dragging' &&
            activeWave?.assignments.map((asg) => {
              const collab = collaborators.find((c) => c.id === asg.collaboratorId);
              const color = collab?.color || '#0F766E';
              const name = collab?.name.split(' ')[0] || asg.collaboratorId;

              return (
                <div
                  key={`drag-${asg.node.id}`}
                  className="absolute border-2 border-dashed pointer-events-none z-30 rounded-xl"
                  style={{
                    borderColor: color,
                    backgroundColor: `${color}15`,
                    left: `${asg.node.rect.x}px`,
                    top: `${asg.node.rect.y}px`,
                    width: `${Math.max(12, asg.node.rect.w * dragProgress)}px`,
                    height: `${Math.max(12, asg.node.rect.h * dragProgress)}px`,
                  }}
                >
                  <div
                    className="absolute -bottom-5 right-0 text-white text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-xs shadow-xs whitespace-nowrap"
                    style={{ backgroundColor: color }}
                  >
                    {name}: {Math.round(asg.node.rect.w * dragProgress)} x{' '}
                    {Math.round(asg.node.rect.h * dragProgress)}px
                  </div>
                </div>
              );
            })}

          {/* Active Selection Bounding Boxes with Labels & Validation (Only for active 4 nodes) */}
          {['settling', 'clicking', 'typing', 'inspecting'].includes(subPhase) &&
            activeWave?.assignments.map((asg) => {
              const collab = collaborators.find((c) => c.id === asg.collaboratorId);
              const color = collab?.color || '#0F766E';
              const isInspecting = subPhase === 'inspecting';
              const isSettling = subPhase === 'settling';

              return (
                <div
                  key={`box-${asg.node.id}`}
                  className={`absolute border-2 pointer-events-none z-30 rounded-xl transition-all duration-150 ${
                    isInspecting
                      ? 'border-emerald-500 bg-emerald-500/5 shadow-[0_0_0_3px_rgba(16,185,129,0.2)]'
                      : ''
                  }`}
                  style={{
                    borderColor: isInspecting ? '#10B981' : color,
                    left: `${asg.node.rect.x - 2}px`,
                    top: `${asg.node.rect.y - 2}px`,
                    width: `${asg.node.rect.w + 4}px`,
                    height: `${asg.node.rect.h + 4}px`,
                  }}
                >
                  {/* Collaborator Badge */}
                  <div
                    className="absolute -top-4 left-1 text-[8px] font-bold text-white px-1.5 py-0.5 rounded-xs font-mono shadow-xs flex items-center gap-1 whitespace-nowrap"
                    style={{ backgroundColor: isInspecting ? '#059669' : color }}
                  >
                    <span>{collab?.name || asg.collaboratorId}</span>
                    {subPhase === 'typing' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    )}
                  </div>

                  {/* Settle Badge */}
                  {isSettling && (
                    <div className="absolute -top-4 right-1 bg-sky-700 text-white text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-xs shadow-xs whitespace-nowrap animate-in zoom-in-95">
                      <span>✓ Posisi Valid</span>
                    </div>
                  )}

                  {/* Inspect Badge */}
                  {isInspecting && (
                    <div className="absolute -top-4 right-1 bg-emerald-600 text-white text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-xs shadow-xs whitespace-nowrap animate-in zoom-in-95">
                      <span>✓ Tervalidasi</span>
                    </div>
                  )}

                  {/* Typing Caret Feedback (Rendered cleanly inside the active bounding box) */}
                  {subPhase === 'typing' && asg.node.text && (
                    <div className="w-full h-full p-2 flex items-center justify-center text-stone-800 text-xs text-center font-mono select-none">
                      <span>{typedTexts[asg.node.id] || ''}</span>
                      <span
                        className="inline-block w-1.5 h-3.5 ml-0.5 animate-pulse"
                        style={{ backgroundColor: color }}
                      />
                    </div>
                  )}

                  {/* 4 Corner Knobs */}
                  <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-stone-800" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-stone-800" />
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-stone-800" />
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-stone-800" />
                </div>
              );
            })}

          {/* 4 Multiplayer Presence Cursors (Simultaneous Workers) */}
          {collaborators.map((c) => {
            const state = cursorStates[c.id];
            if (!state || !state.visible) return null;

            return (
              <div
                key={`cursor-${c.id}`}
                className={`absolute z-40 pointer-events-none flex flex-col items-start ${
                  state.isStill || state.isDragging
                    ? 'transition-none'
                    : 'transition-all duration-300 ease-out'
                }`}
                style={{
                  left: `${state.x}px`,
                  top: `${state.y}px`,
                }}
              >
                {state.isClicking && (
                  <div
                    className="absolute -top-2 -left-2 w-7 h-7 rounded-full border-2 animate-ping pointer-events-none"
                    style={{ borderColor: c.color, backgroundColor: `${c.color}25` }}
                  />
                )}

                <svg
                  className="w-5 h-5 drop-shadow-md"
                  viewBox="0 0 24 24"
                  fill={c.color}
                  stroke="white"
                  strokeWidth="1.5"
                >
                  <path d="M5.5 3.5l14 7-6.5 2-2 6.5-5.5-15.5z" />
                </svg>

                <div
                  className={`text-[9px] font-bold text-white px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap ml-3 -mt-1 flex items-center gap-1 ${c.badgeBg}`}
                >
                  <span>{c.name}</span>
                  {state.isStill && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  )}
                </div>

                <div className="bg-[#1A1A1A]/95 text-stone-100 text-[8.5px] px-2 py-0.5 rounded-md shadow-md mt-0.5 ml-3 font-mono border border-stone-700 whitespace-nowrap">
                  <span>{state.action}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
