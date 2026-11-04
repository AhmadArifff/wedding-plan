'use client';

import * as React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Type,
  MousePointer,
  CheckCircle,
  CreditCard,
  Heart,
  Calendar,
  MapPin,
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
  { id: 'arif', name: 'Arif (Mempelai Pria)', role: 'Header, Jadwal & Peta Lokasi', color: '#0F766E', avatarBg: 'bg-teal-700' },
  { id: 'windi', name: 'Windi (Mempelai Wanita)', role: 'Foto, Tipografi & Amplop QRIS', color: '#D97706', avatarBg: 'bg-amber-600' },
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

  // Animation frame / timer loop (Total duration: 22 seconds at 1x speed for unhurried, natural human pacing)
  React.useEffect(() => {
    if (!isPlaying) return;

    const stepDuration = 50; // ms
    const increment = (stepDuration / (22000 / speedMultiplier)) * 100;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return Math.min(100, prev + increment);
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, [isPlaying, speedMultiplier]);

  // =========================================================================
  // ARIF'S TRACK (Header -> Schedule Pill -> Google Maps Button)
  // WITH SETTLE PAUSES, CLICK-TO-EDIT, TYPING STILLNESS, AND INSPECT PAUSES
  // =========================================================================

  // 1a. Header:
  // - Travel (0-3%)
  // - Drag-to-size (3-6.5%)
  // - Settle Pause (6.5-8.5%): box exists empty, cursor checking position
  // - Click to Edit (8.5-10.5%): cursor clicks inside box
  // - Typing STILL (10.5-18%): text types smoothly
  // - Inspect Pause (18-20%): pauses reading text
  // - Deselect (20-22%): clicks outside
  const isArifDraggingHeader = progress >= 3 && progress < 6.5;
  const showHeaderBox = progress >= 6.5;
  const isHeaderEditMode = progress >= 8.5 && progress < 20;
  const walimatulTarget = "WALIMATUL 'URS";
  const walimatulProgress = Math.min(1, Math.max(0, (progress - 10.5) / 7.5));
  const walimatulText = walimatulTarget.slice(0, Math.floor(walimatulProgress * walimatulTarget.length));

  // 1b. Schedule Pill:
  // - Travel (22-25%)
  // - Drag-to-size (25-29%)
  // - Settle Pause (29-31%): pill exists empty, cursor pauses
  // - Click to Edit (31-33%): cursor clicks inside pill
  // - Typing STILL (33-43%): date and venue text types
  // - Inspect Pause (43-45%): pauses verifying schedule
  // - Deselect (45-47.5%): clicks outside
  const isArifDraggingSchedule = progress >= 25 && progress < 29;
  const showScheduleBox = progress >= 29;
  const isScheduleEditMode = progress >= 31 && progress < 45;
  const scheduleTarget = `${weddingDateFormatted} · ${venueName}`;
  const scheduleProgress = Math.min(1, Math.max(0, (progress - 33) / 10));
  const scheduleText = scheduleTarget.slice(0, Math.floor(scheduleProgress * scheduleTarget.length));

  // 1c. Maps Button:
  // - Travel (47.5-50.5%)
  // - Drag-to-size (50.5-54.5%)
  // - Settle Pause (54.5-56.5%): button appears with icon, cursor pauses
  // - Click to Edit (56.5-58.5%): cursor clicks inside button
  // - Typing STILL (58.5-67.5%): button label types
  // - Inspect Pause (67.5-69.5%): pauses checking CTA button
  // - Deselect (69.5-71.5%): clicks outside
  const isArifDraggingButton = progress >= 50.5 && progress < 54.5;
  const showButtonBox = progress >= 54.5;
  const isButtonEditMode = progress >= 56.5 && progress < 69.5;
  const buttonLabelTarget = 'Buka Peta Lokasi (Google Maps)';
  const buttonLabelProgress = Math.min(1, Math.max(0, (progress - 58.5) / 9));
  const buttonLabelText = buttonLabelTarget.slice(0, Math.floor(buttonLabelProgress * buttonLabelTarget.length));

  // =========================================================================
  // WINDI'S TRACK (Avatar Foto -> Hero Names -> Font Dropdown -> Amplop QRIS)
  // WITH SETTLE PAUSES, CLICK-TO-EDIT, TYPING STILLNESS, AND INSPECT PAUSES
  // =========================================================================

  // 2a. Avatar Foto:
  // - Travel (0-3.5%)
  // - Drag-to-size (3.5-7.5%)
  // - Settle Pause (7.5-10%): circle frame exists empty, cursor pauses
  // - Click to Drop Asset (10-12.5%): clicks inside, image & gold ring pop in
  // - Inspect Pause (12.5-17%): pauses admiring couple avatar
  // - Deselect (17-19.5%): clicks outside
  const isWindiDraggingAvatar = progress >= 3.5 && progress < 7.5;
  const showAvatarBox = progress >= 7.5;
  const showAvatarImage = progress >= 11;
  const isAvatarEditMode = progress >= 7.5 && progress < 17;

  // 2b. Hero Names:
  // - Travel (19.5-23%)
  // - Drag-to-size (23-27%)
  // - Settle Pause (27-29%): names box exists empty, cursor pauses
  // - Click to Edit (29-31%): clicks inside box, caret activates
  // - Typing STILL (31-39%): types "Arif & Windi" in regular font
  // - Inspect Pause (39-41%): pauses looking at raw text
  // - Font Dropdown Open (41-44%): moves to property inspector, opens dropdown
  // - Font Selection & Deliberation (44-47%): selects Cormorant Garamond, transforms to serif
  // - Italic & Size Tuning (47-50%): clicks Italic & sets 50px
  // - Deselect (50-52.5%): clicks outside
  const isWindiDraggingNames = progress >= 23 && progress < 27;
  const showNamesBox = progress >= 27;
  const isNamesEditMode = progress >= 29 && progress < 50;
  const namesTarget = `${groomNick} & ${brideNick}`;
  const namesProgress = Math.min(1, Math.max(0, (progress - 31) / 8));
  const namesText = namesTarget.slice(0, Math.floor(namesProgress * namesTarget.length));
  const showFontDropdown = progress >= 41 && progress < 47;
  const isCormorantFont = progress >= 44;
  const isItalicFont = progress >= 47;

  // 2c. Botanical Sage Divider Dot & Lines:
  // - Travel (52.5-55.5%)
  // - Drag-to-size (55.5-59%)
  // - Settle Pause (59-61%): dot appears, cursor pauses
  // - Flanking lines appear (61-64%): rests STILL checking divider
  // - Deselect (64-66.5%): clicks outside
  const isWindiDraggingDivider = progress >= 55.5 && progress < 59;
  const showDividerDot = progress >= 59;
  const showDividerLines = progress >= 61.5;
  const isDividerEditMode = progress >= 59 && progress < 64;

  // 2d. Amplop Digital & QRIS:
  // - Travel (66.5-70%)
  // - Drag-to-size (70-75%)
  // - Settle Pause (75-78%): card appears empty with shadow, cursor pauses
  // - Click to Configure (78-81%): clicks inside, bank badges slide in
  // - QRIS Snap to Center (81-86.5%): QRIS drops, magenta guide lines HOLD for inspection
  // - Inspect Pause (86.5-89%): pauses verifying QRIS details
  // - Deselect (89-91.5%): clicks outside to finalize
  const isWindiDraggingEnvelope = progress >= 70 && progress < 75;
  const showEnvelopeBox = progress >= 75;
  const showBankBadges = progress >= 79;
  const showQrisBarcode = progress >= 82;
  const isEnvelopeEditMode = progress >= 75 && progress < 89;
  const isQrisGuideActive = progress >= 81.5 && progress < 86.5;

  // =========================================================================
  // ARIF'S UNHURRIED HUMAN CURSOR MOTION (SETTLE, CLICK, TYPE, INSPECT, BLUR)
  // =========================================================================
  const arifCursor = React.useMemo(() => {
    // Stage 1: Header (x1: 15, y1: 3.5) -> (x2: 85, y2: 8)
    if (progress < 3) {
      // Travel to top-left of Header
      const t = progress / 3;
      return { x: 30 - t * 15, y: 1 + t * 2.5, action: 'Menuju Titik Awal Header', isClicking: false, isStill: false };
    } else if (progress < 6.5) {
      // DRAG TO SIZE: from (15, 3.5) to (85, 8)
      const t = (progress - 3) / 3.5;
      return { x: 15 + t * 70, y: 3.5 + t * 4.5, action: `Drag Ukuran: ${Math.round(t * 260)} x 22px`, isClicking: true, isStill: false };
    } else if (progress < 8.5) {
      // SETTLE PAUSE: Mouse released, inspecting empty header box placement!
      return { x: 85, y: 8, action: 'Memeriksa Posisi Kotak Header...', isClicking: false, isStill: true };
    } else if (progress < 10.5) {
      // CLICK TO EDIT: Moves inside box and clicks to enter edit mode!
      const t = (progress - 8.5) / 2;
      return { x: 85 - t * 35, y: 8 - t * 2, action: 'Klik Masuk Mode Edit Teks [T]', isClicking: progress >= 9.5 && progress <= 10.3, isStill: false };
    } else if (progress < 18) {
      // TYPING: STAYS COMPLETELY STILL at right edge while text types!
      return { x: 86, y: 6, action: 'Mengetik "WALIMATUL \'URS"...', isClicking: false, isStill: true };
    } else if (progress < 20) {
      // INSPECT PAUSE: Pauses reading what was just typed
      return { x: 86, y: 6, action: 'Memeriksa Teks Header...', isClicking: false, isStill: true };
    } else if (progress < 22) {
      // Deselect: moves to canvas background and clicks
      const t = (progress - 20) / 2;
      return { x: 86 + t * 4, y: 6 + t * 5, action: 'Klik Luar: Deselect Header', isClicking: progress >= 20.8 && progress <= 21.6, isStill: false };
    }

    // Stage 2: Schedule Pill (x1: 8, y1: 49) -> (x2: 92, y2: 56.5)
    else if (progress < 25) {
      // Travel down toward schedule pill
      const t = (progress - 22) / 3;
      return { x: 90 - t * 82, y: 11 + t * 38, action: 'Menuju Area Jadwal & Gedung', isClicking: false, isStill: false };
    } else if (progress < 29) {
      // DRAG TO SIZE: from (8, 49) to (92, 56.5)
      const t = (progress - 25) / 4;
      return { x: 8 + t * 84, y: 49 + t * 7.5, action: `Drag Container: ${Math.round(t * 310)} x 36px`, isClicking: true, isStill: false };
    } else if (progress < 31) {
      // SETTLE PAUSE: Container placed, cursor checks position
      return { x: 92, y: 56.5, action: 'Memeriksa Penempatan Pill...', isClicking: false, isStill: true };
    } else if (progress < 33) {
      // CLICK TO EDIT: Moves inside and clicks to edit schedule text
      const t = (progress - 31) / 2;
      return { x: 92 - t * 42, y: 56.5 - t * 3.5, action: 'Klik Edit Teks Jadwal', isClicking: progress >= 32 && progress <= 32.8, isStill: false };
    } else if (progress < 43) {
      // TYPING: STAYS COMPLETELY STILL at right edge while date types!
      return { x: 93, y: 53, action: 'Mengetik Tanggal & Gedung...', isClicking: false, isStill: true };
    } else if (progress < 45) {
      // INSPECT PAUSE: Pauses checking date and venue details
      return { x: 93, y: 53, action: 'Memeriksa Jadwal & Gedung...', isClicking: false, isStill: true };
    } else if (progress < 47.5) {
      // Deselect: clicks outside
      const t = (progress - 45) / 2.5;
      return { x: 93 + t * 2, y: 53 - t * 7, action: 'Klik Luar: Deselect Jadwal', isClicking: progress >= 46.2 && progress <= 47, isStill: false };
    }

    // Stage 3: Maps Button (x1: 12, y1: 58.5) -> (x2: 88, y2: 65.5)
    else if (progress < 50.5) {
      // Travel to top-left of Maps Button
      const t = (progress - 47.5) / 3;
      return { x: 95 - t * 83, y: 46 + t * 12.5, action: 'Menuju Titik Awal Tombol', isClicking: false, isStill: false };
    } else if (progress < 54.5) {
      // DRAG TO SIZE: from (12, 58.5) to (88, 65.5)
      const t = (progress - 50.5) / 4;
      return { x: 12 + t * 76, y: 58.5 + t * 7, action: `Drag Tombol: ${Math.round(t * 280)} x 38px`, isClicking: true, isStill: false };
    } else if (progress < 56.5) {
      // SETTLE PAUSE: Button appears, pauses checking styling
      return { x: 88, y: 65.5, action: 'Memeriksa Bentuk Tombol...', isClicking: false, isStill: true };
    } else if (progress < 58.5) {
      // CLICK TO EDIT: Clicks inside button
      const t = (progress - 56.5) / 2;
      return { x: 88 - t * 38, y: 65.5 - t * 3.5, action: 'Klik Edit Label Tombol', isClicking: progress >= 57.5 && progress <= 58.3, isStill: false };
    } else if (progress < 67.5) {
      // TYPING: STAYS COMPLETELY STILL at button label edge!
      return { x: 89, y: 62, action: 'Mengetik Label: "Buka Google Maps"', isClicking: false, isStill: true };
    } else if (progress < 69.5) {
      // INSPECT PAUSE: Pauses checking completed button
      return { x: 89, y: 62, action: 'Memeriksa Tombol Peta...', isClicking: false, isStill: true };
    } else if (progress < 71.5) {
      // Deselect: clicks outside
      const t = (progress - 69.5) / 2;
      return { x: 89 + t * 4, y: 62 + t * 5, action: 'Klik Luar: Deselect Tombol', isClicking: progress >= 70.3 && progress <= 71.1, isStill: false };
    }

    // Stage 4: Finished & peaceful celebration
    else {
      return { x: 14, y: 8, action: 'Jadwal & Lokasi Siap, Sayang! ❤️', isClicking: false, isStill: true };
    }
  }, [progress]);

  // =========================================================================
  // WINDI'S UNHURRIED HUMAN CURSOR MOTION (SETTLE, CLICK, TYPE, INSPECT, BLUR)
  // =========================================================================
  const windiCursor = React.useMemo(() => {
    // Stage 1: Avatar Foto (x1: 40, y1: 10.5) -> (x2: 60, y2: 21.5)
    if (progress < 3.5) {
      // Travel to top-left of Avatar
      const t = progress / 3.5;
      return { x: 70 - t * 30, y: 3 + t * 7.5, action: 'Menuju Frame Foto', isClicking: false, isStill: false };
    } else if (progress < 7.5) {
      // DRAG TO SIZE: from (40, 10.5) to (60, 21.5)
      const t = (progress - 3.5) / 4;
      return { x: 40 + t * 20, y: 10.5 + t * 11, action: `Drag Frame: ${Math.round(t * 64)} x 64px`, isClicking: true, isStill: false };
    } else if (progress < 10) {
      // SETTLE PAUSE: Circular frame placed, cursor checks position
      return { x: 60, y: 21.5, action: 'Memeriksa Posisi Frame...', isClicking: false, isStill: true };
    } else if (progress < 12.5) {
      // CLICK TO DROP ASSET: Moves to center and clicks (image & gold ring appear)
      const t = (progress - 10) / 2.5;
      return { x: 60 - t * 10, y: 21.5 - t * 5.5, action: 'Memasang Foto & Ring Emas', isClicking: progress >= 11.2 && progress <= 12.2, isStill: false };
    } else if (progress < 17) {
      // INSPECT PAUSE: STAYS STILL admiring couple avatar!
      return { x: 61, y: 16, action: 'Mengagumi Foto Bersama...', isClicking: false, isStill: true };
    } else if (progress < 19.5) {
      // Deselect: clicks outside
      const t = (progress - 17) / 2.5;
      return { x: 61 + t * 7, y: 16 - t * 2, action: 'Klik Luar: Deselect Foto', isClicking: progress >= 18.2 && progress <= 19, isStill: false };
    }

    // Stage 2: Hero Names (x1: 10, y1: 23.5) -> (x2: 90, y2: 33.5)
    else if (progress < 23) {
      // Travel to top-left of Names
      const t = (progress - 19.5) / 3.5;
      return { x: 68 - t * 58, y: 14 + t * 9.5, action: 'Menuju Titik Awal Nama', isClicking: false, isStill: false };
    } else if (progress < 27) {
      // DRAG TO SIZE: from (10, 23.5) to (90, 33.5)
      const t = (progress - 23) / 4;
      return { x: 10 + t * 80, y: 23.5 + t * 10, action: `Drag Ukuran: ${Math.round(t * 290)} x 54px`, isClicking: true, isStill: false };
    } else if (progress < 29) {
      // SETTLE PAUSE: Names box placed, cursor pauses checking
      return { x: 90, y: 33.5, action: 'Memeriksa Posisi Kotak Nama...', isClicking: false, isStill: true };
    } else if (progress < 31) {
      // CLICK TO EDIT: Moves inside box and clicks to activate text caret
      const t = (progress - 29) / 2;
      return { x: 90 - t * 40, y: 33.5 - t * 5, action: 'Klik Masuk Mode Teks', isClicking: progress >= 29.8 && progress <= 30.6, isStill: false };
    } else if (progress < 39) {
      // TYPING: STAYS COMPLETELY STILL at right edge while names type!
      return { x: 91, y: 28.5, action: 'Mengetik "Arif & Windi"...', isClicking: false, isStill: true };
    } else if (progress < 41) {
      // INSPECT PAUSE: Pauses looking at the raw names
      return { x: 91, y: 28.5, action: 'Membaca Teks Nama...', isClicking: false, isStill: true };
    } else if (progress < 44) {
      // Moves to font dropdown inspector
      const t = (progress - 41) / 3;
      return { x: 91 - t * 15, y: 28.5 - t * 8.5, action: 'Membuka Dropdown Font...', isClicking: progress >= 42.5, isStill: false };
    } else if (progress < 47) {
      // FONT SELECTION PAUSE: Dropdown is open, hovers Cormorant Garamond, clicks!
      return { x: 76, y: 20, action: 'Memilih Cormorant Garamond (Serif)', isClicking: progress >= 45 && progress <= 46, isStill: true };
    } else if (progress < 50) {
      // Adjusts Italic & sets 50px font size
      return { x: 76, y: 20, action: 'Setting 50px Italic', isClicking: progress >= 48 && progress <= 49, isStill: true };
    } else if (progress < 52.5) {
      // Deselect: clicks outside on canvas
      const t = (progress - 50) / 2.5;
      return { x: 76 + t * 17, y: 20 + t * 14, action: 'Klik Luar: Konfirmasi Tipografi', isClicking: progress >= 51.2 && progress <= 52, isStill: false };
    }

    // Stage 3: Botanical Divider Dot (x1: 46, y1: 35) -> (x2: 54, y2: 38)
    else if (progress < 55.5) {
      // Travel to divider
      const t = (progress - 52.5) / 3;
      return { x: 93 - t * 47, y: 34 + t * 1, action: 'Menuju Aksen Divider', isClicking: false, isStill: false };
    } else if (progress < 59) {
      // DRAG TO SIZE: from (46, 35) to (54, 38)
      const t = (progress - 55.5) / 3.5;
      return { x: 46 + t * 8, y: 35 + t * 3, action: 'Drag Titik Aksen Sage...', isClicking: true, isStill: false };
    } else if (progress < 61) {
      // SETTLE PAUSE: Sage dot placed, pauses checking
      return { x: 54, y: 38, action: 'Memeriksa Titik Aksen...', isClicking: false, isStill: true };
    } else if (progress < 64) {
      // Flanking lines appear: STAYS STILL inspecting
      return { x: 55, y: 36.5, action: 'Menambahkan Garis Pembatas...', isClicking: false, isStill: true };
    } else if (progress < 66.5) {
      // Deselect: clicks outside
      const t = (progress - 64) / 2.5;
      return { x: 55 + t * 7, y: 36.5 + t * 0.5, action: 'Klik Luar: Deselect Aksen', isClicking: progress >= 65 && progress <= 65.8, isStill: false };
    }

    // Stage 4: Amplop Digital & QRIS (x1: 6, y1: 68) -> (x2: 94, y2: 93)
    else if (progress < 70) {
      // Travel down toward envelope
      const t = (progress - 66.5) / 3.5;
      return { x: 62 - t * 56, y: 37 + t * 31, action: 'Menuju Area Amplop & QRIS', isClicking: false, isStill: false };
    } else if (progress < 75) {
      // DRAG TO SIZE: from (6, 68) to (94, 93)
      const t = (progress - 70) / 5;
      return { x: 6 + t * 88, y: 68 + t * 25, action: `Drag Kartu Amplop: ${Math.round(t * 320)} x 120px`, isClicking: true, isStill: false };
    } else if (progress < 78) {
      // SETTLE PAUSE: Card container placed, cursor checks position
      return { x: 94, y: 93, action: 'Memeriksa Frame Amplop...', isClicking: false, isStill: true };
    } else if (progress < 81) {
      // CLICK TO CONFIGURE: Moves inside and clicks (bank badges appear)
      const t = (progress - 78) / 3;
      return { x: 94 - t * 44, y: 93 - t * 18, action: 'Menyematkan BCA & Mandiri', isClicking: progress >= 79.5 && progress <= 80.5, isStill: false };
    } else if (progress < 86.5) {
      // QRIS SNAP TO CENTER: Magenta guide line holds, cursor rests STILL verifying center!
      return { x: 50, y: 82, action: 'Auto-Snap Center QRIS Merchant...', isClicking: false, isStill: true };
    } else if (progress < 89) {
      // INSPECT PAUSE: Pauses checking complete envelope
      return { x: 95, y: 80, action: 'Memeriksa Barcode QRIS...', isClicking: false, isStill: true };
    } else if (progress < 91.5) {
      // Deselect: clicks outside
      const t = (progress - 89) / 2.5;
      return { x: 95 + t * 1, y: 80 + t * 14, action: 'Klik Luar: Finalisasi Undangan', isClicking: progress >= 90.2 && progress <= 91, isStill: false };
    }

    // Stage 5: Finished & peaceful celebration
    else {
      return { x: 82, y: 22, action: 'Undangan Kita Cantik Banget! ✨', isClicking: false, isStill: true };
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
    <div className="relative w-full min-h-[720px] bg-[#202020] p-2 sm:p-5 select-none overflow-hidden rounded-3xl border border-stone-700 shadow-2xl font-sans text-stone-100">
      {/* Background Dot Grid khas Figma Canvas */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#9CA3AF 1.2px, transparent 1.2px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Top Figma Application Header Bar */}
      <div className="relative z-30 mb-3 bg-[#181818] border border-stone-800 rounded-2xl p-2 sm:px-4 sm:py-2 flex flex-wrap items-center justify-between gap-2 shadow-lg text-xs">
        {/* Left: Project title */}
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-stone-200 font-semibold">
            NikahPlan · Desain Berdua (Arif &amp; Windi)
          </span>
        </div>

        {/* Center: 2 Collaborators Avatars */}
        <div className="flex items-center gap-2 bg-stone-900 px-3 py-1 rounded-full border border-stone-800 text-[10px] font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-600 inline-block" />
            <span className="text-teal-300 font-semibold">Arif</span>
          </div>
          <span className="text-stone-600">&amp;</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 inline-block" />
            <span className="text-amber-300 font-semibold">Windi</span>
          </div>
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
            className="h-full bg-linear-to-r from-teal-500 via-amber-500 to-teal-400 transition-all duration-75 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-[9px] font-mono text-stone-400 mt-1 px-0.5">
          <span>00:00 · Arif &amp; Windi Mulai Desain</span>
          <span className="text-teal-400 font-semibold">{Math.round(progress)}% Real-time Crafting</span>
          <span>00:22 · Undangan Selesai</span>
        </div>
      </div>

      {/* Main Work Area: Canvas Frame Ponsel 375px */}
      <div className="relative mx-auto max-w-sm w-full min-h-[620px] p-2 sm:p-0">
        {/* Frame Label Badge */}
        <div className="text-[10px] font-mono text-stone-400 font-semibold uppercase tracking-wider mb-1 flex items-center justify-between">
          <span># Mobile Frame · 375 x 812 (NikahPlan-Canvas)</span>
          <span className="text-[9px] text-stone-500 font-mono">Zoom: 100%</span>
        </div>

        {/* Center Vertical Smart Guide (Magenta Snap Guide - holds during QRIS centering) */}
        {(isDividerEditMode || isQrisGuideActive) && (
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-pink-500 z-30 pointer-events-none opacity-90 animate-in fade-in" />
        )}

        {/* ========================================================================= */}
        {/* THE MOBILE CARD ITSELF */}
        {/* ========================================================================= */}
        <div className="relative w-full bg-[#FAF8F5] rounded-3xl shadow-2xl overflow-hidden min-h-[600px] p-4 sm:p-5 flex flex-col justify-between text-center transition-all duration-500 border-2 border-stone-300">
          {/* 1. Header Teks Walimatul 'Urs (Arif) */}
          <div className="relative pt-1">
            {isHeaderEditMode && (
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

            {showHeaderBox ? (
              <div className="text-[11px] uppercase tracking-[0.25em] font-semibold text-teal-800 min-h-[18px]">
                {walimatulText}
                {isHeaderEditMode && progress >= 10.5 && progress < 18 && (
                  <span className="inline-block w-1.5 h-3 bg-teal-800 ml-0.5 animate-pulse" />
                )}
                {/* Empty box placeholder while settling */}
                {progress >= 6.5 && progress < 10.5 && (
                  <span className="text-[9px] font-mono text-teal-600/50 italic tracking-normal">[Kotak Teks Header]</span>
                )}
              </div>
            ) : (
              <div className="h-5" />
            )}
          </div>

          {/* 2. Avatar Foto Pasangan Lingkaran dengan Ring Emas (Windi) */}
          <div className="relative my-0.5 flex justify-center">
            {isAvatarEditMode && (
              <div className="absolute -inset-1 w-[72px] h-[72px] rounded-full border-2 border-amber-500 pointer-events-none z-20 animate-in fade-in">
                <span className="absolute -top-3 left-1 text-[8px] font-bold text-white px-1 rounded-xs bg-amber-600 font-mono shadow-xs">
                  Windi · Avatar 64px
                </span>
              </div>
            )}

            {showAvatarBox ? (
              <div className="relative w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-amber-300 via-stone-100 to-amber-400 shadow-md animate-in zoom-in-75 duration-300">
                <div className="w-full h-full rounded-full overflow-hidden bg-stone-200 flex items-center justify-center">
                  {showAvatarImage ? (
                    <img
                      src="/generated/avatar-groom.svg"
                      alt="Avatar Mempelai"
                      className="w-full h-full object-cover animate-in fade-in duration-300"
                    />
                  ) : (
                    <span className="text-[8px] font-mono text-stone-400 italic">Frame Foto</span>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-16" />
            )}
          </div>

          {/* 3. Nama Mempelai Hero & Divider Dot (Windi) */}
          <div className="relative my-1">
            {isNamesEditMode && (
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

            {/* Floating Font Dropdown Mockup while Windi deliberately selects it */}
            {showFontDropdown && (
              <div className="absolute -top-12 right-2 bg-stone-900 text-white rounded-xl p-2 shadow-2xl border border-stone-700 z-30 text-left font-mono text-[9px] animate-in zoom-in-95">
                <div className="text-stone-400 text-[8px] uppercase tracking-wider mb-1">Font Family</div>
                <div className="bg-amber-600/30 text-amber-300 font-serif px-2 py-0.5 rounded-sm font-semibold flex items-center justify-between gap-2">
                  <span>✓ Cormorant Garamond</span>
                  <span className="text-[7px]">Serif</span>
                </div>
                <div className="text-stone-400 px-2 py-0.5 opacity-60">Inter Sans</div>
              </div>
            )}

            {showNamesBox ? (
              <h2
                className={`text-stone-900 tracking-tight min-h-[48px] flex items-center justify-center transition-all duration-300 ${
                  isCormorantFont ? 'font-serif text-4xl sm:text-5xl font-bold' : 'font-sans text-3xl font-semibold'
                } ${isItalicFont ? 'italic' : ''}`}
              >
                {namesText}
                {isNamesEditMode && progress >= 31 && progress < 39 && !isCormorantFont && (
                  <span className="inline-block w-2 h-7 bg-stone-900 ml-1 animate-pulse" />
                )}
                {/* Empty box placeholder while settling */}
                {progress >= 27 && progress < 31 && (
                  <span className="text-xs font-mono text-stone-400 italic">[Kotak Nama Pasangan]</span>
                )}
              </h2>
            ) : (
              <div className="h-12" />
            )}

            {/* Botanical Sage Divider Dot & Flanking Ornaments */}
            {showDividerDot && (
              <div className="relative flex items-center justify-center gap-2 mt-1">
                {showDividerLines && <div className="w-8 h-[1px] bg-teal-700/40 animate-in fade-in" />}
                <div className="w-2.5 h-2.5 rounded-full bg-teal-700 shadow-xs animate-in zoom-in" />
                {showDividerLines && <div className="w-8 h-[1px] bg-teal-700/40 animate-in fade-in" />}
              </div>
            )}
          </div>

          {/* 4. Ayat Suci Kutipan Ar-Rum 21 (Hadir sebagai Pondasi Nilai) */}
          <div className="relative my-0.5 bg-[#FAF6F0] rounded-2xl p-2 border border-stone-200/80 shadow-xs">
            <Heart className="w-3 h-3 text-teal-700 mx-auto mb-0.5 opacity-70" />
            <p className="font-serif italic text-[10px] text-stone-600 leading-relaxed">
              &ldquo;Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri agar kamu merasa tenteram.&rdquo;
            </p>
            <p className="text-[8px] font-bold uppercase tracking-widest text-teal-800 font-mono mt-0.5">
              QS. AR-RUM: 21
            </p>
          </div>

          {/* 5. Jadwal Tanggal & Venue Pill (Arif) */}
          <div className="relative my-1">
            {isScheduleEditMode && (
              <div className="absolute -inset-1 rounded-xl border-2 border-teal-600 pointer-events-none z-20 animate-in fade-in">
                <span className="absolute -top-3 left-1 text-[8px] font-bold text-white px-1 rounded-xs bg-teal-700 font-mono shadow-xs">
                  Arif · Pill Jadwal
                </span>
              </div>
            )}

            {showScheduleBox ? (
              <div className="bg-stone-100 rounded-xl py-1.5 px-3 border border-stone-200 text-stone-700 flex items-center justify-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                <p className="text-[10px] font-mono font-medium tracking-wide truncate">
                  {scheduleText}
                  {isScheduleEditMode && progress >= 33 && progress < 43 && (
                    <span className="inline-block w-1.5 h-2.5 bg-stone-700 ml-0.5 animate-pulse" />
                  )}
                  {/* Empty pill placeholder while settling */}
                  {progress >= 29 && progress < 33 && (
                    <span className="text-[9px] font-mono text-stone-400 italic">[Container Jadwal &amp; Gedung]</span>
                  )}
                </p>
              </div>
            ) : (
              <div className="h-9" />
            )}
          </div>

          {/* 6. Tombol Aksi Buka Google Maps (Arif) */}
          <div className="relative my-0.5">
            {isButtonEditMode && (
              <div className="absolute -inset-1 rounded-xl border-2 border-teal-600 pointer-events-none z-20 animate-in fade-in">
                <span className="absolute -top-3 left-1 text-[8px] font-bold text-white px-1 rounded-xs bg-teal-700 font-mono shadow-xs">
                  Arif · CTA Button
                </span>
              </div>
            )}

            {showButtonBox ? (
              <button
                type="button"
                className="w-full py-2 px-3 rounded-xl bg-teal-700 text-white font-medium text-[11px] shadow-xs flex items-center justify-center gap-1.5 transition-all hover:bg-teal-800"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>
                  {buttonLabelText}
                  {/* Empty button placeholder while settling */}
                  {progress >= 54.5 && progress < 58.5 && (
                    <span className="text-[9px] opacity-60 italic">[Tombol Lokasi Maps]</span>
                  )}
                </span>
                {isButtonEditMode && progress >= 58.5 && progress < 67.5 && (
                  <span className="inline-block w-1 h-3 bg-white ml-0.5 animate-pulse" />
                )}
              </button>
            ) : (
              <div className="h-8" />
            )}
          </div>

          {/* 7. Komponen Amplop Digital, Bank & QRIS (Windi) */}
          <div className="relative mt-1">
            {isEnvelopeEditMode && (
              <div className="absolute -inset-1.5 rounded-2xl border-2 border-amber-500 pointer-events-none z-20 animate-in fade-in">
                <span className="absolute -top-3.5 left-1 text-[8px] font-bold text-white px-1.5 py-0.2 rounded-xs bg-amber-600 font-mono shadow-xs">
                  Windi · Amplop Digital &amp; QRIS
                </span>
              </div>
            )}

            {showEnvelopeBox ? (
              <div className="bg-white rounded-2xl p-2.5 border border-stone-200 shadow-xs text-left text-xs transition-all animate-in slide-in-from-bottom-2">
                <div className="flex items-center justify-between text-teal-800 font-bold mb-1">
                  <span className="flex items-center gap-1 text-[11px]">
                    <CreditCard className="w-3 h-3" />
                    <span>Amplop Digital &amp; QRIS</span>
                  </span>
                  <span className="text-[8.5px] text-amber-700 font-mono font-semibold bg-amber-50 px-1.5 py-0.2 rounded-sm border border-amber-200">
                    Auto-Centered
                  </span>
                </div>

                {/* Bank Badges */}
                {showBankBadges && (
                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-stone-600 mb-1.5 bg-stone-50 p-1 rounded-lg border border-stone-200 animate-in fade-in">
                    <span className="font-bold text-blue-700">BCA</span>
                    <span>1234567890</span>
                    <span className="text-stone-300">|</span>
                    <span className="font-bold text-amber-700">Mandiri</span>
                    <span>9876543210</span>
                  </div>
                )}

                {/* QRIS Barcode */}
                {showQrisBarcode ? (
                  <div className="flex items-center gap-2 bg-stone-50 p-1.5 rounded-xl border border-stone-200 animate-in zoom-in-95">
                    <div className="w-8 h-8 bg-teal-800 text-white rounded-lg flex items-center justify-center font-mono font-bold text-[9px] shrink-0">
                      QRIS
                    </div>
                    <div className="truncate">
                      <div className="text-[10px] font-bold text-stone-800 truncate">
                        NikahPlan: {groomNick} &amp; {brideNick}
                      </div>
                      <div className="text-[8px] text-stone-500">Scan BCA, Mandiri, Gopay, Ovo</div>
                    </div>
                  </div>
                ) : (
                  <div className="h-8 border border-dashed border-stone-200 rounded-lg flex items-center justify-center text-[9px] text-stone-400 italic">
                    [Area Barcode QRIS Merchant]
                  </div>
                )}
              </div>
            ) : (
              <div className="h-20" />
            )}
          </div>

          {/* Selesai / Celebration Footer Notification */}
          {progress >= 95 && (
            <div className="mt-2 p-2 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 animate-in fade-in flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-semibold text-[11px]">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
                <span>Undangan Selesai Dirakit Berdua!</span>
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
        {/* DYNAMIC DRAG-TO-SIZE RECTANGLES (EXPANDS IN LOCKSTEP WITH CURSOR TIP) */}
        {/* ========================================================================= */}

        {/* Arif's Dragging Boxes */}
        {isArifDraggingHeader && (
          <div
            className="absolute border-2 border-dashed border-teal-500 bg-teal-500/15 pointer-events-none z-30 rounded-md"
            style={{
              left: '15%',
              top: '3.5%',
              width: `${Math.max(2, arifCursor.x - 15)}%`,
              height: `${Math.max(2, arifCursor.y - 3.5)}%`,
            }}
          >
            <div className="absolute -bottom-5 right-0 bg-teal-700 text-white text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-xs shadow-xs whitespace-nowrap">
              {Math.round((arifCursor.x - 15) * 3.75)} x {Math.round((arifCursor.y - 3.5) * 6)}px
            </div>
          </div>
        )}

        {isArifDraggingSchedule && (
          <div
            className="absolute border-2 border-dashed border-teal-500 bg-teal-500/15 pointer-events-none z-30 rounded-xl"
            style={{
              left: '8%',
              top: '49%',
              width: `${Math.max(2, arifCursor.x - 8)}%`,
              height: `${Math.max(2, arifCursor.y - 49)}%`,
            }}
          >
            <div className="absolute -bottom-5 right-0 bg-teal-700 text-white text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-xs shadow-xs whitespace-nowrap">
              {Math.round((arifCursor.x - 8) * 3.75)} x {Math.round((arifCursor.y - 49) * 6)}px
            </div>
          </div>
        )}

        {isArifDraggingButton && (
          <div
            className="absolute border-2 border-dashed border-teal-500 bg-teal-500/15 pointer-events-none z-30 rounded-xl"
            style={{
              left: '12%',
              top: '58.5%',
              width: `${Math.max(2, arifCursor.x - 12)}%`,
              height: `${Math.max(2, arifCursor.y - 58.5)}%`,
            }}
          >
            <div className="absolute -bottom-5 right-0 bg-teal-700 text-white text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-xs shadow-xs whitespace-nowrap">
              {Math.round((arifCursor.x - 12) * 3.75)} x {Math.round((arifCursor.y - 58.5) * 6)}px
            </div>
          </div>
        )}

        {/* Windi's Dragging Boxes */}
        {isWindiDraggingAvatar && (
          <div
            className="absolute border-2 border-dashed border-amber-500 bg-amber-500/15 pointer-events-none z-30 rounded-full"
            style={{
              left: '40%',
              top: '10.5%',
              width: `${Math.max(2, windiCursor.x - 40)}%`,
              height: `${Math.max(2, windiCursor.y - 10.5)}%`,
            }}
          >
            <div className="absolute -bottom-5 right-0 bg-amber-600 text-white text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-xs shadow-xs whitespace-nowrap">
              {Math.round((windiCursor.x - 40) * 3.75)} x {Math.round((windiCursor.y - 10.5) * 6)}px
            </div>
          </div>
        )}

        {isWindiDraggingNames && (
          <div
            className="absolute border-2 border-dashed border-amber-500 bg-amber-500/15 pointer-events-none z-30 rounded-xl"
            style={{
              left: '10%',
              top: '23.5%',
              width: `${Math.max(2, windiCursor.x - 10)}%`,
              height: `${Math.max(2, windiCursor.y - 23.5)}%`,
            }}
          >
            <div className="absolute -bottom-5 right-0 bg-amber-600 text-white text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-xs shadow-xs whitespace-nowrap">
              {Math.round((windiCursor.x - 10) * 3.75)} x {Math.round((windiCursor.y - 23.5) * 6)}px
            </div>
          </div>
        )}

        {isWindiDraggingDivider && (
          <div
            className="absolute border border-dashed border-amber-500 bg-amber-500/15 pointer-events-none z-30 rounded-full"
            style={{
              left: '46%',
              top: '35%',
              width: `${Math.max(1, windiCursor.x - 46)}%`,
              height: `${Math.max(1, windiCursor.y - 35)}%`,
            }}
          />
        )}

        {isWindiDraggingEnvelope && (
          <div
            className="absolute border-2 border-dashed border-amber-500 bg-amber-500/15 pointer-events-none z-30 rounded-2xl"
            style={{
              left: '6%',
              top: '68%',
              width: `${Math.max(2, windiCursor.x - 6)}%`,
              height: `${Math.max(2, windiCursor.y - 68)}%`,
            }}
          >
            <div className="absolute -bottom-5 right-0 bg-amber-600 text-white text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-xs shadow-xs whitespace-nowrap">
              {Math.round((windiCursor.x - 6) * 3.75)} x {Math.round((windiCursor.y - 68) * 6)}px
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2 CURSORS MULTIPLAYER OVERLAYS (EXACT TIP ANCHOR, STILL WHILE TYPING) */}
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
          {/* Click Ripple Pulse (fires on deliberate clicks) */}
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
      </div>
    </div>
  );
};
