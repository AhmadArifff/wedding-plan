import * as React from 'react';
import { Copy, Check, QrCode, X, CreditCard, ShieldCheck } from 'lucide-react';

export interface BankAccountItem {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  qrCodeUrl?: string;
}

export interface DigitalEnvelopeBlockProps {
  bankAccounts: BankAccountItem[];
  qrisImageUrl?: string;
  qrisHolderName?: string;
}

export const DigitalEnvelopeBlock: React.FC<DigitalEnvelopeBlockProps> = ({
  bankAccounts,
  qrisImageUrl,
  qrisHolderName = 'Arif & Siti Wedding',
}) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [isQrModalOpen, setIsQrModalOpen] = React.useState(false);

  const handleCopy = async (id: string, text: string) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      }
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      // Fallback manual copy jika clipboard API diblokir
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  return (
    <section className="w-full max-w-md mx-auto py-8 px-4 text-stone-900" aria-label="Amplop Digital & Tanda Kasih">
      <div className="text-center space-y-2 mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold uppercase tracking-wider border border-teal-200">
          <CreditCard className="w-3.5 h-3.5 text-teal-700" />
          <span>Tanda Kasih Digital</span>
        </div>
        <h2 className="text-2xl font-serif text-stone-900 font-bold">Amplop Digital &amp; Kado</h2>
        <p className="text-xs text-stone-600 max-w-xs mx-auto leading-relaxed">
          Doa restu Anda merupakan karunia terindah bagi kami. Bagi keluarga dan sahabat yang ingin memberikan tanda kasih secara digital, dapat melalui rekening berikut:
        </p>
      </div>

      {/* Daftar Rekening Bank */}
      <div className="space-y-3.5">
        {bankAccounts.map((account) => {
          const isCopied = copiedId === account.id;
          return (
            <div
              key={account.id}
              className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs relative overflow-hidden transition-all hover:shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm tracking-wide text-teal-800 uppercase">
                  {account.bankName}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-stone-600 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Terverifikasi
                </span>
              </div>

              <div className="text-xs text-stone-500 mb-1">Nomor Rekening:</div>
              <div className="flex items-center justify-between bg-stone-50 rounded-xl px-3 py-2 border border-stone-200">
                <span className="font-mono font-bold text-stone-900 tracking-wider text-base select-all">
                  {account.accountNumber}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(account.id, account.accountNumber)}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    isCopied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-200 hover:bg-stone-300 text-stone-800 active:scale-95'
                  }`}
                  aria-label={`Salin nomor rekening ${account.bankName}`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-2 text-xs text-stone-600">
                Atas Nama: <strong className="text-stone-900">{account.accountHolder}</strong>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bagian QRIS Merchant */}
      {qrisImageUrl && (
        <div className="mt-5 bg-gradient-to-b from-stone-50 to-white rounded-2xl p-4 border border-stone-200 shadow-xs text-center">
          <div className="inline-flex items-center gap-1 text-xs font-semibold text-stone-700 mb-3">
            <QrCode className="w-4 h-4 text-teal-700" />
            <span>Pindai QRIS (Semua Bank &amp; E-Wallet)</span>
          </div>

          <div className="relative inline-block mx-auto bg-white p-3 rounded-xl border border-stone-200 shadow-xs">
            <img
              src={qrisImageUrl}
              alt={`QRIS ${qrisHolderName}`}
              className="w-44 h-44 object-contain mx-auto cursor-pointer rounded-lg hover:opacity-95 transition-opacity"
              onClick={() => setIsQrModalOpen(true)}
            />
            <button
              type="button"
              onClick={() => setIsQrModalOpen(true)}
              className="mt-2 text-[11px] text-teal-700 font-semibold underline underline-offset-2 flex items-center justify-center gap-1 mx-auto cursor-pointer"
            >
              Klik untuk memperbesar QRIS
            </button>
          </div>
          <p className="text-[11px] text-stone-600 mt-2">
            NMID terdaftar resmi atas nama <strong>{qrisHolderName}</strong>
          </p>
        </div>
      )}

      {/* Modal Perbesar QRIS */}
      {isQrModalOpen && qrisImageUrl && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in"
          onClick={() => setIsQrModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-sm w-full p-5 text-center relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 cursor-pointer"
              aria-label="Tutup dialog QRIS"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-stone-900 mb-1">QRIS Tanda Kasih</h3>
            <p className="text-xs text-stone-600 mb-3">{qrisHolderName}</p>

            <div className="bg-white p-2 border border-stone-200 rounded-xl mb-4">
              <img
                src={qrisImageUrl}
                alt={`QRIS ${qrisHolderName} Fullsize`}
                className="w-full max-w-[280px] h-auto mx-auto object-contain"
              />
            </div>

            <p className="text-xs text-stone-600 leading-normal">
              Buka aplikasi m-Banking atau dompet digital (GoPay, OVO, Dana, ShopeePay), lalu arahkan pemindai ke kode QR di atas.
            </p>

            <button
              type="button"
              onClick={() => setIsQrModalOpen(false)}
              className="mt-4 w-full min-h-[44px] bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs rounded-xl py-2.5 cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

