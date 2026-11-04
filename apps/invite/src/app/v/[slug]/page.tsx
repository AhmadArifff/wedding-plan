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
} from 'lucide-react';
import {
  WaxSealEnvelopeCover,
  DigitalEnvelopeBlock,
  FigmaPartyCursors,
  FigmaCraftingCanvas,
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
  const [viewMode, setViewMode] = React.useState<'invitation' | 'crafting'>('crafting');
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
    return DUMMY_ENVELOPES.filter((acc: InvitationEnvelope) => acc.envelopeType === 'BANK_TRANSFER').map((acc: InvitationEnvelope) => ({
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

      {/* 2. Figma Multiplayer Live Presence Cursors & Floating Reactions (Hanya aktif di mode undangan) */}
      {isCoverOpen && viewMode === 'invitation' && <FigmaPartyCursors />}

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

      {/* Mode 2: Main Invitation Content (Tampil dengan animasi Fade In setelah Amplop Dibuka) */}
      {isCoverOpen && viewMode === 'invitation' && (
        <main
          className={`max-w-md mx-auto shadow-2xl bg-white min-h-screen overflow-hidden flex flex-col transition-all duration-1000 ${
            isCoverOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Hero Section dengan Cover Tema Ter-generate */}
          <section className="relative h-96 w-full overflow-hidden bg-stone-900">
            <img
              src="/generated/theme-botanical-sage.svg"
              alt="Tema Botanical Sage"
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent flex flex-col justify-end p-6 text-white text-center">
              <span className="text-xs uppercase tracking-[0.25em] text-teal-300 font-semibold mb-2">
                Walimatul 'Urs
              </span>
              <h1 className="font-serif italic text-4xl sm:text-5xl font-bold tracking-tight">
                {DUMMY_INVITATION.groomNick} &amp; {DUMMY_INVITATION.brideNick}
              </h1>
              <p className="text-xs text-stone-300 mt-2 font-mono">
                Minggu, 14 November 2027
              </p>
            </div>
          </section>

          {/* Ayat Suci & Mukadimah */}
          <section className="p-6 text-center space-y-4 border-b border-stone-100">
            <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-800 flex items-center justify-center mx-auto">
              <Heart className="w-4 h-4 text-teal-700" />
            </div>
            <p className="font-serif italic text-sm text-stone-700 leading-relaxed max-w-xs mx-auto">
              "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
            </p>
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-widest block">
              QS. AR-RUM: 21
            </span>
          </section>

          {/* Profil Kedua Mempelai */}
          <section className="p-6 space-y-6 border-b border-stone-100 bg-[#FAF8F5]/50">
            <div className="text-center">
              <h2 className="text-xl font-serif font-bold text-stone-900">Kedua Mempelai</h2>
              <p className="text-xs text-stone-500 mt-1">
                Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud melangsungkan pernikahan:
              </p>
            </div>

            <div className="space-y-6">
              {/* Pengantin Pria */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 text-center shadow-xs">
                <div className="w-20 h-20 mx-auto rounded-full p-1 border-2 border-teal-700 bg-teal-50 mb-3">
                  <img
                    src="/generated/avatar-groom.svg"
                    alt={DUMMY_INVITATION.groomFullName}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  {DUMMY_INVITATION.groomFullName}
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  {DUMMY_INVITATION.groomParents}
                </p>
              </div>

              {/* Pengantin Wanita */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 text-center shadow-xs">
                <div className="w-20 h-20 mx-auto rounded-full p-1 border-2 border-amber-600 bg-amber-50 mb-3">
                  <img
                    src="/generated/avatar-bride.svg"
                    alt={DUMMY_INVITATION.brideFullName}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  {DUMMY_INVITATION.brideFullName}
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  {DUMMY_INVITATION.brideParents}
                </p>
              </div>
            </div>
          </section>

          {/* Rangkaian Agenda Acara */}
          <section className="p-6 space-y-5 border-b border-stone-100">
            <div className="text-center">
              <h2 className="text-xl font-serif font-bold text-stone-900">Rangkaian Acara</h2>
              <p className="text-xs text-stone-500 mt-1">
                Insya Allah acara diselenggarakan pada:
              </p>
            </div>

            <div className="space-y-4">
              {/* Akad Nikah */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-base text-stone-900">Akad Nikah</span>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800">
                    Khusus Keluarga
                  </span>
                </div>
                <div className="text-xs text-stone-600 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-stone-500" />
                    <span>Minggu, 14 November 2027</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-stone-500" />
                    <span>08:00 - 10:00 WIB</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-500" />
                    <span>Pendopo Dalem Ngabean, Kraton Yogyakarta</span>
                  </div>
                </div>
              </div>

              {/* Resepsi Pernikahan */}
              <div className="bg-amber-50/50 rounded-2xl p-4 border border-amber-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-base text-stone-900">Resepsi Pernikahan</span>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    Umum &amp; Kerabat
                  </span>
                </div>
                <div className="text-xs text-stone-600 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-stone-500" />
                    <span>Minggu, 14 November 2027</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-stone-500" />
                    <span>11:00 - 14:00 WIB</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-500" />
                    <span>{DUMMY_INVITATION.venueName}</span>
                  </div>
                </div>
              </div>

              {/* Tombol Buka Google Maps */}
              <a
                href={DUMMY_INVITATION.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-xs transition-all active:scale-95"
              >
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Petunjuk Arah Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </section>

          {/* 4. Digital Envelope Block (BCA, Mandiri, QRIS) */}
          <DigitalEnvelopeBlock
            bankAccounts={bankAccountsList}
            qrisImageUrl="/generated/qris-merchant-dummy.svg"
            qrisHolderName="Arif &amp; Windi Wedding"
          />

          {/* 5. RSVP Konfirmasi Kehadiran */}
          <section className="p-6 border-t border-stone-100 bg-stone-50/70 space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-serif font-bold text-stone-900">Konfirmasi Kehadiran</h2>
              <p className="text-xs text-stone-500 mt-1">
                Mohon konfirmasikan kehadiran Bapak/Ibu/Saudara/i untuk kenyamanan persiapan jamuan.
              </p>
            </div>

            {isRsvpSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center space-y-2">
                <CheckCircle className="w-6 h-6 text-emerald-600 mx-auto" />
                <p className="text-xs font-bold text-emerald-800">
                  Terima kasih atas konfirmasi kehadiran Anda!
                </p>
                <p className="text-[11px] text-emerald-700">
                  Data kehadiran telah tersimpan aman di sistem penyelenggara.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-3 bg-white p-4 rounded-2xl border border-stone-200">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Nama Lengkap</label>
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
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Status Kehadiran</label>
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
                    <label className="text-xs font-semibold text-stone-700 block mb-1">Jumlah Orang Hadir</label>
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
            <form onSubmit={handleSendWish} className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2.5">
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
                <div key={w.id} className="bg-white p-3.5 rounded-xl border border-stone-100 shadow-2xs space-y-1">
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
                    "{w.wishMessage}"
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
