'use client';

import * as React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Type,
  MousePointer,
  LayoutGrid,
  CheckCircle,
  CreditCard,
  Heart,
  Calendar,
  MapPin,
  ExternalLink,
  Copy,
  Sparkles,
} from 'lucide-react';

export interface FigmaCraftingCanvasProps {
  groomNick?: string;
  brideNick?: string;
  weddingDateFormatted?: string;
  venueName?: string;
  onFinishCrafting?: () => void;
}

interface Collaborator {
  id: string;
  name: string;
  role: string;
  color: string;
  avatarBg: string;
}

const COLLABORATORS: Collaborator[] = [
  { id: 'arif', name: 'Arif (Mempelai)', role: 'Header, Jadwal & Button Maps', color: '#0F766E', avatarBg: 'bg-teal-700' },
  { id: 'windi', name: 'Windi (Mempelai)', role: 'Tipografi Hero & Divider Sage', color: '#D97706', avatarBg: 'bg-amber-600' },
  { id: 'reza', name: 'Reza Pratama', role: 'Avatar Foto, Ayat Ar-Rum & Auto-Layout', color: '#2563EB', avatarBg: 'bg-blue-600' },
  { id: 'budi', name: 'Budi Santoso', role: 'Amplop Digital, Bank & QRIS', color: '#7C3AED', avatarBg: 'bg-purple-600' },
];

export const FigmaCraftingCanvas: React.FC<FigmaCraftingCanvasProps> = ({
  groomNick = 'Arif',
  brideNick = 'Windi',
  weddingDateFormatted = 'Minggu, 14 November 2027',
  venueName = 'Graha Sakinah Convention Hall',
  onFinishCrafting,
}) => {
  // Timeline progress: 0 to 100 percentage
  const [progress, setProgress] = React.useState<number>(0);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(true);
  const [speedMultiplier, setSpeedMultiplier] = React.useState<number>(1);

  // Animation frame / timer loop
  React.useEffect(() => {
    if (!isPlaying) return;

    // Total duration: 16 seconds at 1x speed
    const stepDuration = 50; // ms
    const increment = (stepDuration / (16000 / speedMultiplier)) * 100;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return Math.min(100, prev + increment);
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, [isPlaying, speedMultiplier]);

  // =========================================================================
  // MULTI-ELEMENT STATE DERIVATION (TEXT, SHAPE, IMAGE, ICON, BUTTON, QRIS)
  // =========================================================================

  // 1. Arif's Track (Header -> Schedule Pill -> Google Maps Button)
  // 1a. Header Text: Drag box (3-7%), Typing STILL (7-16%), Click out (16-18%)
  const isArifDraggingHeader = progress >= 3 && progress < 7;
  const showHeaderBox = progress >= 7;
  const walimatulTarget = "WALIMATUL 'URS";
  const walimatulProgress = Math.min(1, Math.max(0, (progress - 7) / 9));
  const walimatulText = walimatulTarget.slice(0, Math.floor(walimatulProgress * walimatulTarget.length));
  const isHeaderFocused = progress >= 7 && progress < 17;

  // 1b. Schedule Pill: Drag box (22-26%), Typing STILL (26-40%), Click out (40-42%)
  const isArifDraggingSchedule = progress >= 22 && progress < 26;
  const showScheduleBox = progress >= 26;
  const scheduleTarget = `${weddingDateFormatted} · ${venueName}`;
  const scheduleProgress = Math.min(1, Math.max(0, (progress - 26) / 14));
  const scheduleText = scheduleTarget.slice(0, Math.floor(scheduleProgress * scheduleTarget.length));
  const isScheduleFocused = progress >= 26 && progress < 41;

  // 1c. Maps Button: Drag box (48-53%), Drop MapPin Icon (53-56%), Typing label STILL (56-66%), Click out (66-68%)
  const isArifDraggingButton = progress >= 48 && progress < 53;
  const showButtonBox = progress >= 53;
  const showButtonIcon = progress >= 55;
  const buttonLabelTarget = 'Buka Peta Lokasi (Google Maps)';
  const buttonLabelProgress = Math.min(1, Math.max(0, (progress - 56) / 10));
  const buttonLabelText = buttonLabelTarget.slice(0, Math.floor(buttonLabelProgress * buttonLabelTarget.length));
  const isButtonFocused = progress >= 53 && progress < 67;

  // 2. Windi's Track (Hero Names -> Font Dropdown -> Botanical Sage Divider)
  // 2a. Names: Drag box (4-9%), Typing STILL in Inter Sans (9-20%), Font dropdown pick (24-34%), Click out (42-44%)
  const isWindiDraggingNames = progress >= 4 && progress < 9;
  const showNamesBox = progress >= 9;
  const namesTarget = `${groomNick} & ${brideNick}`;
  const namesProgress = Math.min(1, Math.max(0, (progress - 9) / 11));
  const namesText = namesTarget.slice(0, Math.floor(namesProgress * namesTarget.length));
  const isNamesFocused = progress >= 9 && progress < 43;
  const showFontDropdown = progress >= 24 && progress < 35;
  const isCormorantFont = progress >= 29;
  const isItalicFont = progress >= 34;

  // 2b. Botanical Sage Divider Dot & Flanking Lines (48-66%)
  const isWindiDraggingDivider = progress >= 48 && progress < 53;
  const showDividerDot = progress >= 53;
  const showDividerLines = progress >= 58;
  const isDividerFocused = progress >= 53 && progress < 67;

  // 3. Reza's Track (Avatar Photo Frame -> Verse Card with Heart -> Auto-Layout)
  // 3a. Avatar Frame: Drag Circle (4-9%), Set Image & Gold Ring (9-18%), Click out (18-20%)
  const isRezaDraggingAvatar = progress >= 4 && progress < 9;
  const showAvatarFrame = progress >= 9;
  const showAvatarImage = progress >= 13;
  const isAvatarFocused = progress >= 9 && progress < 19;

  // 3b. Verse Card: Drag Rect (24-29%), Drop Heart Icon (29-33%), Typing STILL (33-48%), Click out (48-50%)
  const isRezaDraggingVerse = progress >= 24 && progress < 29;
  const showVerseCard = progress >= 29;
  const showVerseHeart = progress >= 32;
  const verseTarget =
    'Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu tenteram kepadanya.';
  const verseProgress = Math.min(1, Math.max(0, (progress - 33) / 15));
  const verseText = verseTarget.slice(0, Math.floor(verseProgress * verseTarget.length));
  const isVerseFocused = progress >= 29 && progress < 49;

  // 3c. Auto-Layout Trigger on Canvas (56-72%)
  const isAutoLayoutActive = progress >= 56 && progress < 72;

  // 4. Budi's Track (Digital Envelope Frame -> Bank Badges -> QRIS Barcode & Snap)
  // 4a. Envelope Card: Drag Rect (5-12%), Style R:16px & Shadow (12-22%), Click out (22-24%)
  const isBudiDraggingEnvelope = progress >= 5 && progress < 12;
  const showEnvelopeCard = progress >= 12;
  const isEnvelopeFocused = progress >= 12 && progress < 23;

  // 4b. Bank Badges: Drop BCA & Mandiri (26-44%), Click out (44-46%)
  const showBankBadges = progress >= 26;
  const isBankFocused = progress >= 26 && progress < 45;

  // 4c. QRIS Barcode & Alignment: Drag QRIS (50-56%), Snap center (56-68%), Click out (68-70%)
  const isBudiDraggingQris = progress >= 50 && progress < 56;
  const showQrisBarcode = progress >= 56;
  const isQrisFocused = progress >= 56 && progress < 69;

  // =========================================================================
  // REALISTIC CURSOR MOTION LOGIC (STAY STILL WHILE TYPING, CLICK OUT TO BLUR)
  // =========================================================================

  // 1. Arif Cursor (Teal)
  const arifCursor = React.useMemo(() => {
    if (progress < 3) {
      // Moves from top toolbar to header start
      const t = progress / 3;
      return { x: 22 + t * 16, y: 3 + t * 4, action: 'Memilih Tool Teks [T]', isClicking: false, isStill: false };
    } else if (progress < 7) {
      // Dragging text box: moves from (38, 7) to (62, 10)
      const t = (progress - 3) / 4;
      return { x: 38 + t * 24, y: 7 + t * 3, action: 'Drag Ukuran: 240 x 24px', isClicking: true, isStill: false };
    } else if (progress < 17) {
      // TYPING: STAYS STILL at the end of the text box!
      return { x: 63, y: 8.5, action: 'Mengetik "WALIMATUL \'URS"...', isClicking: false, isStill: true };
    } else if (progress < 22) {
      // Clicks outside onto canvas background to blur focus
      return { x: 74, y: 14, action: 'Klik Luar: Deselect Focus', isClicking: progress >= 17 && progress <= 19, isStill: false };
    } else if (progress < 26) {
      // Moves down to schedule zone & drags container
      const t = (progress - 22) / 4;
      return { x: 32 + t * 36, y: 55 + t * 4, action: 'Drag Frame: Jadwal & Lokasi', isClicking: true, isStill: false };
    } else if (progress < 41) {
      // TYPING: STAYS STILL at the right side of schedule pill!
      return { x: 69, y: 57, action: 'Mengetik Tanggal & Gedung...', isClicking: false, isStill: true };
    } else if (progress < 48) {
      // Clicks outside to blur focus
      return { x: 78, y: 53, action: 'Klik Luar: Deselect Focus', isClicking: progress >= 41 && progress <= 43, isStill: false };
    } else if (progress < 53) {
      // Drags button container
      const t = (progress - 48) / 5;
      return { x: 36 + t * 28, y: 64 + t * 3, action: 'Drag Tombol: 220 x 38px', isClicking: true, isStill: false };
    } else if (progress < 67) {
      // TYPING: STAYS STILL at button label edge!
      return { x: 65, y: 65.5, action: 'Mengetik Label: "Buka Google Maps"', isClicking: false, isStill: true };
    } else if (progress < 74) {
      // Clicks outside to finalize button
      return { x: 76, y: 62, action: 'Selesai & Deselect', isClicking: progress >= 67 && progress <= 69, isStill: false };
    } else {
      // Finished / idle celebration
      return { x: 18, y: 8, action: 'Jadwal & Tombol Lokasi Siap! ❤️', isClicking: false, isStill: true };
    }
  }, [progress]);

  // 2. Windi Cursor (Amber)
  const windiCursor = React.useMemo(() => {
    if (progress < 4) {
      // Moving to hero typography area
      const t = progress / 4;
      return { x: 42 + t * 6, y: 18 + t * 6, action: 'Memilih Area Nama Mempelai', isClicking: false, isStill: false };
    } else if (progress < 9) {
      // Dragging text box for names
      const t = (progress - 4) / 5;
      return { x: 36 + t * 28, y: 24 + t * 5, action: 'Drag Ukuran: 260 x 54px', isClicking: true, isStill: false };
    } else if (progress < 22) {
      // TYPING: STAYS STILL while typing couple names!
      return { x: 65, y: 26.5, action: 'Mengetik "Arif & Windi"...', isClicking: false, isStill: true };
    } else if (progress < 26) {
      // Moving to floating font inspector panel
      const t = (progress - 22) / 4;
      return { x: 65 + t * 8, y: 26 - t * 4, action: 'Membuka Dropdown Font...', isClicking: progress >= 24, isStill: false };
    } else if (progress < 36) {
      // Selecting Cormorant Garamond & Italic toggle
      return { x: 74, y: 21, action: 'Memilih Cormorant Garamond Italic', isClicking: progress >= 28 && progress <= 31, isStill: true };
    } else if (progress < 44) {
      // Dragging size slider to 50px
      const t = (progress - 36) / 8;
      return { x: 74 + t * 5, y: 25, action: 'Slider Ukuran: 50px', isClicking: true, isStill: false };
    } else if (progress < 48) {
      // Clicks outside on canvas to confirm font
      return { x: 80, y: 32, action: 'Klik Luar: Konfirmasi Tipografi', isClicking: progress >= 44 && progress <= 46, isStill: false };
    } else if (progress < 54) {
      // Drops Botanical Sage Dot [O]
      const t = (progress - 48) / 6;
      return { x: 50 + (1 - t) * 6, y: 34 + t * 1.5, action: 'Drop Aksen: Titik Sage #047857', isClicking: true, isStill: false };
    } else if (progress < 68) {
      // Styling flanking divider lines
      return { x: 50, y: 35.5, action: 'Menambahkan Garis Ornamen', isClicking: false, isStill: true };
    } else if (progress < 74) {
      // Clicks outside
      return { x: 78, y: 38, action: 'Klik Luar: Deselect Focus', isClicking: progress >= 68 && progress <= 70, isStill: false };
    } else {
      // Finished / idle celebration
      return { x: 82, y: 24, action: 'Tipografinya Elegan Banget! ✨', isClicking: false, isStill: true };
    }
  }, [progress]);

  // 3. Reza Cursor (Royal Blue)
  const rezaCursor = React.useMemo(() => {
    if (progress < 4) {
      // Moving to avatar header
      const t = progress / 4;
      return { x: 38 + t * 10, y: 12 + t * 2, action: 'Memilih Tool Lingkaran [O]', isClicking: false, isStill: false };
    } else if (progress < 9) {
      // Dragging circular frame for avatar
      const t = (progress - 4) / 5;
      return { x: 48 + t * 4, y: 14 + t * 3, action: 'Drag Frame Foto: 64 x 64px', isClicking: true, isStill: false };
    } else if (progress < 19) {
      // Setting image fill and gold ring border: STAYS STILL
      return { x: 53, y: 16, action: 'Memasang Foto & Border Emas', isClicking: progress >= 12 && progress <= 14, isStill: true };
    } else if (progress < 24) {
      // Clicks outside to deselect avatar
      return { x: 68, y: 15, action: 'Klik Luar: Deselect Foto', isClicking: progress >= 19 && progress <= 21, isStill: false };
    } else if (progress < 29) {
      // Moving to Quote card area & dragging box
      const t = (progress - 24) / 5;
      return { x: 32 + t * 36, y: 41 + t * 5, action: 'Drag Frame Kutipan Ar-Rum', isClicking: true, isStill: false };
    } else if (progress < 33) {
      // Drops Heart Icon at top of verse card
      return { x: 50, y: 43, action: 'Drop Ikon Heart Sage', isClicking: progress >= 30 && progress <= 32, isStill: false };
    } else if (progress < 49) {
      // TYPING: STAYS STILL at the side of quote card!
      return { x: 68, y: 46, action: 'Mengetik QS. Ar-Rum: 21...', isClicking: false, isStill: true };
    } else if (progress < 54) {
      // Clicks outside to deselect quote card
      return { x: 78, y: 47, action: 'Klik Luar: Deselect Kutipan', isClicking: progress >= 49 && progress <= 51, isStill: false };
    } else if (progress < 72) {
      // Selects Main Canvas Frame & applies Auto-Layout [Shift+A]
      return { x: 50, y: 5, action: 'Auto-Layout [Shift+A]: Gap 14px', isClicking: progress >= 56 && progress <= 60, isStill: true };
    } else {
      // Finished / idle celebration
      return { x: 16, y: 42, action: 'Auto-Layout Presisi 100%! 💍', isClicking: false, isStill: true };
    }
  }, [progress]);

  // 4. Budi Cursor (Purple)
  const budiCursor = React.useMemo(() => {
    if (progress < 5) {
      // Moving to left assets library
      const t = progress / 5;
      return { x: 26 - t * 12, y: 68 + t * 3, action: 'Mengambil Komponen Amplop', isClicking: false, isStill: false };
    } else if (progress < 12) {
      // Dragging envelope component into canvas
      const t = (progress - 5) / 7;
      return { x: 14 + t * 36, y: 71 + t * 3, action: 'Drag Komponen: Amplop Digital', isClicking: true, isStill: false };
    } else if (progress < 23) {
      // Setting card radius 16px and shadow: STAYS STILL
      return { x: 66, y: 73, action: 'Setting R: 16px & Border #E7E5E4', isClicking: progress >= 15 && progress <= 17, isStill: true };
    } else if (progress < 26) {
      // Clicks outside to deselect
      return { x: 78, y: 70, action: 'Klik Luar: Deselect Frame', isClicking: progress >= 23 && progress <= 25, isStill: false };
    } else if (progress < 45) {
      // Adding bank accounts & badges: STAYS STILL
      return { x: 62, y: 75, action: 'Menyematkan BCA & Mandiri', isClicking: progress >= 30 && progress <= 32, isStill: true };
    } else if (progress < 50) {
      // Moving to grab QRIS barcode asset
      const t = (progress - 45) / 5;
      return { x: 62 - t * 30, y: 75 + t * 2, action: 'Mengambil Barcode QRIS', isClicking: false, isStill: false };
    } else if (progress < 56) {
      // Dragging QRIS into center of envelope
      const t = (progress - 50) / 6;
      return { x: 32 + t * 18, y: 77 + t * 1, action: 'Drag QRIS ke Tengah', isClicking: true, isStill: false };
    } else if (progress < 69) {
      // Centering QRIS with magenta snap guide: STAYS STILL
      return { x: 50, y: 78, action: 'Auto-Snap Center QRIS Merchant', isClicking: progress >= 58 && progress <= 61, isStill: true };
    } else if (progress < 74) {
      // Clicks outside to finalize
      return { x: 76, y: 80, action: 'Klik Luar: Finalisasi Amplop', isClicking: progress >= 69 && progress <= 71, isStill: false };
    } else {
      // Finished / idle celebration
      return { x: 84, y: 84, action: 'QRIS & Rekening Siap! 🎉', isClicking: false, isStill: true };
    }
  }, [progress]);

  // Handle Scrub
  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    setProgress(newProgress);
  };

  const handleSkipToFinish = () => {
    setProgress(100);
    onFinishCrafting?.();
  };

  const handleReplay = () => {
    setProgress(0);
    setIsPlaying(true);
  };

  return (
    <div className="relative w-full min-h-[700px] bg-[#222222] p-2 sm:p-5 select-none overflow-hidden rounded-3xl border border-stone-700 shadow-2xl font-sans text-stone-100">
      {/* Background Dot Grid khas Figma Canvas */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#9CA3AF 1.2px, transparent 1.2px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Top Figma Application Header Bar */}
      <div className="relative z-30 mb-3 bg-[#1A1A1A] border border-stone-800 rounded-2xl p-2 sm:px-4 sm:py-2 flex flex-wrap items-center justify-between gap-2 shadow-lg text-xs">
        {/* Left: Project title & Figma Tools icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 font-semibold text-white tracking-wide">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-stone-300">
              Figma Multiplayer Crafting
            </span>
          </div>

          {/* Quick tool selector badges */}
          <div className="hidden lg:flex items-center gap-1.5 bg-stone-900 px-2.5 py-1 rounded-lg border border-stone-800 text-[10px] text-stone-400 font-mono">
            <span className="text-teal-400 font-bold flex items-center gap-0.5">
              <MousePointer className="w-3 h-3" /> V
            </span>
            <span>·</span>
            <span className="text-amber-400 font-bold flex items-center gap-0.5">
              <Type className="w-3 h-3" /> T
            </span>
            <span>·</span>
            <span className="text-blue-400 font-bold flex items-center gap-0.5">
              <LayoutGrid className="w-3 h-3" /> Auto-Layout
            </span>
          </div>
        </div>

        {/* Center: Active Collaborators Presence */}
        <div className="flex items-center -space-x-1.5 overflow-hidden py-0.5">
          {COLLABORATORS.map((user) => (
            <div
              key={user.id}
              className={`w-6 h-6 rounded-full border-2 border-stone-900 ${user.avatarBg} text-white text-[9px] font-bold flex items-center justify-center shadow-xs cursor-default`}
              title={`${user.name} (${user.role})`}
            >
              {user.name.charAt(0)}
            </div>
          ))}
          <span className="pl-2 text-[10px] font-mono text-emerald-400 font-medium hidden sm:inline">
            4 Bekerja Bebarengan
          </span>
        </div>

        {/* Right: Player Controls & Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Speed selector */}
          <button
            type="button"
            onClick={() => setSpeedMultiplier((prev) => (prev === 1 ? 1.5 : prev === 1.5 ? 2 : 1))}
            className="px-2 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 font-mono text-[10px] border border-stone-700 transition-colors cursor-pointer"
            title="Kecepatan Animasi"
          >
            {speedMultiplier}x Speed
          </button>

          {/* Play/Pause */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center gap-1 transition-colors cursor-pointer"
            title={isPlaying ? 'Jeda' : 'Putar'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            <span className="hidden sm:inline text-[11px]">{isPlaying ? 'Jeda' : 'Putar'}</span>
          </button>

          {/* Replay */}
          <button
            type="button"
            onClick={handleReplay}
            className="p-1.5 sm:px-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors cursor-pointer"
            title="Putar Ulang dari Awal"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Skip / Finish Button */}
          <button
            type="button"
            onClick={handleSkipToFinish}
            className="px-3 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-semibold flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer text-[11px]"
          >
            <span>Hasil Jadi</span>
            <FastForward className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Timeline Scrubbing Bar */}
      <div className="relative z-30 mb-3 px-1">
        <div
          onClick={handleScrub}
          className="relative w-full h-2.5 bg-stone-800 rounded-full cursor-pointer overflow-hidden border border-stone-700/80 group"
          title="Klik untuk loncat ke detik tertentu"
        >
          {/* Progress fill */}
          <div
            className="h-full bg-linear-to-r from-teal-500 via-amber-500 to-purple-500 transition-all duration-75 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-[9px] font-mono text-stone-400 mt-1 px-0.5">
          <span>00:00 · Drag &amp; Create</span>
          <span className="text-teal-400 font-semibold">{Math.round(progress)}% Real-time Designing</span>
          <span>00:16 · Undangan Selesai</span>
        </div>
      </div>

      {/* Main Work Area: Canvas Frame Ponsel 375px */}
      <div className="relative mx-auto max-w-sm w-full min-h-[600px] p-2 sm:p-0">
        {/* Frame Label Badge di Pojok Atas */}
        <div className="text-[10px] font-mono text-stone-400 font-semibold uppercase tracking-wider mb-1 flex items-center justify-between">
          <span># Mobile Frame · 375 x 812 (NikahPlan-Canvas)</span>
          <span className="text-[9px] text-stone-500 font-mono">Zoom: 100%</span>
        </div>

        {/* Center Vertical Smart Guide (Figma Magenta Guide) */}
        {(isDividerFocused || isQrisFocused || isAutoLayoutActive) && (
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-pink-500 z-30 pointer-events-none opacity-85" />
        )}

        {/* Horizontal Alignment Guides during Auto-Layout */}
        {isAutoLayoutActive && (
          <>
            <div className="absolute left-0 right-0 top-[24%] h-[1px] bg-pink-500/70 z-30 pointer-events-none" />
            <div className="absolute left-0 right-0 top-[45%] h-[1px] bg-pink-500/70 z-30 pointer-events-none" />
            <div className="absolute left-0 right-0 top-[65%] h-[1px] bg-pink-500/70 z-30 pointer-events-none" />
          </>
        )}

        {/* ========================================================================= */}
        {/* THE MOBILE CARD ITSELF */}
        {/* ========================================================================= */}
        <div
          className={`relative w-full bg-[#FAF8F5] rounded-3xl shadow-2xl overflow-hidden min-h-[580px] p-5 flex flex-col justify-between text-center transition-all duration-500 border-2 ${
            isAutoLayoutActive ? 'border-blue-500 shadow-blue-500/20' : 'border-stone-300'
          }`}
        >
          {/* 1. Header Teks Walimatul 'Urs (Arif) */}
          <div className="relative pt-1">
            {/* Dragging outline */}
            {isArifDraggingHeader && (
              <div className="h-6 border-2 border-dashed border-teal-500 bg-teal-50/40 rounded-md flex items-center justify-center text-[8px] font-mono text-teal-800">
                <span>[W: 240 x H: 22px]</span>
              </div>
            )}

            {/* Active Bounding Box when focused */}
            {isHeaderFocused && (
              <div className="absolute -inset-1 rounded-lg border-2 border-teal-600 pointer-events-none z-20 animate-in fade-in">
                <span className="absolute -top-3 left-1 text-[8px] font-bold text-white px-1 rounded-xs bg-teal-700 font-mono shadow-xs">
                  Arif · Text: 11px [T]
                </span>
                <div className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-white border border-teal-800" />
                <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-white border border-teal-800" />
                <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-white border border-teal-800" />
                <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-white border border-teal-800" />
              </div>
            )}

            {showHeaderBox && (
              <div className="text-[11px] uppercase tracking-[0.25em] font-semibold text-teal-800 min-h-[18px]">
                {walimatulText}
                {isHeaderFocused && <span className="inline-block w-1.5 h-3 bg-teal-800 ml-0.5 animate-pulse" />}
              </div>
            )}
          </div>

          {/* 2. Avatar Foto Pasangan Lingkaran dengan Ring Emas (Reza) */}
          <div className="relative my-1 flex justify-center">
            {isRezaDraggingAvatar && (
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-blue-500 bg-blue-50/40 flex items-center justify-center text-[8px] font-mono text-blue-700">
                <span>64 x 64</span>
              </div>
            )}

            {isAvatarFocused && (
              <div className="absolute -inset-1 w-[72px] h-[72px] rounded-full border-2 border-blue-600 pointer-events-none z-20 animate-in fade-in" />
            )}

            {showAvatarFrame && (
              <div className="relative w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-amber-200 via-stone-100 to-amber-300 shadow-md">
                <div className="w-full h-full rounded-full overflow-hidden bg-stone-200 flex items-center justify-center">
                  {showAvatarImage ? (
                    <img
                      src="/generated/avatar-groom.svg"
                      alt="Avatar Pasangan"
                      className="w-full h-full object-cover animate-in zoom-in-75 duration-300"
                    />
                  ) : (
                    <span className="text-[8px] font-mono text-stone-400">Loading Foto...</span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 3. Nama Mempelai Hero & Divider Dot (Windi) */}
          <div className="relative my-1">
            {/* Dragging outline */}
            {isWindiDraggingNames && (
              <div className="h-14 border-2 border-dashed border-amber-500 bg-amber-50/40 rounded-xl flex items-center justify-center text-[9px] font-mono text-amber-800">
                <span>[W: 260 x H: 54px · Cormorant Garamond]</span>
              </div>
            )}

            {/* Active Bounding Box when focused */}
            {isNamesFocused && (
              <div className="absolute -inset-1.5 rounded-xl border-2 border-amber-500 pointer-events-none z-20 animate-in fade-in">
                <span className="absolute -top-3.5 left-1 text-[8px] font-bold text-white px-1.5 py-0.2 rounded-xs bg-amber-600 font-mono shadow-xs">
                  Windi · {isCormorantFont ? 'Cormorant 50px Italic' : 'Inter Sans 36px'}
                </span>
                <div className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-white border border-amber-700" />
                <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-white border border-amber-700" />
                <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-white border border-amber-700" />
                <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-white border border-amber-700" />
              </div>
            )}

            {/* Floating Font Dropdown Mockup while Windi selects it */}
            {showFontDropdown && (
              <div className="absolute -top-14 right-2 bg-stone-900 text-white rounded-xl p-2 shadow-2xl border border-stone-700 z-30 text-left font-mono text-[9px] animate-in zoom-in-95">
                <div className="text-stone-400 text-[8px] uppercase tracking-wider mb-1">Font Family</div>
                <div className="bg-amber-600/30 text-amber-300 font-serif px-2 py-0.5 rounded-sm font-semibold flex items-center justify-between gap-2">
                  <span>✓ Cormorant Garamond</span>
                  <span className="text-[7px]">Serif</span>
                </div>
                <div className="text-stone-400 px-2 py-0.5 opacity-60">Inter Sans</div>
              </div>
            )}

            {showNamesBox && (
              <h2
                className={`text-stone-900 tracking-tight min-h-[50px] flex items-center justify-center transition-all duration-300 ${
                  isCormorantFont ? 'font-serif text-4xl sm:text-5xl font-bold' : 'font-sans text-3xl font-semibold'
                } ${isItalicFont ? 'italic' : ''}`}
              >
                {namesText}
                {isNamesFocused && !isCormorantFont && (
                  <span className="inline-block w-2 h-7 bg-stone-900 ml-1 animate-pulse" />
                )}
              </h2>
            )}

            {/* Botanical Sage Divider Dot & Flanking Ornaments */}
            {isWindiDraggingDivider && (
              <div className="h-4 border border-dashed border-amber-400 mx-auto w-24 rounded-full mt-1" />
            )}

            {showDividerDot && (
              <div className="relative flex items-center justify-center gap-2 mt-1">
                {showDividerLines && <div className="w-8 h-[1px] bg-teal-700/40 animate-in fade-in" />}
                <div className="w-2.5 h-2.5 rounded-full bg-teal-700 shadow-xs animate-in zoom-in" />
                {showDividerLines && <div className="w-8 h-[1px] bg-teal-700/40 animate-in fade-in" />}
              </div>
            )}
          </div>

          {/* 4. Ayat Suci QS. Ar-Rum: 21 (Reza) */}
          <div className="relative my-1">
            {isRezaDraggingVerse && (
              <div className="h-16 border-2 border-dashed border-blue-400 bg-blue-50/40 rounded-xl flex items-center justify-center text-[9px] font-mono text-blue-700">
                <span>[W: 300 x H: 68px · Quote Card]</span>
              </div>
            )}

            {isVerseFocused && (
              <div className="absolute -inset-1 rounded-xl border-2 border-blue-500 pointer-events-none z-20 animate-in fade-in">
                <span className="absolute -top-3 left-1 text-[8px] font-bold text-white px-1 rounded-xs bg-blue-600 font-mono shadow-xs">
                  Reza · Card Kutipan
                </span>
              </div>
            )}

            {showVerseCard && (
              <div className="bg-[#FAF6F0] rounded-2xl p-2.5 border border-stone-200/80 shadow-xs transition-all">
                {showVerseHeart && <Heart className="w-3 h-3 text-teal-700 mx-auto mb-1 opacity-70 animate-in zoom-in" />}
                <p className="font-serif italic text-[10.5px] text-stone-600 leading-relaxed min-h-[32px]">
                  &ldquo;{verseText}&rdquo;
                </p>
                {progress >= 42 && (
                  <p className="text-[8.5px] font-bold uppercase tracking-widest text-teal-800 font-mono mt-0.5">
                    QS. AR-RUM: 21
                  </p>
                )}
              </div>
            )}
          </div>

          {/* 5. Jadwal Tanggal & Venue (Arif) */}
          <div className="relative my-1">
            {isArifDraggingSchedule && (
              <div className="h-10 border-2 border-dashed border-teal-500 bg-teal-50/40 rounded-xl flex items-center justify-center text-[9px] font-mono text-teal-800">
                <span>[W: 300 x H: 36px · Pill Container]</span>
              </div>
            )}

            {isScheduleFocused && (
              <div className="absolute -inset-1 rounded-xl border-2 border-teal-600 pointer-events-none z-20 animate-in fade-in">
                <span className="absolute -top-3 left-1 text-[8px] font-bold text-white px-1 rounded-xs bg-teal-700 font-mono shadow-xs">
                  Arif · Pill Jadwal
                </span>
              </div>
            )}

            {showScheduleBox && (
              <div className="bg-stone-100 rounded-xl py-1.5 px-3 border border-stone-200 text-stone-700 flex items-center justify-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                <p className="text-[10.5px] font-mono font-medium tracking-wide truncate">
                  {scheduleText}
                  {isScheduleFocused && <span className="inline-block w-1.5 h-2.5 bg-stone-700 ml-0.5 animate-pulse" />}
                </p>
              </div>
            )}
          </div>

          {/* 6. Tombol Aksi Buka Google Maps (Arif) */}
          <div className="relative my-1">
            {isArifDraggingButton && (
              <div className="h-9 border-2 border-dashed border-teal-600 bg-teal-50/40 rounded-xl flex items-center justify-center text-[9px] font-mono text-teal-900">
                <span>[Button: 220 x 38px · Fill: #0F766E]</span>
              </div>
            )}

            {isButtonFocused && (
              <div className="absolute -inset-1 rounded-xl border-2 border-teal-600 pointer-events-none z-20 animate-in fade-in">
                <span className="absolute -top-3 left-1 text-[8px] font-bold text-white px-1 rounded-xs bg-teal-700 font-mono shadow-xs">
                  Arif · Action Button
                </span>
              </div>
            )}

            {showButtonBox && (
              <button
                type="button"
                className="w-full py-2 px-3 rounded-xl bg-teal-700 text-white font-medium text-[11px] shadow-xs flex items-center justify-center gap-1.5 transition-all hover:bg-teal-800"
              >
                {showButtonIcon && <MapPin className="w-3.5 h-3.5" />}
                <span>{buttonLabelText}</span>
                {isButtonFocused && <span className="inline-block w-1 h-3 bg-white ml-0.5 animate-pulse" />}
              </button>
            )}
          </div>

          {/* 7. Komponen Amplop Digital, Bank & QRIS (Budi) */}
          <div className="relative mt-1">
            {isBudiDraggingEnvelope && (
              <div className="h-16 border-2 border-dashed border-purple-500 bg-purple-50/40 rounded-2xl flex items-center justify-center text-[9px] font-mono text-purple-800">
                <span>[W: 310 x H: 105px · Amplop Digital &amp; QRIS]</span>
              </div>
            )}

            {(isEnvelopeFocused || isBankFocused || isQrisFocused) && (
              <div className="absolute -inset-1.5 rounded-2xl border-2 border-purple-600 pointer-events-none z-20 animate-in fade-in">
                <span className="absolute -top-3.5 left-1 text-[8px] font-bold text-white px-1.5 py-0.2 rounded-xs bg-purple-600 font-mono shadow-xs">
                  Budi · {isQrisFocused ? 'QRIS Component Center' : 'Amplop Digital'}
                </span>
              </div>
            )}

            {showEnvelopeCard && (
              <div className="bg-white rounded-2xl p-2.5 border border-stone-200 shadow-xs text-left text-xs transition-all animate-in slide-in-from-bottom-2">
                <div className="flex items-center justify-between text-teal-800 font-bold mb-1">
                  <span className="flex items-center gap-1 text-[11px]">
                    <CreditCard className="w-3 h-3" />
                    <span>Amplop Digital &amp; QRIS</span>
                  </span>
                  <span className="text-[8.5px] text-purple-700 font-mono font-semibold bg-purple-50 px-1.5 py-0.2 rounded-sm border border-purple-200">
                    Auto-Centered
                  </span>
                </div>

                {/* Bank Badges & Account Numbers */}
                {showBankBadges && (
                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-stone-600 mb-1.5 bg-stone-50 p-1 rounded-lg border border-stone-200">
                    <span className="font-bold text-blue-700">BCA</span>
                    <span>1234567890</span>
                    <span className="text-stone-300">|</span>
                    <span className="font-bold text-amber-700">Mandiri</span>
                    <span>9876543210</span>
                  </div>
                )}

                {/* QRIS Barcode */}
                {showQrisBarcode && (
                  <div className="flex items-center gap-2 bg-stone-50 p-1.5 rounded-xl border border-stone-200 animate-in zoom-in-95">
                    <div className="w-8 h-8 bg-teal-800 text-white rounded-lg flex items-center justify-center font-mono font-bold text-[9px] shrink-0">
                      QRIS
                    </div>
                    <div className="truncate">
                      <div className="text-[10px] font-bold text-stone-800 truncate">
                        NikahPlan: {groomNick} &amp; {brideNick}
                      </div>
                      <div className="text-[8px] text-stone-500">Scan BCA, Mandiri, Gopay, ShopeePay</div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Selesai / Celebration Footer Notification */}
          {progress >= 95 && (
            <div className="mt-2 p-2 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 animate-in fade-in flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-semibold text-[11px]">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
                <span>Undangan Selesai Dirakit Berempat!</span>
              </span>
              <button
                type="button"
                onClick={onFinishCrafting}
                className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-medium text-[10px] cursor-pointer"
              >
                Buka Penuh
              </button>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 4 CURSORS SIMULTANEOUS MULTIPLAYER OVERLAYS (STILL WHILE TYPING) */}
        {/* ========================================================================= */}

        {/* Cursor 1: Arif (Teal) */}
        <div
          className={`absolute z-40 pointer-events-none flex flex-col items-start ${
            arifCursor.isStill ? 'transition-none' : 'transition-all duration-300 ease-out'
          }`}
          style={{
            left: `${arifCursor.x}%`,
            top: `${arifCursor.y}%`,
          }}
        >
          {/* Click Ripple Pulse (only fires on actual clicks, not repeated) */}
          {arifCursor.isClicking && (
            <div className="absolute -top-2 -left-2 w-7 h-7 rounded-full border-2 border-teal-400 bg-teal-400/20 animate-ping pointer-events-none" />
          )}

          <svg className="w-5 h-5 drop-shadow-md" viewBox="0 0 24 24" fill="#0F766E" stroke="white" strokeWidth="1.5">
            <path d="M5.5 3.5l14 7-6.5 2-2 6.5-5.5-15.5z" />
          </svg>

          <div className="text-[9px] font-bold text-white px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap ml-3 -mt-1 bg-teal-700 flex items-center gap-1">
            <span>Arif (Mempelai)</span>
            {arifCursor.isStill && <span className="w-1.5 h-1.5 rounded-full bg-teal-300 animate-pulse" />}
          </div>

          <div className="bg-[#1A1A1A]/95 text-stone-200 text-[8.5px] px-2 py-0.5 rounded-md shadow-md mt-0.5 ml-3 font-mono border border-stone-700 whitespace-nowrap animate-in fade-in">
            <span>{arifCursor.action}</span>
          </div>
        </div>

        {/* Cursor 2: Windi (Amber) */}
        <div
          className={`absolute z-40 pointer-events-none flex flex-col items-start ${
            windiCursor.isStill ? 'transition-none' : 'transition-all duration-300 ease-out'
          }`}
          style={{
            left: `${windiCursor.x}%`,
            top: `${windiCursor.y}%`,
          }}
        >
          {windiCursor.isClicking && (
            <div className="absolute -top-2 -left-2 w-7 h-7 rounded-full border-2 border-amber-400 bg-amber-400/20 animate-ping pointer-events-none" />
          )}

          <svg className="w-5 h-5 drop-shadow-md" viewBox="0 0 24 24" fill="#D97706" stroke="white" strokeWidth="1.5">
            <path d="M5.5 3.5l14 7-6.5 2-2 6.5-5.5-15.5z" />
          </svg>

          <div className="text-[9px] font-bold text-white px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap ml-3 -mt-1 bg-amber-600 flex items-center gap-1">
            <span>Windi (Mempelai)</span>
            {windiCursor.isStill && <span className="w-1.5 h-1.5 rounded-full bg-amber-200 animate-pulse" />}
          </div>

          <div className="bg-[#1A1A1A]/95 text-stone-200 text-[8.5px] px-2 py-0.5 rounded-md shadow-md mt-0.5 ml-3 font-mono border border-stone-700 whitespace-nowrap animate-in fade-in">
            <span>{windiCursor.action}</span>
          </div>
        </div>

        {/* Cursor 3: Reza (Royal Blue) */}
        <div
          className={`absolute z-40 pointer-events-none flex flex-col items-start ${
            rezaCursor.isStill ? 'transition-none' : 'transition-all duration-300 ease-out'
          }`}
          style={{
            left: `${rezaCursor.x}%`,
            top: `${rezaCursor.y}%`,
          }}
        >
          {rezaCursor.isClicking && (
            <div className="absolute -top-2 -left-2 w-7 h-7 rounded-full border-2 border-blue-400 bg-blue-400/20 animate-ping pointer-events-none" />
          )}

          <svg className="w-5 h-5 drop-shadow-md" viewBox="0 0 24 24" fill="#2563EB" stroke="white" strokeWidth="1.5">
            <path d="M5.5 3.5l14 7-6.5 2-2 6.5-5.5-15.5z" />
          </svg>

          <div className="text-[9px] font-bold text-white px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap ml-3 -mt-1 bg-blue-600 flex items-center gap-1">
            <span>Reza Pratama</span>
            {rezaCursor.isStill && <span className="w-1.5 h-1.5 rounded-full bg-blue-200 animate-pulse" />}
          </div>

          <div className="bg-[#1A1A1A]/95 text-stone-200 text-[8.5px] px-2 py-0.5 rounded-md shadow-md mt-0.5 ml-3 font-mono border border-stone-700 whitespace-nowrap animate-in fade-in">
            <span>{rezaCursor.action}</span>
          </div>
        </div>

        {/* Cursor 4: Budi (Purple) */}
        <div
          className={`absolute z-40 pointer-events-none flex flex-col items-start ${
            budiCursor.isStill ? 'transition-none' : 'transition-all duration-300 ease-out'
          }`}
          style={{
            left: `${budiCursor.x}%`,
            top: `${budiCursor.y}%`,
          }}
        >
          {budiCursor.isClicking && (
            <div className="absolute -top-2 -left-2 w-7 h-7 rounded-full border-2 border-purple-400 bg-purple-400/20 animate-ping pointer-events-none" />
          )}

          <svg className="w-5 h-5 drop-shadow-md" viewBox="0 0 24 24" fill="#7C3AED" stroke="white" strokeWidth="1.5">
            <path d="M5.5 3.5l14 7-6.5 2-2 6.5-5.5-15.5z" />
          </svg>

          <div className="text-[9px] font-bold text-white px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap ml-3 -mt-1 bg-purple-600 flex items-center gap-1">
            <span>Budi Santoso</span>
            {budiCursor.isStill && <span className="w-1.5 h-1.5 rounded-full bg-purple-200 animate-pulse" />}
          </div>

          <div className="bg-[#1A1A1A]/95 text-stone-200 text-[8.5px] px-2 py-0.5 rounded-md shadow-md mt-0.5 ml-3 font-mono border border-stone-700 whitespace-nowrap animate-in fade-in">
            <span>{budiCursor.action}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
