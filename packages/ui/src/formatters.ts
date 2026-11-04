/**
 * Financial & Date Formatters for NikahPlan Studio
 * Enforces Rule 31 (Pure Numeric Typography) and Human Localization.
 */

/**
 * Format pure numeric with dots as thousand separators.
 * MANDATORY FOR TABLE CELLS (td): Never include "Rp " prefix in data cells!
 * Example: 14200000 -> "14.200.000"
 */
export function formatPureNumeric(val: number | null | undefined): string {
  if (val === null || val === undefined || isNaN(val)) return '0';
  return Math.round(val).toLocaleString('id-ID');
}

/**
 * Format Rupiah with prefix for Top KPI Cards and headers only.
 * Example: 81170000 -> "Rp 81.170.000"
 */
export function formatRupiah(val: number | null | undefined): string {
  if (val === null || val === undefined || isNaN(val)) return 'Rp 0';
  return `Rp ${formatPureNumeric(val)}`;
}

/**
 * Format variance / difference with explicit + or - sign.
 * Example: 700000 -> "+Rp 700.000"
 * Example: -500000 -> "-Rp 500.000"
 */
export function formatRupiahDiff(val: number | null | undefined): string {
  if (val === null || val === undefined || isNaN(val)) return 'Rp 0';
  const sign = val > 0 ? '+Rp ' : val < 0 ? '-Rp ' : 'Rp ';
  return `${sign}${formatPureNumeric(Math.abs(val))}`;
}

/**
 * Format gram weight with 3 decimal precision if needed.
 * Example: 10 -> "10 gram"
 * Example: 10.5 -> "10,5 gram"
 */
export function formatGrams(grams: number | null | undefined): string {
  if (grams === null || grams === undefined || isNaN(grams)) return '0 gram';
  return `${grams.toLocaleString('id-ID', { maximumFractionDigits: 3 })} gram`;
}

/**
 * Format Indonesian date string.
 * Example: "2027-11-14" -> "14 November 2027"
 */
export function formatDateIndo(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/**
 * Format Indonesian date & time string.
 * Example: "2027-11-14T08:00:00" -> "14 November 2027, 08:00 WIB"
 */
export function formatDateTimeIndo(dateTimeStr: string): string {
  if (!dateTimeStr) return '';
  const date = new Date(dateTimeStr);
  if (isNaN(date.getTime())) return dateTimeStr;
  const dateFormatted = formatDateIndo(dateTimeStr);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${dateFormatted}, ${hours}:${minutes} WIB`;
}
