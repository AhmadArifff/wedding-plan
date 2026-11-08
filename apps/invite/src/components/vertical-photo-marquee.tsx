'use client';

import * as React from 'react';
import { X, Sparkles, Eye } from 'lucide-react';

interface PhotoItem {
  id: string;
  src: string;
  caption: string;
  category: string;
}

const COLUMN_LEFT_PHOTOS: PhotoItem[] = [
  {
    id: 'col1-1',
    src: '/referensi/797207-gallery-D7vomq3BEn.jpg',
    caption: 'Beskap Beludru Adat Jawa Sidomukti',
    category: 'Busana Tradisional',
  },
  {
    id: 'col1-2',
    src: '/referensi/797207-gallery-COX9fLRlKg.jpg',
    caption: 'Gaun Pengantin Putih Sutra & Rangkaian Mawar Merah',
    category: 'Modern Elegance',
  },
  {
    id: 'col1-3',
    src: '/referensi/797207-gallery-cI1oF5BtRz.jpg',
    caption: 'Momen Bahagia Bersanding Payung Adat Pusaka',
    category: 'Adat Keraton',
  },
  {
    id: 'col1-4',
    src: '/referensi/797207-gallery-2nbuRtY3o0.jpg',
    caption: 'Ahmad Arif Fauzi dalam Balutan Busana Luhur',
    category: 'Mempelai Pria',
  },
];

const COLUMN_RIGHT_PHOTOS: PhotoItem[] = [
  {
    id: 'col2-1',
    src: '/referensi/797207-gallery-8LWkAveVdN.jpg',
    caption: 'Windi Astuti Anggun Bermahkota Ratu Sehari',
    category: 'Mempelai Wanita',
  },
  {
    id: 'col2-2',
    src: '/referensi/797207-gallery-jMqU8nYexf.jpg',
    caption: 'Senyum Syukur dan Doa Restu yang Dipanjatkan',
    category: 'Momen Sakral',
  },
  {
    id: 'col2-3',
    src: '/referensi/797207-gallery-Lhimda0fph.jpg',
    caption: 'Untaian Janji Setia di Bawah Naungan Kasih',
    category: 'Romansa Suci',
  },
  {
    id: 'col2-4',
    src: '/referensi/797207-gallery-DXpEkLolkN.jpg',
    caption: 'Tatapan Penuh Ketulusan Menuju Lembaran Baru',
    category: 'Ikrar Cinta',
  },
];

export interface VerticalPhotoMarqueeProps {
  isSwarmActive?: boolean;
  photos?: PhotoItem[];
}

export const VerticalPhotoMarquee: React.FC<VerticalPhotoMarqueeProps> = ({
  isSwarmActive = false,
  photos,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [selectedPhoto, setSelectedPhoto] = React.useState<PhotoItem | null>(null);
  const [isAnimationRunning, setIsAnimationRunning] = React.useState(!isSwarmActive);

  const leftPhotos = React.useMemo(() => {
    if (!photos || photos.length === 0) return COLUMN_LEFT_PHOTOS;
    const l = photos.filter((p) => (p as any).column === 'left');
    return l.length > 0 ? l : photos.slice(0, Math.ceil(photos.length / 2));
  }, [photos]);

  const rightPhotos = React.useMemo(() => {
    if (!photos || photos.length === 0) return COLUMN_RIGHT_PHOTOS;
    const r = photos.filter((p) => (p as any).column === 'right');
    return r.length > 0 ? r : photos.slice(Math.ceil(photos.length / 2));
  }, [photos]);

  // Monitor Swarm Rebuild: Ketika elemen memories selesai di-build oleh Swarm,
  // aktifkan animasi vertikal marquee dan biarkan swarm bergerak ke seksi berikutnya.
  React.useEffect(() => {
    if (!isSwarmActive) {
      setIsAnimationRunning(true);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const checkRevealed = () => {
      // Periksa apakah seluruh 4 kartu foto memories primer sudah selesai di-build oleh Swarm
      const primaryCards = el.querySelectorAll('[data-memory-card="primary"]');
      const revealedCards = el.querySelectorAll('[data-memory-card="primary"].swarm-revealed');
      if (primaryCards.length > 0 && revealedCards.length >= primaryCards.length) {
        setIsAnimationRunning(true);
      }
    };

    checkRevealed();

    const observer = new MutationObserver(() => {
      checkRevealed();
    });

    observer.observe(el, {
      attributes: true,
      attributeFilter: ['class'],
      subtree: true,
    });

    return () => observer.disconnect();
  }, [isSwarmActive]);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Keyframe Animasi Vertikal Berlawanan Arah (Vertical Marquee) */}
      <style jsx global>{`
        @keyframes verticalScrollUp {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        @keyframes verticalScrollDown {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0);
          }
        }

        .animate-vertical-up {
          animation: verticalScrollUp 28s linear infinite;
        }

        .animate-vertical-down {
          animation: verticalScrollDown 30s linear infinite;
        }

        .pause-on-hover:hover {
          animation-play-state: paused !important;
        }
      `}</style>

      {/* Kontainer Utama dengan Masking Fade Gradien Atas & Bawah */}
      <div
        className="relative h-[480px] sm:h-[540px] overflow-hidden rounded-3xl p-1"
        style={{
          maskImage:
            'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
        }}
      >
        <div className="grid grid-cols-2 gap-3 h-full">
          {/* KOLOM KIRI: Bergerak Mengalir ke Atas (Vertical Marquee Up) */}
          <div className="overflow-hidden h-full">
            <div
              className={`flex flex-col gap-3 ${
                isAnimationRunning ? 'animate-vertical-up pause-on-hover' : ''
              }`}
            >
              {/* 1. Kumpulan Kartu Foto Primer (Dideteksi & Dibangun oleh Swarm Rebuild di Seksi Ini) */}
              <div className="flex flex-col gap-3">
                {leftPhotos.map((photo, idx) => (
                  <div
                    key={photo.id}
                    data-memory-card={idx < 2 ? 'primary' : undefined}
                    data-swarm-ignore={idx >= 2 ? 'true' : undefined}
                    onClick={() => setSelectedPhoto(photo)}
                    className="group relative rounded-2xl sm:rounded-3xl border-2 border-amber-300/80 bg-white/90 p-1.5 shadow-md overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.02] hover:border-amber-400"
                  >
                    <div className="relative w-full h-48 sm:h-56 rounded-xl sm:rounded-2xl overflow-hidden bg-stone-100">
                      <img
                        src={photo.src}
                        alt={photo.caption}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2.5 text-white">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-amber-300 font-semibold flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          {photo.category}
                        </span>
                        <p className="text-[10px] leading-tight font-serif italic truncate mt-0.5">
                          {photo.caption}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 2. Kumpulan Kartu Loop Pengulang (Diabaikan oleh Swarm Scanner agar tidak memicu interleave Y di bawah) */}
              <div
                data-swarm-ignore="true"
                aria-hidden="true"
                className="flex flex-col gap-3"
              >
                {leftPhotos.map((photo, idx) => (
                  <div
                    key={`loop-left-${photo.id}-${idx}`}
                    onClick={() => setSelectedPhoto(photo)}
                    className="group relative rounded-2xl sm:rounded-3xl border-2 border-amber-300/80 bg-white/90 p-1.5 shadow-md overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.02] hover:border-amber-400"
                  >
                    <div className="relative w-full h-48 sm:h-56 rounded-xl sm:rounded-2xl overflow-hidden bg-stone-100">
                      <img
                        src={photo.src}
                        alt={photo.caption}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2.5 text-white">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-amber-300 font-semibold flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          {photo.category}
                        </span>
                        <p className="text-[10px] leading-tight font-serif italic truncate mt-0.5">
                          {photo.caption}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: Bergerak Mengalir Berlawanan ke Bawah (Vertical Marquee Down) */}
          <div className="overflow-hidden h-full">
            <div
              className={`flex flex-col gap-3 ${
                isAnimationRunning ? 'animate-vertical-down pause-on-hover' : ''
              }`}
            >
              {/* 1. Kumpulan Kartu Foto Primer (Dideteksi & Dibangun oleh Swarm Rebuild di Seksi Ini) */}
              <div className="flex flex-col gap-3">
                {rightPhotos.map((photo, idx) => (
                  <div
                    key={photo.id}
                    data-memory-card={idx < 2 ? 'primary' : undefined}
                    data-swarm-ignore={idx >= 2 ? 'true' : undefined}
                    onClick={() => setSelectedPhoto(photo)}
                    className="group relative rounded-2xl sm:rounded-3xl border-2 border-amber-300/80 bg-white/90 p-1.5 shadow-md overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.02] hover:border-amber-400"
                  >
                    <div className="relative w-full h-48 sm:h-56 rounded-xl sm:rounded-2xl overflow-hidden bg-stone-100">
                      <img
                        src={photo.src}
                        alt={photo.caption}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2.5 text-white">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-amber-300 font-semibold flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          {photo.category}
                        </span>
                        <p className="text-[10px] leading-tight font-serif italic truncate mt-0.5">
                          {photo.caption}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 2. Kumpulan Kartu Loop Pengulang (Diabaikan oleh Swarm Scanner) */}
              <div
                data-swarm-ignore="true"
                aria-hidden="true"
                className="flex flex-col gap-3"
              >
                {rightPhotos.map((photo, idx) => (
                  <div
                    key={`loop-right-${photo.id}-${idx}`}
                    onClick={() => setSelectedPhoto(photo)}
                    className="group relative rounded-2xl sm:rounded-3xl border-2 border-amber-300/80 bg-white/90 p-1.5 shadow-md overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.02] hover:border-amber-400"
                  >
                    <div className="relative w-full h-48 sm:h-56 rounded-xl sm:rounded-2xl overflow-hidden bg-stone-100">
                      <img
                        src={photo.src}
                        alt={photo.caption}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2.5 text-white">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-amber-300 font-semibold flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          {photo.category}
                        </span>
                        <p className="text-[10px] leading-tight font-serif italic truncate mt-0.5">
                          {photo.caption}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Petunjuk Interaksi Halus untuk Tamu */}
      <div className="text-center pt-2">
        <span className="text-[10px] text-amber-800/80 font-mono tracking-wider inline-flex items-center gap-1 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/60">
          <Eye className="w-3 h-3 text-amber-600" />
          <span>Sentuh foto untuk menghentikan &amp; melihat detail</span>
        </span>
      </div>

      {/* Modal Lightbox Popup untuk Foto Terpilih */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-sm w-full bg-white rounded-3xl p-3 border-2 border-amber-400 shadow-2xl space-y-3 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tombol Tutup */}
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-stone-900 border-2 border-white text-white flex items-center justify-center shadow-lg hover:bg-stone-800 cursor-pointer transition-transform hover:scale-110"
              title="Tutup Pratinjau Foto"
              aria-label="Tutup"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Foto Lightbox */}
            <div className="w-full max-h-[380px] rounded-2xl overflow-hidden border border-amber-200 bg-stone-100">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.caption}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Keterangan Foto */}
            <div className="text-center space-y-0.5 px-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-700 font-bold block">
                {selectedPhoto.category}
              </span>
              <p className="font-serif italic text-sm text-stone-900 font-medium">
                &ldquo;{selectedPhoto.caption}&rdquo;
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
