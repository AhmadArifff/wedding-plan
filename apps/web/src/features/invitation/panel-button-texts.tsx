'use client';

import * as React from 'react';
import type { FullInvitationConfig } from '@nikahplan/db';
import {
  MousePointerClick,
  Copy,
  Calendar,
  MapPin,
  Send,
  Building2,
  Gift,
  Check,
} from 'lucide-react';

interface PanelButtonTextsProps {
  config: FullInvitationConfig;
  onChange: (updater: (prev: FullInvitationConfig) => FullInvitationConfig) => void;
}

export const PanelButtonTexts: React.FC<PanelButtonTextsProps> = ({ config, onChange }) => {
  return (
    <div className="space-y-4">
      {/* 1. KUSTOMISASI TEKS TOMBOL CTA */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
          <MousePointerClick className="w-4 h-4 text-teal-800" />
          <div>
            <h4 className="font-serif font-bold text-sm text-stone-900">
              Kustomisasi Teks Tombol (Button Labels)
            </h4>
            <p className="text-[11px] text-stone-500">
              Ubah label teks pada tombol aksi interaktif di seluruh halaman undangan.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Tombol Buka Undangan */}
          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              Tombol Buka Undangan (Cover)
            </label>
            <input
              type="text"
              value={config.buttonTexts.openCoverButton}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  buttonTexts: { ...prev.buttonTexts, openCoverButton: e.target.value },
                }))
              }
              className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800"
              placeholder="Buka Undangan"
            />
          </div>

          {/* Tombol Simpan Kalender */}
          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              Tombol Simpan ke Kalender
            </label>
            <input
              type="text"
              value={config.buttonTexts.addToCalendarButton}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  buttonTexts: { ...prev.buttonTexts, addToCalendarButton: e.target.value },
                }))
              }
              className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800"
              placeholder="Simpan ke Kalender"
            />
          </div>

          {/* Tombol Petunjuk Arah Maps */}
          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              Tombol Petunjuk Arah Google Maps
            </label>
            <input
              type="text"
              value={config.buttonTexts.openMapsButton}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  buttonTexts: { ...prev.buttonTexts, openMapsButton: e.target.value },
                }))
              }
              className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800"
              placeholder="Petunjuk Arah Google Maps"
            />
          </div>

          {/* Tombol Salin Nomor Rekening */}
          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              Tombol Salin Rekening Bank
            </label>
            <input
              type="text"
              value={config.buttonTexts.copyAccountButton}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  buttonTexts: { ...prev.buttonTexts, copyAccountButton: e.target.value },
                }))
              }
              className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800"
              placeholder="Salin"
            />
          </div>

          {/* Tombol Notifikasi Tersalin */}
          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              Teks Notifikasi Tersalin
            </label>
            <input
              type="text"
              value={config.buttonTexts.accountCopiedButton}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  buttonTexts: { ...prev.buttonTexts, accountCopiedButton: e.target.value },
                }))
              }
              className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800"
              placeholder="Tersalin!"
            />
          </div>

          {/* Tombol Kirim Doa Restu */}
          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              Tombol Form Ucapan &amp; RSVP
            </label>
            <input
              type="text"
              value={config.buttonTexts.sendRsvpButton}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  buttonTexts: { ...prev.buttonTexts, sendRsvpButton: e.target.value },
                }))
              }
              className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800"
              placeholder="Kirim Doa Restu"
            />
          </div>
        </div>
      </div>

      {/* 2. REKENING BANK & ALAMAT KADO FISIK */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
          <Building2 className="w-4 h-4 text-amber-700" />
          <div>
            <h4 className="font-serif font-bold text-sm text-stone-900">
              Data Rekening Bank &amp; Alamat Pengiriman Kado
            </h4>
            <p className="text-[11px] text-stone-500">
              Atur nomor rekening tujuan transfer dan alamat pengiriman kado fisik bagi para tamu.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {config.envelopes.bankAccounts.map((acc, index) => (
            <div
              key={acc.id}
              className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2.5"
            >
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-900">
                Rekening #{index + 1}: {acc.bankName}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div>
                  <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                    Nama Bank
                  </label>
                  <input
                    type="text"
                    value={acc.bankName}
                    onChange={(e) => {
                      const val = e.target.value;
                      onChange((prev) => ({
                        ...prev,
                        envelopes: {
                          ...prev.envelopes,
                          bankAccounts: prev.envelopes.bankAccounts.map((a) =>
                            a.id === acc.id ? { ...a, bankName: val } : a
                          ),
                        },
                      }));
                    }}
                    className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-1.5 text-stone-800"
                    placeholder="Bank Mandiri"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                    Nomor Rekening
                  </label>
                  <input
                    type="text"
                    value={acc.accountNumber}
                    onChange={(e) => {
                      const val = e.target.value;
                      onChange((prev) => ({
                        ...prev,
                        envelopes: {
                          ...prev.envelopes,
                          bankAccounts: prev.envelopes.bankAccounts.map((a) =>
                            a.id === acc.id ? { ...a, accountNumber: val } : a
                          ),
                        },
                      }));
                    }}
                    className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-1.5 text-stone-800 font-mono font-bold"
                    placeholder="1370019283746"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                    Atas Nama Rekening
                  </label>
                  <input
                    type="text"
                    value={acc.accountHolder}
                    onChange={(e) => {
                      const val = e.target.value;
                      onChange((prev) => ({
                        ...prev,
                        envelopes: {
                          ...prev.envelopes,
                          bankAccounts: prev.envelopes.bankAccounts.map((a) =>
                            a.id === acc.id ? { ...a, accountHolder: val } : a
                          ),
                        },
                      }));
                    }}
                    className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-1.5 text-stone-800"
                    placeholder="a.n Ahmad Arif Fauzi"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Alamat Pengiriman Kado Fisik */}
          <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200/80 space-y-2.5">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 flex items-center gap-1 w-max">
              <Gift className="w-3 h-3 text-amber-700" />
              <span>Alamat Pengiriman Kado Fisik</span>
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                  Nama Penerima
                </label>
                <input
                  type="text"
                  value={config.envelopes.giftAddress.recipientName}
                  onChange={(e) => {
                    const val = e.target.value;
                    onChange((prev) => ({
                      ...prev,
                      envelopes: {
                        ...prev.envelopes,
                        giftAddress: { ...prev.envelopes.giftAddress, recipientName: val },
                      },
                    }));
                  }}
                  className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-1.5 text-stone-800"
                  placeholder="Arif & Windi"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                  Nomor Telepon / WhatsApp
                </label>
                <input
                  type="text"
                  value={config.envelopes.giftAddress.phoneNumber}
                  onChange={(e) => {
                    const val = e.target.value;
                    onChange((prev) => ({
                      ...prev,
                      envelopes: {
                        ...prev.envelopes,
                        giftAddress: { ...prev.envelopes.giftAddress, phoneNumber: val },
                      },
                    }));
                  }}
                  className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-1.5 text-stone-800 font-mono"
                  placeholder="0812-3456-7890"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                Alamat Lengkap Rumah / Resepsi
              </label>
              <textarea
                rows={2}
                value={config.envelopes.giftAddress.fullAddress}
                onChange={(e) => {
                  const val = e.target.value;
                  onChange((prev) => ({
                    ...prev,
                    envelopes: {
                      ...prev.envelopes,
                      giftAddress: { ...prev.envelopes.giftAddress, fullAddress: val },
                    },
                  }));
                }}
                className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3 py-1.5 text-stone-800"
                placeholder="Jl. Palagan Tentara Pelajar No. 88, Sariharjo, Ngaglik"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
