'use client';

import * as React from 'react';
import type { FullInvitationConfig, InvitationStoryItem } from '@nikahplan/db';
import {
  Heart,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  BookOpen,
  Users,
  Plus,
  Trash2,
  FileText,
} from 'lucide-react';

interface PanelContentTextProps {
  config: FullInvitationConfig;
  onChange: (updater: (prev: FullInvitationConfig) => FullInvitationConfig) => void;
}

export const PanelContentText: React.FC<PanelContentTextProps> = ({ config, onChange }) => {
  const [activeSection, setActiveSection] = React.useState<
    'hero' | 'couple' | 'quote' | 'events' | 'stories'
  >('hero');

  const handleAddStory = () => {
    const newStory: InvitationStoryItem = {
      id: `st-${Date.now()}`,
      year: `${new Date().getFullYear()}`,
      title: 'Momen Baru',
      description: 'Tuliskan kisah indah perjalanan cinta Anda di sini.',
      iconName: 'Heart',
    };
    onChange((prev) => ({
      ...prev,
      stories: [...prev.stories, newStory],
    }));
  };

  const handleRemoveStory = (id: string) => {
    onChange((prev) => ({
      ...prev,
      stories: prev.stories.filter((s) => s.id !== id),
    }));
  };

  const handleUpdateStory = (
    id: string,
    field: keyof InvitationStoryItem,
    value: string
  ) => {
    onChange((prev) => ({
      ...prev,
      stories: prev.stories.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    }));
  };

  return (
    <div className="space-y-4">
      {/* Sub-Nav Pill Antar Bagian Teks */}
      <div className="flex flex-wrap gap-1.5 p-1 bg-stone-100 rounded-xl">
        <button
          type="button"
          onClick={() => setActiveSection('hero')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeSection === 'hero'
              ? 'bg-white text-teal-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Cover &amp; Header
        </button>
        <button
          type="button"
          onClick={() => setActiveSection('couple')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeSection === 'couple'
              ? 'bg-white text-teal-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Data Mempelai
        </button>
        <button
          type="button"
          onClick={() => setActiveSection('quote')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeSection === 'quote'
              ? 'bg-white text-teal-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Salam &amp; Ayat
        </button>
        <button
          type="button"
          onClick={() => setActiveSection('events')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeSection === 'events'
              ? 'bg-white text-teal-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Jadwal &amp; Lokasi
        </button>
        <button
          type="button"
          onClick={() => setActiveSection('stories')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeSection === 'stories'
              ? 'bg-white text-teal-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Love Story
        </button>
      </div>

      {/* 1. SEKSI HERO & COVER */}
      {activeSection === 'hero' && (
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <h4 className="font-serif font-bold text-sm text-stone-900">
              Judul Cover &amp; Badge Tamu
            </h4>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Judul Utama Cover
              </label>
              <input
                type="text"
                value={config.hero.title}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    hero: { ...prev.hero, title: e.target.value },
                  }))
                }
                className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-teal-700"
                placeholder="THE WEDDING OF"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Teks Tanggal Cover
              </label>
              <input
                type="text"
                value={config.hero.dateText}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    hero: { ...prev.hero, dateText: e.target.value },
                  }))
                }
                className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-teal-700"
                placeholder="MINGGU, 14 NOVEMBER 2027"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Label Kotak Tamu
                </label>
                <input
                  type="text"
                  value={config.hero.guestBoxLabel}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, guestBoxLabel: e.target.value },
                    }))
                  }
                  className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-teal-700"
                  placeholder="Kepada Yth. Bapak/Ibu/Saudara/i:"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Nama Tamu Standar
                </label>
                <input
                  type="text"
                  value={config.hero.guestNameDefault}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, guestNameDefault: e.target.value },
                    }))
                  }
                  className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-teal-700"
                  placeholder="Sahabat Terkasih"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. DATA MEMPELAI */}
      {activeSection === 'couple' && (
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
            <Users className="w-4 h-4 text-teal-700" />
            <h4 className="font-serif font-bold text-sm text-stone-900">
              Profil Mempelai Pria &amp; Wanita
            </h4>
          </div>

          <div className="space-y-4">
            {/* Mempelai Pria */}
            <div className="p-3.5 rounded-xl bg-teal-50/40 border border-teal-200/60 space-y-3">
              <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider block">
                Mempelai Pria
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Nama Panggilan
                  </label>
                  <input
                    type="text"
                    value={config.couple.groomNickname}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        couple: { ...prev.couple, groomNickname: e.target.value },
                      }))
                    }
                    className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-teal-700"
                    placeholder="Arif"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Nama Lengkap &amp; Gelar
                  </label>
                  <input
                    type="text"
                    value={config.couple.groomFullName}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        couple: { ...prev.couple, groomFullName: e.target.value },
                      }))
                    }
                    className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-teal-700"
                    placeholder="Ahmad Arif Fauzi, S.Kom."
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Nama Orang Tua / Keterangan
                </label>
                <input
                  type="text"
                  value={config.couple.groomParents}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      couple: { ...prev.couple, groomParents: e.target.value },
                    }))
                  }
                  className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-teal-700"
                  placeholder="Putra pertama dari Bpk. Bambang Supeno & Ibu Siti Aminah"
                />
              </div>
            </div>

            {/* Mempelai Wanita */}
            <div className="p-3.5 rounded-xl bg-amber-50/40 border border-amber-200/60 space-y-3">
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                Mempelai Wanita
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Nama Panggilan
                  </label>
                  <input
                    type="text"
                    value={config.couple.brideNickname}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        couple: { ...prev.couple, brideNickname: e.target.value },
                      }))
                    }
                    className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-teal-700"
                    placeholder="Windi"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Nama Lengkap &amp; Gelar
                  </label>
                  <input
                    type="text"
                    value={config.couple.brideFullName}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        couple: { ...prev.couple, brideFullName: e.target.value },
                      }))
                    }
                    className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-teal-700"
                    placeholder="Windi Astuti, S.Ds."
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Nama Orang Tua / Keterangan
                </label>
                <input
                  type="text"
                  value={config.couple.brideParents}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      couple: { ...prev.couple, brideParents: e.target.value },
                    }))
                  }
                  className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-teal-700"
                  placeholder="Putri kedua dari Bpk. Slamet Raharjo & Ibu Sri Mulyani"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. SALAM & AYAT SUCI */}
      {activeSection === 'quote' && (
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
            <BookOpen className="w-4 h-4 text-emerald-700" />
            <h4 className="font-serif font-bold text-sm text-stone-900">
              Salam Pembuka &amp; Kutipan Doa
            </h4>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Teks Salam Pembuka
              </label>
              <input
                type="text"
                value={config.quote.greeting}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    quote: { ...prev.quote, greeting: e.target.value },
                  }))
                }
                className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-teal-700"
                placeholder="Assalamu'alaikum Wr. Wb."
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Kalimat Pembuka / Mukadimah
              </label>
              <textarea
                rows={2}
                value={config.quote.introText}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    quote: { ...prev.quote, introText: e.target.value },
                  }))
                }
                className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-teal-700"
                placeholder="Tanpa mengurangi rasa hormat, kami bermaksud..."
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Terjemahan Kutipan Ayat / Doa
              </label>
              <textarea
                rows={3}
                value={config.quote.translationText}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    quote: { ...prev.quote, translationText: e.target.value },
                  }))
                }
                className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-teal-700"
                placeholder="Dan di antara tanda-tanda kebesaran-Nya..."
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Sumber Rujukan (Surah / Penulis)
              </label>
              <input
                type="text"
                value={config.quote.sourceText}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    quote: { ...prev.quote, sourceText: e.target.value },
                  }))
                }
                className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-teal-700"
                placeholder="QS. AR-RUM: 21"
              />
            </div>
          </div>
        </div>
      )}

      {/* 4. JADWAL & LOKASI ACARA */}
      {activeSection === 'events' && (
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
            <Calendar className="w-4 h-4 text-teal-800" />
            <h4 className="font-serif font-bold text-sm text-stone-900">
              Jadwal Akad &amp; Resepsi Pernikahan
            </h4>
          </div>

          <div className="space-y-4">
            {/* Detail Akad */}
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2.5">
              <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider block">
                Acara Akad Nikah
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Hari &amp; Tanggal
                  </label>
                  <input
                    type="text"
                    value={config.events.akad.dateFormatted}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        events: {
                          ...prev.events,
                          akad: { ...prev.events.akad, dateFormatted: e.target.value },
                        },
                      }))
                    }
                    className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 text-stone-800"
                    placeholder="Minggu, 14 November 2027"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Waktu / Jam
                  </label>
                  <input
                    type="text"
                    value={config.events.akad.timeRange}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        events: {
                          ...prev.events,
                          akad: { ...prev.events.akad, timeRange: e.target.value },
                        },
                      }))
                    }
                    className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 text-stone-800"
                    placeholder="08.00 - 10.00 WIB"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Nama Tempat / Gedung Akad
                </label>
                <input
                  type="text"
                  value={config.events.akad.venueName}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      events: {
                        ...prev.events,
                        akad: { ...prev.events.akad, venueName: e.target.value },
                      },
                    }))
                  }
                  className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 text-stone-800"
                  placeholder="Pendopo Dalem Ngabean"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Alamat Lengkap
                </label>
                <input
                  type="text"
                  value={config.events.akad.venueAddress}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      events: {
                        ...prev.events,
                        akad: { ...prev.events.akad, venueAddress: e.target.value },
                      },
                    }))
                  }
                  className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 text-stone-800"
                  placeholder="Jl. Suryodiningratan No. 37, Mantrijeron, Yogyakarta"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Link Google Maps
                </label>
                <input
                  type="url"
                  value={config.events.akad.googleMapsUrl}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      events: {
                        ...prev.events,
                        akad: { ...prev.events.akad, googleMapsUrl: e.target.value },
                      },
                    }))
                  }
                  className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 text-stone-800 font-mono"
                  placeholder="https://maps.google.com/?q=..."
                />
              </div>
            </div>

            {/* Detail Resepsi */}
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2.5">
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                Acara Resepsi Pernikahan
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Hari &amp; Tanggal
                  </label>
                  <input
                    type="text"
                    value={config.events.reception.dateFormatted}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        events: {
                          ...prev.events,
                          reception: {
                            ...prev.events.reception,
                            dateFormatted: e.target.value,
                          },
                        },
                      }))
                    }
                    className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 text-stone-800"
                    placeholder="Minggu, 14 November 2027"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Waktu / Jam
                  </label>
                  <input
                    type="text"
                    value={config.events.reception.timeRange}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        events: {
                          ...prev.events,
                          reception: {
                            ...prev.events.reception,
                            timeRange: e.target.value,
                          },
                        },
                      }))
                    }
                    className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 text-stone-800"
                    placeholder="11.00 - 14.00 WIB"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Nama Tempat / Gedung Resepsi
                </label>
                <input
                  type="text"
                  value={config.events.reception.venueName}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      events: {
                        ...prev.events,
                        reception: {
                          ...prev.events.reception,
                          venueName: e.target.value,
                        },
                      },
                    }))
                  }
                  className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 text-stone-800"
                  placeholder="Graha Sakinah Convention Hall"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Alamat Lengkap
                </label>
                <input
                  type="text"
                  value={config.events.reception.venueAddress}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      events: {
                        ...prev.events,
                        reception: {
                          ...prev.events.reception,
                          venueAddress: e.target.value,
                        },
                      },
                    }))
                  }
                  className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 text-stone-800"
                  placeholder="Jl. Kaliurang KM 9, Sinduharjo, Sleman, Yogyakarta"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Link Google Maps
                </label>
                <input
                  type="url"
                  value={config.events.reception.googleMapsUrl}
                  onChange={(e) =>
                    onChange((prev) => ({
                      ...prev,
                      events: {
                        ...prev.events,
                        reception: {
                          ...prev.events.reception,
                          googleMapsUrl: e.target.value,
                        },
                      },
                    }))
                  }
                  className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 text-stone-800 font-mono"
                  placeholder="https://maps.google.com/?q=..."
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. CERITA CINTA (OUR LOVE STORY) */}
      {activeSection === 'stories' && (
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-600" />
              <h4 className="font-serif font-bold text-sm text-stone-900">
                Timeline Cerita Cinta (Our Love Story)
              </h4>
            </div>
            <button
              type="button"
              onClick={handleAddStory}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Momen</span>
            </button>
          </div>

          <div className="space-y-3">
            {config.stories.map((story, index) => (
              <div
                key={story.id}
                className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2.5 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                    Momen #{index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveStory(story.id)}
                    className="p-1 rounded-md text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Hapus Momen Cerita"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="sm:col-span-1">
                    <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                      Tahun
                    </label>
                    <input
                      type="text"
                      value={story.year}
                      onChange={(e) => handleUpdateStory(story.id, 'year', e.target.value)}
                      className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-1.5 text-stone-800 font-mono"
                      placeholder="2022"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                      Judul Momen
                    </label>
                    <input
                      type="text"
                      value={story.title}
                      onChange={(e) => handleUpdateStory(story.id, 'title', e.target.value)}
                      className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-1.5 text-stone-800"
                      placeholder="Awal Pertemuan"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                    Cerita Singkat
                  </label>
                  <textarea
                    rows={2}
                    value={story.description}
                    onChange={(e) => handleUpdateStory(story.id, 'description', e.target.value)}
                    className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-1.5 text-stone-800 leading-relaxed"
                    placeholder="Tuliskan kisah romantis momen ini..."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
