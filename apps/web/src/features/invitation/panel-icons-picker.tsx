'use client';

import * as React from 'react';
import type { FullInvitationConfig, InvitationIconsConfig } from '@nikahplan/db';
import {
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
  Sliders,
  Check,
} from 'lucide-react';

interface PanelIconsPickerProps {
  config: FullInvitationConfig;
  onChange: (updater: (prev: FullInvitationConfig) => FullInvitationConfig) => void;
}

// Icon dictionary for safe dynamic rendering
const ICON_COMPONENTS: Record<string, React.ElementType> = {
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

const SECTIONS_CONFIG: Array<{
  key: keyof InvitationIconsConfig;
  label: string;
  description: string;
  options: string[];
}> = [
  {
    key: 'heroIcon',
    label: 'Ikon Seksi Hero Cover',
    description: 'Ikon berkilau di atas judul The Wedding Of',
    options: ['Sparkles', 'Star', 'Sun', 'Flame', 'Gem', 'Heart'],
  },
  {
    key: 'quoteIcon',
    label: 'Ikon Kutipan Doa & Ayat',
    description: 'Ikon di seksi mukadimah dan terjemahan surah',
    options: ['Heart', 'Sparkles', 'BookHeart', 'Sun', 'Gem'],
  },
  {
    key: 'coupleGroomIcon',
    label: 'Ikon Mempelai Pria',
    description: 'Badge ornamen kartu mempelai pria',
    options: ['Crown', 'Shield', 'Award', 'Star', 'Heart'],
  },
  {
    key: 'coupleBrideIcon',
    label: 'Ikon Mempelai Wanita',
    description: 'Badge ornamen kartu mempelai wanita',
    options: ['Flower2', 'Crown', 'Gem', 'Sparkles', 'Heart'],
  },
  {
    key: 'countdownIcon',
    label: 'Ikon Hitung Mundur Waktu',
    description: 'Ikon pada kartu timer waktu menuju hari bahagia',
    options: ['Clock', 'Calendar', 'Sun', 'Sparkles', 'Hourglass'],
  },
  {
    key: 'eventAkadIcon',
    label: 'Ikon Acara Akad Nikah',
    description: 'Ikon utama pada kartu jadwal akad nikah',
    options: ['Calendar', 'BookHeart', 'Gem', 'Crown', 'Heart'],
  },
  {
    key: 'eventReceptionIcon',
    label: 'Ikon Acara Resepsi',
    description: 'Ikon utama pada kartu jadwal resepsi pernikahan',
    options: ['GlassWater', 'PartyPopper', 'Utensils', 'Sparkles', 'Heart'],
  },
  {
    key: 'storyIcon',
    label: 'Ikon Our Love Story',
    description: 'Ikon pada judul timeline perjalanan cinta',
    options: ['BookHeart', 'HeartHandshake', 'Heart', 'Sparkles', 'Coffee'],
  },
  {
    key: 'memoriesIcon',
    label: 'Ikon Galeri Kenangan',
    description: 'Ikon pada galeri foto vertical marquee',
    options: ['Camera', 'Images', 'Film', 'Eye', 'Sparkles'],
  },
  {
    key: 'giftIcon',
    label: 'Ikon Tanda Kasih / Amplop',
    description: 'Ikon pada seksi rekening bank & barcode QRIS',
    options: ['Gift', 'CreditCard', 'Banknote', 'Wallet', 'Heart'],
  },
  {
    key: 'rsvpIcon',
    label: 'Ikon Form RSVP & Ucapan',
    description: 'Ikon pada formulir konfirmasi kehadiran tamu',
    options: ['Send', 'MailCheck', 'MessageSquare', 'Check', 'Sparkles'],
  },
  {
    key: 'musicIcon',
    label: 'Ikon Floating BGM Player',
    description: 'Ikon pada tombol kontrol musik mengambang',
    options: ['Music', 'Volume2', 'Disc', 'Radio', 'Sparkles'],
  },
];

export const PanelIconsPicker: React.FC<PanelIconsPickerProps> = ({ config, onChange }) => {
  const handleSelectIcon = (sectionKey: keyof InvitationIconsConfig, iconName: string) => {
    onChange((prev) => ({
      ...prev,
      icons: {
        ...prev.icons,
        [sectionKey]: iconName,
      },
    }));
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
        <Sparkles className="w-4 h-4 text-amber-600" />
        <div>
          <h4 className="font-serif font-bold text-sm text-stone-900">
            Kustomisasi Ikon Seksi Undangan (Lucide Icons)
          </h4>
          <p className="text-[11px] text-stone-500">
            Pilih ikon visual favorit Anda untuk setiap blok seksi undangan digital.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {SECTIONS_CONFIG.map((sec) => {
          const currentIcon = config.icons[sec.key];
          const CurrentComponent = ICON_COMPONENTS[currentIcon] || Sparkles;

          return (
            <div
              key={sec.key}
              className="p-3.5 rounded-xl bg-stone-50/60 border border-stone-200 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-stone-900 block">{sec.label}</span>
                  <span className="text-[10px] text-stone-500 block">{sec.description}</span>
                </div>
                <div className="w-7 h-7 rounded-lg bg-teal-800 text-white flex items-center justify-center shadow-xs shrink-0">
                  <CurrentComponent className="w-4 h-4" />
                </div>
              </div>

              {/* Pilihan Ikon */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {sec.options.map((opt) => {
                  const IconComp = ICON_COMPONENTS[opt];
                  if (!IconComp) return null;
                  const isSelected = currentIcon === opt;

                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleSelectIcon(sec.key, opt)}
                      className={`p-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
                        isSelected
                          ? 'border-teal-700 bg-teal-800 text-white shadow-xs'
                          : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-100'
                      }`}
                      title={opt}
                    >
                      <IconComp className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-mono">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
