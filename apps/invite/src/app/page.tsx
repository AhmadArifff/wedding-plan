import Link from 'next/link';
import { MailOpen, ExternalLink, Heart } from 'lucide-react';

export default function InviteIndexPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-[#FAF8F5]">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-stone-200 shadow-sm space-y-6">
        <div className="w-14 h-14 bg-teal-50 text-teal-800 rounded-2xl flex items-center justify-center mx-auto border border-teal-200">
          <Heart className="w-7 h-7 text-teal-700" />
        </div>

        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900">
            NikahPlan Digital Invitation
          </h1>
          <p className="text-xs text-stone-600 mt-2">
            Portal Undangan Digital Tamu Terintegrasi QRIS Tanda Kasih &amp; Konfirmasi Kehadiran.
          </p>
        </div>

        <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-left space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 block">
            Demo Undangan Aktif:
          </span>
          <p className="text-sm font-serif font-bold text-stone-900">
            Pernikahan Arif &amp; Siti
          </p>
          <p className="text-xs text-stone-600">
            Yogyakarta · 20 September 2026
          </p>
        </div>

        <Link
          href="/v/arif-siti"
          className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <MailOpen className="w-4 h-4" />
          <span>Buka Demo Undangan Tamu</span>
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
    </main>
  );
}

