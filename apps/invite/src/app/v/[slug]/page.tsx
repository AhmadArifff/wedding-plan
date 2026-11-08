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
  Crown,
  Flower2,
  GlassWater,
  BookHeart,
  Camera,
  Star,
  Sun,
  Flame,
  Gem,
  Award,
  Shield,
  Coffee,
  HeartHandshake,
  Utensils,
  PartyPopper,
  Images,
  Eye,
  Film,
  Banknote,
  Wallet,
  MailCheck,
  MessageSquare,
  Disc,
  Radio,
} from 'lucide-react';
import {
  WaxSealEnvelopeCover,
  DigitalEnvelopeBlock,
  SwarmRebuild,
  type FloralTheme,
} from '@nikahplan/invitation-blocks';
import {
  DEFAULT_FULL_INVITATION_CONFIG,
  type FullInvitationConfig,
  type RsvpWish,
} from '@nikahplan/db';
import {
  DUMMY_RSVP_WISHES,
  formatDateIndo,
} from '@nikahplan/ui';
import { VerticalPhotoMarquee } from '../../../components/vertical-photo-marquee';

// Icon dictionary for rendering section icons dynamically from config
const ICON_MAP: Record<string, React.ElementType> = {
  Sparkles,
  Heart,
  Crown,
  Flower2,
  Clock,
  Calendar,
  GlassWater,
  BookHeart,
  Camera,
  Gift,
  Send,
  Music,
  Star,
  Sun,
  Flame,
  Gem,
  Award,
  Shield,
  Coffee,
  HeartHandshake,
  Utensils,
  PartyPopper,
  Images,
  Eye,
  Film,
  CreditCard,
  Banknote,
  Wallet,
  MailCheck,
  MessageSquare,
  Volume2,
  Disc,
  Radio,
};

function getSectionIcon(iconName?: string, Fallback: React.ElementType = Sparkles): React.ElementType {
  if (!iconName) return Fallback;
  return ICON_MAP[iconName] || Fallback;
}

export default function PublicInvitationPage({
  params,
}: {
  params?: Promise<{ slug: string }>;
}) {
  const [config, setConfig] = React.useState<FullInvitationConfig>(DEFAULT_FULL_INVITATION_CONFIG);
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

  // 1. Fetch initial configuration from API or listen for live postMessage from Studio editor
  React.useEffect(() => {
    async function loadConfig() {
      try {
        const slug = 'arif-windi';
        const res = await fetch(`/api/invitation?slug=${slug}`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setConfig(json.data);
          }
        }
      } catch {
        // Fallback to default
      }
    }
    loadConfig();

    // Listen to real-time postMessage events from admin studio simulator
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'NIKAHPLAN_UPDATE_CONFIG' && event.data?.payload) {
        setConfig(event.data.payload);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // 2. Countdown Timer calculation
  React.useEffect(() => {
    const targetDate = new Date(config.events.countdownTargetIso || '2027-11-14T08:00:00+07:00').getTime();

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
  }, [config.events.countdownTargetIso]);

  // 3. URL parameters handling (speed, confetti, cover)
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const searchParams = new URLSearchParams(window.location.search);
    const speedParam = searchParams.get('speed');
    if (speedParam) {
      const parsedSpeed = parseFloat(speedParam);
      if (!isNaN(parsedSpeed) && parsedSpeed > 0) {
        setSpeedMultiplier(parsedSpeed);
      }
    }
    const confettiParam = searchParams.get('confetti');
    if (
      confettiParam &&
      ['botanical-sage', 'crimson-gold', 'lavender-lilac', 'golden-sunflower', 'sakura-pastel'].includes(confettiParam)
    ) {
      setConfettiTheme(confettiParam as FloralTheme);
    }
    const coverParam = searchParams.get('cover');
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

  const handleSendWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderMessage.trim()) return;

    const newWish: RsvpWish = {
      id: `wish-${Date.now()}`,
      invitationId: config.id,
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

  // Section icon components resolved dynamically
  const HeroIconComp = getSectionIcon(config.icons.heroIcon, Sparkles);
  const QuoteIconComp = getSectionIcon(config.icons.quoteIcon, Heart);
  const GroomIconComp = getSectionIcon(config.icons.coupleGroomIcon, Crown);
  const BrideIconComp = getSectionIcon(config.icons.coupleBrideIcon, Flower2);
  const CountdownIconComp = getSectionIcon(config.icons.countdownIcon, Clock);
  const AkadIconComp = getSectionIcon(config.icons.eventAkadIcon, Calendar);
  const ReceptionIconComp = getSectionIcon(config.icons.eventReceptionIcon, GlassWater);
  const StoryIconComp = getSectionIcon(config.icons.storyIcon, BookHeart);
  const MemoriesIconComp = getSectionIcon(config.icons.memoriesIcon, Camera);
  const GiftIconComp = getSectionIcon(config.icons.giftIcon, Gift);
  const RsvpIconComp = getSectionIcon(config.icons.rsvpIcon, Send);

  return (
    <div className="min-h-screen bg-[#FAF5E6] text-stone-900 selection:bg-teal-100 relative">
      {/* Background BGM Audio Element */}
      <audio
        ref={audioRef}
        loop
        src={config.musicUrl || 'https://assets.satumomen.com/musics/nadhif-basalamah-kota-ini-tak-sama-tanpamu-official-lyric-video-grp6fcniomm-00-01-02-00-04-28-part.mp3'}
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

      {/* 1. Wax Seal Physical Envelope Cover */}
      <WaxSealEnvelopeCover
        groomNick={config.couple.groomNickname}
        brideNick={config.couple.brideNickname}
        weddingDateFormatted={config.events.akad.dateFormatted}
        guestName={config.hero.guestNameDefault}
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

            [data-swarm-active="true"]:not(.swarm-scanned) > section,
            [data-swarm-active="true"]:not(.swarm-scanned) > footer,
            [data-swarm-active="true"]:not(.swarm-scanned) > div:not([data-swarm-overlay="true"]) {
              opacity: 0 !important;
            }

            [data-swarm-active="true"] .swarm-node {
              opacity: 0 !important;
              transform: scale(0.96);
              transition: opacity 0.24s cubic-bezier(0.16, 1, 0.3, 1), transform 0.24s cubic-bezier(0.16, 1, 0.3, 1) !important;
            }

            [data-swarm-active="true"] .swarm-node.swarm-revealed {
              opacity: 1 !important;
              animation: swarmPopEntrance 0.36s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
            }

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

          {/* Autonomous Swarm Rebuild Engine */}
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
              data-swarm-ignore="true"
              src={config.hero.ornamentTopRightUrl || '/referensi/frame-tr.webp'}
              alt="Ornamen Sudut Kanan Atas"
              className="absolute top-0 right-0 w-32 sm:w-40 pointer-events-none z-10 opacity-90"
            />
            <img
              data-swarm-ignore="true"
              src={config.hero.ornamentBottomLeftUrl || '/referensi/frame-bl.webp'}
              alt="Ornamen Sudut Kiri Bawah"
              className="absolute bottom-0 left-0 w-32 sm:w-40 pointer-events-none z-10 opacity-90"
            />

            {/* Foto Latar Belakang Artistik (Tampil Konsisten Sejak Awal Buka Undangan) */}
            <div
              data-swarm-ignore="true"
              className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
            >
              <img
                src={config.hero.backgroundImageUrl || '/referensi/797207-gallery-D7vomq3BEn.jpg'}
                alt="Background Prewedding"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              data-swarm-ignore="true"
              className="absolute inset-0 bg-gradient-to-b from-[#1C2C24]/80 via-[#24392E]/70 to-[#1C2C24]/95 pointer-events-none"
            />

            {/* Konten Atas Cover */}
            <div className="relative z-10 text-center pt-8 space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-amber-300 font-semibold block flex items-center justify-center gap-1.5">
                <HeroIconComp className="w-3.5 h-3.5 text-amber-300" />
                <span>{config.hero.title}</span>
              </span>
              <h1
                className="text-4xl sm:text-5xl font-serif italic font-bold tracking-tight text-white drop-shadow-md"
                style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
              >
                {config.couple.groomNickname} &amp; {config.couple.brideNickname}
              </h1>
              <p className="text-xs text-amber-200/90 font-mono tracking-widest pt-1">
                {config.hero.dateText}
              </p>
            </div>

            {/* Kartu Tamu Terhormat */}
            <div className="relative z-10 text-center pb-6">
              <div className="p-4 rounded-2xl bg-white/10 border border-amber-300/30 backdrop-blur-md shadow-xl max-w-xs mx-auto space-y-2">
                <span className="text-[11px] text-stone-200 uppercase tracking-wider block font-medium">
                  {config.hero.guestBoxLabel}
                </span>
                <div className="text-lg font-bold text-amber-300 font-serif">
                  {config.hero.guestNameDefault}
                </div>
                <span className="text-[11px] text-stone-300 block">
                  {config.hero.guestLocationDefault}
                </span>
              </div>
            </div>
          </section>

          {/* 2. SEKSI SALAM PEMBUKA & AYAT SUCI QS. AR-RUM: 21 */}
          <section className="relative p-6 text-center space-y-6 border-b border-amber-200/40 bg-[#FAF5E6] overflow-hidden">
            {/* Sudut Ornamen Floral */}
            <img
              data-swarm-ignore="true"
              src={config.hero.ornamentTopRightUrl || '/referensi/frame-tr.webp'}
              alt="Ornamen Sudut"
              className="absolute top-0 right-0 w-28 pointer-events-none opacity-80"
            />
            <img
              data-swarm-ignore="true"
              src={config.hero.ornamentBottomLeftUrl || '/referensi/frame-bl.webp'}
              alt="Ornamen Sudut"
              className="absolute bottom-0 left-0 w-28 pointer-events-none opacity-80"
            />

            {/* Arch Silhouette Foto Berdua */}
            <div
              className="relative z-10 w-48 sm:w-56 h-64 sm:h-72 mx-auto rounded-t-full rounded-b-[180px] p-2 border-2 shadow-xl overflow-hidden bg-white"
              style={{ borderColor: '#BF8F01' }}
            >
              <img
                src={config.couple.archCouplePhotoUrl || '/referensi/797207-gallery-D7vomq3BEn.jpg'}
                alt="Foto Mempelai Berdua"
                className="w-full h-full object-cover rounded-t-full rounded-b-[175px]"
              />
            </div>

            <div className="relative z-10 space-y-3 max-w-xs mx-auto">
              <h2
                className="font-serif italic font-bold text-xl text-[#2D4539]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {config.quote.greeting}
              </h2>
              <p className="text-xs text-stone-700 leading-relaxed font-sans">
                {config.quote.introText}
              </p>

              {/* Box Kutipan Ayat */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 shadow-xs space-y-2 text-stone-800">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 mx-auto flex items-center justify-center">
                  <QuoteIconComp className="w-4 h-4 fill-amber-600/30 text-amber-600" />
                </div>
                <p className="font-serif italic text-xs leading-relaxed text-stone-800">
                  &ldquo;{config.quote.translationText}&rdquo;
                </p>
                <span className="text-[10px] font-mono font-bold text-amber-800 uppercase tracking-widest block">
                  ({config.quote.sourceText})
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
                  src={config.couple.groomPhotoUrl || '/referensi/797207-gallery-2nbuRtY3o0.jpg'}
                  alt={config.couple.groomFullName}
                  className="w-full h-full object-cover rounded-t-full rounded-b-xl"
                />
              </div>

              <div>
                <h3
                  className="font-serif font-bold text-lg text-stone-900"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {config.couple.groomFullName}
                </h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  {config.couple.groomParents}
                </p>
              </div>

              {config.couple.groomInstagram && (
                <a
                  href={`https://instagram.com/${config.couple.groomInstagram}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-medium transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-600" />
                  <span>@{config.couple.groomInstagram}</span>
                </a>
              )}
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
                  src={config.couple.bridePhotoUrl || '/referensi/797207-gallery-8LWkAveVdN.jpg'}
                  alt={config.couple.brideFullName}
                  className="w-full h-full object-cover rounded-t-full rounded-b-xl"
                />
              </div>

              <div>
                <h3
                  className="font-serif font-bold text-lg text-stone-900"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {config.couple.brideFullName}
                </h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  {config.couple.brideParents}
                </p>
              </div>

              {config.couple.brideInstagram && (
                <a
                  href={`https://instagram.com/${config.couple.brideInstagram}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-medium transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-600" />
                  <span>@{config.couple.brideInstagram}</span>
                </a>
              )}
            </div>
          </section>

          {/* 5. SEKSI WAKTU & RANGKAIAN ACARA + LIVE COUNTDOWN TIMER */}
          <section className="relative p-6 space-y-6 border-b border-amber-200/40 bg-[#FAF5E6] overflow-hidden">
            <div className="text-center space-y-1 relative z-10">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-700 font-semibold block flex items-center justify-center gap-1">
                <CountdownIconComp className="w-3.5 h-3.5 text-amber-700" />
                <span>{config.events.countdownTitle}</span>
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
                    {config.events.akad.title}
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-emerald-100 text-emerald-800">
                    {config.events.akad.badgeLabel}
                  </span>
                </div>
                <div className="text-xs text-stone-600 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <AkadIconComp className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{config.events.akad.dateFormatted}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{config.events.akad.timeRange}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{config.events.akad.venueName}, {config.events.akad.venueAddress}</span>
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
                    {config.events.reception.title}
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-amber-100 text-amber-800">
                    {config.events.reception.badgeLabel}
                  </span>
                </div>
                <div className="text-xs text-stone-600 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <ReceptionIconComp className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{config.events.reception.dateFormatted}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{config.events.reception.timeRange}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{config.events.reception.venueName}, {config.events.reception.venueAddress}</span>
                  </div>
                </div>
              </div>

              {/* Tombol Simpan ke Google Calendar */}
              <a
                href={config.events.akad.googleCalendarUrl || 'https://calendar.google.com'}
                target="_blank"
                rel="noreferrer"
                className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-md transition-all active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                <span>{config.buttonTexts.addToCalendarButton}</span>
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
                  {config.events.akad.venueName}
                </span>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {config.events.akad.venueAddress}
                </p>
              </div>

              <a
                href={config.events.akad.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-[#2D4539] hover:bg-[#23372D] text-white text-xs font-semibold shadow-md transition-all active:scale-95"
              >
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>{config.buttonTexts.openMapsButton}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </section>

          {/* 7. SEKSI KISAH CINTA (OUR LOVE STORY) */}
          <section className="relative p-6 space-y-5 border-b border-amber-200/40 bg-[#FAF5E6] overflow-hidden">
            <div className="text-center space-y-1 relative z-10">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-700 font-semibold block flex items-center justify-center gap-1.5">
                <StoryIconComp className="w-3.5 h-3.5 text-amber-700" />
                <span>PERJALANAN KAMI</span>
              </span>
              <h2
                className="text-2xl font-serif font-bold text-[#2D4539]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Our Love Story
              </h2>
            </div>

            <div className="space-y-3 relative z-10">
              {config.stories.map((story) => (
                <div key={story.id} className="p-4 rounded-2xl bg-white border border-amber-200 shadow-xs space-y-1.5">
                  <span className="text-[11px] font-mono font-bold text-amber-700 px-2.5 py-0.5 rounded-full bg-amber-100 inline-block">
                    Tahun {story.year}
                  </span>
                  <h3 className="font-serif font-bold text-sm text-stone-900">
                    {story.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {story.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 8. SEKSI GALERI FOTO KENANGAN (OUR MEMORIES - DUAL-COLUMN VERTICAL REVERSE MARQUEE) */}
          <section className="relative p-6 space-y-5 border-b border-amber-200/40 bg-[#FCF8ED] overflow-hidden">
            <div className="text-center space-y-1 relative z-10">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-700 font-semibold block flex items-center justify-center gap-1.5">
                <MemoriesIconComp className="w-3.5 h-3.5 text-amber-700" />
                <span>GALERI KENANGAN</span>
              </span>
              <h2
                className="text-2xl font-serif font-bold text-[#2D4539]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Our Memories
              </h2>
              <p className="text-xs text-stone-600 max-w-xs mx-auto leading-relaxed pt-0.5">
                Rangkaian momen indah yang terukir sepanjang perjalanan cinta menuju ikrar suci
              </p>
            </div>

            {/* Vertical Dual-Column Infinite Marquee with Dynamic Photos */}
            <div className="relative z-10">
              <VerticalPhotoMarquee isSwarmActive={!isRebuildFinished} photos={config.memories} />
            </div>
          </section>

          {/* 9. SEKSI TANDA KASIH & AMPLOP DIGITAL (BANK + QRIS + KADO FISIK) */}
          <section className="relative p-6 space-y-6 border-b border-amber-200/40 bg-[#FAF5E6] overflow-hidden">
            <div className="text-center space-y-1 relative z-10">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-700 font-semibold block flex items-center justify-center gap-1.5">
                <GiftIconComp className="w-3.5 h-3.5 text-amber-700" />
                <span>{config.envelopes.sectionSubtitle}</span>
              </span>
              <h2
                className="text-2xl font-serif font-bold text-[#2D4539]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {config.envelopes.sectionTitle}
              </h2>
              <p className="text-xs text-stone-600 max-w-xs mx-auto leading-relaxed pt-1">
                {config.envelopes.descriptionText}
              </p>
            </div>

            <div className="space-y-4 relative z-10">
              {/* Dynamic Rekening Bank Accounts */}
              {config.envelopes.bankAccounts.map((acc) => (
                <div key={acc.id} className="bg-white p-5 rounded-3xl border border-amber-300 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-stone-900">{acc.bankName}</span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${acc.badgeColor || 'bg-blue-100 text-blue-800'}`}>
                      {acc.bankCode}
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                    <div>
                      <span className="font-mono font-bold text-sm text-stone-900 block">
                        {acc.accountNumber}
                      </span>
                      <span className="text-[11px] text-stone-500">
                        {acc.accountHolder}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(acc.accountNumber, acc.id)}
                      className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedKey === acc.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>{config.buttonTexts.accountCopiedButton || 'Tersalin!'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{config.buttonTexts.copyAccountButton || 'Salin'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}

              {/* QRIS Amplop Digital */}
              {config.envelopes.qrisImageUrl && (
                <div className="bg-white p-5 rounded-3xl border border-amber-300 shadow-sm text-center space-y-3">
                  <span className="font-bold text-sm text-stone-900 block">
                    QRIS Amplop Digital
                  </span>
                  <div className="w-44 h-44 mx-auto p-2 bg-white rounded-2xl border-2 border-stone-800 shadow-xs flex items-center justify-center">
                    <img
                      src={config.envelopes.qrisImageUrl}
                      alt="QRIS Digital Envelope"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-[11px] text-stone-500 font-mono">
                    {config.envelopes.qrisMerchantName}
                  </p>
                </div>
              )}

              {/* Kirim Kado Fisik */}
              {config.envelopes.giftAddress && (
                <div className="bg-white p-5 rounded-3xl border border-amber-300 shadow-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-amber-600" />
                    <span className="font-bold text-sm text-stone-900">Kirim Kado Fisik</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Alamat Pengiriman: {config.envelopes.giftAddress.recipientName} ({config.envelopes.giftAddress.phoneNumber}), {config.envelopes.giftAddress.fullAddress}, {config.envelopes.giftAddress.cityPostal}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        `${config.envelopes.giftAddress.recipientName}, ${config.envelopes.giftAddress.fullAddress}`,
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
              )}
            </div>
          </section>

          {/* 10. SEKSI FORM RSVP & BUKU UCAPAN DOA RESTU */}
          <section className="relative p-6 space-y-6 border-b border-amber-200/40 bg-[#FCF8ED] overflow-hidden">
            <div className="text-center space-y-1 relative z-10">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-700 font-semibold block flex items-center justify-center gap-1.5">
                <RsvpIconComp className="w-3.5 h-3.5 text-amber-700" />
                <span>{config.rsvp.sectionSubtitle}</span>
              </span>
              <h2
                className="text-2xl font-serif font-bold text-[#2D4539]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {config.rsvp.sectionTitle}
              </h2>
              <p className="text-xs text-stone-600 max-w-xs mx-auto leading-relaxed pt-1">
                {config.rsvp.descriptionText}
              </p>
            </div>

            <div className="space-y-5 relative z-10">
              {/* Form Konfirmasi Kehadiran */}
              <form onSubmit={handleRsvpSubmit} className="bg-white p-5 rounded-3xl border border-amber-300 shadow-sm space-y-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Nama Lengkap Tamu
                  </label>
                  <input
                    type="text"
                    required
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    placeholder="Contoh: Bpk. Bambang &amp; Keluarga"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-teal-700 focus:border-teal-700 bg-stone-50/50"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Konfirmasi Kehadiran
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRsvpStatus('ATTENDING')}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all border ${
                        rsvpStatus === 'ATTENDING'
                          ? 'bg-[#2D4539] text-white border-[#2D4539] shadow-xs'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      ✓ Hadir
                    </button>
                    <button
                      type="button"
                      onClick={() => setRsvpStatus('NOT_ATTENDING')}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all border ${
                        rsvpStatus === 'NOT_ATTENDING'
                          ? 'bg-rose-700 text-white border-rose-700 shadow-xs'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      ✕ Berhalangan
                    </button>
                  </div>
                </div>

                {rsvpStatus === 'ATTENDING' && (
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Jumlah Kehadiran (Pax)
                    </label>
                    <select
                      value={rsvpCount}
                      onChange={(e) => setRsvpCount(Number(e.target.value))}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-teal-700 bg-stone-50/50"
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
                  className="w-full min-h-[44px] py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  Konfirmasi Kehadiran
                </button>

                {isRsvpSubmitted && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs text-center font-medium">
                    Terima kasih, konfirmasi kehadiran Anda telah tercatat!
                  </div>
                )}
              </form>

              {/* Form Kirim Doa Restu & Ucapan */}
              <form onSubmit={handleSendWish} className="bg-white p-5 rounded-3xl border border-amber-300 shadow-sm space-y-3">
                <span className="font-serif font-bold text-sm text-[#2D4539] block">
                  Kirim Doa Restu
                </span>
                <div>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Nama Anda"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-teal-700 bg-stone-50/50"
                  />
                </div>
                <div>
                  <textarea
                    required
                    rows={3}
                    value={senderMessage}
                    onChange={(e) => setSenderMessage(e.target.value)}
                    placeholder="Tuliskan doa restu Anda untuk kedua mempelai..."
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-teal-700 bg-stone-50/50 leading-relaxed"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full min-h-[44px] py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-md cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{config.buttonTexts.sendRsvpButton || 'Kirim Doa Restu'}</span>
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
              data-swarm-ignore="true"
              src={config.hero.ornamentTopRightUrl || '/referensi/frame-tr.webp'}
              alt="Ornamen Sudut"
              className="absolute top-0 right-0 w-28 pointer-events-none opacity-60"
            />
            <img
              data-swarm-ignore="true"
              src={config.hero.ornamentBottomLeftUrl || '/referensi/frame-bl.webp'}
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
                {config.couple.groomNickname} &amp; {config.couple.brideNickname}
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
