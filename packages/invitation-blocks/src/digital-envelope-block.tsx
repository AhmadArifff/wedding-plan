import * as React from 'react';
import { Copy, Check, QrCode, X, CreditCard, ShieldCheck } from 'lucide-react';

export interface BankAccountItem {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  qrCodeUrl?: string;
}

export type ElementCraftStage = 'wireframe' | 'container' | 'typing' | 'verified';

export interface DigitalEnvelopeBlockProps {
  bankAccounts: BankAccountItem[];
  qrisImageUrl?: string;
  qrisHolderName?: string;
  headerCraftId?: string;
  bankCardCraftId?: string;
  qrisCardCraftId?: string;
  headerStage?: ElementCraftStage;
  bankStage?: ElementCraftStage;
  qrisStage?: ElementCraftStage;
  typingProgress?: number;
}

const sliceByProgress = (text: string, progress: number) => {
  const clamped = Math.max(0, Math.min(1, progress));
  return text.slice(0, Math.max(1, Math.ceil(text.length * clamped)));
};

export const DigitalEnvelopeBlock: React.FC<DigitalEnvelopeBlockProps> = ({
  bankAccounts,
  qrisImageUrl,
  qrisHolderName = 'Arif & Windi Wedding',
  headerCraftId = 'envelope-header',
  bankCardCraftId = 'bank-card',
  qrisCardCraftId = 'qris-card',
  headerStage = 'verified',
  bankStage = 'verified',
  qrisStage = 'verified',
  typingProgress = 1,
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
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const headerTitle = 'Amplop Digital & Kado';
  const headerDesc =
    'Doa restu Anda merupakan karunia terindah bagi kami. Bagi keluarga dan sahabat yang ingin memberikan tanda kasih secara digital, dapat melalui rekening berikut:';

  return (
    <section
      className="w-full max-w-md mx-auto py-8 px-4 text-stone-900"
      aria-label="Amplop Digital & Tanda Kasih"
    >
      {/* 18. Header Amplop Digital & Kado */}
      <div data-craft-id={headerCraftId} className="mb-6 min-h-[112px] flex flex-col justify-center">
        {headerStage === 'wireframe' && (
          <div className="border border-dashed border-amber-300 rounded-2xl p-4 text-center text-xs text-stone-400 italic bg-stone-50/50 min-h-[104px] flex items-center justify-center select-none">
            [Area Judul &amp; Pengantar Amplop Digital]
          </div>
        )}

        {headerStage === 'container' && (
          <div className="border border-amber-200 bg-amber-50/30 rounded-2xl p-4 text-center min-h-[104px] flex flex-col items-center justify-center gap-1.5 craft-fade-in select-none">
            <span className="text-[10px] font-mono text-amber-700 font-semibold">
              [Kotak Header Amplop Siap Diketik...]
            </span>
            <span className="inline-block w-1.5 h-4 bg-amber-500 animate-pulse" />
          </div>
        )}

        {(headerStage === 'typing' || headerStage === 'verified') && (
          <div className="text-center space-y-2 craft-fade-in">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold uppercase tracking-wider border border-teal-200 craft-pop-in">
              <CreditCard className="w-3.5 h-3.5 text-teal-700" />
              <span>Tanda Kasih Digital</span>
            </div>
            <h2 className="text-2xl font-serif text-stone-900 font-bold">
              {headerStage === 'typing'
                ? sliceByProgress(headerTitle, Math.min(1, typingProgress * 2.2))
                : headerTitle}
              {headerStage === 'typing' && typingProgress < 0.45 && (
                <span className="inline-block w-1.5 h-5 bg-amber-600 ml-1 animate-pulse" />
              )}
            </h2>
            <p className="text-xs text-stone-600 max-w-xs mx-auto leading-relaxed">
              {headerStage === 'typing'
                ? typingProgress > 0.35
                  ? sliceByProgress(headerDesc, (typingProgress - 0.35) / 0.65)
                  : ''
                : headerDesc}
              {headerStage === 'typing' && typingProgress >= 0.35 && (
                <span className="inline-block w-1.5 h-3.5 bg-amber-600 ml-0.5 animate-pulse" />
              )}
            </p>
          </div>
        )}
      </div>

      {/* 19. Daftar Rekening Bank (BCA & Mandiri) */}
      <div data-craft-id={bankCardCraftId} className="min-h-[260px]">
        {bankStage === 'wireframe' && (
          <div className="border border-dashed border-stone-300 rounded-2xl p-6 text-center text-xs text-stone-400 italic bg-stone-50/50 min-h-[250px] flex items-center justify-center select-none">
            [Frame Kartu Rekening Bank BCA &amp; Mandiri]
          </div>
        )}

        {bankStage === 'container' && (
          <div className="space-y-3.5 craft-fade-in select-none">
            {bankAccounts.map((acc) => (
              <div
                key={acc.id}
                className="bg-white rounded-2xl p-4 border border-amber-300/80 shadow-xs min-h-[120px] flex flex-col justify-center items-center gap-1.5"
              >
                <span className="text-[10px] font-mono text-amber-700 font-semibold">
                  [Kotak Rekening {acc.bankName} Siap Diisi...]
                </span>
                <span className="inline-block w-1.5 h-4 bg-amber-500 animate-pulse" />
              </div>
            ))}
          </div>
        )}

        {(bankStage === 'typing' || bankStage === 'verified') && (
          <div className="space-y-3.5 craft-fade-in">
            {bankAccounts.map((account, idx) => {
              const isCopied = copiedId === account.id;
              const cardProgress =
                bankStage === 'verified'
                  ? 1
                  : idx === 0
                  ? Math.min(1, typingProgress * 1.8)
                  : Math.max(0, Math.min(1, (typingProgress - 0.45) / 0.55));

              return (
                <div
                  key={account.id}
                  className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs relative overflow-hidden transition-all hover:shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm tracking-wide text-teal-800 uppercase">
                      {bankStage === 'typing'
                        ? sliceByProgress(account.bankName, Math.min(1, cardProgress * 2.5))
                        : account.bankName}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-stone-600 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Terverifikasi
                    </span>
                  </div>

                  <div className="text-xs text-stone-500 mb-1">Nomor Rekening:</div>
                  <div className="flex items-center justify-between bg-stone-50 rounded-xl px-3 py-2 border border-stone-200">
                    <span className="font-mono font-bold text-stone-900 tracking-wider text-base select-all">
                      {bankStage === 'typing'
                        ? cardProgress > 0.2
                          ? sliceByProgress(account.accountNumber, (cardProgress - 0.2) / 0.45)
                          : '...'
                        : account.accountNumber}
                      {bankStage === 'typing' && cardProgress > 0.2 && cardProgress < 0.65 && (
                        <span className="inline-block w-1.5 h-4 bg-teal-700 ml-0.5 animate-pulse" />
                      )}
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
                    Atas Nama:{' '}
                    <strong className="text-stone-900">
                      {bankStage === 'typing'
                        ? cardProgress > 0.6
                          ? sliceByProgress(account.accountHolder, (cardProgress - 0.6) / 0.4)
                          : ''
                        : account.accountHolder}
                      {bankStage === 'typing' && cardProgress >= 0.6 && cardProgress < 1 && (
                        <span className="inline-block w-1.5 h-3.5 bg-amber-600 ml-0.5 animate-pulse" />
                      )}
                    </strong>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 20. Bagian QRIS Merchant */}
      {qrisImageUrl && (
        <div data-craft-id={qrisCardCraftId} className="mt-5 min-h-[240px]">
          {qrisStage === 'wireframe' && (
            <div className="border border-dashed border-stone-300 rounded-2xl p-6 text-center text-xs text-stone-400 italic bg-stone-50/50 min-h-[240px] flex items-center justify-center select-none">
              [Frame Barcode QRIS Merchant]
            </div>
          )}

          {qrisStage === 'container' && (
            <div className="bg-amber-50/30 rounded-2xl p-6 border border-amber-300 text-center min-h-[240px] flex flex-col items-center justify-center gap-2 craft-fade-in select-none">
              <QrCode className="w-7 h-7 text-amber-600 animate-pulse" />
              <span className="text-[10px] font-mono text-amber-800 font-semibold">
                [Kotak Barcode QRIS Siap Disematkan...]
              </span>
            </div>
          )}

          {(qrisStage === 'typing' || qrisStage === 'verified') && (
            <div className="bg-gradient-to-b from-stone-50 to-white rounded-2xl p-4 border border-stone-200 shadow-xs text-center craft-pop-in">
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
                NMID terdaftar resmi atas nama{' '}
                <strong>
                  {qrisStage === 'typing'
                    ? sliceByProgress(qrisHolderName, typingProgress)
                    : qrisHolderName}
                  {qrisStage === 'typing' && (
                    <span className="inline-block w-1.5 h-3 bg-amber-600 ml-0.5 animate-pulse" />
                  )}
                </strong>
              </p>
            </div>
          )}
        </div>
      )}

      {/* Modal Perbesar QRIS */}
      {isQrModalOpen && qrisImageUrl && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 craft-fade-in"
          onClick={() => setIsQrModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-sm w-full p-5 text-center relative shadow-2xl craft-pop-in"
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
