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
  Copy,
  Check,
  Instagram,
  Music,
  Volume2,
  VolumeX,
  Gift,
  CreditCard,
  Sparkles,
} from 'lucide-react';
import {
  WaxSealEnvelopeCover,
  DigitalEnvelopeBlock,
  SwarmRebuild,
  type FloralTheme,
} from '@nikahplan/invitation-blocks';
import {
  DUMMY_INVITATION,
  DUMMY_ENVELOPES,
  DUMMY_RSVP_WISHES,
  formatDateIndo,
} from '@nikahplan/ui';
import type { RsvpWish, InvitationEnvelope } from '@nikahplan/db';

export default function PublicInvitationPage() {
  const [isCoverOpen, setIsCoverOpen] = React.useState(false);
  const [isRebuildFinished, setIsRebuildFinished] = React.useState(false);
  const [speedMultiplier, setSpeedMultiplier] = React.useState<number>(1.0);
  const [confettiTheme, setConfettiTheme] = React.useState<FloralTheme>('botanical-sage');
  const [isPlayingMusic, setIsPlayingMusic] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const mainContainerRef = React.useRef<HTMLElement | null>(null);

  // Copy feedback states
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);

  // Live Countdown state
  const [timeLeft, setTimeLeft] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  React.useEffect(() => {
    const targetDate = new Date('2027-11-14T08:00:00+07:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // URL parameters handling
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const speedParam = params.get('speed');
    if (speedParam) {
      const parsedSpeed = parseFloat(speedParam);
      if (!isNaN(parsedSpeed) && parsedSpeed > 0) {
        setSpeedMultiplier(parsedSpeed);
      }
    }
    const confettiParam = params.get('confetti');
    if (
      confettiParam &&
      ['botanical-sage', 'crimson-gold', 'lavender-lilac', 'golden-sunflower', 'sakura-pastel'].includes(confettiParam)
    ) {
      setConfettiTheme(confettiParam as FloralTheme);
    }
    const coverParam = params.get('cover');
    if (coverParam === '0' || coverParam === 'false') {
      setIsCoverOpen(true);
    }
  }, []);

  // Handle open invitation + play music automatically
  const handleOpenInvitation = () => {
    setIsCoverOpen(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlayingMusic(true);
      }).catch(() => {
        // Autoplay may be restricted by browser until user gesture
      });
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlayingMusic(true);
      }).catch(() => {});
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  const [wishes, setWishes] = React.useState<RsvpWish[]>(DUMMY_RSVP_WISHES);
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

  return (
    <div className="min-h-screen bg-[#FAF5E6] text-stone-900 selection:bg-teal-100 relative">
      {/* Background BGM Audio Element */}
      <audio
        ref={audioRef}
        loop
        src="https://assets.satumomen.com/musics/nadhif-basalamah-kota-ini-tak-sama-tanpamu-official-lyric-video-grp6fcniomm-00-01-02-00-04-28-part.mp3"
      />

      {/* Floating Audio BGM Pill */}
      {isCoverOpen && (
        <button
          type="button"
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-stone-900/90 hover:bg-stone-900 text-amber-300 border-2 border-amber-400/80 shadow-2xl backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
          title={isPlayingMusic ? 'Jeda Musik Latar' : 'Putar Musik Latar'}
          aria-label="Kontrol Musik Latar"
        >
          {isPlayingMusic ? (
            <div className="relative flex items-center justify-center">
              <Volume2 className="w-5 h-5 text-amber-300 animate-pulse" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
          ) : (
            <VolumeX className="w-5 h-5 text-stone-400" />
          )}
        </button>
      )}

      {/* 1. Wax Seal Physical Envelope Cover (Cinematic Flap Unfold & Fade Out) */}
      <WaxSealEnvelopeCover
        groomNick={DUMMY_INVITATION.groomNick}
        brideNick={DUMMY_INVITATION.brideNick}
        weddingDateFormatted={formatDateIndo(DUMMY_INVITATION.akadDatetime)}
        guestName="Sahabat Terkasih"
        isOpen={isCoverOpen}
        onOpen={handleOpenInvitation}
      />

      {/* 2. Main Invitation Content dengan REA Swarm Rebuild Engine */}
      {isCoverOpen && (
        <main
          ref={mainContainerRef}
          data-swarm-active={!isRebuildFinished ? 'true' : 'false'}
          className={`relative max-w-md mx-auto shadow-2xl bg-[#FCF8ED] min-h-screen overflow-hidden flex flex-col transition-all duration-1000 ${
            isCoverOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{
            fontFamily: "'Montserrat', 'Plus Jakarta Sans', system-ui, sans-serif",
          }}
        >
          {/* Swarm Rebuild Zero-Flash CSS Guard: Blank Frame until Built */}
          <style jsx global>{`
            /* Keyframe Entrance Animation: Spring Pop + Fade In */
            @keyframes swarmPopEntrance {
              0% {
                opacity: 0;
                transform: translateY(8px) scale(0.96);
              }
              65% {
                opacity: 1;
                transform: translateY(-1.5px) scale(1.015);
              }
              100% {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }

            @keyframes swarmCardEntrance {
              0% {
                opacity: 0;
                transform: scale(0.975);
              }
              100% {
                opacity: 1;
                transform: scale(1);
              }
            }

            /* 1. Blank Initial State: Mask direct sections, footer, and containers before scanner runs */
            [data-swarm-active="true"]:not(.swarm-scanned) > section,
            [data-swarm-active="true"]:not(.swarm-scanned) > footer,
            [data-swarm-active="true"]:not(.swarm-scanned) > div:not([data-swarm-overlay="true"]) {
              opacity: 0 !important;
            }

            /* 2. Atomic Masking: Every detected atom starts 100% invisible */
            [data-swarm-active="true"] .swarm-node {
              opacity: 0 !important;
              transform: scale(0.96);
              transition: opacity 0.24s cubic-bezier(0.16, 1, 0.3, 1), transform 0.24s cubic-bezier(0.16, 1, 0.3, 1) !important;
            }

            /* 3. Smooth Pop Entrance: Element pops into view with spring physics when built */
            [data-swarm-active="true"] .swarm-node.swarm-revealed {
              opacity: 1 !important;
              animation: swarmPopEntrance 0.36s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
            }

            /* 4. Parent Container Frame Guard: Container frame background/border is hidden until revealed */
            [data-swarm-active="true"] .swarm-node-container:not(.swarm-revealed) {
              background-color: transparent !important;
              border-color: transparent !important;
              box-shadow: none !important;
            }

            [data-swarm-active="true"] .swarm-node-container.swarm-revealed {
              opacity: 1 !important;
              animation: swarmCardEntrance 0.32s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
            }
          `}</style>

          {/* Autonomous Swarm Rebuild Engine (Zero Controller Noise, Scatter & Disappear upon Done) */}
          <SwarmRebuild
            targetRef={mainContainerRef}
            enabled={isCoverOpen}
            speedMultiplier={speedMultiplier}
            confettiTheme={confettiTheme}
            onComplete={() => setIsRebuildFinished(true)}
          />

          {/* 1. SEKSI HERO COVER DENGAN SUDUT ORNAMEN (ADIKARYA HIJIWANCI) */}
          <section className="relative min-h-[540px] w-full overflow-hidden bg-[#2D4539] text-white flex flex-col justify-between p-6">
            {/* Sudut Ornamen Floral Tradisional */}
            <img
              src="/referensi/frame-tr.webp"
              alt="Ornamen Sudut Kanan Atas"
              className="absolute top-0 right-0 w-32 sm:w-40 pointer-events-none z-10 opacity-90"
            />
            <img
              src="/referensi/frame-bl.webp"
              alt="Ornamen Sudut Kiri Bawah"
              className="absolute bottom-0 left-0 w-32 sm:w-40 pointer-events-none z-10 opacity-90"
            />

            {/* Foto Latar Belakang Artistik */}
            <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none">
              <img
                src="/referensi/797207-gallery-D7vomq3BEn.jpg"
                alt="Background Prewedding"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#1C2C24]/80 via-[#24392E]/70 to-[#1C2C24]/95 pointer-events-none" />

            {/* Konten Atas Cover */}
            <div className="relative z-10 text-center pt-8 space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-amber-300 font-semibold block">
                THE WEDDING OF
              </span>
              <h1
                className="text-4xl sm:text-5xl font-serif italic font-bold tracking-tight text-white drop-shadow-md"
                style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
              >
                Arif &amp; Windi
              </h1>
              <p className="text-xs text-amber-200/90 font-mono tracking-widest pt-1">
                MINGGU, 14 NOVEMBER 2027
              </p>
            </div>

            {/* Kartu Tamu Terhormat (Diadopsi dari Referensi) */}
            <div className="relative z-10 text-center pb-6">
              <div className="p-4 rounded-2xl bg-white/10 border border-amber-300/30 backdrop-blur-md shadow-xl max-w-xs mx-auto space-y-2">
                <span className="text-[11px] text-stone-200 uppercase tracking-wider block font-medium">
                  Kepada Yth. Bapak/Ibu/Saudara/i:
                </span>
                <div className="text-lg font-bold text-amber-300 font-serif">
                  Sahabat Terkasih
                </div>
                <span className="text-[11px] text-stone-300 block">
                  Di Tempat
                </span>
              </div>
            </div>
          </section>

          {/* 2. SEKSI SALAM PEMBUKA & AYAT SUCI QS. AR-RUM: 21 */}
          <section className="relative p-6 text-center space-y-6 border-b border-amber-200/40 bg-[#FAF5E6] overflow-hidden">
            {/* Sudut Ornamen Floral */}
            <img
              src="/referensi/frame-tr.webp"
              alt="Ornamen Sudut"
              className="absolute top-0 right-0 w-28 pointer-events-none opacity-80"
            />
            <img
              src="/referensi/frame-bl.webp"
              alt="Ornamen Sudut"
              className="absolute bottom-0 left-0 w-28 pointer-events-none opacity-80"
            />

            {/* Arch Silhouette Foto Berdua */}
            <div
              className="relative z-10 w-48 sm:w-56 h-64 sm:h-72 mx-auto rounded-t-full rounded-b-[180px] p-2 border-2 shadow-xl overflow-hidden bg-white"
              style={{ borderColor: '#BF8F01' }}
            >
              <img
                src="/referensi/797207-gallery-D7vomq3BEn.jpg"
                alt="Foto Mempelai Berdua"
                className="w-full h-full object-cover rounded-t-full rounded-b-[175px]"
              />
            </div>

            <div className="relative z-10 space-y-3 max-w-xs mx-auto">
              <h2
                className="font-serif italic font-bold text-xl text-[#2D4539]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Assalamu&apos;alaikum Wr. Wb.
              </h2>
              <p className="text-xs text-stone-700 leading-relaxed font-sans">
                Tanpa mengurangi rasa hormat, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri dan memberikan doa restu pada acara pernikahan kami:
              </p>

              {/* Box Kutipan Ayat */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 shadow-xs space-y-2 text-stone-800">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 mx-auto flex items-center justify-center">
                  <Heart className="w-4 h-4 fill-amber-600/30 text-amber-600" />
                </div>
                <p className="font-serif italic text-xs leading-relaxed text-stone-800">
                  &ldquo;Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.&rdquo;
                </p>
                <span className="text-[10px] font-mono font-bold text-amber-800 uppercase tracking-widest block">
                  (QS. AR-RUM: 21)
                </span>
              </div>
            </div>
          </section>

          {/* 3 & 4. SEKSI PROFIL KEDUA MEMPELAI (ADIKARYA ARCH CARDS) */}
          <section className="relative p-6 space-y-8 border-b border-amber-200/40 bg-[#FCF8ED] overflow-hidden">
            <div className="text-center space-y-1 relative z-10">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-700 font-semibold block">
                MEMPELAI PERNIKAHAN
              </span>
              <h2
                className="text-2xl font-serif font-bold text-[#2D4539]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Kedua Mempelai
              </h2>
            </div>

            {/* Kartu Profil Mempelai Pria */}
            <div className="bg-white p-5 rounded-3xl border-2 border-amber-200 shadow-md text-center space-y-3 relative z-10">
              <div
                className="w-28 h-36 mx-auto rounded-t-full rounded-b-2xl p-1 border-2 overflow-hidden shadow-sm"
                style={{ borderColor: '#BF8F01', backgroundColor: '#FAF5E6' }}
              >
                <img
                  src="/referensi/797207-gallery-2nbuRtY3o0.jpg"
                  alt="Ahmad Arif Fauzi"
                  className="w-full h-full object-cover rounded-t-full rounded-b-xl"
                />
              </div>

              <div>
                <h3
                  className="font-serif font-bold text-lg text-stone-900"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Ahmad Arif Fauzi, S.Kom
                </h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  Putra kedua dari Pasangan:
                </p>
                <p className="text-xs font-semibold text-stone-800">
                  Bapak H. Heri Purwanto &amp; Ibu Hj. Endang Tatik
                </p>
              </div>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-medium transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-600" />
                <span>@ahmadarif</span>
              </a>
            </div>

            {/* Simbol Dan (&) Ornamen */}
            <div className="text-center text-2xl font-serif italic text-amber-600 font-bold">
              &amp;
            </div>

            {/* Kartu Profil Mempelai Wanita */}
            <div className="bg-white p-5 rounded-3xl border-2 border-amber-200 shadow-md text-center space-y-3 relative z-10">
              <div
                className="w-28 h-36 mx-auto rounded-t-full rounded-b-2xl p-1 border-2 overflow-hidden shadow-sm"
                style={{ borderColor: '#BF8F01', backgroundColor: '#FAF5E6' }}
              >
                <img
                  src="/referensi/797207-gallery-8LWkAveVdN.jpg"
                  alt="Windi Astuti"
                  className="w-full h-full object-cover rounded-t-full rounded-b-xl"
                />
              </div>

              <div>
                <h3
                  className="font-serif font-bold text-lg text-stone-900"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Windi Astuti, S.Pd
                </h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  Putri pertama dari Pasangan:
                </p>
                <p className="text-xs font-semibold text-stone-800">
                  Bapak Drs. H. Bambang Suherman &amp; Ibu Hj. Siti Rohanah
                </p>
              </div>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-medium transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-600" />
                <span>@windiastuti</span>
              </a>
            </div>
          </section>

          {/* 5. SEKSI WAKTU & RANGKAIAN ACARA + LIVE COUNTDOWN TIMER */}
          <section className="relative p-6 space-y-6 border-b border-amber-200/40 bg-[#FAF5E6] overflow-hidden">
            <div className="text-center space-y-1 relative z-10">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-700 font-semibold block">
                AGENDA PERNIKAHAN
              </span>
              <h2
                className="text-2xl font-serif font-bold text-[#2D4539]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Rangkaian Acara
              </h2>
            </div>

            {/* Live Countdown Hari-H */}
            <div className="grid grid-cols-4 gap-2 text-center max-w-xs mx-auto">
              <div className="p-2.5 rounded-2xl bg-white border border-amber-300 shadow-xs">
                <span className="font-serif font-bold text-xl text-stone-900 block">
                  {timeLeft.days}
                </span>
                <span className="text-[9px] font-mono uppercase text-stone-500 font-semibold">
                  Hari
                </span>
              </div>
              <div className="p-2.5 rounded-2xl bg-white border border-amber-300 shadow-xs">
                <span className="font-serif font-bold text-xl text-stone-900 block">
                  {timeLeft.hours}
                </span>
                <span className="text-[9px] font-mono uppercase text-stone-500 font-semibold">
                  Jam
                </span>
              </div>
              <div className="p-2.5 rounded-2xl bg-white border border-amber-300 shadow-xs">
                <span className="font-serif font-bold text-xl text-stone-900 block">
                  {timeLeft.minutes}
                </span>
                <span className="text-[9px] font-mono uppercase text-stone-500 font-semibold">
                  Menit
                </span>
              </div>
              <div className="p-2.5 rounded-2xl bg-white border border-amber-300 shadow-xs">
                <span className="font-serif font-bold text-xl text-amber-600 block">
                  {timeLeft.seconds}
                </span>
                <span className="text-[9px] font-mono uppercase text-stone-500 font-semibold">
                  Detik
                </span>
              </div>
            </div>

            {/* Kartu Detail Acara */}
            <div className="space-y-4">
              {/* Kartu Akad Nikah */}
              <div className="bg-white p-5 rounded-3xl border border-amber-300 shadow-sm space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <h3
                    className="font-serif font-bold text-base text-[#2D4539]"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Akad Nikah
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-emerald-100 text-emerald-800">
                    Khusus Keluarga
                  </span>
                </div>
                <div className="text-xs text-stone-600 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Minggu, 14 November 2027</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>08.00 - 10.00 WIB</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>Pendopo Dalem Ngabean, Kraton, Yogyakarta</span>
                  </div>
                </div>
              </div>

              {/* Kartu Resepsi Pernikahan */}
              <div className="bg-white p-5 rounded-3xl border border-amber-300 shadow-sm space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <h3
                    className="font-serif font-bold text-base text-[#2D4539]"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Resepsi Pernikahan
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-amber-100 text-amber-800">
                    Umum &amp; Kerabat
                  </span>
                </div>
                <div className="text-xs text-stone-600 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Minggu, 14 November 2027</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>11.00 - 14.00 WIB</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>Pendopo Dalem Ngabean, Kraton, Yogyakarta</span>
                  </div>
                </div>
              </div>

              {/* Tombol Simpan ke Google Calendar */}
              <a
                href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+Arif+%26+Windi&dates=20271114T010000Z/20271114T070000Z&details=Walimatul+%27Urs+Ahmad+Arif+Fauzi+%26+Windi+Astuti&location=Pendopo+Dalem+Ngabean%2C+Kraton+Yogyakarta"
                target="_blank"
                rel="noreferrer"
                className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-md transition-all active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                <span>Simpan Tanggal ke Google Calendar</span>
              </a>
            </div>
          </section>

          {/* 6. SEKSI DENAH & PETUNJUK LOKASI VENUE */}
          <section className="relative p-6 space-y-4 border-b border-amber-200/40 bg-[#FCF8ED]">
            <div className="text-center space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-700 font-semibold block">
                PETA &amp; LOKASI ACARA
              </span>
              <h2
                className="text-2xl font-serif font-bold text-[#2D4539]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Denah Lokasi
              </h2>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-amber-300 shadow-sm space-y-3">
              <div className="space-y-1">
                <span className="text-xs font-bold text-stone-900 block">
                  Pendopo Dalem Ngabean
                </span>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Jl. Ngabean No. 14, Kraton, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55132
                </p>
              </div>

              <a
                href={DUMMY_INVITATION.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-[#2D4539] hover:bg-[#23372D] text-white text-xs font-semibold shadow-md transition-all active:scale-95"
              >
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Petunjuk Arah Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </section>

          {/* 7. SEKSI KISAH CINTA (OUR LOVE STORY) */}
          <section className="relative p-6 space-y-5 border-b border-amber-200/40 bg-[#FAF5E6] overflow-hidden">
            <div className="text-center space-y-1 relative z-10">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-700 font-semibold block">
                PERJALANAN KAMI
              </span>
              <h2
                className="text-2xl font-serif font-bold text-[#2D4539]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Our Love Story
              </h2>
            </div>

            <div className="space-y-3 relative z-10">
              {/* Milestone 1 */}
              <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-xs space-y-1.5">
                <span className="text-[11px] font-mono font-bold text-amber-700 px-2.5 py-0.5 rounded-full bg-amber-100 inline-block">
                  Tahun 2021
                </span>
                <h3 className="font-serif font-bold text-sm text-stone-900">
                  Awal Perjumpaan
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Semua bermula saat kepanitiaan seminar kampus di Yogyakarta. Dari interaksi sederhana dan diskusi tugas, tumbuh rasa saling menghargai.
                </p>
              </div>

              {/* Milestone 2 */}
              <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-xs space-y-1.5">
                <span className="text-[11px] font-mono font-bold text-amber-700 px-2.5 py-0.5 rounded-full bg-amber-100 inline-block">
                  Tahun 2023
                </span>
                <h3 className="font-serif font-bold text-sm text-stone-900">
                  Menjalin Komitmen
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Kami mengikrarkan komitmen untuk melangkah bersama dengan niat tulus saling mendukung karir, impian, dan ketaatan kepada Allah SWT.
                </p>
              </div>

              {/* Milestone 3 */}
              <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-xs space-y-1.5">
                <span className="text-[11px] font-mono font-bold text-amber-700 px-2.5 py-0.5 rounded-full bg-amber-100 inline-block">
                  Tahun 2026
                </span>
                <h3 className="font-serif font-bold text-sm text-stone-900">
                  Lamaran Khidmat
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Kedua keluarga besar bertemu dalam suasana sakral dan hangat untuk mengikat ikrar khitbah dan menyepakati hari bahagia pernikahan.
                </p>
              </div>
            </div>
          </section>

          {/* 8. SEKSI GALERI FOTO KENANGAN (OUR MEMORIES) */}
          <section className="relative p-6 space-y-5 border-b border-amber-200/40 bg-[#FCF8ED] overflow-hidden">
            <div className="text-center space-y-1 relative z-10">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-700 font-semibold block">
                GALERI KENANGAN
              </span>
              <h2
                className="text-2xl font-serif font-bold text-[#2D4539]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Our Memories
              </h2>
            </div>

            {/* Grid Galeri Estetik Arch (Diadopsi dari Referensi) */}
            <div className="grid grid-cols-2 gap-3 relative z-10">
              <div className="space-y-3">
                <div className="rounded-t-[36px] rounded-b-2xl overflow-hidden border-2 border-amber-200 shadow-md h-48 bg-stone-100">
                  <img
                    src="/referensi/797207-gallery-D7vomq3BEn.jpg"
                    alt="Galeri 1"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden border-2 border-amber-200 shadow-md h-36 bg-stone-100">
                  <img
                    src="/referensi/797207-gallery-COX9fLRlKg.jpg"
                    alt="Galeri 2"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="rounded-2xl rounded-b-[36px] overflow-hidden border-2 border-amber-200 shadow-md h-44 bg-stone-100">
                  <img
                    src="/referensi/797207-gallery-cI1oF5BtRz.jpg"
                    alt="Galeri 3"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <div className="rounded-2xl overflow-hidden border-2 border-amber-200 shadow-md h-36 bg-stone-100">
                  <img
                    src="/referensi/797207-gallery-jMqU8nYexf.jpg"
                    alt="Galeri 4"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="rounded-t-[36px] rounded-b-2xl overflow-hidden border-2 border-amber-200 shadow-md h-48 bg-stone-100">
                  <img
                    src="/referensi/797207-gallery-Lhimda0fph.jpg"
                    alt="Galeri 5"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden border-2 border-amber-200 shadow-md h-40 bg-stone-100">
                  <img
                    src="/referensi/797207-gallery-DXpEkLolkN.jpg"
                    alt="Galeri 6"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 9. SEKSI TANDA KASIH & AMPLOP DIGITAL (BANK + QRIS + KADO FISIK) */}
          <section className="relative p-6 space-y-6 border-b border-amber-200/40 bg-[#FAF5E6] overflow-hidden">
            <div className="text-center space-y-1 relative z-10">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-700 font-semibold block">
                AMPLOP DIGITAL &amp; KADO
              </span>
              <h2
                className="text-2xl font-serif font-bold text-[#2D4539]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Tanda Kasih
              </h2>
              <p className="text-xs text-stone-600 max-w-xs mx-auto leading-relaxed pt-1">
                Doa restu Anda merupakan karunia terindah bagi kami. Bagi keluarga dan sahabat yang ingin memberikan tanda kasih secara digital maupun fisik:
              </p>
            </div>

            <div className="space-y-4 relative z-10">
              {/* Rekening Mandiri */}
              <div className="bg-white p-5 rounded-3xl border border-amber-300 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-stone-900">Bank Mandiri</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                    MANDIRI
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                  <div>
                    <span className="font-mono font-bold text-sm text-stone-900 block">
                      1370019283746
                    </span>
                    <span className="text-[11px] text-stone-500">
                      a.n Ahmad Arif Fauzi
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard('1370019283746', 'mandiri')}
                    className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedKey === 'mandiri' ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Rekening BCA */}
              <div className="bg-white p-5 rounded-3xl border border-amber-300 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-stone-900">Bank BCA</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                    BCA
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                  <div>
                    <span className="font-mono font-bold text-sm text-stone-900 block">
                      8691029384
                    </span>
                    <span className="text-[11px] text-stone-500">
                      a.n Windi Astuti
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard('8691029384', 'bca')}
                    className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedKey === 'bca' ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* QRIS Amplop Digital */}
              <div className="bg-white p-5 rounded-3xl border border-amber-300 shadow-sm text-center space-y-3">
                <span className="font-bold text-sm text-stone-900 block">
                  QRIS Amplop Digital
                </span>
                <div className="w-44 h-44 mx-auto p-2 bg-white rounded-2xl border-2 border-stone-800 shadow-xs">
                  <img
                    src="/generated/qris-merchant-dummy.svg"
                    alt="QRIS Digital Envelope"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-[11px] text-stone-500">
                  Scan QRIS menggunakan aplikasi perbankan atau e-wallet (BCA, Mandiri, GoPay, OVO, ShopeePay).
                </p>
              </div>

              {/* Kirim Kado Fisik */}
              <div className="bg-white p-5 rounded-3xl border border-amber-300 shadow-sm space-y-2">
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-amber-600" />
                  <span className="font-bold text-sm text-stone-900">Kirim Kado Fisik</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Alamat Pengiriman: Kediaman Mempelai, Pendopo Dalem Ngabean, Jl. Ngabean No. 14, Kraton, Kota Yogyakarta 55132
                </p>
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(
                      'Kediaman Mempelai, Pendopo Dalem Ngabean, Jl. Ngabean No. 14, Kraton, Kota Yogyakarta 55132',
                      'alamat'
                    )
                  }
                  className="w-full py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedKey === 'alamat' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                      <span>Alamat Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-stone-500" />
                      <span>Salin Alamat Kado</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </section>

          {/* 10. SEKSI RSVP & BUKU TAMU DOA RESTU */}
          <section className="relative p-6 space-y-6 border-b border-amber-200/40 bg-[#FCF8ED]">
            <div className="text-center space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-700 font-semibold block">
                BUKU TAMU &amp; RESTU
              </span>
              <h2
                className="text-2xl font-serif font-bold text-[#2D4539]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Konfirmasi Kehadiran
              </h2>
              <p className="text-xs text-stone-600 max-w-xs mx-auto leading-relaxed pt-1">
                Mohon konfirmasikan kehadiran Bapak/Ibu/Saudara/i untuk kenyamanan persiapan jamuan resepsi.
              </p>
            </div>

            {/* Form RSVP */}
            {isRsvpSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-5 text-center space-y-2">
                <CheckCircle className="w-7 h-7 text-emerald-600 mx-auto" />
                <p className="text-xs font-bold text-emerald-900">
                  Terima kasih atas konfirmasi kehadiran Anda!
                </p>
                <p className="text-[11px] text-emerald-700">
                  Data konfirmasi Anda telah tersimpan rapi di sistem penyelenggara.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleRsvpSubmit}
                className="space-y-3 bg-white p-5 rounded-3xl border border-amber-200 shadow-sm"
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
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-hidden focus:border-amber-600 bg-stone-50/50"
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
                      className={`py-2.5 rounded-xl font-medium transition-all cursor-pointer ${
                        rsvpStatus === 'ATTENDING'
                          ? 'bg-[#2D4539] text-white font-semibold shadow-xs'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      Hadir
                    </button>
                    <button
                      type="button"
                      onClick={() => setRsvpStatus('NOT_ATTENDING')}
                      className={`py-2.5 rounded-xl font-medium transition-all cursor-pointer ${
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
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-hidden focus:border-amber-600 bg-stone-50/50"
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
                  className="w-full min-h-[44px] bg-[#2D4539] hover:bg-[#23372D] text-white text-xs font-semibold rounded-2xl py-2.5 transition-all shadow-md cursor-pointer"
                >
                  Kirim Konfirmasi Kehadiran
                </button>
              </form>
            )}

            {/* Form Doa Restu & Daftar Ucapan */}
            <div className="space-y-4 pt-2">
              <div className="text-center space-y-1">
                <h3
                  className="text-lg font-serif font-bold text-[#2D4539]"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Ucapan &amp; Doa Restu
                </h3>
                <p className="text-xs text-stone-500">
                  Sampaikan ucapan dan untaian doa kebaikan untuk kedua mempelai:
                </p>
              </div>

              <form
                onSubmit={handleSendWish}
                className="bg-white p-5 rounded-3xl border border-amber-200 shadow-sm space-y-3"
              >
                <input
                  type="text"
                  required
                  placeholder="Nama Anda"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-stone-50/50 border border-stone-200 focus:outline-hidden focus:border-amber-600"
                />
                <textarea
                  required
                  rows={3}
                  placeholder="Tuliskan ucapan dan doa restu..."
                  value={senderMessage}
                  onChange={(e) => setSenderMessage(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-stone-50/50 border border-stone-200 focus:outline-hidden focus:border-amber-600"
                />
                <button
                  type="submit"
                  className="w-full min-h-[40px] inline-flex items-center justify-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-2xl py-2.5 transition-all shadow-md cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Doa Restu</span>
                </button>
                {isWishSent && (
                  <p className="text-[11px] text-emerald-700 text-center font-medium">
                    Doa restu Anda telah berhasil dikirimkan!
                  </p>
                )}
              </form>

              {/* Stream Gelembung Ucapan Tamu */}
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {wishes.map((w) => (
                  <div
                    key={w.id}
                    className="bg-white p-4 rounded-2xl border border-amber-200/80 shadow-xs space-y-1"
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
            </div>
          </section>

          {/* 11. SEKSI PENUTUP & KELUARGA BESAR */}
          <footer className="relative p-8 bg-[#1C2C24] text-white text-center space-y-4 overflow-hidden mt-auto">
            {/* Sudut Ornamen Floral */}
            <img
              src="/referensi/frame-tr.webp"
              alt="Ornamen Sudut"
              className="absolute top-0 right-0 w-28 pointer-events-none opacity-60"
            />
            <img
              src="/referensi/frame-bl.webp"
              alt="Ornamen Sudut"
              className="absolute bottom-0 left-0 w-28 pointer-events-none opacity-60"
            />

            <div className="relative z-10 space-y-2">
              <p className="text-xs text-stone-300 max-w-xs mx-auto leading-relaxed">
                Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
              </p>
              <p
                className="font-serif italic text-2xl font-bold text-amber-300 pt-2"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Arif &amp; Windi
              </p>
              <p className="text-[11px] text-stone-400 font-serif italic">
                Beserta Keluarga Besar Kedua Mempelai
              </p>
            </div>

            <div className="relative z-10 pt-4 border-t border-stone-800 text-[10px] text-stone-400 font-mono tracking-wider">
              A moment to remember, a time to cherish · Powered by NikahPlan Studio
            </div>
          </footer>
        </main>
      )}
    </div>
  );
}
