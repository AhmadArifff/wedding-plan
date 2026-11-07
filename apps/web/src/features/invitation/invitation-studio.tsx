'use client';

import * as React from 'react';
import {
  Sparkles,
  RotateCcw,
  ExternalLink,
  Smartphone,
  Tablet,
  Check,
  Zap,
  Gauge,
  Flower2,
  Copy,
  Mail,
  ShieldCheck,
  Eye,
  Sliders,
} from 'lucide-react';
import {
  FLORAL_THEMES,
  FloralConfettiShower,
  type FloralTheme,
} from '@nikahplan/invitation-blocks';

export const InvitationStudio: React.FC = () => {
  const [speedMultiplier, setSpeedMultiplier] = React.useState<number>(1.0);
  const [selectedTheme, setSelectedTheme] = React.useState<FloralTheme>('botanical-sage');
  const [showCoverFirst, setShowCoverFirst] = React.useState<boolean>(false);
  const [previewViewport, setPreviewViewport] = React.useState<'iphone' | 'compact' | 'tablet'>('iphone');
  const [reloadKey, setReloadKey] = React.useState<number>(Date.now());
  const [isCopied, setIsCopied] = React.useState<boolean>(false);
  const [isTestingConfetti, setIsTestingConfetti] = React.useState<boolean>(false);

  const speedOptions = [
    {
      multiplier: 0.6,
      label: '0.6x - Santai & Detail',
      badge: 'Mengalir Halus',
      desc: 'Pergerakan 4 kursor sangat santai (~30 dtk). Menampilkan ketikan teks dan drag box secara detail.',
    },
    {
      multiplier: 1.0,
      label: '1.0x - Normal Manusiawi',
      badge: 'Rekomendasi',
      desc: 'Kecepatan seimbang (~18 dtk). Seperti tim desainer profesional bekerja kolaboratif.',
    },
    {
      multiplier: 1.5,
      label: '1.5x - Cepat Terarah',
      badge: 'Efisien',
      desc: 'Pacing gesit (~11 dtk). Sangat pas untuk demo cepat tanpa kehilangan konteks visual.',
    },
    {
      multiplier: 2.5,
      label: '2.5x - Kilat / Turbo',
      badge: 'Super Cepat',
      desc: 'Selesai instan (~6 dtk). Cocok untuk meninjau hasil akhir dalam hitungan detik.',
    },
  ];

  const handleCopyUrl = () => {
    const fullUrl = `http://localhost:3001/v/arif-windi?speed=${speedMultiplier}&confetti=${selectedTheme}&cover=${showCoverFirst ? '1' : '0'}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2200);
    });
  };

  const handleTriggerTestConfetti = () => {
    setIsTestingConfetti(true);
    setTimeout(() => {
      setIsTestingConfetti(false);
    }, 4500);
  };

  const previewUrl = `http://localhost:3001/v/arif-windi?speed=${speedMultiplier}&confetti=${selectedTheme}&cover=${showCoverFirst ? '1' : '0'}&t=${reloadKey}`;

  const viewportWidths = {
    compact: 'w-[360px]',
    iphone: 'w-[390px]',
    tablet: 'w-[430px]',
  };

  return (
    <div className="space-y-6">
      {/* Test Confetti Shower di Dashboard */}
      <FloralConfettiShower active={isTestingConfetti} theme={selectedTheme} />

      {/* Header Banner Undangan Studio */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-stone-900 rounded-3xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-700/60 border border-teal-600/80 text-[11px] font-semibold text-amber-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Studio Undangan Digital &amp; Swarm Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-white">
            Atur Kecepatan Swarm Rebuild &amp; 5 Tema Bunga
          </h2>
          <p className="text-xs text-stone-300 leading-relaxed">
            Sesuaikan kecepatan 4 kursor atomik dan pilih tema kelopak bunga yang melayang turun saat proses pembuatan undangan selesai.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setReloadKey(Date.now())}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-xs border border-white/20 transition-all active:scale-95 cursor-pointer"
            title="Muat ulang animasi Swarm Rebuild pada frame simulator"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Ulangi Swarm Rebuild</span>
          </button>

          <a
            href={previewUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-900 text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
            title="Buka Halaman Penuh di Tab Baru"
          >
            <span>Buka Tab Baru Penuh</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Grid 2 Kolom: Kiri Panel Pengaturan, Kanan Live Mobile Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* KOLOM KIRI: Panel Kontrol Pengaturan (5 Kolom Desktop) */}
        <div className="lg:col-span-5 space-y-6">
          {/* 1. Pengaturan Kecepatan Swarm Rebuild */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center">
                  <Gauge className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm text-stone-900">
                    Kecepatan Swarm Rebuild
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    Kecepatan kerja 4 kursor (Arif, Windi, Rian, Siti)
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-teal-100 text-teal-900">
                {speedMultiplier}x Speed
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {speedOptions.map((opt) => {
                const isSelected = speedMultiplier === opt.multiplier;
                return (
                  <button
                    key={opt.multiplier}
                    type="button"
                    onClick={() => {
                      setSpeedMultiplier(opt.multiplier);
                      setReloadKey(Date.now());
                    }}
                    className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-teal-700 bg-teal-50/70 shadow-xs'
                        : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100/70'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-stone-900">{opt.label}</span>
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded-full font-semibold ${
                          isSelected
                            ? 'bg-teal-700 text-white'
                            : 'bg-stone-200 text-stone-600'
                        }`}
                      >
                        {opt.badge}
                      </span>
                    </div>
                    <p className="text-[10px] text-stone-500 leading-tight">
                      {opt.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Pilihan 5 Tema Animasi Bunga Confetti */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center">
                  <Flower2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm text-stone-900">
                    5 Tema Animasi Bunga Confetti
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    Bunga &amp; kelopak jatuh ke bawah setelah selesai
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleTriggerTestConfetti}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-[11px] font-bold transition-all cursor-pointer"
                title="Lihat demonstrasi efek kelopak bunga di layar sekarang"
              >
                <Sparkles className="w-3 h-3 text-amber-700" />
                <span>Uji Efek</span>
              </button>
            </div>

            <div className="space-y-2 pt-1">
              {FLORAL_THEMES.map((th) => {
                const isSelected = selectedTheme === th.id;
                return (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() => {
                      setSelectedTheme(th.id);
                      setReloadKey(Date.now());
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-teal-700 bg-teal-50/60 shadow-xs ring-1 ring-teal-600/30'
                        : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Swatch Bulatan Warna */}
                      <div
                        className="w-7 h-7 rounded-full border-2 border-white shadow-xs shrink-0 flex items-center justify-center"
                        style={{ backgroundColor: th.primaryColor }}
                      >
                        <div
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: th.accentColor }}
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-stone-900 truncate">
                            {th.name}
                          </span>
                          <span className="text-[10px] text-stone-500 font-normal">
                            {th.badge}
                          </span>
                        </div>
                        <p className="text-[10px] text-stone-500 truncate mt-0.5">
                          {th.description}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-teal-800 text-white flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-stone-300" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Opsi Cover Segel Lilin & Salin Link */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-sm text-stone-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-stone-500" />
              <span>Opsi Tampilan &amp; Pembagian Undangan</span>
            </h3>

            {/* Toggle Cover Segel Lilin */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200/80">
              <div className="pr-2">
                <span className="text-xs font-bold text-stone-900 block">
                  Tampilkan Cover Segel Lilin di Awal
                </span>
                <span className="text-[11px] text-stone-500 block leading-tight">
                  Jika aktif, tamu melihat amplop surat sebelum membukanya.
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowCoverFirst(!showCoverFirst);
                  setReloadKey(Date.now());
                }}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  showCoverFirst ? 'bg-teal-800' : 'bg-stone-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out ${
                    showCoverFirst ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Kotak Link Tamu */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                Tautan Undangan Publik Tamu
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value="http://localhost:3001/v/arif-windi"
                  className="flex-1 text-xs font-mono bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 select-all"
                />
                <button
                  type="button"
                  onClick={handleCopyUrl}
                  className="px-3.5 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shrink-0"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-amber-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Tersalin!' : 'Salin'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* KOLOM KANAN: Live Mobile Preview Simulator (7 Kolom Desktop) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          {/* Kontrol Simulator Toolbar */}
          <div className="w-full max-w-md flex items-center justify-between pb-3 px-2">
            <div className="flex items-center gap-1 bg-stone-200/80 p-1 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setPreviewViewport('iphone')}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                  previewViewport === 'iphone' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>iPhone (390px)</span>
              </button>

              <button
                type="button"
                onClick={() => setPreviewViewport('compact')}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                  previewViewport === 'compact' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Android (360px)</span>
              </button>

              <button
                type="button"
                onClick={() => setPreviewViewport('tablet')}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                  previewViewport === 'tablet' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Tablet className="w-3.5 h-3.5" />
                <span>Plus (430px)</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setReloadKey(Date.now())}
                className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                title="Muat Ulang Preview"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Bingkai Smartphone Fisik / Phone Frame */}
          <div
            className={`relative ${viewportWidths[previewViewport]} h-[720px] bg-stone-900 rounded-[44px] p-3 shadow-2xl border-4 border-stone-800 transition-all duration-300`}
          >
            {/* Dynamic Island / Speaker Notch Bar */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-stone-950 rounded-full z-30 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-stone-900 border border-stone-800" />
            </div>

            {/* Screen Inner Container */}
            <div className="w-full h-full bg-[#FAF8F5] rounded-[36px] overflow-hidden relative shadow-inner">
              <iframe
                key={reloadKey}
                src={previewUrl}
                title="Live Mobile Invitation Preview"
                className="w-full h-full border-0 select-none"
              />
            </div>
          </div>

          <p className="text-[11px] text-stone-400 mt-3 text-center">
            Pratinjau interaktif real-time. Anda dapat langsung mengklik dan mencoba formulir RSVP serta amplop digital di dalam simulator.
          </p>
        </div>
      </div>
    </div>
  );
};

