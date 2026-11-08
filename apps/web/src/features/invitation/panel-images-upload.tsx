'use client';

import * as React from 'react';
import type { FullInvitationConfig, InvitationMemoryPhoto } from '@nikahplan/db';
import {
  Upload,
  Image as ImageIcon,
  QrCode,
  Sparkles,
  Users,
  Camera,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';

interface PanelImagesUploadProps {
  config: FullInvitationConfig;
  onChange: (updater: (prev: FullInvitationConfig) => FullInvitationConfig) => void;
}

export const PanelImagesUpload: React.FC<PanelImagesUploadProps> = ({ config, onChange }) => {
  const [activeTab, setActiveTab] = React.useState<'core' | 'memories' | 'qris'>('core');
  const [uploadingField, setUploadingField] = React.useState<string | null>(null);
  const [uploadError, setUploadError] = React.useState<string | null>(null);

  // File upload handler communicating with Supabase Storage bucket via API
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    category: 'hero' | 'couple' | 'memories' | 'qris',
    onSuccess: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(category);
    setUploadError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);
    formData.append('workspaceId', config.workspaceId);

    try {
      const res = await fetch('/api/invitation/upload', {
        method: 'POST',
        body: formData,
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Gagal mengunggah gambar ke storage.');
      }

      onSuccess(json.url);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Upload gagal';
      setUploadError(msg);
    } finally {
      setUploadingField(null);
      // Reset input value so same file can be re-selected if needed
      e.target.value = '';
    }
  };

  const handleAddMemoryPhoto = () => {
    const nextLeft = config.memories.filter((m) => m.column === 'left').length <=
      config.memories.filter((m) => m.column === 'right').length;
    const newPhoto: InvitationMemoryPhoto = {
      id: `photo-${Date.now()}`,
      src: '/referensi/797207-gallery-D7vomq3BEn.jpg',
      caption: 'Momen Bahagia Bersama',
      category: 'Kenangan Manis',
      column: nextLeft ? 'left' : 'right',
    };
    onChange((prev) => ({
      ...prev,
      memories: [...prev.memories, newPhoto],
    }));
  };

  const handleRemoveMemoryPhoto = (id: string) => {
    onChange((prev) => ({
      ...prev,
      memories: prev.memories.filter((m) => m.id !== id),
    }));
  };

  const handleUpdateMemoryPhoto = (
    id: string,
    field: keyof InvitationMemoryPhoto,
    value: string
  ) => {
    onChange((prev) => ({
      ...prev,
      memories: prev.memories.map((m) => (m.id === id ? { ...m, [field]: value } : m)),
    }));
  };

  return (
    <div className="space-y-4">
      {/* Alert Error Upload jika ada */}
      {uploadError && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Sub-Nav Pill Antar Kategori Gambar */}
      <div className="flex flex-wrap gap-1.5 p-1 bg-stone-100 rounded-xl">
        <button
          type="button"
          onClick={() => setActiveTab('core')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'core'
              ? 'bg-white text-teal-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Foto Utama &amp; Portret
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('memories')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'memories'
              ? 'bg-white text-teal-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Galeri Kenangan ({config.memories.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('qris')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'qris'
              ? 'bg-white text-teal-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          QRIS Amplop Digital
        </button>
      </div>

      {/* 1. FOTO UTAMA & PORTRET */}
      {activeTab === 'core' && (
        <div className="space-y-4">
          {/* A. Foto Background Hero Cover */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-amber-300 bg-stone-900 shrink-0 shadow-sm">
              <img
                src={config.hero.backgroundImageUrl}
                alt="Hero Background"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0 space-y-1 text-center sm:text-left">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-700 font-bold block">
                SEKSI 1: HERO COVER
              </span>
              <h4 className="font-serif font-bold text-sm text-stone-900">
                Foto Latar Belakang Artistik
              </h4>
              <p className="text-[11px] text-stone-500 leading-tight">
                Foto prewedding yang membaur dengan latar hijau zamrud saat tamu membuka undangan.
              </p>
              <div className="pt-2 flex items-center justify-center sm:justify-start gap-2">
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold transition-all cursor-pointer">
                  {uploadingField === 'hero' ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Upload className="w-3.5 h-3.5" />
                  )}
                  <span>Unggah ke Supabase</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleFileUpload(e, 'hero', (url) =>
                        onChange((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, backgroundImageUrl: url },
                        }))
                      )
                    }
                  />
                </label>
              </div>
            </div>
          </div>

          {/* B. Foto Siluet Arch Berdua (Seksi 2) */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-20 h-28 rounded-t-full rounded-b-2xl overflow-hidden border-2 border-amber-400 bg-stone-100 shrink-0 shadow-sm">
              <img
                src={config.couple.archCouplePhotoUrl}
                alt="Siluet Berdua"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0 space-y-1 text-center sm:text-left">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-700 font-bold block">
                SEKSI 2: SALAM &amp; AYAT
              </span>
              <h4 className="font-serif font-bold text-sm text-stone-900">
                Foto Siluet Arch Mempelai Berdua
              </h4>
              <p className="text-[11px] text-stone-500 leading-tight">
                Foto utama di atas salam pembuka dengan bingkai lengkung emas khas keraton.
              </p>
              <div className="pt-2 flex items-center justify-center sm:justify-start gap-2">
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold transition-all cursor-pointer">
                  {uploadingField === 'arch' ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Upload className="w-3.5 h-3.5" />
                  )}
                  <span>Ganti Foto Arch</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleFileUpload(e, 'couple', (url) =>
                        onChange((prev) => ({
                          ...prev,
                          couple: { ...prev.couple, archCouplePhotoUrl: url },
                        }))
                      )
                    }
                  />
                </label>
              </div>
            </div>
          </div>

          {/* C. Foto Mempelai Pria & Wanita (Seksi 3) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Foto Pria */}
            <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs space-y-3 text-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-teal-800 font-bold block">
                FOTO MEMPELAI PRIA
              </span>
              <div className="relative w-20 h-28 mx-auto rounded-t-full rounded-b-2xl overflow-hidden border-2 border-teal-300 shadow-sm bg-stone-100">
                <img
                  src={config.couple.groomPhotoUrl}
                  alt={config.couple.groomNickname}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs font-serif font-bold text-stone-900">
                {config.couple.groomNickname}
              </p>
              <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold transition-all cursor-pointer">
                <Upload className="w-3 h-3" />
                <span>Upload Foto Pria</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    handleFileUpload(e, 'couple', (url) =>
                      onChange((prev) => ({
                        ...prev,
                        couple: { ...prev.couple, groomPhotoUrl: url },
                      }))
                    )
                  }
                />
              </label>
            </div>

            {/* Foto Wanita */}
            <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs space-y-3 text-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 font-bold block">
                FOTO MEMPELAI WANITA
              </span>
              <div className="relative w-20 h-28 mx-auto rounded-t-full rounded-b-2xl overflow-hidden border-2 border-amber-300 shadow-sm bg-stone-100">
                <img
                  src={config.couple.bridePhotoUrl}
                  alt={config.couple.brideNickname}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs font-serif font-bold text-stone-900">
                {config.couple.brideNickname}
              </p>
              <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold transition-all cursor-pointer">
                <Upload className="w-3 h-3" />
                <span>Upload Foto Wanita</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    handleFileUpload(e, 'couple', (url) =>
                      onChange((prev) => ({
                        ...prev,
                        couple: { ...prev.couple, bridePhotoUrl: url },
                      }))
                    )
                  }
                />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* 2. GALERI KENANGAN (OUR MEMORIES - DUAL COLUMN MARQUEE) */}
      {activeTab === 'memories' && (
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <div>
              <h4 className="font-serif font-bold text-sm text-stone-900">
                Koleksi Foto Our Memories
              </h4>
              <p className="text-[11px] text-stone-500">
                Foto bergerak berlawanan arah vertikal (Dual-Column Vertical Marquee).
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddMemoryPhoto}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Foto</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {config.memories.map((photo, index) => (
              <div
                key={photo.id}
                className="p-3 rounded-2xl bg-stone-50 border border-stone-200 space-y-2.5 relative flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                    Foto #{index + 1} · Kolom {photo.column === 'left' ? 'Kiri (↑)' : 'Kanan (↓)'}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveMemoryPhoto(photo.id)}
                    className="p-1 rounded-md text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Hapus Foto"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-20 rounded-xl overflow-hidden border border-amber-300 bg-stone-200 shrink-0">
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div>
                      <label className="text-[10px] font-semibold text-stone-500 block">
                        Kategori / Tag
                      </label>
                      <input
                        type="text"
                        value={photo.category}
                        onChange={(e) =>
                          handleUpdateMemoryPhoto(photo.id, 'category', e.target.value)
                        }
                        className="w-full text-[11px] bg-white border border-stone-200 rounded-lg px-2 py-1 text-stone-800"
                        placeholder="Busana Tradisional"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-semibold text-stone-500 block">
                        Keterangan Foto (Caption)
                      </label>
                      <input
                        type="text"
                        value={photo.caption}
                        onChange={(e) =>
                          handleUpdateMemoryPhoto(photo.id, 'caption', e.target.value)
                        }
                        className="w-full text-[11px] bg-white border border-stone-200 rounded-lg px-2 py-1 text-stone-800 truncate"
                        placeholder="Momen Bahagia Bersama"
                      />
                    </div>
                  </div>
                </div>

                {/* Tombol Ganti Foto dengan Upload */}
                <div className="pt-1 flex items-center justify-between border-t border-stone-200/60">
                  <select
                    value={photo.column}
                    onChange={(e) =>
                      handleUpdateMemoryPhoto(
                        photo.id,
                        'column',
                        e.target.value as 'left' | 'right'
                      )
                    }
                    className="text-[10px] bg-white border border-stone-200 rounded-lg px-2 py-1 text-stone-700"
                  >
                    <option value="left">Kolom Kiri (Naik)</option>
                    <option value="right">Kolom Kanan (Turun)</option>
                  </select>

                  <label className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-800 hover:text-teal-900 cursor-pointer">
                    <Upload className="w-3 h-3" />
                    <span>Ganti File</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, 'memories', (url) =>
                          handleUpdateMemoryPhoto(photo.id, 'src', url)
                        )
                      }
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. QRIS AMPLOP DIGITAL */}
      {activeTab === 'qris' && (
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
            <QrCode className="w-4 h-4 text-stone-800" />
            <h4 className="font-serif font-bold text-sm text-stone-900">
              Pengaturan QRIS Amplop Digital
            </h4>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-5">
            {/* Pratinjau QRIS */}
            <div className="relative w-40 h-40 p-2 bg-white rounded-2xl border-2 border-stone-800 shadow-sm shrink-0 flex items-center justify-center">
              <img
                src={config.envelopes.qrisImageUrl}
                alt="QRIS Barcode"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-3 flex-1 min-w-0">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Nama Merchant QRIS / Keterangan
                </label>
                <input
                  type="text"
                  value={config.envelopes.qrisMerchantName}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      envelopes: {
                        ...prev.envelopes,
                        qrisMerchantName: e.target.value,
                      },
                    }))
                  }
                  className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 font-mono"
                  placeholder="ARIF & WINDI WEDDING (NMID: ID1020023400001)"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Unggah Gambar Barcode QRIS Resmi
                </label>
                <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold transition-all cursor-pointer">
                  {uploadingField === 'qris' ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Upload className="w-3.5 h-3.5" />
                  )}
                  <span>Unggah Barcode QRIS (PNG / JPG)</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleFileUpload(e, 'qris', (url) =>
                        onChange((prev) => ({
                          ...prev,
                          envelopes: {
                            ...prev.envelopes,
                            qrisImageUrl: url,
                          },
                        }))
                      )
                    }
                  />
                </label>
              </div>

              <p className="text-[11px] text-stone-500 leading-tight">
                Barcode QRIS dapat dipindai oleh tamu menggunakan BCA Mobile, Mandiri Livin&apos;, GoPay, OVO, ShopeePay, dan seluruh aplikasi perbankan berstandar BI QRIS.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

