'use client';

import * as React from 'react';
import { Store, Phone, CheckCircle, RefreshCw, XCircle, Search, Clock, ArrowRight, Instagram } from 'lucide-react';
import { formatRupiah } from '@nikahplan/ui';
import type { Vendor, VendorStatus } from '@nikahplan/db';

export interface VendorMatrixProps {
  vendors: Vendor[];
  onSyncDealToBudget?: (vendor: Vendor) => void;
  onStatusChange?: (vendorId: string, newStatus: VendorStatus) => void;
}

const statusBadges: Record<
  VendorStatus,
  { label: string; bg: string; text: string; icon: React.FC<{ className?: string }> }
> = {
  CANDIDATE: {
    label: 'Kandidat',
    bg: 'bg-stone-100',
    text: 'text-stone-700',
    icon: Search,
  },
  DISCUSSION: {
    label: 'Diskusi & Nego',
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    icon: Clock,
  },
  DEAL: {
    label: 'Deal / Sepakat',
    bg: 'bg-emerald-50',
    text: 'text-emerald-800',
    icon: CheckCircle,
  },
  REJECTED: {
    label: 'Ditolak',
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    icon: XCircle,
  },
  ARCHIVED: {
    label: 'Diarsipkan',
    bg: 'bg-stone-100',
    text: 'text-stone-500',
    icon: Clock,
  },
};

export const VendorMatrix: React.FC<VendorMatrixProps> = ({
  vendors,
  onSyncDealToBudget,
  onStatusChange,
}) => {
  const [filterStatus, setFilterStatus] = React.useState<string>('ALL');
  const [syncedVendorId, setSyncedVendorId] = React.useState<string | null>(null);

  const filteredVendors = React.useMemo(() => {
    if (filterStatus === 'ALL') return vendors;
    return vendors.filter((v) => v.selectionStatus === filterStatus);
  }, [vendors, filterStatus]);

  const dealVendors = React.useMemo(() => {
    return vendors.filter((v) => v.selectionStatus === 'DEAL');
  }, [vendors]);

  const totalDealCost = React.useMemo(() => {
    return dealVendors.reduce((acc, curr) => acc + curr.quotedPrice, 0);
  }, [dealVendors]);

  const handleSyncDeal = (vendor: Vendor) => {
    onSyncDealToBudget?.(vendor);
    setSyncedVendorId(vendor.id);
    setTimeout(() => setSyncedVendorId(null), 2500);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
      {/* Header Panel */}
      <div className="p-4 sm:p-5 border-b border-stone-200 bg-stone-50/70">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-teal-100 text-teal-800 rounded-xl">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 font-serif">
                Decision Matrix Vendor Pernikahan
              </h3>
              <p className="text-xs text-stone-500">
                Lacak perbandingan vendor dari status kandidat, negosiasi, hingga kontrak deal dan integrasi biaya ke anggaran.
              </p>
            </div>
          </div>

          {/* Deal Summary Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-100/80 text-emerald-900 text-xs font-semibold self-start sm:self-center">
            <CheckCircle className="w-4 h-4 text-emerald-700" />
            <span>{dealVendors.length} Vendor Deal: {formatRupiah(totalDealCost)}</span>
          </div>
        </div>

        {/* Filter Tab Status */}
        <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            type="button"
            onClick={() => setFilterStatus('ALL')}
            className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all cursor-pointer ${
              filterStatus === 'ALL'
                ? 'bg-stone-900 text-white font-semibold shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:text-stone-900'
            }`}
          >
            Semua ({vendors.length})
          </button>
          {(Object.keys(statusBadges) as VendorStatus[]).map((statusKey) => {
            const badge = statusBadges[statusKey];
            const count = vendors.filter((v) => v.selectionStatus === statusKey).length;
            const Icon = badge.icon;
            return (
              <button
                key={statusKey}
                type="button"
                onClick={() => setFilterStatus(statusKey)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all cursor-pointer ${
                  filterStatus === statusKey
                    ? 'bg-stone-900 text-white font-semibold shadow-xs'
                    : `${badge.bg} ${badge.text} hover:opacity-80`
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{badge.label} ({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Kartu Vendor (Mobile-First Responsive) */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredVendors.map((vendor) => {
          const badge = statusBadges[vendor.selectionStatus];
          const Icon = badge.icon;
          const isDeal = vendor.selectionStatus === 'DEAL';
          const isSynced = syncedVendorId === vendor.id;

          return (
            <div
              key={vendor.id}
              className={`rounded-2xl p-4 border transition-all flex flex-col justify-between ${
                isDeal
                  ? 'border-emerald-300 bg-emerald-50/20 shadow-xs'
                  : 'border-stone-200 bg-white hover:border-stone-300'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[11px] font-semibold text-teal-800 uppercase tracking-wider bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-100">
                    Vendor
                  </span>
                  <div
                    className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${badge.bg} ${badge.text}`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{badge.label}</span>
                  </div>
                </div>

                <h4 className="font-bold text-stone-900 text-sm">{vendor.vendorName}</h4>
                {vendor.contactInfo && (
                  <p className="text-xs text-stone-500 mt-0.5 flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {vendor.contactInfo}
                  </p>
                )}
                {vendor.instagramHandle && (
                  <p className="text-xs text-teal-700 mt-0.5 flex items-center gap-1">
                    <Instagram className="w-3 h-3" />
                    {vendor.instagramHandle}
                  </p>
                )}

                {/* Rating & Comparison Notes */}
                {vendor.comparisonNotes && (
                  <p className="text-xs text-stone-600 mt-2 bg-stone-50 p-2 rounded-lg border border-stone-100">
                    {vendor.comparisonNotes}
                  </p>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100">
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="text-stone-500">
                    {isDeal ? 'Harga Deal:' : 'Penawaran:'}
                  </span>
                  <span className="font-mono font-bold text-stone-900 text-sm">
                    {formatRupiah(vendor.quotedPrice)}
                  </span>
                </div>

                {/* Tombol Aksi */}
                <div className="flex items-center gap-2">
                  {isDeal ? (
                    <button
                      type="button"
                      onClick={() => handleSyncDeal(vendor)}
                      className={`w-full min-h-[38px] inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isSynced
                          ? 'bg-emerald-600 text-white'
                          : 'bg-emerald-700 hover:bg-emerald-800 text-white active:scale-95'
                      }`}
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isSynced ? 'animate-spin' : ''}`} />
                      <span>{isSynced ? 'Tersinkron ke Anggaran' : 'Sync ke Master Anggaran'}</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onStatusChange?.(vendor.id, 'DEAL')}
                      className="w-full min-h-[38px] inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-stone-100 hover:bg-stone-200 text-stone-800 transition-all cursor-pointer"
                    >
                      <span>Jadikan Deal</span>
                      <ArrowRight className="w-3.5 h-3.5 text-stone-500" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
