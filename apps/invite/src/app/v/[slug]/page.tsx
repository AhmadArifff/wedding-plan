'use client';

import * as React from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Heart,
  Send,
  CheckCircle,
  Palette,
  Eye,
  Sparkles,
} from 'lucide-react';
import {
  WaxSealEnvelopeCover,
  DigitalEnvelopeBlock,
  FigmaPartyCursors,
  FigmaCraftingCanvas,
  InvitationLiveCrafting,
  type CraftingState,
  type ElementCraftStage,
} from '@nikahplan/invitation-blocks';
import {
  DUMMY_INVITATION,
  DUMMY_ENVELOPES,
  DUMMY_RSVP_WISHES,
  formatDateIndo,
} from '@nikahplan/ui';
import type { RsvpWish, InvitationEnvelope } from '@nikahplan/db';

const sliceByProgress = (text: string, progress: number) => {
  const clamped = Math.max(0, Math.min(1, progress));
  return text.slice(0, Math.max(1, Math.ceil(text.length * clamped)));
};

export default function PublicInvitationPage() {
  const [isCoverOpen, setIsCoverOpen] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<'invitation' | 'crafting'>('invitation');
  const [craftingState, setCraftingState] = React.useState<CraftingState | null>(null);
  const mainContainerRef = React.useRef<HTMLElement | null>(null);
  const [wishes, setWishes] = React.useState<RsvpWish[]>(DUMMY_RSVP_WISHES);

  // Helper 4-tahap perakitan paralel untuk kedua kursor (Arif & Windi bekerja bersamaan)
  const getStage = (id: string): ElementCraftStage => {
    if (!craftingState) return 'wireframe';
    if (craftingState.isFinished || craftingState.completedStepIds.includes(id)) {
      return 'verified';
    }
    if (craftingState.activeStepIds.includes(id)) {
      const phase = craftingState.subPhase;
      if (phase === 'idle' || phase === 'traveling' || phase === 'dragging') {
        return 'wireframe';
      }
      if (phase === 'settling' || phase === 'clicking') {
        return 'container';
      }
      if (phase === 'typing') {
        return 'typing';
      }
      return 'verified';
    }
    return 'wireframe';
  };

  // Mengambil teks ketikan paralel milik masing-masing elemen (Arif & Windi mengetik serempak)
  const getTyped = (id: string, fullText: string) => {
    if (getStage(id) === 'typing') {
      return craftingState?.typedTexts[id] ?? '';
    }
    return fullText;
  };

  const typingProgress = craftingState?.typingProgress ?? 0;

  const [senderName, setSenderName] = React.useState('');
  const [senderMessage, setSenderMessage] = React.useState('');
  const [isWishSent, setIsWishSent] = React.useState(false);

  // RSVP Form state
  const [rsvpName, setRsvpName] = React.useState('');
  const [rsvpStatus, setRsvpStatus] = React.useState<'ATTENDING' | 'NOT_ATTENDING'>('ATTENDING');
  const [rsvpCount, setRsvpCount] = React.useState(2);
  const [isRsvpSubmitted, setIsRsvpSubmitted] = React.useState(false);

  // Normalisasi bank accounts untuk komponen DigitalEnvelopeBlock
  const bankAccountsList = React.useMemo(() => {
    return DUMMY_ENVELOPES.filter(
      (acc: InvitationEnvelope) => acc.envelopeType === 'BANK_TRANSFER'
    ).map((acc: InvitationEnvelope) => ({
      id: acc.id,
      bankName: acc.bankName || 'Bank',
      accountNumber: acc.accountNumber || '-',
      accountHolder: acc.accountHolderName || 'Mempelai',
    }));
  }, []);

  const handleSendWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderMessage.trim()) return;

    const newWish: RsvpWish = {
      id: `wish-${Date.now()}`,
      invitationId: DUMMY_INVITATION.id,
      guestName: senderName.trim(),
      attendanceStatus: 'ATTENDING',
      paxCount: 2,
      wishMessage: senderMessage.trim(),
      isApproved: true,
      createdAt: new Date().toISOString(),
    };

    setWishes([newWish, ...wishes]);
    setSenderName('');
    setSenderMessage('');
    setIsWishSent(true);
    setTimeout(() => setIsWishSent(false), 3000);
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;
    setIsRsvpSubmitted(true);
  };

  const fullVerseText =
    'Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.';
  const coupleIntroText =
    'Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud melangsungkan pernikahan:';
  const agendaIntroText = 'Insya Allah acara diselenggarakan pada:';
  const rsvpIntroText =
    'Mohon konfirmasikan kehadiran Bapak/Ibu/Saudara/i untuk kenyamanan persiapan jamuan.';

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 selection:bg-teal-100 relative">
      {/* 1. Wax Seal Physical Envelope Cover (Cinematic Flap Unfold & Fade Out) */}
      <WaxSealEnvelopeCover
        groomNick={DUMMY_INVITATION.groomNick}
        brideNick={DUMMY_INVITATION.brideNick}
        weddingDateFormatted={formatDateIndo(DUMMY_INVITATION.akadDatetime)}
        guestName="Sahabat Terkasih"
        isOpen={isCoverOpen}
        onOpen={() => setIsCoverOpen(true)}
      />

      {/* 2. Figma Multiplayer Live Presence Cursors (Hadir setelah proses crafting selesai dirakit) */}
      {isCoverOpen && viewMode === 'invitation' && craftingState?.isFinished && (
        <FigmaPartyCursors />
      )}

      {/* Floating Toggle Mode di Bagian Atas Kanan */}
      {isCoverOpen && (
        <div className="fixed top-4 right-4 z-40 bg-white/90 backdrop-blur-md rounded-2xl p-1 shadow-lg border border-stone-200 flex items-center text-xs font-semibold">
          <button
            type="button"
            onClick={() => setViewMode('invitation')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'invitation'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Undangan Jadi</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('crafting')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'crafting'
                ? 'bg-teal-800 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-amber-300" />
            <span>Figma Crafting Live</span>
          </button>
        </div>
      )}

      {/* Mode 1: Figma Live Crafting Story */}
      {isCoverOpen && viewMode === 'crafting' && (
        <div className="max-w-xl mx-auto p-4 sm:p-8 pt-16 min-h-screen flex flex-col justify-center">
          <div className="text-center mb-4">
            <span className="text-[11px] font-mono text-teal-800 font-bold uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Interactive Story Mode
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-2">
              Proses Desain Kolaboratif Arif &amp; Windi
            </h2>
            <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1">
              Saksikan bagaimana setiap elemen teks, font, warna, dan komponen amplop dirakit secara langsung di atas kanvas Figma.
            </p>
          </div>

          <FigmaCraftingCanvas
            groomNick={DUMMY_INVITATION.groomNick}
            brideNick={DUMMY_INVITATION.brideNick}
            weddingDateFormatted={formatDateIndo(DUMMY_INVITATION.akadDatetime)}
            venueName={DUMMY_INVITATION.venueName}
            onFinishCrafting={() => setViewMode('invitation')}
          />
        </div>
      )}

      {/* Mode 2: Main Invitation Content (Paralel 2 Kursor Bekerja Serempak oleh Arif & Windi) */}
      {isCoverOpen && viewMode === 'invitation' && (
        <main
          ref={mainContainerRef}
          className={`relative max-w-md mx-auto shadow-2xl bg-white min-h-screen overflow-hidden flex flex-col transition-all duration-1000 ${
            isCoverOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Live Crafting Animation Overlay (Simultaneous Dual-Cursor) */}
          <InvitationLiveCrafting
            containerRef={mainContainerRef}
            enabled={isCoverOpen && viewMode === 'invitation'}
            onStateChange={setCraftingState}
          />

          {/* Hero Section dengan Cover Tema Ter-generate */}
          <section className="relative h-96 w-full overflow-hidden bg-stone-900">
            <img
              src="/generated/theme-botanical-sage.svg"
              alt="Tema Botanical Sage"
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent flex flex-col justify-end p-6 text-white text-center space-y-2.5">
              {/* Gelombang 1A (Arif): Walimatul 'Urs Header */}
              <div
                data-craft-id="hero-header"
                className="relative min-h-[28px] flex items-center justify-center"
              >
                {getStage('hero-header') === 'wireframe' && (
                  <div className="border border-dashed border-teal-400/50 rounded-lg px-4 py-1 text-[10px] uppercase font-mono tracking-widest text-teal-200/50 select-none">
                    [Area Teks Header Walimatul 'Urs]
                  </div>
                )}
                {getStage('hero-header') === 'container' && (
                  <div className="border border-teal-400/70 bg-teal-950/50 rounded-lg px-4 py-1 text-[10px] font-mono text-teal-200 flex items-center gap-1.5 craft-fade-in select-none">
                    <span>[Kotak Teks Header Siap Diketik]</span>
                    <span className="inline-block w-1.5 h-3 bg-teal-300 animate-pulse" />
                  </div>
                )}
                {(getStage('hero-header') === 'typing' ||
                  getStage('hero-header') === 'verified') && (
                  <span className="text-xs uppercase tracking-[0.25em] text-teal-300 font-semibold craft-fade-in">
                    {getTyped('hero-header', "WALIMATUL 'URS")}
                    {getStage('hero-header') === 'typing' && (
                      <span className="inline-block w-1.5 h-3 bg-teal-300 ml-1 animate-pulse" />
                    )}
                  </span>
                )}
              </div>

              {/* Gelombang 1B (Windi): Nama Mempelai Hero + Font Cormorant Garamond */}
              <div
                data-craft-id="hero-names"
                className="relative min-h-[56px] flex items-center justify-center"
              >
                {getStage('hero-names') === 'wireframe' && (
                  <div className="border border-dashed border-amber-400/50 rounded-xl px-6 py-2 text-xs font-mono text-amber-200/50 select-none">
                    [Area Tipografi Nama Mempelai]
                  </div>
                )}
                {getStage('hero-names') === 'container' && (
                  <div className="border border-amber-400/70 bg-amber-950/40 rounded-xl px-6 py-2 text-xs font-mono text-amber-200 flex items-center gap-1.5 craft-fade-in select-none">
                    <span>[Frame Nama Utama Siap Diketik]</span>
                    <span className="inline-block w-1.5 h-4 bg-amber-300 animate-pulse" />
                  </div>
                )}
                {(getStage('hero-names') === 'typing' ||
                  getStage('hero-names') === 'verified') && (
                  <h1
                    className={`text-4xl sm:text-5xl font-bold tracking-tight transition-all duration-300 ${
                      craftingState?.isSpecialFontActive ||
                      getStage('hero-names') === 'verified'
                        ? 'font-serif italic text-white'
                        : 'font-sans text-stone-200'
                    }`}
                  >
                    {getTyped(
                      'hero-names',
                      `${DUMMY_INVITATION.groomNick} & ${DUMMY_INVITATION.brideNick}`
                    )}
                    {getStage('hero-names') === 'typing' && (
                      <span className="inline-block w-2 h-8 bg-amber-400 ml-1 animate-pulse" />
                    )}
                  </h1>
                )}
              </div>

              {/* Gelombang 2A (Arif): Tanggal Akad & Resepsi */}
              <div
                data-craft-id="hero-date"
                className="relative min-h-[26px] flex items-center justify-center"
              >
                {getStage('hero-date') === 'wireframe' && (
                  <div className="border border-dashed border-stone-400/50 rounded-md px-4 py-0.5 text-[10px] font-mono text-stone-300/50 select-none">
                    [Area Tanggal Acara]
                  </div>
                )}
                {getStage('hero-date') === 'container' && (
                  <div className="border border-teal-400/60 bg-stone-900/60 rounded-md px-4 py-0.5 text-[10px] font-mono text-teal-200 flex items-center gap-1 craft-fade-in select-none">
                    <span>[Kotak Tanggal Siap Diketik]</span>
                    <span className="inline-block w-1.5 h-3 bg-teal-300 animate-pulse" />
                  </div>
                )}
                {(getStage('hero-date') === 'typing' ||
                  getStage('hero-date') === 'verified') && (
                  <p className="text-xs text-stone-200 font-mono craft-fade-in">
                    {getTyped('hero-date', 'Minggu, 14 November 2027')}
                    {getStage('hero-date') === 'typing' && (
                      <span className="inline-block w-1.5 h-3 bg-teal-300 ml-1 animate-pulse" />
                    )}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Seksi Ayat Suci & Mukadimah */}
          <section className="p-6 text-center space-y-3.5 border-b border-stone-100 flex flex-col justify-center">
            {/* Gelombang 2B (Windi): Ikon Hati Ayat Suci */}
            <div
              data-craft-id="verse-icon"
              className="min-h-[38px] flex items-center justify-center"
            >
              {getStage('verse-icon') === 'wireframe' && (
                <div className="w-9 h-9 rounded-full border border-dashed border-amber-400 flex items-center justify-center text-[9px] font-mono text-stone-400 select-none">
                  [Ikon]
                </div>
              )}
              {getStage('verse-icon') === 'container' && (
                <div className="w-9 h-9 rounded-full border border-amber-400 bg-amber-50/50 flex items-center justify-center text-[10px] font-mono text-amber-700 craft-fade-in select-none">
                  +
                </div>
              )}
              {(getStage('verse-icon') === 'typing' ||
                getStage('verse-icon') === 'verified') && (
                <div className="w-9 h-9 rounded-full bg-teal-50 border border-teal-200 text-teal-800 flex items-center justify-center mx-auto shadow-xs craft-pop-in">
                  <Heart className="w-4 h-4 text-teal-700 fill-teal-700/15" />
                </div>
              )}
            </div>

            {/* Gelombang 3B (Windi): Teks Lengkap Ayat Suci QS. Ar-Rum: 21 */}
            <div
              data-craft-id="verse-text"
              className="min-h-[88px] flex items-center justify-center px-2"
            >
              {getStage('verse-text') === 'wireframe' && (
                <div className="w-full border border-dashed border-stone-300 rounded-xl p-4 text-stone-400 italic text-xs bg-stone-50/50 select-none">
                  [Area Terjemahan Lengkap Ayat Suci QS. Ar-Rum: 21]
                </div>
              )}
              {getStage('verse-text') === 'container' && (
                <div className="w-full border border-amber-300 bg-amber-50/30 rounded-xl p-4 text-amber-800 font-mono text-[10px] flex items-center justify-center gap-1.5 craft-fade-in select-none">
                  <span>[Paragraf Ayat Suci Siap Diketik...]</span>
                  <span className="inline-block w-1.5 h-3.5 bg-amber-600 animate-pulse" />
                </div>
              )}
              {(getStage('verse-text') === 'typing' ||
                getStage('verse-text') === 'verified') && (
                <p className="font-serif italic text-sm text-stone-700 leading-relaxed max-w-xs mx-auto craft-fade-in">
                  &ldquo;{getTyped('verse-text', fullVerseText)}&rdquo;
                  {getStage('verse-text') === 'typing' && (
                    <span className="inline-block w-1.5 h-3.5 bg-amber-600 ml-0.5 animate-pulse" />
                  )}
                </p>
              )}
            </div>

            {/* Gelombang 3A (Arif): Label Referensi Surah QS. AR-RUM: 21 */}
            <div
              data-craft-id="verse-ref"
              className="min-h-[24px] flex items-center justify-center"
            >
              {getStage('verse-ref') === 'wireframe' && (
                <div className="border border-dashed border-stone-300 rounded-md px-3 py-0.5 text-[10px] font-mono text-stone-400 select-none">
                  [Label Referensi Surah]
                </div>
              )}
              {getStage('verse-ref') === 'container' && (
                <div className="border border-teal-400 bg-teal-50/40 rounded-md px-3 py-0.5 text-[10px] font-mono text-teal-800 flex items-center gap-1 craft-fade-in select-none">
                  <span>[Siap Ketik Surah]</span>
                  <span className="inline-block w-1 h-3 bg-teal-600 animate-pulse" />
                </div>
              )}
              {(getStage('verse-ref') === 'typing' ||
                getStage('verse-ref') === 'verified') && (
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-widest block craft-slide-up">
                  {getTyped('verse-ref', 'QS. AR-RUM: 21')}
                  {getStage('verse-ref') === 'typing' && (
                    <span className="inline-block w-1.5 h-3 bg-teal-600 ml-0.5 animate-pulse" />
                  )}
                </span>
              )}
            </div>
          </section>

          {/* Profil Kedua Mempelai (Gelombang 4, 5, 6, 7 - Arif & Windi Bekerja Serempak) */}
          <section className="p-6 space-y-5 border-b border-stone-100 bg-[#FAF8F5]/60">
            <div className="text-center space-y-2">
              {/* Gelombang 4A (Arif): Judul Kedua Mempelai */}
              <div
                data-craft-id="couple-title"
                className="min-h-[30px] flex items-center justify-center"
              >
                {getStage('couple-title') === 'wireframe' && (
                  <div className="border border-dashed border-teal-300 rounded-lg px-4 py-1 text-xs text-stone-400 italic bg-white/60 select-none">
                    [Area Judul Kedua Mempelai]
                  </div>
                )}
                {getStage('couple-title') === 'container' && (
                  <div className="border border-teal-400 bg-teal-50/40 rounded-lg px-4 py-1 text-[10px] font-mono text-teal-800 flex items-center gap-1.5 craft-fade-in select-none">
                    <span>[Kotak Judul Siap Diketik]</span>
                    <span className="inline-block w-1.5 h-3.5 bg-teal-700 animate-pulse" />
                  </div>
                )}
                {(getStage('couple-title') === 'typing' ||
                  getStage('couple-title') === 'verified') && (
                  <h2 className="text-xl font-serif font-bold text-stone-900 craft-fade-in">
                    {getTyped('couple-title', 'Kedua Mempelai')}
                    {getStage('couple-title') === 'typing' && (
                      <span className="inline-block w-1.5 h-4 bg-teal-700 ml-1 animate-pulse" />
                    )}
                  </h2>
                )}
              </div>

              {/* Gelombang 4B (Windi): Kalimat Mukadimah */}
              <div
                data-craft-id="couple-intro"
                className="min-h-[36px] flex items-center justify-center"
              >
                {getStage('couple-intro') === 'wireframe' && (
                  <div className="border border-dashed border-amber-300 rounded-lg px-3 py-1.5 text-[11px] text-stone-400 italic bg-white/60 select-none">
                    [Area Kalimat Mukadimah Pernikahan]
                  </div>
                )}
                {getStage('couple-intro') === 'container' && (
                  <div className="border border-amber-400 bg-amber-50/40 rounded-lg px-3 py-1.5 text-[10px] font-mono text-amber-800 flex items-center gap-1.5 craft-fade-in select-none">
                    <span>[Kotak Mukadimah Siap Diketik]</span>
                    <span className="inline-block w-1.5 h-3 bg-amber-600 animate-pulse" />
                  </div>
                )}
                {(getStage('couple-intro') === 'typing' ||
                  getStage('couple-intro') === 'verified') && (
                  <p className="text-xs text-stone-500 craft-fade-in">
                    {getTyped('couple-intro', coupleIntroText)}
                    {getStage('couple-intro') === 'typing' && (
                      <span className="inline-block w-1.5 h-3 bg-amber-600 ml-0.5 animate-pulse" />
                    )}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-5">
              {/* Kartu Pengantin Pria (Arif: Gelombang 5A, 6A, 7A) */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 text-center shadow-xs space-y-2.5">
                {/* Gelombang 5A (Arif): Foto Avatar Pengantin Pria */}
                <div
                  data-craft-id="groom-avatar"
                  className="min-h-[84px] flex items-center justify-center"
                >
                  {getStage('groom-avatar') === 'wireframe' && (
                    <div className="w-20 h-20 mx-auto rounded-full border-2 border-dashed border-teal-300 bg-stone-50 flex items-center justify-center text-[9px] font-mono text-stone-400 select-none">
                      [Foto Pria]
                    </div>
                  )}
                  {getStage('groom-avatar') === 'container' && (
                    <div className="w-20 h-20 mx-auto rounded-full border-2 border-teal-600 bg-teal-50/50 flex items-center justify-center text-[9px] font-mono text-teal-800 craft-fade-in select-none">
                      Siap Upload
                    </div>
                  )}
                  {(getStage('groom-avatar') === 'typing' ||
                    getStage('groom-avatar') === 'verified') && (
                    <div className="w-20 h-20 mx-auto rounded-full p-1 border-2 border-teal-700 bg-teal-50 shadow-xs craft-pop-in">
                      <img
                        src="/generated/avatar-groom.svg"
                        alt={DUMMY_INVITATION.groomFullName}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Gelombang 6A (Arif): Nama Lengkap Pengantin Pria */}
                <div
                  data-craft-id="groom-name"
                  className="min-h-[30px] flex items-center justify-center"
                >
                  {getStage('groom-name') === 'wireframe' && (
                    <div className="border border-dashed border-teal-300 rounded-lg px-4 py-1 text-[11px] font-mono text-stone-400 select-none">
                      [Area Nama Lengkap Pengantin Pria]
                    </div>
                  )}
                  {getStage('groom-name') === 'container' && (
                    <div className="border border-teal-500 bg-teal-50/40 rounded-lg px-4 py-1 text-[10px] font-mono text-teal-800 flex items-center gap-1 craft-fade-in select-none">
                      <span>[Kotak Nama Pria Siap Diketik]</span>
                      <span className="inline-block w-1.5 h-3.5 bg-teal-700 animate-pulse" />
                    </div>
                  )}
                  {(getStage('groom-name') === 'typing' ||
                    getStage('groom-name') === 'verified') && (
                    <h3 className="font-serif font-bold text-lg text-stone-900 craft-fade-in">
                      {getTyped('groom-name', DUMMY_INVITATION.groomFullName)}
                      {getStage('groom-name') === 'typing' && (
                        <span className="inline-block w-1.5 h-4 bg-teal-700 ml-1 animate-pulse" />
                      )}
                    </h3>
                  )}
                </div>

                {/* Gelombang 7A (Arif): Nama Orang Tua Pengantin Pria (Bapak & Ibu) */}
                <div
                  data-craft-id="groom-parents"
                  className="min-h-[28px] flex items-center justify-center"
                >
                  {getStage('groom-parents') === 'wireframe' && (
                    <div className="border border-dashed border-stone-300 rounded-lg px-3 py-1 text-[10px] font-mono text-stone-400 select-none">
                      [Area Silsilah Bapak &amp; Ibu Mempelai Pria]
                    </div>
                  )}
                  {getStage('groom-parents') === 'container' && (
                    <div className="border border-teal-400 bg-teal-50/30 rounded-lg px-3 py-1 text-[10px] font-mono text-teal-800 flex items-center gap-1 craft-fade-in select-none">
                      <span>[Kotak Nama Orang Tua Pria Siap Diketik]</span>
                      <span className="inline-block w-1.5 h-3 bg-teal-700 animate-pulse" />
                    </div>
                  )}
                  {(getStage('groom-parents') === 'typing' ||
                    getStage('groom-parents') === 'verified') && (
                    <p className="text-xs text-stone-600 craft-slide-up">
                      {getTyped('groom-parents', DUMMY_INVITATION.groomParents)}
                      {getStage('groom-parents') === 'typing' && (
                        <span className="inline-block w-1.5 h-3 bg-teal-700 ml-0.5 animate-pulse" />
                      )}
                    </p>
                  )}
                </div>
              </div>

              {/* Kartu Pengantin Wanita (Windi: Gelombang 5B, 6B, 7B - Bekerja Serempak dengan Arif!) */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 text-center shadow-xs space-y-2.5">
                {/* Gelombang 5B (Windi): Foto Avatar Pengantin Wanita */}
                <div
                  data-craft-id="bride-avatar"
                  className="min-h-[84px] flex items-center justify-center"
                >
                  {getStage('bride-avatar') === 'wireframe' && (
                    <div className="w-20 h-20 mx-auto rounded-full border-2 border-dashed border-amber-300 bg-stone-50 flex items-center justify-center text-[9px] font-mono text-stone-400 select-none">
                      [Foto Wanita]
                    </div>
                  )}
                  {getStage('bride-avatar') === 'container' && (
                    <div className="w-20 h-20 mx-auto rounded-full border-2 border-amber-500 bg-amber-50/50 flex items-center justify-center text-[9px] font-mono text-amber-800 craft-fade-in select-none">
                      Siap Upload
                    </div>
                  )}
                  {(getStage('bride-avatar') === 'typing' ||
                    getStage('bride-avatar') === 'verified') && (
                    <div className="w-20 h-20 mx-auto rounded-full p-1 border-2 border-amber-600 bg-amber-50 shadow-xs craft-pop-in">
                      <img
                        src="/generated/avatar-bride.svg"
                        alt={DUMMY_INVITATION.brideFullName}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Gelombang 6B (Windi): Nama Lengkap Pengantin Wanita */}
                <div
                  data-craft-id="bride-name"
                  className="min-h-[30px] flex items-center justify-center"
                >
                  {getStage('bride-name') === 'wireframe' && (
                    <div className="border border-dashed border-amber-300 rounded-lg px-4 py-1 text-[11px] font-mono text-stone-400 select-none">
                      [Area Nama Lengkap Pengantin Wanita]
                    </div>
                  )}
                  {getStage('bride-name') === 'container' && (
                    <div className="border border-amber-500 bg-amber-50/40 rounded-lg px-4 py-1 text-[10px] font-mono text-amber-800 flex items-center gap-1 craft-fade-in select-none">
                      <span>[Kotak Nama Wanita Siap Diketik]</span>
                      <span className="inline-block w-1.5 h-3.5 bg-amber-600 animate-pulse" />
                    </div>
                  )}
                  {(getStage('bride-name') === 'typing' ||
                    getStage('bride-name') === 'verified') && (
                    <h3 className="font-serif font-bold text-lg text-stone-900 craft-fade-in">
                      {getTyped('bride-name', DUMMY_INVITATION.brideFullName)}
                      {getStage('bride-name') === 'typing' && (
                        <span className="inline-block w-1.5 h-4 bg-amber-600 ml-1 animate-pulse" />
                      )}
                    </h3>
                  )}
                </div>

                {/* Gelombang 7B (Windi): Nama Orang Tua Pengantin Wanita (Bapak & Ibu) */}
                <div
                  data-craft-id="bride-parents"
                  className="min-h-[28px] flex items-center justify-center"
                >
                  {getStage('bride-parents') === 'wireframe' && (
                    <div className="border border-dashed border-stone-300 rounded-lg px-3 py-1 text-[10px] font-mono text-stone-400 select-none">
                      [Area Silsilah Bapak &amp; Ibu Mempelai Wanita]
                    </div>
                  )}
                  {getStage('bride-parents') === 'container' && (
                    <div className="border border-amber-400 bg-amber-50/30 rounded-lg px-3 py-1 text-[10px] font-mono text-amber-800 flex items-center gap-1 craft-fade-in select-none">
                      <span>[Kotak Nama Orang Tua Wanita Siap Diketik]</span>
                      <span className="inline-block w-1.5 h-3 bg-amber-600 animate-pulse" />
                    </div>
                  )}
                  {(getStage('bride-parents') === 'typing' ||
                    getStage('bride-parents') === 'verified') && (
                    <p className="text-xs text-stone-600 craft-slide-up">
                      {getTyped('bride-parents', DUMMY_INVITATION.brideParents)}
                      {getStage('bride-parents') === 'typing' && (
                        <span className="inline-block w-1.5 h-3 bg-amber-600 ml-0.5 animate-pulse" />
                      )}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Rangkaian Agenda Acara (Gelombang 8 & 9 - Bekerja Serempak) */}
          <section className="p-6 space-y-5 border-b border-stone-100">
            {/* Gelombang 8A (Arif): Header Rangkaian Acara */}
            <div
              data-craft-id="agenda-header"
              className="min-h-[54px] flex flex-col justify-center text-center"
            >
              {getStage('agenda-header') === 'wireframe' && (
                <div className="border border-dashed border-stone-300 rounded-xl p-2.5 text-xs text-stone-400 italic bg-stone-50/40 select-none">
                  [Area Judul Rangkaian Acara]
                </div>
              )}
              {getStage('agenda-header') === 'container' && (
                <div className="border border-teal-400 bg-teal-50/30 rounded-xl p-2.5 text-[10px] font-mono text-teal-800 flex items-center justify-center gap-1.5 craft-fade-in select-none">
                  <span>[Kotak Judul Acara Siap Diketik...]</span>
                  <span className="inline-block w-1.5 h-3.5 bg-teal-700 animate-pulse" />
                </div>
              )}
              {(getStage('agenda-header') === 'typing' ||
                getStage('agenda-header') === 'verified') && (
                <div className="text-center craft-fade-in">
                  <h2 className="text-xl font-serif font-bold text-stone-900">
                    {getStage('agenda-header') === 'typing'
                      ? sliceByProgress('Rangkaian Acara', Math.min(1, typingProgress * 2.2))
                      : 'Rangkaian Acara'}
                    {getStage('agenda-header') === 'typing' && typingProgress < 0.45 && (
                      <span className="inline-block w-1.5 h-4 bg-teal-700 ml-1 animate-pulse" />
                    )}
                  </h2>
                  <p className="text-xs text-stone-500 mt-1">
                    {getStage('agenda-header') === 'typing'
                      ? typingProgress > 0.4
                        ? sliceByProgress(agendaIntroText, (typingProgress - 0.4) / 0.6)
                        : ''
                      : agendaIntroText}
                    {getStage('agenda-header') === 'typing' && typingProgress >= 0.4 && (
                      <span className="inline-block w-1.5 h-3 bg-teal-700 ml-0.5 animate-pulse" />
                    )}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {/* Gelombang 8B (Windi): Kartu Akad Nikah */}
              <div data-craft-id="agenda-akad" className="min-h-[120px]">
                {getStage('agenda-akad') === 'wireframe' && (
                  <div className="border border-dashed border-stone-300 rounded-2xl p-5 text-center text-xs text-stone-400 italic bg-stone-50/40 min-h-[120px] flex items-center justify-center select-none">
                    [Frame Jadwal Akad Nikah]
                  </div>
                )}
                {getStage('agenda-akad') === 'container' && (
                  <div className="bg-stone-50 rounded-2xl p-5 border border-amber-400 min-h-[120px] flex flex-col items-center justify-center gap-1.5 craft-fade-in select-none">
                    <span className="text-[10px] font-mono text-amber-800 font-semibold">
                      [Card Akad Nikah Siap Diisi Waktu &amp; Lokasi...]
                    </span>
                    <span className="inline-block w-1.5 h-4 bg-amber-600 animate-pulse" />
                  </div>
                )}
                {(getStage('agenda-akad') === 'typing' ||
                  getStage('agenda-akad') === 'verified') && (
                  <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-2 craft-fade-in">
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-base text-stone-900">
                        {getStage('agenda-akad') === 'typing'
                          ? sliceByProgress('Akad Nikah', Math.min(1, typingProgress * 3))
                          : 'Akad Nikah'}
                      </span>
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 craft-pop-in">
                        Khusus Keluarga
                      </span>
                    </div>
                    <div className="text-xs text-stone-600 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                        <span>
                          {getStage('agenda-akad') === 'typing'
                            ? typingProgress > 0.2
                              ? sliceByProgress(
                                  'Minggu, 14 November 2027',
                                  (typingProgress - 0.2) / 0.3
                                )
                              : ''
                            : 'Minggu, 14 November 2027'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                        <span>
                          {getStage('agenda-akad') === 'typing'
                            ? typingProgress > 0.45
                              ? sliceByProgress(
                                  '08:00 - 10:00 WIB',
                                  (typingProgress - 0.45) / 0.25
                                )
                              : ''
                            : '08:00 - 10:00 WIB'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                        <span>
                          {getStage('agenda-akad') === 'typing'
                            ? typingProgress > 0.65
                              ? sliceByProgress(
                                  'Pendopo Dalem Ngabean, Kraton Yogyakarta',
                                  (typingProgress - 0.65) / 0.35
                                )
                              : ''
                            : 'Pendopo Dalem Ngabean, Kraton Yogyakarta'}
                          {getStage('agenda-akad') === 'typing' && (
                            <span className="inline-block w-1.5 h-3 bg-amber-600 ml-0.5 animate-pulse" />
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Gelombang 9A (Arif): Kartu Resepsi Pernikahan */}
              <div data-craft-id="agenda-resepsi" className="min-h-[120px]">
                {getStage('agenda-resepsi') === 'wireframe' && (
                  <div className="border border-dashed border-amber-300 rounded-2xl p-5 text-center text-xs text-stone-400 italic bg-amber-50/20 min-h-[120px] flex items-center justify-center select-none">
                    [Frame Jadwal Resepsi Pernikahan]
                  </div>
                )}
                {getStage('agenda-resepsi') === 'container' && (
                  <div className="bg-amber-50/40 rounded-2xl p-5 border border-teal-400 min-h-[120px] flex flex-col items-center justify-center gap-1.5 craft-fade-in select-none">
                    <span className="text-[10px] font-mono text-teal-800 font-semibold">
                      [Card Resepsi Siap Diisi Waktu &amp; Gedung...]
                    </span>
                    <span className="inline-block w-1.5 h-4 bg-teal-600 animate-pulse" />
                  </div>
                )}
                {(getStage('agenda-resepsi') === 'typing' ||
                  getStage('agenda-resepsi') === 'verified') && (
                  <div className="bg-amber-50/50 rounded-2xl p-4 border border-amber-200 space-y-2 craft-fade-in">
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-base text-stone-900">
                        {getStage('agenda-resepsi') === 'typing'
                          ? sliceByProgress('Resepsi Pernikahan', Math.min(1, typingProgress * 3))
                          : 'Resepsi Pernikahan'}
                      </span>
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 craft-pop-in">
                        Umum &amp; Kerabat
                      </span>
                    </div>
                    <div className="text-xs text-stone-600 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                        <span>
                          {getStage('agenda-resepsi') === 'typing'
                            ? typingProgress > 0.2
                              ? sliceByProgress(
                                  'Minggu, 14 November 2027',
                                  (typingProgress - 0.2) / 0.3
                                )
                              : ''
                            : 'Minggu, 14 November 2027'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                        <span>
                          {getStage('agenda-resepsi') === 'typing'
                            ? typingProgress > 0.45
                              ? sliceByProgress(
                                  '11:00 - 14:00 WIB',
                                  (typingProgress - 0.45) / 0.25
                                )
                              : ''
                            : '11:00 - 14:00 WIB'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                        <span>
                          {getStage('agenda-resepsi') === 'typing'
                            ? typingProgress > 0.65
                              ? sliceByProgress(
                                  DUMMY_INVITATION.venueName,
                                  (typingProgress - 0.65) / 0.35
                                )
                              : ''
                            : DUMMY_INVITATION.venueName}
                          {getStage('agenda-resepsi') === 'typing' && (
                            <span className="inline-block w-1.5 h-3 bg-teal-700 ml-0.5 animate-pulse" />
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Gelombang 9B (Windi): Tombol Buka Google Maps */}
              <div data-craft-id="maps-button" className="min-h-[44px]">
                {getStage('maps-button') === 'wireframe' && (
                  <div className="border border-dashed border-stone-400 rounded-xl h-11 flex items-center justify-center text-xs text-stone-400 italic bg-stone-100/50 select-none">
                    [Area Tombol Petunjuk Arah Google Maps]
                  </div>
                )}
                {getStage('maps-button') === 'container' && (
                  <div className="border border-amber-500 bg-stone-800 text-amber-200 rounded-xl h-11 flex items-center justify-center gap-1.5 text-[10px] font-mono craft-fade-in select-none">
                    <span>[Tombol CTA Maps Siap Diketik...]</span>
                    <span className="inline-block w-1.5 h-3.5 bg-amber-300 animate-pulse" />
                  </div>
                )}
                {(getStage('maps-button') === 'typing' ||
                  getStage('maps-button') === 'verified') && (
                  <a
                    href={DUMMY_INVITATION.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-xs transition-all active:scale-95 craft-pop-in"
                  >
                    <MapPin className="w-4 h-4 text-amber-400" />
                    <span>{getTyped('maps-button', 'Petunjuk Arah Google Maps')}</span>
                    {getStage('maps-button') === 'typing' && (
                      <span className="inline-block w-1 h-3 bg-white ml-0.5 animate-pulse" />
                    )}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </section>

          {/* Gelombang 10 & 11B: Digital Envelope Block (Header, Rekening BCA & Mandiri, Barcode QRIS) */}
          <DigitalEnvelopeBlock
            bankAccounts={bankAccountsList}
            qrisImageUrl="/generated/qris-merchant-dummy.svg"
            qrisHolderName="Arif & Windi Wedding"
            headerCraftId="envelope-header"
            bankCardCraftId="bank-card"
            qrisCardCraftId="qris-card"
            headerStage={getStage('envelope-header')}
            bankStage={getStage('bank-card')}
            qrisStage={getStage('qris-card')}
            typingProgress={typingProgress}
          />

          {/* 5. RSVP Konfirmasi Kehadiran (Gelombang 11A oleh Arif, serempak dengan QRIS oleh Windi) */}
          <section className="p-6 border-t border-stone-100 bg-stone-50/70 space-y-4">
            <div
              data-craft-id="rsvp-header"
              className="min-h-[54px] flex flex-col justify-center text-center"
            >
              {getStage('rsvp-header') === 'wireframe' && (
                <div className="border border-dashed border-teal-300 rounded-xl p-3 text-xs text-stone-400 italic bg-white/60 select-none">
                  [Area Header Konfirmasi Kehadiran Tamu]
                </div>
              )}
              {getStage('rsvp-header') === 'container' && (
                <div className="border border-teal-400 bg-teal-50/40 rounded-xl p-3 text-[10px] font-mono text-teal-800 flex items-center justify-center gap-1.5 craft-fade-in select-none">
                  <span>[Header RSVP Siap Diketik...]</span>
                  <span className="inline-block w-1.5 h-3.5 bg-teal-700 animate-pulse" />
                </div>
              )}
              {(getStage('rsvp-header') === 'typing' ||
                getStage('rsvp-header') === 'verified') && (
                <div className="text-center craft-fade-in">
                  <h2 className="text-xl font-serif font-bold text-stone-900">
                    {getStage('rsvp-header') === 'typing'
                      ? sliceByProgress('Konfirmasi Kehadiran', Math.min(1, typingProgress * 2.4))
                      : 'Konfirmasi Kehadiran'}
                  </h2>
                  <p className="text-xs text-stone-500 mt-1">
                    {getStage('rsvp-header') === 'typing'
                      ? typingProgress > 0.35
                        ? sliceByProgress(rsvpIntroText, (typingProgress - 0.35) / 0.65)
                        : ''
                      : rsvpIntroText}
                    {getStage('rsvp-header') === 'typing' && (
                      <span className="inline-block w-1.5 h-3 bg-teal-700 ml-0.5 animate-pulse" />
                    )}
                  </p>
                </div>
              )}
            </div>

            {getStage('qris-card') !== 'verified' ? (
              <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 text-center space-y-1.5 text-xs text-teal-800 craft-fade-in select-none">
                <Sparkles className="w-4 h-4 text-teal-600 mx-auto animate-pulse" />
                <p className="font-semibold">
                  Undangan Sedang Dirakit Serempak oleh Arif &amp; Windi
                </p>
                <p className="text-[11px] text-teal-600">
                  Formulir konfirmasi kehadiran dan buku tamu akan terbuka otomatis setelah ke-22 elemen selesai divalidasi.
                </p>
              </div>
            ) : isRsvpSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center space-y-2 craft-pop-in">
                <CheckCircle className="w-6 h-6 text-emerald-600 mx-auto" />
                <p className="text-xs font-bold text-emerald-800">
                  Terima kasih atas konfirmasi kehadiran Anda!
                </p>
                <p className="text-[11px] text-emerald-700">
                  Data kehadiran telah tersimpan aman di sistem penyelenggara.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleRsvpSubmit}
                className="space-y-3 bg-white p-4 rounded-2xl border border-stone-200 craft-fade-in"
              >
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso &amp; Keluarga"
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-hidden focus:border-teal-700"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Status Kehadiran
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setRsvpStatus('ATTENDING')}
                      className={`py-2 rounded-xl font-medium transition-all cursor-pointer ${
                        rsvpStatus === 'ATTENDING'
                          ? 'bg-teal-700 text-white font-semibold shadow-xs'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      Hadir
                    </button>
                    <button
                      type="button"
                      onClick={() => setRsvpStatus('NOT_ATTENDING')}
                      className={`py-2 rounded-xl font-medium transition-all cursor-pointer ${
                        rsvpStatus === 'NOT_ATTENDING'
                          ? 'bg-stone-800 text-white font-semibold shadow-xs'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      Berhalangan
                    </button>
                  </div>
                </div>

                {rsvpStatus === 'ATTENDING' && (
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Jumlah Orang Hadir
                    </label>
                    <select
                      value={rsvpCount}
                      onChange={(e) => setRsvpCount(Number(e.target.value))}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-hidden focus:border-teal-700"
                    >
                      <option value={1}>1 Orang</option>
                      <option value={2}>2 Orang</option>
                      <option value={3}>3 Orang</option>
                      <option value={4}>4 Orang</option>
                    </select>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full min-h-[44px] bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-xl py-2.5 transition-all shadow-xs cursor-pointer"
                >
                  Kirim Konfirmasi
                </button>
              </form>
            )}
          </section>

          {/* 6. Doa Restu & Buku Tamu */}
          <section className="p-6 space-y-4 flex-1">
            <div className="text-center">
              <h2 className="text-xl font-serif font-bold text-stone-900">Ucapan &amp; Doa Restu</h2>
              <p className="text-xs text-stone-500 mt-1">
                Tuliskan pesan doa kebaikan untuk kedua mempelai:
              </p>
            </div>

            {/* Form Kirim Doa */}
            <form
              onSubmit={handleSendWish}
              className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2.5"
            >
              <input
                type="text"
                required
                placeholder="Nama Anda"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-stone-200 focus:outline-hidden focus:border-teal-700"
              />
              <textarea
                required
                rows={3}
                placeholder="Tuliskan ucapan dan doa restu..."
                value={senderMessage}
                onChange={(e) => setSenderMessage(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-stone-200 focus:outline-hidden focus:border-teal-700"
              />
              <button
                type="submit"
                className="w-full min-h-[40px] inline-flex items-center justify-center gap-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl py-2 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim Doa Restu</span>
              </button>
              {isWishSent && (
                <p className="text-[11px] text-emerald-700 text-center font-medium">
                  Pesan doa restu Anda berhasil dikirimkan!
                </p>
              )}
            </form>

            {/* Daftar Doa Tamu Realistis */}
            <div className="space-y-3 pt-2">
              {wishes.map((w) => (
                <div
                  key={w.id}
                  className="bg-white p-3.5 rounded-xl border border-stone-100 shadow-2xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-stone-900">{w.guestName}</span>
                    <span className="text-[10px] text-stone-400 font-mono">
                      {new Date(w.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed italic">
                    &ldquo;{w.wishMessage}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Footer Undangan */}
          <footer className="p-6 bg-stone-900 text-white text-center text-xs space-y-2 mt-auto">
            <p className="font-serif italic text-base">Arif &amp; Windi</p>
            <p className="text-stone-400 text-[11px]">
              Terima kasih atas segala doa restu dan kehadiran Bapak/Ibu/Saudara/i sekalian.
            </p>
            <div className="pt-4 border-t border-stone-800 text-[10px] text-stone-500">
              Powered by NikahPlan Studio
            </div>
          </footer>
        </main>
      )}
    </div>
  );
}
