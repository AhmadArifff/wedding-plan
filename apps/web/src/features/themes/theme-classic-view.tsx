'use client';

import * as React from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Heart,
  FileCheck,
  Utensils,
  Coins,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { formatRupiah, DUMMY_GOLD_PRICE } from '@nikahplan/ui';
import type { BudgetItem } from '@nikahplan/db';
import type { DashboardThemeConfig } from '../../config/themes';

export interface ThemeClassicViewProps {
  themeConfig: DashboardThemeConfig;
  budgetItems: BudgetItem[];
  totalEstimated: number;
  onNavigateTab: (tab: any) => void;
  onSyncGold: () => void;
}

export const ThemeClassicView: React.FC<ThemeClassicViewProps> = ({
  themeConfig,
  budgetItems,
  totalEstimated,
  onNavigateTab,
  onSyncGold,
}) => {
  return (
    <div className="space-y-6">
      {/* 1. Header Banner Doa & Bismillah Sakral */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-stone-900 rounded-3xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none">
          <img
            src="/generated/theme-botanical-sage.svg"
            alt="Motif Ornamen"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-teal-700/60 border border-teal-600/80 text-[11px] font-semibold text-amber-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Walimatul 'Urs Sakral &amp; Penuh Berkah</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif italic font-bold tracking-tight text-white">
            Akad &amp; Resepsi Pernikahan Arif &amp; Windi
          </h2>

          <p className="text-xs text-stone-200 leading-relaxed font-serif italic">
            &ldquo;Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.&rdquo; (QS. Ar-Rum: 21)
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigateTab('budget')}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Kelola Lembar Anggaran</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('kitchen')}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Utensils className="w-3.5 h-3.5 text-amber-300" />
              <span>Simulasi Dapur Mandiri (Hemat 53%)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Grid 2 Kolom Khas Tradisi Sakral (Jadwal Akad/Resepsi + KUA Checklist) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Kolom Kiri: Dual Timeline Akad & Resepsi + Pos Anggaran */}
        <div className="lg:col-span-7 space-y-6">
          {/* Dual Schedule Card: Akad & Resepsi */}
          <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-800" />
              <span>Rangkaian Acara Sakral (Hari H)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Sesi 1: Akad Nikah */}
              <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-950">1. Akad Nikah</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-800 text-white font-mono font-semibold">
                    Khusus Keluarga
                  </span>
                </div>
                <div className="space-y-1 text-xs text-teal-900">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                    <span>08:00 - 10:00 WIB</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                    <span className="truncate">Pendopo Dalem Ngabean, Kraton</span>
                  </div>
                </div>
                <div className="pt-1.5 border-t border-teal-200/60 text-[11px] text-teal-800 font-semibold flex items-center justify-between">
                  <span>Mahar: Emas 10g + Alat Sholat</span>
                  <span className="text-emerald-700 font-bold">Siap 100%</span>
                </div>
              </div>

              {/* Sesi 2: Resepsi Pernikahan */}
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-950">2. Resepsi Walimah</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-700 text-white font-mono font-semibold">
                    Umum &amp; Kerabat
                  </span>
                </div>
                <div className="space-y-1 text-xs text-amber-900">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>11:00 - 14:00 WIB</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span className="truncate">Pendopo Dalem Ngabean</span>
                  </div>
                </div>
                <div className="pt-1.5 border-t border-amber-200/60 text-[11px] text-amber-800 font-semibold flex items-center justify-between">
                  <span>Kapasitas: 300 Tamu (600 Porsi)</span>
                  <span className="text-teal-800 font-bold">Terjadwal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pos Anggaran Utama */}
          <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-base text-stone-900">
                  Realisasi Anggaran 14 Kategori
                </h3>
                <p className="text-xs text-stone-500">
                  Total Plafon Terencana: <strong>{formatRupiah(totalEstimated)}</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab('budget')}
                className="text-xs font-bold text-teal-800 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Lihat Semua</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2">
              {budgetItems.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl border border-stone-100 bg-stone-50/50 flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="text-xs font-bold text-stone-900">{item.itemName}</div>
                    <div className="text-[10px] text-stone-500 font-mono">
                      {item.quantity} {item.unitLabel} · Sumber: {item.priceSource}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-stone-900">
                      {formatRupiah(item.totalPrice)}
                    </div>
                    <span className="text-[9px] px-2 py-0.2 rounded-full font-semibold bg-emerald-100 text-emerald-800">
                      Tervalidasi
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Checklist Administrasi KUA + Tips Penghematan Dapur */}
        <div className="lg:col-span-5 space-y-6">
          {/* Checklist Berkas KUA & Kursus Calon Pengantin */}
          <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center">
                  <FileCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm text-stone-900">
                    Kesiapan Berkas KUA &amp; Syariat
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    KUA Kecamatan Kraton, Kota Yogyakarta
                  </p>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold font-mono">
                3/4 Selesai
              </span>
            </div>

            <div className="space-y-2.5 text-xs text-stone-700">
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-stone-50">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-bold text-stone-900 block">Surat Pengantar RT/RW &amp; Kelurahan (N1-N4)</span>
                  <span className="text-[10px] text-stone-500">KTP, KK, &amp; Akta Kelahiran kedua mempelai terverifikasi</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-stone-50">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-bold text-stone-900 block">Pemeriksaan Kesehatan &amp; Imunisasi TT</span>
                  <span className="text-[10px] text-stone-500">Puskesmas Kraton (Sertifikat ELSIMIL aktif)</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-stone-50">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-bold text-stone-900 block">Kursus Calon Pengantin (Suscatin) KUA</span>
                  <span className="text-[10px] text-stone-500">Bimbingan perkawinan sakinah mandiri</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80">
                <Clock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-bold text-amber-950 block">Pendaftaran Berkas Fisik ke KUA (H-30)</span>
                  <span className="text-[10px] text-amber-800">Menunggu jadwal pemeriksaan wali &amp; saksi nikah</span>
                </div>
              </div>
            </div>
          </div>

          {/* Kotak Penghematan Dapur Mandiri */}
          <div className="bg-amber-50/80 rounded-3xl p-5 border border-amber-200 shadow-xs space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-400 text-stone-950 flex items-center justify-center font-bold">
                <Utensils className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-amber-950">
                Analisis Finansial Dapur Mandiri
              </h4>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">
              Memasak mandiri untuk 300 tamu (600 porsi) membutuhkan belanja 7 bahan pokok senilai <strong>Rp 13.620.000</strong> (Rp 22.700/porsi). Dibandingkan paket katering standar (Rp 28.800.000), Anda menghemat <strong>Rp 15.180.000 (53%)</strong>!
            </p>
            <button
              type="button"
              onClick={() => onNavigateTab('kitchen')}
              className="text-xs font-bold text-amber-900 underline hover:text-amber-950 flex items-center gap-1 cursor-pointer pt-1"
            >
              <span>Buka Kalkulator Belanja Dapur</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

