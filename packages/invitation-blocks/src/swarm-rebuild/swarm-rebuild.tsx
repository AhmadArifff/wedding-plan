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
  SwarmNode,
} from './types';
import { scanDOMForRebuild } from './dom-scanner';
import { scheduleSwarmWaves } from './swarm-scheduler';
import { FloralConfettiShower } from './floral-confetti';

export const DEFAULT_COLLABORATORS: SwarmCollaborator[] = [
  {
    id: 'arif',
    name: 'Arif (Mempelai Pria)',
    role: 'Header, Jadwal & Lokasi',
    color: '#0F766E',
    badgeBg: 'bg-teal-700',
    accentRing: 'border-teal-500',
  },
  {
    id: 'windi',
    name: 'Windi (Mempelai Wanita)',
    role: 'Foto, Tipografi & Amplop QRIS',
    color: '#D97706',
    badgeBg: 'bg-amber-600',
    accentRing: 'border-amber-500',
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
  collaborators = DEFAULT_COLLABORATORS,
  enabled = true,
  onComplete,
}) => {
  const [waves, setWaves] = React.useState<SwarmWave[]>([]);
  const [waveIndex, setWaveIndex] = React.useState<number>(0);
  const [subPhase, setSubPhase] = React.useState<SwarmSubPhase>('idle');
  const [isFinished, setIsFinished] = React.useState<boolean>(false);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(true);
  const [speedMultiplier, setSpeedMultiplier] = React.useState<number>(1);
  const [showFloralConfetti, setShowFloralConfetti] = React.useState<boolean>(false);

  // Completed node IDs to draw on the canvas
  const [completedNodeIds, setCompletedNodeIds] = React.useState<string[]>([]);
  const [completedNodesMap, setCompletedNodesMap] = React.useState<Record<string, SwarmNode>>({});

  // Dynamic animation progress inside current wave
  const [dragProgress, setDragProgress] = React.useState<number>(0);
  const [typingProgress, setTypingProgress] = React.useState<number>(0);
  const [typedTexts, setTypedTexts] = React.useState<Record<string, string>>({});

  // Collaborative cursors live position & actions
  const [cursorStates, setCursorStates] = React.useState<Record<string, SwarmCursorLiveState>>({
    arif: {
      x: 36,
      y: 20,
      isClicking: false,
      isStill: false,
      isDragging: false,
      action: 'Siap Menganalisis Halaman...',
      visible: true,
    },
    windi: {
      x: 240,
      y: 20,
      isClicking: false,
      isStill: false,
      isDragging: false,
      action: 'Siap Menganalisis Halaman...',
      visible: true,
    },
  });

  // Step 1: DOM Auto-Scanner (Reverse Engineering Anything)
  React.useEffect(() => {
    if (!enabled || !targetRef.current) return;

    // Small delay to let page mount and lay out its real dimensions
    const timer = setTimeout(() => {
      if (!targetRef.current) return;
      const scannedNodes = scanDOMForRebuild(targetRef.current);
      if (scannedNodes.length > 0) {
        const scheduledWaves = scheduleSwarmWaves(scannedNodes, collaborators);
        setWaves(scheduledWaves);
      }
    }, 120);

    return () => clearTimeout(timer);
  }, [enabled, targetRef, collaborators]);

  const activeWave = waves[waveIndex] || null;

  // Auto-scroll target into viewport smoothly
  const scrollToActiveWave = React.useCallback(
    (wave: SwarmWave) => {
      if (!targetRef.current || wave.assignments.length === 0) return;
      const firstNode = wave.assignments[0].node;
      const containerRect = targetRef.current.getBoundingClientRect();
      const targetAbsoluteY = window.scrollY + containerRect.top + firstNode.rect.y;

      window.scrollTo({
        top: Math.max(0, targetAbsoluteY - window.innerHeight * 0.45),
        behavior: 'smooth',
      });
    },
    [targetRef]
  );

  // Main Wave Step Runner
  React.useEffect(() => {
    if (!enabled || isFinished || !isPlaying || waves.length === 0) return;

    if (waveIndex >= waves.length) {
      setIsFinished(true);
      setSubPhase('celebrating');
      setShowFloralConfetti(true);
      onComplete?.();
      return;
    }

    const currentWave = waves[waveIndex];
    scrollToActiveWave(currentWave);

    let timer: ReturnType<typeof setTimeout>;
    let dragInterval: ReturnType<typeof setInterval>;
    let typeInterval: ReturnType<typeof setInterval>;

    const assignments = currentWave.assignments;
    const baseDuration = currentWave.durationMs / speedMultiplier;

    // Phase 1: TRAVELING (Move both cursors to their target top-left corners)
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
          action: `Menuju: ${asg.node.type} (${asg.node.rect.w}x${asg.node.rect.h})`,
          visible: true,
        };
      });
      return next;
    });

    const travelMs = 520 / speedMultiplier;
    timer = setTimeout(() => {
      // Phase 2: DRAGGING (Both cursors drag diagonally from (x, y) to (x+w, y+h))
      setSubPhase('dragging');
      const dragDuration = 860 / speedMultiplier;
      const tickMs = 38;
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
              action: `${asg.actionDragLabel} (${Math.round(asg.node.rect.w * p)}x${Math.round(
                asg.node.rect.h * p
              )}px)`,
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

        // Phase 3: SETTLING (Mouse release, Settle Pause with blue badge)
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

        const settleMs = 780 / speedMultiplier;
        timer = setTimeout(() => {
          // Phase 4: CLICKING (Click inside the newly formed box)
          setSubPhase('clicking');
          setCursorStates((prev) => {
            const next = { ...prev };
            assignments.forEach((asg) => {
              next[asg.collaboratorId] = {
                x: asg.node.rect.x + Math.min(42, asg.node.rect.w * 0.25),
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

          const clickMs = 520 / speedMultiplier;
          timer = setTimeout(() => {
            // Phase 5: TYPING (Cursors park still while text types smoothly)
            setSubPhase('typing');
            const typeTickMs = 45;
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

              // Phase 6: INSPECTING (Verification pause with emerald badge)
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

              const inspectMs = 950 / speedMultiplier;
              timer = setTimeout(() => {
                // Phase 7: DESELECTING (Click outside to lock elements cleanly)
                setSubPhase('deselecting');
                const newIds = assignments.map((a) => a.node.id);
                setCompletedNodeIds((prev) => [...prev, ...newIds]);
                setCompletedNodesMap((prev) => {
                  const next = { ...prev };
                  assignments.forEach((a) => {
                    next[a.node.id] = a.node;
                  });
                  return next;
                });

                setCursorStates((prev) => {
                  const next = { ...prev };
                  assignments.forEach((asg, idx) => {
                    next[asg.collaboratorId] = {
                      x: idx === 0 ? asg.node.rect.x + asg.node.rect.w + 16 : asg.node.rect.x - 16,
                      y: asg.node.rect.y + asg.node.rect.h + 10,
                      isClicking: true,
                      isStill: false,
                      isDragging: false,
                      action: 'Klik Luar: Kunci Elemen',
                      visible: true,
                    };
                  });
                  return next;
                });

                const deselectMs = 420 / speedMultiplier;
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
    speedMultiplier,
    scrollToActiveWave,
    onComplete,
  ]);

  const handleSkipToGoLive = () => {
    setIsFinished(true);
    setSubPhase('celebrating');
    setShowFloralConfetti(true);
    onComplete?.();
  };

  const handleReplay = () => {
    setWaveIndex(0);
    setCompletedNodeIds([]);
    setCompletedNodesMap({});
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
          <span>Swarm Rebuild · REA</span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 bg-stone-900 px-2 py-0.5 rounded-lg border border-stone-800 text-[10px] font-mono">
          <span className="text-stone-400">Tahap:</span>
          <span className="text-teal-300 font-bold">
            {Math.min(waveIndex + 1, totalWaves || 1)}/{totalWaves || 1}
          </span>
          <span className="text-stone-500">({progressPercent}%)</span>
        </div>

        <div className="flex items-center gap-1">
          {/* Speed Toggle */}
          <button
            type="button"
            onClick={() =>
              setSpeedMultiplier((prev) => (prev === 1 ? 1.5 : prev === 1.5 ? 2 : 1))
            }
            className="px-2 py-0.5 rounded-md bg-stone-800 hover:bg-stone-700 text-[10px] font-mono text-stone-300 transition-colors cursor-pointer"
            title="Ubah Kecepatan Rekonstruksi"
          >
            {speedMultiplier}x
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

      {/* Full Overlay Canvas (Placed directly on top of the target page) */}
      {!isFinished && (
        <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden bg-[#FAF8F5]/85 backdrop-blur-[1px]">
          {/* Subtle Blueprint Dot Grid */}
          <div
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#78716C 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Center Vertical Smart Guide Magenta Line */}
          {activeWave?.assignments.some((a) => a.node.isCenterAligned) &&
            subPhase === 'inspecting' && (
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-pink-500 z-40 pointer-events-none opacity-90 animate-in fade-in">
                <span className="absolute top-16 left-2 text-[8px] font-mono font-bold bg-pink-600 text-white px-1.5 py-0.5 rounded-xs shadow-xs">
                  Smart Snap X: Center
                </span>
              </div>
            )}

          {/* Render All Completed Nodes (Blueprint Skeleton Solidified) */}
          {completedNodeIds.map((id) => {
            const node = completedNodesMap[id];
            if (!node) return null;
            return (
              <div
                key={id}
                className="absolute border border-stone-300/80 bg-white/70 rounded-xl pointer-events-none overflow-hidden transition-all duration-300"
                style={{
                  left: `${node.rect.x}px`,
                  top: `${node.rect.y}px`,
                  width: `${node.rect.w}px`,
                  height: `${node.rect.h}px`,
                }}
              >
                {node.imgSrc ? (
                  <img
                    src={node.imgSrc}
                    alt=""
                    className="w-full h-full object-cover opacity-90"
                  />
                ) : node.text ? (
                  <div
                    className="w-full h-full p-2 flex items-center justify-center text-stone-800 text-xs text-center"
                    style={{
                      fontFamily: node.fontFamily || 'inherit',
                      fontSize: node.fontSize || 'inherit',
                    }}
                  >
                    {node.text}
                  </div>
                ) : null}
              </div>
            );
          })}

          {/* Dynamic Dragging Rectangles (Lockstep with Cursors) */}
          {subPhase === 'dragging' &&
            activeWave?.assignments.map((asg) => {
              const isArif = asg.collaboratorId === 'arif';
              return (
                <div
                  key={`drag-${asg.node.id}`}
                  className={`absolute border-2 border-dashed pointer-events-none z-30 rounded-xl ${
                    isArif
                      ? 'border-teal-500 bg-teal-500/10'
                      : 'border-amber-500 bg-amber-500/10'
                  }`}
                  style={{
                    left: `${asg.node.rect.x}px`,
                    top: `${asg.node.rect.y}px`,
                    width: `${Math.max(12, asg.node.rect.w * dragProgress)}px`,
                    height: `${Math.max(12, asg.node.rect.h * dragProgress)}px`,
                  }}
                >
                  <div
                    className={`absolute -bottom-5 right-0 text-white text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-xs shadow-xs whitespace-nowrap ${
                      isArif ? 'bg-teal-700' : 'bg-amber-600'
                    }`}
                  >
                    {isArif ? 'Arif' : 'Windi'}: {Math.round(asg.node.rect.w * dragProgress)} x{' '}
                    {Math.round(asg.node.rect.h * dragProgress)}px
                  </div>
                </div>
              );
            })}

          {/* Selection Bounding Boxes with Badges during Settling, Clicking, Typing, Inspecting */}
          {['settling', 'clicking', 'typing', 'inspecting'].includes(subPhase) &&
            activeWave?.assignments.map((asg) => {
              const isArif = asg.collaboratorId === 'arif';
              const isInspecting = subPhase === 'inspecting';
              const isSettling = subPhase === 'settling';

              return (
                <div
                  key={`box-${asg.node.id}`}
                  className={`absolute border-2 pointer-events-none z-30 rounded-xl transition-all duration-200 ${
                    isInspecting
                      ? 'border-emerald-500 bg-emerald-500/5 shadow-[0_0_0_3px_rgba(16,185,129,0.15)]'
                      : isArif
                      ? 'border-teal-600'
                      : 'border-amber-500'
                  }`}
                  style={{
                    left: `${asg.node.rect.x - 3}px`,
                    top: `${asg.node.rect.y - 3}px`,
                    width: `${asg.node.rect.w + 6}px`,
                    height: `${asg.node.rect.h + 6}px`,
                  }}
                >
                  {/* Collaborator Badge */}
                  <div
                    className={`absolute -top-4 left-1 text-[8px] font-bold text-white px-1.5 py-0.5 rounded-xs font-mono shadow-xs flex items-center gap-1 whitespace-nowrap ${
                      isInspecting ? 'bg-emerald-700' : isArif ? 'bg-teal-700' : 'bg-amber-600'
                    }`}
                  >
                    <span>{isArif ? 'Arif · Designer' : 'Windi · Designer'}</span>
                    {subPhase === 'typing' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    )}
                  </div>

                  {/* Settle Badge */}
                  {isSettling && (
                    <div className="absolute -top-4 right-1 bg-sky-700 text-white text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-xs shadow-xs whitespace-nowrap animate-in zoom-in-95">
                      <span>
                        ✓ Posisi Valid ({asg.node.rect.w}x{asg.node.rect.h})
                      </span>
                    </div>
                  )}

                  {/* Inspect Badge */}
                  {isInspecting && (
                    <div className="absolute -top-4 right-1 bg-emerald-600 text-white text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-xs shadow-xs whitespace-nowrap animate-in zoom-in-95">
                      <span>✓ Tervalidasi</span>
                    </div>
                  )}

                  {/* Content Preview inside Box while Typing */}
                  {subPhase === 'typing' && asg.node.text && (
                    <div className="w-full h-full p-2 flex items-center justify-center text-stone-800 text-xs text-center font-mono select-none">
                      <span>{typedTexts[asg.node.id] || ''}</span>
                      <span
                        className={`inline-block w-1.5 h-3.5 ml-0.5 animate-pulse ${
                          isArif ? 'bg-teal-700' : 'bg-amber-600'
                        }`}
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

          {/* Multiplayer Presence Cursors (Simultaneous Workers) */}
          {collaborators.map((c) => {
            const state = cursorStates[c.id];
            if (!state || !state.visible) return null;
            const isArif = c.id === 'arif';

            return (
              <div
                key={`cursor-${c.id}`}
                className={`absolute z-40 pointer-events-none flex flex-col items-start ${
                  state.isStill || state.isDragging
                    ? 'transition-none'
                    : 'transition-all duration-500 ease-out'
                }`}
                style={{
                  left: `${state.x}px`,
                  top: `${state.y}px`,
                }}
              >
                {state.isClicking && (
                  <div
                    className={`absolute -top-2 -left-2 w-7 h-7 rounded-full border-2 animate-ping pointer-events-none ${
                      isArif
                        ? 'border-teal-400 bg-teal-400/20'
                        : 'border-amber-400 bg-amber-400/20'
                    }`}
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
