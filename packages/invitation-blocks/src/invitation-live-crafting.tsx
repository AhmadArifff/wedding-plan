'use client';

import * as React from 'react';
import { Sparkles, CheckCircle, Heart, FastForward } from 'lucide-react';

export type CraftActor = 'arif' | 'windi';

export type CraftSubPhase =
  | 'idle'
  | 'traveling'
  | 'dragging'
  | 'settling'
  | 'clicking'
  | 'typing'
  | 'inspecting'
  | 'deselecting'
  | 'celebrating'
  | 'finished';

export interface CraftStepDefinition {
  id: string;
  actor: CraftActor;
  title: string;
  actionDragLabel: string;
  actionSettleLabel: string;
  actionClickLabel: string;
  actionTypeLabel: string;
  actionInspectLabel: string;
  targetText?: string;
  isSpecialFont?: boolean;
  isCenterSnap?: boolean;
}

export const CRAFT_STEPS: CraftStepDefinition[] = [
  // 1. Walimatul 'Urs Header
  {
    id: 'hero-header',
    actor: 'arif',
    title: "Header Walimatul 'Urs",
    actionDragLabel: 'Drag Kotak Teks Header: 240 x 24px',
    actionSettleLabel: 'Memeriksa Posisi Kotak Header...',
    actionClickLabel: 'Klik Masuk Mode Edit Teks [T]',
    actionTypeLabel: 'Mengetik "WALIMATUL \'URS"...',
    actionInspectLabel: 'Memeriksa Teks Header...',
    targetText: "WALIMATUL 'URS",
  },
  // 2. Nama Mempelai Hero + Font Cormorant Garamond
  {
    id: 'hero-names',
    actor: 'windi',
    title: 'Nama Mempelai Hero & Tipografi',
    actionDragLabel: 'Drag Container Nama: 320 x 56px',
    actionSettleLabel: 'Memeriksa Posisi Kotak Nama...',
    actionClickLabel: 'Klik Masuk Mode Tipografi',
    actionTypeLabel: 'Mengetik "Arif & Windi"...',
    actionInspectLabel: 'Memilih Font: Cormorant Garamond 50px Italic',
    targetText: 'Arif & Windi',
    isSpecialFont: true,
  },
  // 3. Tanggal Resepsi Hero
  {
    id: 'hero-date',
    actor: 'arif',
    title: 'Tanggal Utama Undangan',
    actionDragLabel: 'Drag Label Tanggal: 260 x 24px',
    actionSettleLabel: 'Memeriksa Penempatan Tanggal...',
    actionClickLabel: 'Klik Edit Tanggal',
    actionTypeLabel: 'Mengetik "Minggu, 14 November 2027"...',
    actionInspectLabel: 'Memeriksa Format Tanggal...',
    targetText: 'Minggu, 14 November 2027',
  },
  // 4. Ayat Suci QS. Ar-Rum: 21
  {
    id: 'verse-box',
    actor: 'windi',
    title: 'Kutipan Ayat Suci Ar-Rum 21',
    actionDragLabel: 'Drag Frame Ayat Suci: 340 x 130px',
    actionSettleLabel: 'Memeriksa Frame Ayat Suci...',
    actionClickLabel: 'Klik Format Ayat & Ikon Hati',
    actionTypeLabel: 'Menyematkan Kutipan QS. Ar-Rum: 21...',
    actionInspectLabel: 'Memeriksa Teks Terjemahan Ayat...',
    targetText: 'Dan di antara tanda-tanda kebesaran-Nya...',
  },
  // 5. Profil Mempelai Pria (Ahmad Arif)
  {
    id: 'groom-card',
    actor: 'arif',
    title: 'Profil Pengantin Pria (Ahmad Arif)',
    actionDragLabel: 'Drag Kartu Pengantin Pria: 340 x 160px',
    actionSettleLabel: 'Memeriksa Penempatan Kartu Pria...',
    actionClickLabel: 'Klik Pasang Foto & Profil Pria',
    actionTypeLabel: 'Mengetik "Ahmad Arif, S.Kom"...',
    actionInspectLabel: 'Memeriksa Data Orang Tua Pria...',
    targetText: 'Ahmad Arif, S.Kom',
  },
  // 6. Profil Mempelai Wanita (Windi Widia)
  {
    id: 'bride-card',
    actor: 'windi',
    title: 'Profil Pengantin Wanita (Windi Widia)',
    actionDragLabel: 'Drag Kartu Pengantin Wanita: 340 x 160px',
    actionSettleLabel: 'Memeriksa Penempatan Kartu Wanita...',
    actionClickLabel: 'Klik Pasang Foto & Profil Wanita',
    actionTypeLabel: 'Mengetik "Windi Widia, S.Pd"...',
    actionInspectLabel: 'Memeriksa Data Orang Tua Wanita...',
    targetText: 'Windi Widia, S.Pd',
  },
  // 7. Agenda Akad Nikah
  {
    id: 'agenda-akad',
    actor: 'arif',
    title: 'Jadwal Akad Nikah',
    actionDragLabel: 'Drag Card Akad Nikah: 340 x 110px',
    actionSettleLabel: 'Memeriksa Kartu Akad Nikah...',
    actionClickLabel: 'Klik Format Jadwal Akad',
    actionTypeLabel: 'Menyematkan Waktu 08:00 WIB & Pendopo...',
    actionInspectLabel: 'Memeriksa Alamat Lokasi Akad...',
  },
  // 8. Agenda Resepsi Pernikahan
  {
    id: 'agenda-resepsi',
    actor: 'arif',
    title: 'Jadwal Resepsi Pernikahan',
    actionDragLabel: 'Drag Card Resepsi: 340 x 110px',
    actionSettleLabel: 'Memeriksa Kartu Resepsi...',
    actionClickLabel: 'Klik Format Jadwal Resepsi',
    actionTypeLabel: 'Menyematkan 11:00 - 14:00 WIB & Gedung...',
    actionInspectLabel: 'Memeriksa Venue Graha Sakinah...',
  },
  // 9. Tombol Google Maps
  {
    id: 'maps-button',
    actor: 'arif',
    title: 'Tombol Petunjuk Arah Google Maps',
    actionDragLabel: 'Drag Tombol Navigasi: 340 x 44px',
    actionSettleLabel: 'Memeriksa Ukuran Tombol CTA...',
    actionClickLabel: 'Klik Edit Label & Link Maps',
    actionTypeLabel: 'Mengetik "Petunjuk Arah Google Maps"...',
    actionInspectLabel: 'Memeriksa Tombol Google Maps...',
    targetText: 'Petunjuk Arah Google Maps',
  },
  // 10. Amplop Digital Rekening Bank (BCA & Mandiri)
  {
    id: 'bank-card',
    actor: 'windi',
    title: 'Amplop Digital & Nomor Rekening',
    actionDragLabel: 'Drag Card Rekening Bank: 340 x 120px',
    actionSettleLabel: 'Memeriksa Frame Rekening...',
    actionClickLabel: 'Klik Format Rekening BCA & Mandiri',
    actionTypeLabel: 'Menyematkan Rekening BCA & Mandiri...',
    actionInspectLabel: 'Memeriksa Nomor Rekening Transfer...',
  },
  // 11. Barcode QRIS Merchant (Auto-Snap Center Guide)
  {
    id: 'qris-card',
    actor: 'windi',
    title: 'Barcode QRIS Merchant (Auto-Snap)',
    actionDragLabel: 'Drag Card Barcode QRIS: 340 x 140px',
    actionSettleLabel: 'Memeriksa Penempatan QRIS...',
    actionClickLabel: 'Klik Sematkan QRIS Merchant',
    actionTypeLabel: 'Menyematkan Barcode QRIS NikahPlan...',
    actionInspectLabel: 'Auto-Snap Center QRIS Sumbu X...',
    isCenterSnap: true,
  },
];

export interface CraftingState {
  currentStepIndex: number;
  subPhase: CraftSubPhase;
  activeStepId: string | null;
  completedStepIds: string[];
  typedText: string;
  isSpecialFontActive: boolean;
  isFinished: boolean;
}

export interface InvitationLiveCraftingProps {
  containerRef: React.RefObject<HTMLElement | null>;
  enabled?: boolean;
  onStateChange?: (state: CraftingState) => void;
}

export const InvitationLiveCrafting: React.FC<InvitationLiveCraftingProps> = ({
  containerRef,
  enabled = true,
  onStateChange,
}) => {
  const [stepIndex, setStepIndex] = React.useState<number>(0);
  const [subPhase, setSubPhase] = React.useState<CraftSubPhase>('idle');
  const [completedSteps, setCompletedSteps] = React.useState<string[]>([]);
  const [typedText, setTypedText] = React.useState<string>('');
  const [isSpecialFont, setIsSpecialFont] = React.useState<boolean>(false);
  const [isFinished, setIsFinished] = React.useState<boolean>(false);

  // Measured bounding box of the active DOM element relative to container
  const [activeRect, setActiveRect] = React.useState<{
    x: number;
    y: number;
    w: number;
    h: number;
  } | null>(null);

  // Position of cursors inside container coordinates
  const [arifPos, setArifPos] = React.useState<{
    x: number;
    y: number;
    isClicking: boolean;
    isStill: boolean;
    action: string;
    visible: boolean;
  }>({
    x: 40,
    y: 20,
    isClicking: false,
    isStill: false,
    action: 'Siap Mendesain Undangan',
    visible: true,
  });

  const [windiPos, setWindiPos] = React.useState<{
    x: number;
    y: number;
    isClicking: boolean;
    isStill: boolean;
    action: string;
    visible: boolean;
  }>({
    x: 60,
    y: 20,
    isClicking: false,
    isStill: false,
    action: 'Siap Mendesain Undangan',
    visible: true,
  });

  const activeStep = CRAFT_STEPS[stepIndex] || null;

  // Sync state to parent
  React.useEffect(() => {
    onStateChange?.({
      currentStepIndex: stepIndex,
      subPhase,
      activeStepId: activeStep ? activeStep.id : null,
      completedStepIds: completedSteps,
      typedText,
      isSpecialFontActive: isSpecialFont,
      isFinished,
    });
  }, [stepIndex, subPhase, activeStep, completedSteps, typedText, isSpecialFont, isFinished, onStateChange]);

  // Measure element in DOM relative to container
  const measureElement = React.useCallback(
    (craftId: string) => {
      if (!containerRef.current) return null;
      const el = containerRef.current.querySelector(`[data-craft-id="${craftId}"]`) as HTMLElement | null;
      if (!el) return null;

      const containerRect = containerRef.current.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();

      return {
        x: elRect.left - containerRect.left,
        y: elRect.top - containerRect.top,
        w: elRect.width,
        h: elRect.height,
      };
    },
    [containerRef]
  );

  // Smooth scroll container / window so current element is nicely in view
  const scrollToActiveElement = React.useCallback(
    (craftId: string) => {
      if (!containerRef.current) return;
      const el = containerRef.current.querySelector(`[data-craft-id="${craftId}"]`) as HTMLElement | null;
      if (!el) return;

      const elRect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const targetScrollY = window.scrollY + elRect.top - windowHeight / 2 + elRect.height / 2;

      window.scrollTo({
        top: Math.max(0, targetScrollY),
        behavior: 'smooth',
      });
    },
    [containerRef]
  );

  // Main Animation Orchestrator
  React.useEffect(() => {
    if (!enabled || isFinished) return;

    if (stepIndex >= CRAFT_STEPS.length) {
      setIsFinished(true);
      setSubPhase('celebrating');
      setArifPos((prev) => ({
        ...prev,
        action: 'Alhamdulillah, seluruh undangan siap! ❤️',
        isClicking: false,
        isStill: true,
      }));
      setWindiPos((prev) => ({
        ...prev,
        action: 'Sempurna, terima kasih ya sayang! ✨',
        isClicking: false,
        isStill: true,
      }));
      return;
    }

    const current = CRAFT_STEPS[stepIndex];
    const isArif = current.actor === 'arif';

    // Step 1: Wait briefly and measure element
    let timer: ReturnType<typeof setTimeout>;

    const runStep = () => {
      const rect = measureElement(current.id);
      if (!rect) {
        // If element not yet mounted, retry in 100ms
        timer = setTimeout(runStep, 100);
        return;
      }

      setActiveRect(rect);
      scrollToActiveElement(current.id);

      // Phase 1: TRAVELING to top-left of element (700ms)
      setSubPhase('traveling');
      if (isArif) {
        setArifPos({
          x: rect.x - 20,
          y: rect.y - 10,
          isClicking: false,
          isStill: false,
          action: `Menuju Titik Awal ${current.title}`,
          visible: true,
        });
      } else {
        setWindiPos({
          x: rect.x + rect.w + 20,
          y: rect.y - 10,
          isClicking: false,
          isStill: false,
          action: `Menuju Titik Awal ${current.title}`,
          visible: true,
        });
      }

      timer = setTimeout(() => {
        // Phase 2: DRAGGING diagonally from top-left to bottom-right (1100ms)
        setSubPhase('dragging');
        if (isArif) {
          setArifPos({
            x: rect.x + rect.w,
            y: rect.y + rect.h,
            isClicking: true,
            isStill: false,
            action: current.actionDragLabel,
            visible: true,
          });
        } else {
          setWindiPos({
            x: rect.x + rect.w,
            y: rect.y + rect.h,
            isClicking: true,
            isStill: false,
            action: current.actionDragLabel,
            visible: true,
          });
        }

        timer = setTimeout(() => {
          // Phase 3: SETTLING (Settle Pause: release mouse, observe placed empty box) (1200ms)
          setSubPhase('settling');
          if (isArif) {
            setArifPos({
              x: rect.x + rect.w,
              y: rect.y + rect.h,
              isClicking: false,
              isStill: true,
              action: current.actionSettleLabel,
              visible: true,
            });
          } else {
            setWindiPos({
              x: rect.x + rect.w,
              y: rect.y + rect.h,
              isClicking: false,
              isStill: true,
              action: current.actionSettleLabel,
              visible: true,
            });
          }

          timer = setTimeout(() => {
            // Phase 4: CLICKING to edit (moves inside, clicks) (700ms)
            setSubPhase('clicking');
            const clickX = rect.x + Math.min(60, rect.w * 0.2);
            const clickY = rect.y + rect.h * 0.5;

            if (isArif) {
              setArifPos({
                x: clickX,
                y: clickY,
                isClicking: true,
                isStill: false,
                action: current.actionClickLabel,
                visible: true,
              });
            } else {
              setWindiPos({
                x: clickX,
                y: clickY,
                isClicking: true,
                isStill: false,
                action: current.actionClickLabel,
                visible: true,
              });
            }

            timer = setTimeout(() => {
              // Phase 5: TYPING STILLNESS (1600ms)
              setSubPhase('typing');
              if (current.isSpecialFont) {
                setIsSpecialFont(true);
              }

              const typingTarget = current.targetText || current.title;
              const typeLength = typingTarget.length;
              let currentChars = 0;

              if (isArif) {
                setArifPos({
                  x: rect.x + rect.w,
                  y: rect.y + rect.h * 0.5,
                  isClicking: false,
                  isStill: true,
                  action: current.actionTypeLabel,
                  visible: true,
                });
              } else {
                setWindiPos({
                  x: rect.x + rect.w,
                  y: rect.y + rect.h * 0.5,
                  isClicking: false,
                  isStill: true,
                  action: current.actionTypeLabel,
                  visible: true,
                });
              }

              const typeInterval = setInterval(() => {
                currentChars += 2;
                setTypedText(typingTarget.slice(0, currentChars));
                if (currentChars >= typeLength) {
                  clearInterval(typeInterval);
                }
              }, 60);

              timer = setTimeout(() => {
                clearInterval(typeInterval);
                setTypedText(typingTarget);

                // Phase 6: INSPECT PAUSE (1300ms)
                setSubPhase('inspecting');
                if (isArif) {
                  setArifPos((prev) => ({
                    ...prev,
                    isStill: true,
                    isClicking: false,
                    action: current.actionInspectLabel,
                  }));
                } else {
                  setWindiPos((prev) => ({
                    ...prev,
                    isStill: true,
                    isClicking: false,
                    action: current.actionInspectLabel,
                  }));
                }

                timer = setTimeout(() => {
                  // Phase 7: DESELECT & PREPARE NEXT STEP (600ms)
                  setSubPhase('deselecting');
                  setCompletedSteps((prev) => (prev.includes(current.id) ? prev : [...prev, current.id]));

                  if (isArif) {
                    setArifPos({
                      x: rect.x + rect.w + 30,
                      y: rect.y + rect.h + 20,
                      isClicking: true,
                      isStill: false,
                      action: 'Klik Luar: Deselect',
                      visible: true,
                    });
                  } else {
                    setWindiPos({
                      x: rect.x - 30,
                      y: rect.y + rect.h + 20,
                      isClicking: true,
                      isStill: false,
                      action: 'Klik Luar: Deselect',
                      visible: true,
                    });
                  }

                  timer = setTimeout(() => {
                    setTypedText('');
                    setStepIndex((prev) => prev + 1);
                  }, 500);
                }, 1300);
              }, 1600);
            }, 700);
          }, 1200);
        }, 1100);
      }, 700);
    };

    runStep();

    return () => {
      clearTimeout(timer);
    };
  }, [enabled, stepIndex, isFinished, measureElement, scrollToActiveElement]);

  // Recalculate active rect on window resize
  React.useEffect(() => {
    const handleResize = () => {
      if (activeStep) {
        const rect = measureElement(activeStep.id);
        if (rect) setActiveRect(rect);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeStep, measureElement]);

  const handleSkipAll = () => {
    setCompletedSteps(CRAFT_STEPS.map((s) => s.id));
    setIsFinished(true);
    setSubPhase('celebrating');
    setIsSpecialFont(true);
  };

  if (!enabled) return null;

  const isArifActive = activeStep?.actor === 'arif';
  const isWindiActive = activeStep?.actor === 'windi';

  return (
    <>
      {/* 1. Skip / Full View Floating Pill (Subtle, non-intrusive) */}
      {!isFinished && (
        <div className="fixed bottom-4 right-4 z-50 animate-in fade-in">
          <button
            type="button"
            onClick={handleSkipAll}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900/90 hover:bg-stone-900 text-stone-200 hover:text-white text-[11px] font-medium backdrop-blur-md shadow-lg border border-stone-700 transition-all cursor-pointer select-none active:scale-95"
            title="Lewati proses desain dan tampilkan undangan penuh"
          >
            <span>Lewati Animasi</span>
            <FastForward className="w-3.5 h-3.5 text-teal-400" />
          </button>
        </div>
      )}

      {/* 2. Celebration Notification Banner when all elements finish */}
      {isFinished && (
        <div className="fixed top-18 left-1/2 -translate-x-1/2 z-40 bg-emerald-900/90 text-white px-4 py-2 rounded-2xl shadow-2xl border border-emerald-500/50 backdrop-blur-md flex items-center gap-2 text-xs animate-in zoom-in-95 select-none pointer-events-none">
          <CheckCircle className="w-4 h-4 text-emerald-300" />
          <span className="font-semibold">Undangan Selesai Dirakit Berdua oleh Arif &amp; Windi!</span>
          <Heart className="w-3.5 h-3.5 text-pink-400 animate-pulse ml-1" />
        </div>
      )}

      {/* 3. Global Crafting Overlay inside Container (Zero offset, exact pixel anchors) */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
        {/* Active Smart Snap Magenta Guide Line */}
        {activeStep?.isCenterSnap && subPhase === 'inspecting' && activeRect && (
          <div
            className="absolute top-0 bottom-0 w-[1px] bg-pink-500 z-40 pointer-events-none opacity-90 animate-in fade-in"
            style={{ left: `${activeRect.x + activeRect.w / 2}px` }}
          >
            <span className="absolute top-4 left-2 text-[8px] font-mono font-bold bg-pink-600 text-white px-1.5 py-0.5 rounded-xs shadow-xs">
              Center Snap X: {Math.round(activeRect.x + activeRect.w / 2)}px
            </span>
          </div>
        )}

        {/* Dynamic Drag Box (Expands smoothly during dragging phase) */}
        {activeRect && subPhase === 'dragging' && (
          <div
            className={`absolute border-2 border-dashed pointer-events-none z-30 transition-all duration-300 ${
              isArifActive ? 'border-teal-500 bg-teal-500/10' : 'border-amber-500 bg-amber-500/10'
            } rounded-xl`}
            style={{
              left: `${activeRect.x}px`,
              top: `${activeRect.y}px`,
              width: `${activeRect.w}px`,
              height: `${activeRect.h}px`,
            }}
          >
            <div
              className={`absolute -bottom-5 right-0 text-white text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-xs shadow-xs whitespace-nowrap ${
                isArifActive ? 'bg-teal-700' : 'bg-amber-600'
              }`}
            >
              {Math.round(activeRect.w)} x {Math.round(activeRect.h)}px
            </div>
          </div>
        )}

        {/* Selection Bounding Box with Corner Handles during Settling, Clicking, Typing, Inspecting */}
        {activeRect &&
          ['settling', 'clicking', 'typing', 'inspecting'].includes(subPhase) && (
            <div
              className={`absolute border-2 pointer-events-none z-30 rounded-xl transition-all duration-200 ${
                isArifActive ? 'border-teal-600' : 'border-amber-500'
              }`}
              style={{
                left: `${activeRect.x - 3}px`,
                top: `${activeRect.y - 3}px`,
                width: `${activeRect.w + 6}px`,
                height: `${activeRect.h + 6}px`,
              }}
            >
              {/* Badge Identitas Collaborator */}
              <div
                className={`absolute -top-3.5 left-1 text-[8px] font-bold text-white px-1.5 py-0.2 rounded-xs font-mono shadow-xs flex items-center gap-1 ${
                  isArifActive ? 'bg-teal-700' : 'bg-amber-600'
                }`}
              >
                <span>{isArifActive ? 'Arif · Designer' : 'Windi · Designer'}</span>
                {subPhase === 'typing' && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
              </div>

              {/* 4 Corner Sizing Knobs */}
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-stone-800" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-stone-800" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-stone-800" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-stone-800" />
            </div>
          )}

        {/* Floating Font Dropdown Preview during Windi's Hero Names inspection */}
        {activeStep?.isSpecialFont && subPhase === 'inspecting' && activeRect && (
          <div
            className="absolute bg-stone-900 text-white rounded-xl p-2 shadow-2xl border border-stone-700 z-40 text-left font-mono text-[9px] animate-in zoom-in-95 pointer-events-none"
            style={{
              left: `${activeRect.x + activeRect.w - 180}px`,
              top: `${activeRect.y - 45}px`,
            }}
          >
            <div className="text-stone-400 text-[8px] uppercase tracking-wider mb-1">Font Family</div>
            <div className="bg-amber-600/30 text-amber-300 font-serif px-2 py-0.5 rounded-sm font-semibold flex items-center justify-between gap-2">
              <span>✓ Cormorant Garamond</span>
              <span className="text-[7px]">Serif Italic</span>
            </div>
            <div className="text-stone-400 px-2 py-0.5 opacity-60">Inter Sans</div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* COLLABORATOR CURSORS (EXACT PIXEL ANCHOR, NO DRIFT, NO SKEW) */}
        {/* ========================================================================= */}

        {/* Cursor 1: Arif (Teal) */}
        {arifPos.visible && (
          <div
            className={`absolute z-40 pointer-events-none flex flex-col items-start ${
              arifPos.isStill ? 'transition-none' : 'transition-all duration-300 ease-out'
            }`}
            style={{
              left: `${arifPos.x}px`,
              top: `${arifPos.y}px`,
            }}
          >
            {/* Click Ripple Pulse */}
            {arifPos.isClicking && (
              <div className="absolute -top-2 -left-2 w-7 h-7 rounded-full border-2 border-teal-400 bg-teal-400/20 animate-ping pointer-events-none" />
            )}

            <svg className="w-5 h-5 drop-shadow-md" viewBox="0 0 24 24" fill="#0F766E" stroke="white" strokeWidth="1.5">
              <path d="M5.5 3.5l14 7-6.5 2-2 6.5-5.5-15.5z" />
            </svg>

            <div className="text-[9px] font-bold text-white px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap ml-3 -mt-1 bg-teal-700 flex items-center gap-1">
              <span>Arif (Mempelai)</span>
              {arifPos.isStill && <span className="w-1.5 h-1.5 rounded-full bg-teal-300 animate-pulse" />}
            </div>

            <div className="bg-[#1A1A1A]/95 text-stone-200 text-[8.5px] px-2 py-0.5 rounded-md shadow-md mt-0.5 ml-3 font-mono border border-stone-700 whitespace-nowrap animate-in fade-in">
              <span>{arifPos.action}</span>
            </div>
          </div>
        )}

        {/* Cursor 2: Windi (Amber) */}
        {windiPos.visible && (
          <div
            className={`absolute z-40 pointer-events-none flex flex-col items-start ${
              windiPos.isStill ? 'transition-none' : 'transition-all duration-300 ease-out'
            }`}
            style={{
              left: `${windiPos.x}px`,
              top: `${windiPos.y}px`,
            }}
          >
            {/* Click Ripple Pulse */}
            {windiPos.isClicking && (
              <div className="absolute -top-2 -left-2 w-7 h-7 rounded-full border-2 border-amber-400 bg-amber-400/20 animate-ping pointer-events-none" />
            )}

            <svg className="w-5 h-5 drop-shadow-md" viewBox="0 0 24 24" fill="#D97706" stroke="white" strokeWidth="1.5">
              <path d="M5.5 3.5l14 7-6.5 2-2 6.5-5.5-15.5z" />
            </svg>

            <div className="text-[9px] font-bold text-white px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap ml-3 -mt-1 bg-amber-600 flex items-center gap-1">
              <span>Windi (Mempelai)</span>
              {windiPos.isStill && <span className="w-1.5 h-1.5 rounded-full bg-amber-200 animate-pulse" />}
            </div>

            <div className="bg-[#1A1A1A]/95 text-stone-200 text-[8.5px] px-2 py-0.5 rounded-md shadow-md mt-0.5 ml-3 font-mono border border-stone-700 whitespace-nowrap animate-in fade-in">
              <span>{windiPos.action}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
