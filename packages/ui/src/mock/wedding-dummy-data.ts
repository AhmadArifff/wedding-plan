import type {
  Workspace,
  WorkspaceSubscription,
  BudgetCategory,
  BudgetItem,
  Vendor,
  KitchenConfig,
  KitchenItem,
  SavingsPlan,
  Invitation,
  InvitationEnvelope,
  RsvpWish,
  MasterGoldPrice,
  MasterCategory,
  WorkspaceFinancialSummaryView,
} from '@nikahplan/db';

export const DUMMY_WORKSPACE: Workspace = {
  id: 'ws-nikahplan-arif-siti',
  ownerId: 'usr-arif-01',
  weddingTitle: 'Pernikahan Arif & Siti',
  targetWeddingDate: '2027-11-14',
  createdAt: '2026-11-04T08:00:00Z',
};

export const DUMMY_SUBSCRIPTION: WorkspaceSubscription = {
  id: 'sub-ws-01',
  workspaceId: DUMMY_WORKSPACE.id,
  planStatus: 'PRO_TRIAL',
  trialStartsAt: '2026-11-04T08:00:00Z',
  trialEndsAt: '2026-12-04T08:00:00Z', // 30 Hari Trial
  proExpiresAt: null,
  rsvpQuotaLimit: -1, // Unlimited on PRO
};

export const DUMMY_GOLD_PRICE: MasterGoldPrice = {
  id: 'gold-20261104',
  pricePerGram: 1420000,
  effectiveDate: '2026-11-04',
  sourceNote: 'PT Antam Tbk - Butik Emas LM Menara Ravindo Jakarta',
  createdAt: '2026-11-04T02:00:00Z',
};

export const DUMMY_MASTER_CATEGORIES: MasterCategory[] = [
  { id: 'cat-01', name: '01. Seserahan & Mahar Pernikahan', slug: 'seserahan-mahar', iconName: 'Gift', defaultCeiling: 20000000, sortOrder: 1, isDefault: true },
  { id: 'cat-02', name: '02. Administrasi KUA & Pencatatan Sipil', slug: 'kua-administrasi', iconName: 'FileText', defaultCeiling: 1000000, sortOrder: 2, isDefault: true },
  { id: 'cat-03', name: '03. Sewa Venue / Gedung & Tenda Dekorasi', slug: 'venue-dekorasi', iconName: 'Home', defaultCeiling: 20000000, sortOrder: 3, isDefault: true },
  { id: 'cat-04', name: '04. Katering & Dapur Mandiri', slug: 'katering-dapur', iconName: 'Utensils', defaultCeiling: 20000000, sortOrder: 4, isDefault: true },
  { id: 'cat-05', name: '05. MUA (Rias Pengantin) & Busana', slug: 'mua-busana', iconName: 'Sparkles', defaultCeiling: 10000000, sortOrder: 5, isDefault: true },
  { id: 'cat-06', name: '06. Dokumentasi Foto, Video & Cinematic', slug: 'dokumentasi', iconName: 'Camera', defaultCeiling: 6000000, sortOrder: 6, isDefault: true },
  { id: 'cat-07', name: '07. Paket All-In (Venue + Catering)', slug: 'paket-all-in', iconName: 'Layers', defaultCeiling: 50000000, sortOrder: 7, isDefault: true },
  { id: 'cat-08', name: '08. Hiburan, Musik & Sound System', slug: 'hiburan-musik', iconName: 'Music', defaultCeiling: 4000000, sortOrder: 8, isDefault: true },
  { id: 'cat-09', name: '09. MC, Penghulu & Pengisi Acara', slug: 'mc-acara', iconName: 'Mic', defaultCeiling: 2000000, sortOrder: 9, isDefault: true },
  { id: 'cat-10', name: '10. Cincin Kawin & Perhiasan', slug: 'cincin-kawin', iconName: 'CircleDot', defaultCeiling: 7000000, sortOrder: 10, isDefault: true },
  { id: 'cat-11', name: '11. Undangan Cetak, Digital & Souvenir', slug: 'undangan-souvenir', iconName: 'Mail', defaultCeiling: 3500000, sortOrder: 11, isDefault: true },
  { id: 'cat-12', name: '12. Akomodasi, Transport & Panitia', slug: 'akomodasi-panitia', iconName: 'Truck', defaultCeiling: 3000000, sortOrder: 12, isDefault: true },
  { id: 'cat-13', name: '13. Perawatan Pra-Nikah & Kesehatan', slug: 'perawatan-kesehatan', iconName: 'HeartHandshake', defaultCeiling: 1500000, sortOrder: 13, isDefault: true },
  { id: 'cat-14', name: '14. Dana Darurat & Biaya Tak Terduga', slug: 'dana-darurat', iconName: 'ShieldAlert', defaultCeiling: 5000000, sortOrder: 14, isDefault: true },
];

export const DUMMY_BUDGET_CATEGORIES: BudgetCategory[] = DUMMY_MASTER_CATEGORIES.map(mc => ({
  id: `bc-${mc.id}`,
  workspaceId: DUMMY_WORKSPACE.id,
  masterCategoryId: mc.id,
  name: mc.name,
  sortOrder: mc.sortOrder,
  ceilingAmount: mc.defaultCeiling,
}));

export const DUMMY_BUDGET_ITEMS: BudgetItem[] = [
  // 01. Seserahan & Mahar
  {
    id: 'bi-01',
    workspaceId: DUMMY_WORKSPACE.id,
    categoryId: 'bc-cat-01',
    itemName: 'Mahar Emas Logam Mulia',
    quantity: 10,
    unitLabel: 'gram',
    unitPrice: 1350000, // Harga anggaran lama
    totalPrice: 13500000,
    isGoldMahar: true,
    goldWeightGrams: 10,
    priceSource: 'MANUAL',
    notes: 'Kadar 99.99% CertiCard Antam',
    updatedAt: '2026-11-04T08:00:00Z',
  },
  {
    id: 'bi-02',
    workspaceId: DUMMY_WORKSPACE.id,
    categoryId: 'bc-cat-01',
    itemName: 'Kotak Hantaran & Jasa Hias',
    quantity: 1,
    unitLabel: 'paket',
    unitPrice: 1500000,
    totalPrice: 1500000,
    isGoldMahar: false,
    priceSource: 'MANUAL',
    notes: '6 Baki akrilik tema sage gold',
    updatedAt: '2026-11-04T08:00:00Z',
  },
  {
    id: 'bi-03',
    workspaceId: DUMMY_WORKSPACE.id,
    categoryId: 'bc-cat-01',
    itemName: 'Isi Paket Seserahan & Kosmetik',
    quantity: 1,
    unitLabel: 'paket',
    unitPrice: 3200000,
    totalPrice: 3200000,
    isGoldMahar: false,
    priceSource: 'MANUAL',
    updatedAt: '2026-11-04T08:00:00Z',
  },

  // 02. KUA
  {
    id: 'bi-04',
    workspaceId: DUMMY_WORKSPACE.id,
    categoryId: 'bc-cat-02',
    itemName: 'Biaya Administrasi Nikah di Luar KUA',
    quantity: 1,
    unitLabel: 'kali',
    unitPrice: 600000,
    totalPrice: 600000,
    isGoldMahar: false,
    priceSource: 'MANUAL',
    notes: 'PNBP Kementerian Agama',
    updatedAt: '2026-11-04T08:00:00Z',
  },
  {
    id: 'bi-05',
    workspaceId: DUMMY_WORKSPACE.id,
    categoryId: 'bc-cat-02',
    itemName: 'Surat Pengantar & Materai',
    quantity: 1,
    unitLabel: 'paket',
    unitPrice: 150000,
    totalPrice: 150000,
    isGoldMahar: false,
    priceSource: 'MANUAL',
    updatedAt: '2026-11-04T08:00:00Z',
  },

  // 03. Venue & Gedung
  {
    id: 'bi-06',
    workspaceId: DUMMY_WORKSPACE.id,
    categoryId: 'bc-cat-03',
    linkedVendorId: 'ven-02',
    itemName: 'Sewa Gedung Graha Sakinah (Akad & Resepsi)',
    quantity: 1,
    unitLabel: 'hari',
    unitPrice: 15000000,
    totalPrice: 15000000,
    isGoldMahar: false,
    priceSource: 'VENDOR_SYNC',
    notes: 'Termasuk listrik 10.000W & AC Standing 6 unit',
    updatedAt: '2026-11-04T08:00:00Z',
  },

  // 04. Katering & Dapur Mandiri
  {
    id: 'bi-07',
    workspaceId: DUMMY_WORKSPACE.id,
    categoryId: 'bc-cat-04',
    itemName: 'Belanja Bahan Pokok Dapur Mandiri (600 Porsi)',
    quantity: 1,
    unitLabel: 'paket',
    unitPrice: 13620000,
    totalPrice: 13620000,
    isGoldMahar: false,
    priceSource: 'MANUAL',
    notes: 'Diambil dari rincian Kalkulator Dapur',
    updatedAt: '2026-11-04T08:00:00Z',
  },

  // 05. MUA & Busana
  {
    id: 'bi-08',
    workspaceId: DUMMY_WORKSPACE.id,
    categoryId: 'bc-cat-05',
    linkedVendorId: 'ven-01',
    itemName: 'Paket Rias Pengantin, Resepsi & 2 Ibu',
    quantity: 1,
    unitLabel: 'paket',
    unitPrice: 8500000,
    totalPrice: 8500000,
    isGoldMahar: false,
    priceSource: 'VENDOR_SYNC',
    notes: 'Sanggar Rias Ayu - Sudah Deal',
    updatedAt: '2026-11-04T08:00:00Z',
  },

  // 06. Dokumentasi
  {
    id: 'bi-09',
    workspaceId: DUMMY_WORKSPACE.id,
    categoryId: 'bc-cat-06',
    linkedVendorId: 'ven-03',
    itemName: 'Foto, Video Cinematic & Teaser 1 Menit',
    quantity: 1,
    unitLabel: 'paket',
    unitPrice: 4500000,
    totalPrice: 4500000,
    isGoldMahar: false,
    priceSource: 'VENDOR_SYNC',
    notes: 'Lensa Cinta Wedding',
    updatedAt: '2026-11-04T08:00:00Z',
  },

  // 08. Hiburan Musik
  {
    id: 'bi-10',
    workspaceId: DUMMY_WORKSPACE.id,
    categoryId: 'bc-cat-08',
    itemName: 'Akustik Islami & Sound System 5000W',
    quantity: 1,
    unitLabel: 'paket',
    unitPrice: 3000000,
    totalPrice: 3000000,
    isGoldMahar: false,
    priceSource: 'MANUAL',
    updatedAt: '2026-11-04T08:00:00Z',
  },

  // 09. MC
  {
    id: 'bi-11',
    workspaceId: DUMMY_WORKSPACE.id,
    categoryId: 'bc-cat-09',
    linkedVendorId: 'ven-05',
    itemName: 'MC Akad & Resepsi (Bilingual)',
    quantity: 1,
    unitLabel: 'orang',
    unitPrice: 1200000,
    totalPrice: 1200000,
    isGoldMahar: false,
    priceSource: 'VENDOR_SYNC',
    updatedAt: '2026-11-04T08:00:00Z',
  },

  // 10. Cincin Kawin
  {
    id: 'bi-12',
    workspaceId: DUMMY_WORKSPACE.id,
    categoryId: 'bc-cat-10',
    itemName: 'Sepasang Cincin Emas Putih & Palladium',
    quantity: 1,
    unitLabel: 'pasang',
    unitPrice: 6500000,
    totalPrice: 6500000,
    isGoldMahar: false,
    priceSource: 'MANUAL',
    updatedAt: '2026-11-04T08:00:00Z',
  },

  // 11. Undangan & Souvenir
  {
    id: 'bi-13',
    workspaceId: DUMMY_WORKSPACE.id,
    categoryId: 'bc-cat-11',
    itemName: 'Souvenir Pouch Kanvas & Kemasan',
    quantity: 300,
    unitLabel: 'pcs',
    unitPrice: 6500,
    totalPrice: 1950000,
    isGoldMahar: false,
    priceSource: 'MANUAL',
    updatedAt: '2026-11-04T08:00:00Z',
  },
  {
    id: 'bi-14',
    workspaceId: DUMMY_WORKSPACE.id,
    categoryId: 'bc-cat-11',
    itemName: 'Undangan Digital NikahPlan Studio Pro',
    quantity: 1,
    unitLabel: 'paket',
    unitPrice: 0,
    totalPrice: 0,
    isGoldMahar: false,
    priceSource: 'MANUAL',
    notes: 'Gratis fitur Pro Trial 30 Hari',
    updatedAt: '2026-11-04T08:00:00Z',
  },

  // 12. Akomodasi
  {
    id: 'bi-15',
    workspaceId: DUMMY_WORKSPACE.id,
    categoryId: 'bc-cat-12',
    itemName: 'Sewa HiAce Antar Jemput Keluarga',
    quantity: 1,
    unitLabel: 'unit',
    unitPrice: 1500000,
    totalPrice: 1500000,
    isGoldMahar: false,
    priceSource: 'MANUAL',
    updatedAt: '2026-11-04T08:00:00Z',
  },
  {
    id: 'bi-16',
    workspaceId: DUMMY_WORKSPACE.id,
    categoryId: 'bc-cat-12',
    itemName: 'Konsumsi Rapat Panitia Keluarga (3x)',
    quantity: 3,
    unitLabel: 'kali',
    unitPrice: 350000,
    totalPrice: 1050000,
    isGoldMahar: false,
    priceSource: 'MANUAL',
    updatedAt: '2026-11-04T08:00:00Z',
  },

  // 13. Kesehatan
  {
    id: 'bi-17',
    workspaceId: DUMMY_WORKSPACE.id,
    categoryId: 'bc-cat-13',
    itemName: 'Pemeriksaan Kesehatan Pra-Nikah & Vaksin TT',
    quantity: 2,
    unitLabel: 'orang',
    unitPrice: 250000,
    totalPrice: 500000,
    isGoldMahar: false,
    priceSource: 'MANUAL',
    updatedAt: '2026-11-04T08:00:00Z',
  },

  // 14. Dana Darurat
  {
    id: 'bi-18',
    workspaceId: DUMMY_WORKSPACE.id,
    categoryId: 'bc-cat-14',
    itemName: 'Alokasi Cadangan Tak Terduga Hari-H',
    quantity: 1,
    unitLabel: 'paket',
    unitPrice: 5000000,
    totalPrice: 5000000,
    isGoldMahar: false,
    priceSource: 'MANUAL',
    updatedAt: '2026-11-04T08:00:00Z',
  },
];

export const DUMMY_VENDORS: Vendor[] = [
  {
    id: 'ven-01',
    workspaceId: DUMMY_WORKSPACE.id,
    categoryId: 'bc-cat-05',
    vendorName: 'Sanggar Rias Ayu Wedding',
    quotedPrice: 8500000,
    selectionStatus: 'DEAL',
    comparisonNotes: 'Termasuk busana resepsi adat Sunda siger lengkap + melati fresh',
    contactInfo: '0812-9988-7766 (Mbak Ayu)',
    instagramHandle: '@sanggarriasayu',
    updatedAt: '2026-11-04T08:00:00Z',
  },
  {
    id: 'ven-02',
    workspaceId: DUMMY_WORKSPACE.id,
    categoryId: 'bc-cat-03',
    vendorName: 'Gedung Graha Sakinah Convention',
    quotedPrice: 15000000,
    selectionStatus: 'DEAL',
    comparisonNotes: 'Kapasitas 800 orang, parkir luas, gratis transit kamar rias',
    contactInfo: '0813-2233-4455 (Pengelola)',
    updatedAt: '2026-11-04T08:00:00Z',
  },
  {
    id: 'ven-03',
    workspaceId: DUMMY_WORKSPACE.id,
    categoryId: 'bc-cat-06',
    vendorName: 'Lensa Cinta Photography',
    quotedPrice: 4500000,
    selectionStatus: 'DEAL',
    comparisonNotes: '2 Fotografer, 1 Videografer, Album cetak magnetik 20x30, Flashdisk all files',
    contactInfo: '0857-1122-3344',
    instagramHandle: '@lensacintawedding',
    updatedAt: '2026-11-04T08:00:00Z',
  },
  {
    id: 'ven-04',
    workspaceId: DUMMY_WORKSPACE.id,
    categoryId: 'bc-cat-04',
    vendorName: 'Catering Berkah Barokah',
    quotedPrice: 18000000,
    selectionStatus: 'DISCUSSION',
    comparisonNotes: 'Penawaran 500 porsi prasmanan, tapi sedang dipertimbangkan opsi masak mandiri keluarga',
    contactInfo: '0821-4455-6677',
    updatedAt: '2026-11-04T08:00:00Z',
  },
  {
    id: 'ven-05',
    workspaceId: DUMMY_WORKSPACE.id,
    categoryId: 'bc-cat-09',
    vendorName: 'MC Ustadz Fauzan Al-Hafidz',
    quotedPrice: 1200000,
    selectionStatus: 'DEAL',
    comparisonNotes: 'Memandu akad khidmat dan resepsi ramah keluarga',
    contactInfo: '0818-7766-5544',
    updatedAt: '2026-11-04T08:00:00Z',
  },
  {
    id: 'ven-06',
    workspaceId: DUMMY_WORKSPACE.id,
    categoryId: 'bc-cat-07',
    vendorName: 'Maharani Wedding Organizer (All-In Package)',
    quotedPrice: 52000000,
    selectionStatus: 'CANDIDATE',
    comparisonNotes: 'Paket All-in venue + katering 500 porsi + dekorasi + rias. Sedang diuji banding efisiensinya.',
    contactInfo: '0811-3322-1100',
    updatedAt: '2026-11-04T08:00:00Z',
  },
];

export const DUMMY_KITCHEN_CONFIG: KitchenConfig = {
  id: 'kc-01',
  workspaceId: DUMMY_WORKSPACE.id,
  maleGuests: 150,
  femaleGuests: 150,
  portionMultiplier: 2.0,
  totalGuests: 300,
  totalPortions: 600,
};

export const DUMMY_KITCHEN_ITEMS: KitchenItem[] = [
  {
    id: 'ki-01',
    workspaceId: DUMMY_WORKSPACE.id,
    kitchenConfigId: DUMMY_KITCHEN_CONFIG.id,
    ingredientName: 'Beras Kualitas Super (Pandan Wangi)',
    quantity: 100,
    unitLabel: 'kg',
    unitPrice: 15000,
    subtotal: 1500000,
    notes: 'Pasar Induk Cipinang',
    sortOrder: 1,
  },
  {
    id: 'ki-02',
    workspaceId: DUMMY_WORKSPACE.id,
    kitchenConfigId: DUMMY_KITCHEN_CONFIG.id,
    ingredientName: 'Daging Sapi Segar (Rendang / Semur)',
    quantity: 45,
    unitLabel: 'kg',
    unitPrice: 1350000,
    subtotal: 6075000,
    notes: 'Potong segar H-1 subuh',
    sortOrder: 2,
  },
  {
    id: 'ki-03',
    workspaceId: DUMMY_WORKSPACE.id,
    kitchenConfigId: DUMMY_KITCHEN_CONFIG.id,
    ingredientName: 'Daging Ayam Potong (Ayam Bumbu Kuning)',
    quantity: 60,
    unitLabel: 'ekor',
    unitPrice: 38000,
    subtotal: 2280000,
    notes: 'Ukuran 1.2 kg per ekor',
    sortOrder: 3,
  },
  {
    id: 'ki-04',
    workspaceId: DUMMY_WORKSPACE.id,
    kitchenConfigId: DUMMY_KITCHEN_CONFIG.id,
    ingredientName: 'Bumbu Dapur, Sayur & Santan Segar',
    quantity: 1,
    unitLabel: 'paket',
    unitPrice: 1765000,
    subtotal: 1765000,
    notes: 'Bawang merah/putih, cabai, santan murni 40 butir kelapa',
    sortOrder: 4,
  },
  {
    id: 'ki-05',
    workspaceId: DUMMY_WORKSPACE.id,
    kitchenConfigId: DUMMY_KITCHEN_CONFIG.id,
    ingredientName: 'Minyak Goreng & Gas LPG 12kg',
    quantity: 1,
    unitLabel: 'paket',
    unitPrice: 600000,
    subtotal: 600000,
    notes: 'Minyak 2 jerigen 18L + 3 tabung gas',
    sortOrder: 5,
  },
  {
    id: 'ki-06',
    workspaceId: DUMMY_WORKSPACE.id,
    kitchenConfigId: DUMMY_KITCHEN_CONFIG.id,
    ingredientName: 'Buah Semangka, Kerupuk Udang & Es Konsumsi',
    quantity: 1,
    unitLabel: 'paket',
    unitPrice: 600000,
    subtotal: 600000,
    notes: 'Buah potong segar 600 porsi',
    sortOrder: 6,
  },
  {
    id: 'ki-07',
    workspaceId: DUMMY_WORKSPACE.id,
    kitchenConfigId: DUMMY_KITCHEN_CONFIG.id,
    ingredientName: 'Jasa Tukang Masak Berpengalaman & Tenaga Bantu',
    quantity: 1,
    unitLabel: 'tim',
    unitPrice: 800000,
    subtotal: 800000,
    notes: '4 Orang tenaga ahli masak hajatan',
    sortOrder: 7,
  },
];

export const DUMMY_SAVINGS_PLAN: SavingsPlan = {
  id: 'sp-01',
  workspaceId: DUMMY_WORKSPACE.id,
  currentSavingsAmount: 36170000, // 44.5% terkumpul
  monthlySavingCapacity: 4500000, // Rp 4.5 Juta/bulan
  updatedAt: '2026-11-04T08:00:00Z',
};

export const DUMMY_INVITATION: Invitation = {
  id: 'inv-01',
  workspaceId: DUMMY_WORKSPACE.id,
  themeId: 'theme-botanical-sage',
  slug: 'arif-dan-siti',
  isPublished: true,
  groomNick: 'Arif',
  groomFullName: 'Ahmad Arif, S.Kom',
  groomParents: 'Bpk. H. Mahmud & Ibu Hj. Aminah',
  brideNick: 'Siti',
  brideFullName: 'Siti Rahmawati, S.Pd',
  brideParents: 'Bpk. Drs. H. Subagyo & Ibu Hj. Endang',
  akadDatetime: '2027-11-14T08:00:00',
  receptionDatetime: '2027-11-14T11:00:00',
  venueName: 'Graha Sakinah Convention Hall',
  venueAddress: 'Jl. Margonda Raya No. 88, Beji, Kota Depok, Jawa Barat',
  googleMapsUrl: 'https://maps.google.com/?q=-6.3728,106.8315',
  updatedAt: '2026-11-04T08:00:00Z',
};

export const DUMMY_ENVELOPES: InvitationEnvelope[] = [
  {
    id: 'env-01',
    invitationId: DUMMY_INVITATION.id,
    envelopeType: 'BANK_TRANSFER',
    bankName: 'Bank Central Asia (BCA)',
    accountNumber: '1234567890',
    accountHolderName: 'Ahmad Arif',
    isActive: true,
    sortOrder: 1,
  },
  {
    id: 'env-02',
    invitationId: DUMMY_INVITATION.id,
    envelopeType: 'BANK_TRANSFER',
    bankName: 'Bank Mandiri',
    accountNumber: '9876543210123',
    accountHolderName: 'Siti Rahmawati',
    isActive: true,
    sortOrder: 2,
  },
  {
    id: 'env-03',
    invitationId: DUMMY_INVITATION.id,
    envelopeType: 'QRIS_MERCHANT',
    accountHolderName: 'NikahPlan: Arif & Siti Wedding',
    qrisStoragePath: '/generated/qris-merchant-dummy.svg',
    isActive: true,
    sortOrder: 3,
  },
];

export const DUMMY_RSVP_WISHES: RsvpWish[] = [
  {
    id: 'wish-01',
    invitationId: DUMMY_INVITATION.id,
    guestName: 'Budi Santoso & Keluarga',
    attendanceStatus: 'ATTENDING',
    paxCount: 2,
    wishMessage: 'Barakallahu lakuma wa baraka alaikuma wa jamaa bainakuma fii khair. Selamat menempuh hidup baru untuk Mas Arif dan Mbak Siti, semoga menjadi keluarga sakinah mawaddah warahmah.',
    isApproved: true,
    createdAt: '2026-11-04T09:15:00Z',
  },
  {
    id: 'wish-02',
    invitationId: DUMMY_INVITATION.id,
    guestName: 'Dra. Hj. Nurul Hidayati',
    attendanceStatus: 'ATTENDING',
    paxCount: 1,
    wishMessage: 'Selamat atas pernikahan Ananda Arif dan Siti. Doa terbaik kami sekeluarga, semoga senantiasa dalam berkah dan lindungan Allah SWT.',
    isApproved: true,
    createdAt: '2026-11-04T09:45:00Z',
  },
  {
    id: 'wish-03',
    invitationId: DUMMY_INVITATION.id,
    guestName: 'Reza Pratama (Alumni TI)',
    attendanceStatus: 'ATTENDING',
    paxCount: 2,
    wishMessage: 'Happy wedding bro Arif! Lancar-lancar acaranya sampai hari H nanti. Ditunggu traktirannya!',
    isApproved: true,
    createdAt: '2026-11-04T10:20:00Z',
  },
];

/**
 * Calculated Top KPI Summary View for Arif & Siti
 */
export function getDummyFinancialSummary(): WorkspaceFinancialSummaryView {
  const totalBudget = DUMMY_BUDGET_ITEMS.reduce((sum, item) => sum + item.totalPrice, 0);
  const totalKitchen = DUMMY_KITCHEN_ITEMS.reduce((sum, item) => sum + item.subtotal, 0);
  const dealVendors = DUMMY_VENDORS.filter(v => v.selectionStatus === 'DEAL');
  const totalDealVendor = dealVendors.reduce((sum, v) => sum + v.quotedPrice, 0);
  
  // Gold Mahar calculation
  const goldMaharItem = DUMMY_BUDGET_ITEMS.find(i => i.isGoldMahar);
  const goldVariance = goldMaharItem && goldMaharItem.goldWeightGrams
    ? (DUMMY_GOLD_PRICE.pricePerGram - goldMaharItem.unitPrice) * goldMaharItem.goldWeightGrams
    : 0;

  const totalGuests = DUMMY_KITCHEN_CONFIG.totalGuests;
  const kitchenPerGuest = totalGuests > 0 ? Math.round(totalKitchen / totalGuests) : 0;
  const deficit = Math.max(0, totalBudget - DUMMY_SAVINGS_PLAN.currentSavingsAmount);
  const savingMonths = Math.ceil(deficit / DUMMY_SAVINGS_PLAN.monthlySavingCapacity);

  return {
    workspaceId: DUMMY_WORKSPACE.id,
    weddingTitle: DUMMY_WORKSPACE.weddingTitle,
    targetWeddingDate: DUMMY_WORKSPACE.targetWeddingDate,
    totalBudgetAmount: totalBudget, // Rp 81.170.000
    goldMaharVarianceAmount: goldVariance, // +Rp 700.000
    latestGoldPricePerGram: DUMMY_GOLD_PRICE.pricePerGram, // Rp 1.420.000
    dealVendorCount: dealVendors.length,
    totalDealVendorAmount: totalDealVendor,
    totalGuests: totalGuests, // 300
    totalPortions: DUMMY_KITCHEN_CONFIG.totalPortions, // 600
    totalKitchenCost: totalKitchen, // Rp 13.620.000
    kitchenCostPerGuest: kitchenPerGuest, // Rp 45.400
    savingsDeficitAmount: deficit, // Rp 45.000.000
    estimatedSavingMonths: savingMonths, // 10 Bulan
    effectivePlanStatus: 'PRO_TRIAL',
    trialDaysRemaining: 28,
  };
}

