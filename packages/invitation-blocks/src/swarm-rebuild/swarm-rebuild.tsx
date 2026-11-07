'use client';

import * as React from 'react';
import type {
  SwarmCollaborator,
  SwarmNode,
  AutonomousWorkerState,
} from './types';
import { scanDOMForRebuild } from './dom-scanner';
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

function cleanFontName(fontFamily?: string): string {
  if (!fontFamily) return 'Serif';
  const primary = fontFamily.split(',')[0].replace(/['"]/g, '').trim();
  if (primary.toLowerCase().includes('serif') && !primary.toLowerCase().includes('sans')) {
    return 'Playfair / Serif';
  }
  if (primary.toLowerCase().includes('sans')) {
    return 'Sans';
  }
  if (primary.toLowerCase().includes('mono')) {
    return 'Mono';
  }
  return primary.length > 15 ? `${primary.slice(0, 13)}..` : primary;
}

const initialWorker = (id: string, startX: number, startY: number): AutonomousWorkerState => ({
  id,
  node: null,
  phase: 'idle',
  currentX: startX,
  currentY: startY,
  targetX: startX,
  targetY: startY,
  dragProgress: 0,
  craftProgress: 0,
  typedText: '',
  isClicking: false,
  isDragging: false,
  visible: true,
  opacity: 1,
  scale: 1,
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, Math.max(10, ms)));

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
  const [workers, setWorkers] = React.useState<Record<string, AutonomousWorkerState>>({
    arif: initialWorker('arif', 30, 20),
    windi: initialWorker('windi', 120, 20),
    rian: initialWorker('rian', 210, 20),
    siti: initialWorker('siti', 300, 20),
  });

  const [isFinished, setIsFinished] = React.useState<boolean>(false);
  const [isScattering, setIsScattering] = React.useState<boolean>(false);
  const [showFloralConfetti, setShowFloralConfetti] = React.useState<boolean>(false);

  const queueRef = React.useRef<SwarmNode[]>([]);
  const workerPositionsRef = React.useRef<Record<string, { x: number; y: number }>>({
    arif: { x: 30, y: 20 },
    windi: { x: 120, y: 20 },
    rian: { x: 210, y: 20 },
    siti: { x: 300, y: 20 },
  });
  const scrollBoostRef = React.useRef<number>(1);
  const isMountedRef = React.useRef<boolean>(true);
  const isStartedRef = React.useRef<boolean>(false);
  const activeWorkersCountRef = React.useRef<number>(4);
  const allScannedNodesRef = React.useRef<SwarmNode[]>([]);

  const updateWorker = React.useCallback(
    (id: string, patch: Partial<AutonomousWorkerState>) => {
      if (!isMountedRef.current) return;
      setWorkers((prev) => ({
        ...prev,
        [id]: { ...prev[id], ...patch },
      }));
    },
    []
  );

  // Dynamic Scroll Acceleration: if user scrolls ahead, workers accelerate naturally
  React.useEffect(() => {
    if (!enabled || isFinished) return;

    const handleScroll = () => {
      if (!targetRef.current) return;
      const containerRect = targetRef.current.getBoundingClientRect();
      const currentScroll = window.scrollY;

      const activeYs = Object.values(workers)
        .map((w) => w.node?.rect.y)
        .filter((y): y is number => typeof y === 'number');

      if (activeYs.length === 0) return;
      const minY = Math.min(...activeYs);
      const activeAbsoluteY = containerRect.top + currentScroll + minY;
      const viewportBottom = currentScroll + window.innerHeight;

      const scrollLag = viewportBottom - activeAbsoluteY;
      if (scrollLag > 500) {
        scrollBoostRef.current = 1.9;
      } else if (scrollLag > 250) {
        scrollBoostRef.current = 1.4;
      } else {
        scrollBoostRef.current = 1.0;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [enabled, isFinished, workers, targetRef]);

  // Smooth camera guide following the work crew down the document
  const updateCameraScroll = React.useCallback(
    (minActiveY: number) => {
      if (!targetRef.current) return;
      const containerRect = targetRef.current.getBoundingClientRect();
      const targetAbsoluteY = window.scrollY + containerRect.top + minActiveY;
      const targetScroll = Math.max(0, targetAbsoluteY - window.innerHeight * 0.38);

      if (Math.abs(window.scrollY - targetScroll) > 32) {
        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth',
        });
      }
    },
    [targetRef]
  );

  // Independent Autonomous Worker Loop: zero lockstep waiting
  const runWorkerLoop = React.useCallback(
    async (workerId: string) => {
      while (isMountedRef.current && queueRef.current.length > 0) {
        const node = queueRef.current.shift();
        if (!node) break;

        const currentPos = workerPositionsRef.current[workerId];
        const targetX = node.rect.x;
        const targetY = node.rect.y;
        const dx = targetX - currentPos.x;
        const dy = targetY - currentPos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // 1. TRAVEL PHASE: Natural human easing travel (relaxed, deliberate pacing)
        const travelMs = Math.max(160, Math.min(350, 130 + dist * 0.24)) / scrollBoostRef.current;

        updateWorker(workerId, {
          node,
          phase: 'traveling',
          targetX,
          targetY,
          currentX: targetX,
          currentY: targetY,
          isClicking: false,
          isDragging: false,
          dragProgress: 0,
          craftProgress: 0,
          typedText: '',
        });
        workerPositionsRef.current[workerId] = { x: targetX, y: targetY };
        await sleep(travelMs);
        if (!isMountedRef.current) break;

        updateCameraScroll(targetY);

        // 2. DRAGGING PHASE: Pull size rectangle with live dimension pill
        const dragMs = Math.max(260, Math.min(420, 210 + node.rect.w * 0.32)) / scrollBoostRef.current;
        updateWorker(workerId, {
          phase: 'dragging',
          isClicking: true,
          isDragging: true,
        });

        const dragTicks = 10;
        const dragTickMs = dragMs / dragTicks;
        for (let t = 1; t <= dragTicks; t++) {
          await sleep(dragTickMs);
          if (!isMountedRef.current) break;
          const p = t / dragTicks;
          updateWorker(workerId, {
            dragProgress: p,
            currentX: targetX + node.rect.w * p,
            currentY: targetY + node.rect.h * p,
          });
        }
        if (!isMountedRef.current) break;

        workerPositionsRef.current[workerId] = {
          x: targetX + node.rect.w,
          y: targetY + node.rect.h,
        };

        // 3. SETTLE & CLICK: Tool pill badge activates
        const clickMs = 95 / scrollBoostRef.current;
        updateWorker(workerId, {
          phase: 'clicking',
          dragProgress: 1,
          isClicking: true,
          isDragging: false,
          currentX: targetX + Math.min(24, node.rect.w * 0.25),
          currentY: targetY + node.rect.h * 0.5,
        });
        await sleep(clickMs);
        if (!isMountedRef.current) break;

        // 4. CRAFTING PHASE: Live typing, media upload shimmer, or vector snap
        updateWorker(workerId, {
          phase: 'crafting',
          isClicking: false,
        });

        const isTextNode = ['heading', 'text', 'badge', 'button'].includes(node.type) && Boolean(node.text);
        if (isTextNode && node.text) {
          const text = node.text;
          const typeMs = Math.max(260, Math.min(540, 200 + text.length * 12)) / scrollBoostRef.current;
          const charsCount = text.length;
          const stepCount = Math.max(4, Math.min(16, charsCount));
          const stepMs = typeMs / stepCount;

          for (let s = 1; s <= stepCount; s++) {
            await sleep(stepMs);
            if (!isMountedRef.current) break;
            const p = s / stepCount;
            const charIdx = Math.max(1, Math.ceil(charsCount * p));
            updateWorker(workerId, {
              craftProgress: p,
              typedText: text.slice(0, charIdx),
              currentX: targetX + Math.min(node.rect.w - 4, 14 + charIdx * 8),
            });
          }
        } else if (node.type === 'image') {
          const imgMs = 320 / scrollBoostRef.current;
          await sleep(imgMs * 0.5);
          if (!isMountedRef.current) break;
          updateWorker(workerId, { craftProgress: 0.6 });
          await sleep(imgMs * 0.5);
          if (!isMountedRef.current) break;
          updateWorker(workerId, { craftProgress: 1 });
        } else if (node.type === 'icon') {
          const iconMs = 240 / scrollBoostRef.current;
          await sleep(iconMs * 0.5);
          if (!isMountedRef.current) break;
          updateWorker(workerId, { craftProgress: 0.7 });
          await sleep(iconMs * 0.5);
          if (!isMountedRef.current) break;
          updateWorker(workerId, { craftProgress: 1 });
        } else {
          // Card / Container frame
          const cardMs = 240 / scrollBoostRef.current;
          await sleep(cardMs);
          if (!isMountedRef.current) break;
          updateWorker(workerId, { craftProgress: 1 });
        }
        if (!isMountedRef.current) break;

        // 5. INSPECTING: Emerald validation border ✓
        const inspectMs = 130 / scrollBoostRef.current;
        updateWorker(workerId, {
          phase: 'inspecting',
        });
        await sleep(inspectMs);
        if (!isMountedRef.current) break;

        // 6. REVEAL DOM ELEMENT: Pop in with spring entrance immediately
        if (node.domElement) {
          node.domElement.classList.add('swarm-revealed');
          node.domElement.style.opacity = '1';
          node.domElement.style.transform = 'scale(1)';
        }

        // Release node immediately so this worker is free for the next task
        const releaseX = targetX + (node.rect.w || 20) + 10;
        const releaseY = targetY + (node.rect.h || 20) + 6;
        workerPositionsRef.current[workerId] = { x: releaseX, y: releaseY };

        updateWorker(workerId, {
          phase: 'idle',
          node: null,
          typedText: '',
          dragProgress: 0,
          craftProgress: 0,
          isClicking: false,
          isDragging: false,
          currentX: releaseX,
          currentY: releaseY,
        });

        // Micro-pause before immediately pulling next task from queue
        await sleep(60 / scrollBoostRef.current);
      }

      // Decrement active workers when queue is empty
      activeWorkersCountRef.current -= 1;

      // When all 4 workers have completed all tasks: grand finale!
      if (activeWorkersCountRef.current <= 0 && isMountedRef.current) {
        setIsScattering(true);

        allScannedNodesRef.current.forEach((n) => {
          if (n.domElement) {
            n.domElement.classList.add('swarm-revealed');
            n.domElement.style.opacity = '1';
            n.domElement.style.transform = 'scale(1)';
          }
        });

        const lastNode = allScannedNodesRef.current[allScannedNodesRef.current.length - 1];
        const finalY = lastNode?.rect.y ?? (targetRef.current?.clientHeight || 800);

        setWorkers((prev) => ({
          arif: { ...prev.arif, currentX: -160, currentY: finalY - 40, opacity: 0, scale: 0.2 },
          windi: { ...prev.windi, currentX: 540, currentY: finalY - 40, opacity: 0, scale: 0.2 },
          rian: { ...prev.rian, currentX: -160, currentY: finalY + 140, opacity: 0, scale: 0.2 },
          siti: { ...prev.siti, currentX: 540, currentY: finalY + 140, opacity: 0, scale: 0.2 },
        }));

        // Grand Finale Sequence:
        // 1. Smoothly scroll back to the top of the invitation first!
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });

        // 2. Wait until view smoothly glides back to the top (~1100ms), THEN burst floral confetti!
        setTimeout(() => {
          if (!isMountedRef.current) return;
          setShowFloralConfetti(true);

          setTimeout(() => {
            if (!isMountedRef.current) return;
            setIsFinished(true);
            setWorkers((prev) => {
              const next = { ...prev };
              Object.keys(next).forEach((k) => {
                next[k] = { ...next[k], visible: false };
              });
              return next;
            });
            onComplete?.();
          }, 4800);
        }, 1100);
      }
    },
    [onComplete, targetRef, updateCameraScroll, updateWorker]
  );

  // Initial Staggered Launch of the 4 Workers
  React.useEffect(() => {
    isMountedRef.current = true;
    if (!enabled || !targetRef.current || isStartedRef.current) return;

    isStartedRef.current = true;
    const scannedNodes = scanDOMForRebuild(targetRef.current);
    if (scannedNodes.length === 0) return;

    allScannedNodesRef.current = scannedNodes;
    queueRef.current = [...scannedNodes];
    activeWorkersCountRef.current = 4;

    // Stagger starts naturally so they immediately feel human and desynchronized
    const workerIds = ['arif', 'windi', 'rian', 'siti'];
    workerIds.forEach((id, idx) => {
      setTimeout(() => {
        if (isMountedRef.current) {
          runWorkerLoop(id);
        }
      }, idx * 110);
    });

    return () => {
      isMountedRef.current = false;
    };
  }, [enabled, targetRef, runWorkerLoop]);

  const getNodeToolLabel = (node: SwarmNode): string => {
    if (node.tagName === 'footer') {
      return 'FRAME: Dark Footer';
    }
    if (node.text && node.text.toLowerCase().includes('powered by')) {
      return 'TAG: Brand Watermark';
    }
    if (node.type === 'heading' || node.type === 'text') {
      return `T: ${cleanFontName(node.fontFamily)} ${node.fontSize || ''}`;
    }
    if (node.type === 'image') {
      return 'IMG: Media Upload';
    }
    if (node.type === 'icon') {
      return 'SVG: Vector Icon';
    }
    if (node.type === 'button') {
      return 'BTN: CTA Button';
    }
    if (node.type === 'badge') {
      return 'BADGE: Pill Tag';
    }
    if (node.type === 'card') {
      return 'FRAME: Card Layout';
    }
    return `${node.type.toUpperCase()}: Element`;
  };

  const renderWorkerCraftPreview = (
    node: SwarmNode,
    color: string,
    worker: AutonomousWorkerState
  ) => {
    if (['heading', 'text', 'badge', 'button'].includes(node.type) && node.text) {
      return (
        <div
          className="absolute inset-0 flex items-center overflow-hidden px-1.5 pointer-events-none"
          style={{
            fontFamily: node.fontFamily,
            fontSize: node.fontSize || '13px',
            fontWeight: node.fontWeight || 'normal',
            color: node.color || '#1C1917',
            justifyContent: node.isCenterAligned ? 'center' : 'flex-start',
          }}
        >
          <span className="truncate">
            {worker.typedText || node.text.slice(0, 3)}
          </span>
          <span
            className="inline-block w-[2px] h-3.5 animate-pulse ml-0.5 shrink-0"
            style={{ backgroundColor: color }}
          />
        </div>
      );
    }

    if (node.type === 'image') {
      return (
        <div className="absolute inset-0 rounded-xl overflow-hidden flex items-center justify-center bg-stone-100/90 pointer-events-none">
          {node.imgSrc ? (
            <img
              src={node.imgSrc}
              alt="Live Preview"
              className="w-full h-full object-cover transition-opacity duration-200"
              style={{ opacity: Math.max(0.3, worker.craftProgress) }}
            />
          ) : (
            <div className="flex items-center gap-1.5 text-[10px] text-stone-500 font-mono animate-pulse">
              <span>Photo Asset</span>
            </div>
          )}
        </div>
      );
    }

    if (node.type === 'icon') {
      return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-3.5 h-3.5 rounded-full border border-dashed transition-transform duration-150"
            style={{
              borderColor: color,
              transform: `scale(${worker.craftProgress >= 0.5 ? 1 : 0.6})`,
            }}
          />
        </div>
      );
    }

    return null;
  };

  if (!enabled || (isFinished && !showFloralConfetti)) return null;

  return (
    <>
      {/* 1. Celebratory Floral Confetti Shower */}
      <FloralConfettiShower active={showFloralConfetti} />

      {/* 2. Pristine Animation Overlay: 4 Independent Autonomous Workers */}
      {!isFinished && (
        <div
          data-swarm-overlay="true"
          data-swarm-ignore="true"
          className="absolute inset-0 z-30 pointer-events-none overflow-hidden"
        >
          {/* Active Box for each Worker (Completely Independent!) */}
          {collaborators.map((c) => {
            const worker = workers[c.id];
            if (!worker || !worker.node) return null;
            const node = worker.node;
            const color = c.color;
            const isInspecting = worker.phase === 'inspecting';

            if (worker.phase === 'dragging') {
              const currentW = Math.max(10, Math.round(node.rect.w * worker.dragProgress));
              const currentH = Math.max(10, Math.round(node.rect.h * worker.dragProgress));

              return (
                <div
                  key={`drag-${c.id}-${node.id}`}
                  className="absolute border-2 border-dashed pointer-events-none z-30 rounded-xl"
                  style={{
                    borderColor: color,
                    backgroundColor: `${color}16`,
                    left: `${node.rect.x}px`,
                    top: `${node.rect.y}px`,
                    width: `${currentW}px`,
                    height: `${currentH}px`,
                  }}
                >
                  <div
                    className="absolute -bottom-5 right-0 px-1.5 py-0.5 rounded text-[9px] font-mono shadow-xs select-none"
                    style={{ backgroundColor: color, color: '#FFFFFF' }}
                  >
                    {currentW} × {currentH}px
                  </div>
                </div>
              );
            }

            if (['clicking', 'crafting', 'inspecting'].includes(worker.phase)) {
              return (
                <div
                  key={`box-${c.id}-${node.id}`}
                  className={`absolute border-2 pointer-events-none z-30 rounded-xl transition-all duration-100 ${
                    isInspecting ? 'border-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.25)]' : ''
                  }`}
                  style={{
                    borderColor: isInspecting ? '#10B981' : color,
                    left: `${node.rect.x - 2}px`,
                    top: `${node.rect.y - 2}px`,
                    width: `${node.rect.w + 4}px`,
                    height: `${node.rect.h + 4}px`,
                  }}
                >
                  {/* Corner Knobs */}
                  <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-stone-800" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-stone-800" />
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-stone-800" />
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-stone-800" />

                  {/* Tool/Font Pill Badge */}
                  <div
                    className="absolute -top-5 left-0 flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono shadow-xs font-semibold whitespace-nowrap select-none"
                    style={{
                      backgroundColor: isInspecting ? '#10B981' : color,
                      color: '#FFFFFF',
                    }}
                  >
                    <span>{isInspecting ? '✓ Validated' : getNodeToolLabel(node)}</span>
                  </div>

                  {/* Live Craft Preview */}
                  {renderWorkerCraftPreview(node, color, worker)}
                </div>
              );
            }

            return null;
          })}

          {/* 4 Multiplayer Cursors (Independent Positions & Smooth Human Easing) */}
          {collaborators.map((c) => {
            const worker = workers[c.id];
            if (!worker || !worker.visible) return null;

            return (
              <div
                key={`cursor-${c.id}`}
                className={`absolute z-40 pointer-events-none flex flex-col items-start ${
                  isScattering
                    ? 'transition-all duration-700 ease-in'
                    : worker.phase === 'traveling'
                    ? 'transition-all duration-200 ease-out'
                    : worker.isDragging
                    ? 'transition-none'
                    : 'transition-all duration-150 ease-out'
                }`}
                style={{
                  left: `${worker.currentX}px`,
                  top: `${worker.currentY}px`,
                  opacity: worker.opacity ?? 1,
                  transform: `scale(${worker.scale ?? 1})`,
                }}
              >
                {worker.isClicking && (
                  <div
                    className="absolute -top-2 -left-2 w-6 h-6 rounded-full border-2 animate-ping pointer-events-none"
                    style={{ borderColor: c.color, backgroundColor: `${c.color}30` }}
                  />
                )}

                {/* SVG Arrow */}
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
