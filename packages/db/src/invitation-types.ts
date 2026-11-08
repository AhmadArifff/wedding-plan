/**
 * Invitation Content Data Contracts & Domain Types
 * Ground Truth: PRD.md, PRD-FRONTEND.md, PRD-BACKEND.md
 */

export interface InvitationHeroData {
  title: string; // e.g. "THE WEDDING OF"
  dateText: string; // e.g. "MINGGU, 14 NOVEMBER 2027"
  backgroundImageUrl: string; // Background photo with blend mode
  ornamentTopRightUrl: string;
  ornamentBottomLeftUrl: string;
  guestBoxLabel: string; // e.g. "Kepada Yth. Bapak/Ibu/Saudara/i:"
  guestNameDefault: string; // e.g. "Sahabat Terkasih"
  guestLocationDefault: string; // e.g. "Di Tempat"
}

export interface InvitationCoupleData {
  groomNickname: string; // e.g. "Arif"
  groomFullName: string; // e.g. "Ahmad Arif Fauzi, S.Kom."
  groomParents: string; // e.g. "Putra pertama dari Bpk. Bambang Supeno & Ibu Siti Aminah"
  groomPhotoUrl: string;
  groomInstagram?: string;

  brideNickname: string; // e.g. "Windi"
  brideFullName: string; // e.g. "Windi Astuti, S.Ds."
  brideParents: string; // e.g. "Putri kedua dari Bpk. Slamet Raharjo & Ibu Sri Mulyani"
  bridePhotoUrl: string;
  brideInstagram?: string;

  archCouplePhotoUrl: string; // Prominent arch silhouette couple photo
}

export interface InvitationQuoteData {
  greeting: string; // e.g. "Assalamu'alaikum Wr. Wb."
  introText: string; // e.g. "Tanpa mengurangi rasa hormat, kami bermaksud..."
  arabicText?: string;
  translationText: string;
  sourceText: string; // e.g. "QS. AR-RUM: 21"
}

export interface InvitationEventDetail {
  title: string; // e.g. "Akad Nikah" or "Resepsi Pernikahan"
  dayName: string; // e.g. "Minggu"
  dateFormatted: string; // e.g. "14 November 2027"
  isoDateTime: string; // e.g. "2027-11-14T08:00:00"
  timeRange: string; // e.g. "08.00 - 10.00 WIB"
  venueName: string; // e.g. "Pendopo Dalem Ngabean"
  venueAddress: string; // e.g. "Jl. Suryodiningratan No. 37, Mantrijeron, Yogyakarta"
  googleMapsUrl: string;
  googleCalendarUrl?: string;
  badgeLabel: string; // e.g. "AKAD NIKAH" or "RESEPSI MEWAH"
}

export interface InvitationEventsData {
  countdownTargetIso: string; // e.g. "2027-11-14T08:00:00"
  countdownTitle: string; // e.g. "Menuju Hari Bahagia"
  akad: InvitationEventDetail;
  reception: InvitationEventDetail;
}

export interface InvitationStoryItem {
  id: string;
  year: string; // e.g. "2022"
  title: string; // e.g. "Awal Pertemuan"
  description: string;
  iconName?: string; // Lucide icon name
}

export interface InvitationMemoryPhoto {
  id: string;
  src: string;
  caption: string;
  category: string;
  column: 'left' | 'right';
}

export interface InvitationBankAccount {
  id: string;
  bankName: string; // e.g. "Bank Mandiri"
  bankCode: string; // e.g. "MANDIRI"
  accountNumber: string; // e.g. "1370019283746"
  accountHolder: string; // e.g. "Ahmad Arif Fauzi"
  badgeColor?: string;
}

export interface InvitationEnvelopesData {
  sectionTitle: string; // e.g. "Tanda Kasih"
  sectionSubtitle: string; // e.g. "AMPLOP DIGITAL & KADO"
  descriptionText: string;
  bankAccounts: InvitationBankAccount[];
  qrisImageUrl: string;
  qrisMerchantName: string; // e.g. "ARIF & WINDI WEDDING"
  giftAddress: {
    recipientName: string;
    phoneNumber: string;
    fullAddress: string;
    cityPostal: string;
  };
}

export interface InvitationRsvpConfig {
  sectionTitle: string; // e.g. "Reservasi & Ucapan Doa"
  sectionSubtitle: string; // e.g. "KONFIRMASI KEHADIRAN"
  descriptionText: string;
  allowGuestWishes: boolean;
}

export interface InvitationButtonTexts {
  openCoverButton: string; // e.g. "Buka Undangan"
  addToCalendarButton: string; // e.g. "Simpan ke Kalender"
  openMapsButton: string; // e.g. "Petunjuk Arah Google Maps"
  copyAccountButton: string; // e.g. "Salin"
  accountCopiedButton: string; // e.g. "Tersalin!"
  sendRsvpButton: string; // e.g. "Kirim Doa Restu"
}

export interface InvitationIconsConfig {
  heroIcon: string; // default "Sparkles"
  quoteIcon: string; // default "Heart"
  coupleGroomIcon: string; // default "Crown"
  coupleBrideIcon: string; // default "Flower2"
  countdownIcon: string; // default "Clock"
  eventAkadIcon: string; // default "Calendar"
  eventReceptionIcon: string; // default "GlassWater"
  storyIcon: string; // default "BookHeart"
  memoriesIcon: string; // default "Camera"
  giftIcon: string; // default "Gift"
  rsvpIcon: string; // default "Send"
  musicIcon: string; // default "Music"
}

export interface InvitationSwarmSettings {
  speedMultiplier: number; // default 1.0
  confettiTheme: 'botanical-sage' | 'crimson-gold' | 'lavender-lilac' | 'golden-sunflower' | 'sakura-pastel';
  showCoverFirst: boolean;
}

export interface FullInvitationConfig {
  id: string;
  workspaceId: string;
  slug: string;
  isPublished: boolean;
  themeSlug: string;
  hero: InvitationHeroData;
  couple: InvitationCoupleData;
  quote: InvitationQuoteData;
  events: InvitationEventsData;
  stories: InvitationStoryItem[];
  memories: InvitationMemoryPhoto[];
  envelopes: InvitationEnvelopesData;
  rsvp: InvitationRsvpConfig;
  buttonTexts: InvitationButtonTexts;
  icons: InvitationIconsConfig;
  swarm: InvitationSwarmSettings;
  musicUrl?: string;
  updatedAt: string;
}

export const DEFAULT_FULL_INVITATION_CONFIG: FullInvitationConfig = {
  id: 'inv-arif-windi-default',
  workspaceId: 'ws-demo-001',
  slug: 'arif-windi',
  isPublished: true,
  themeSlug: 'classic-sacred',
  hero: {
    title: 'THE WEDDING OF',
    dateText: 'MINGGU, 14 NOVEMBER 2027',
    backgroundImageUrl: '/referensi/797207-gallery-D7vomq3BEn.jpg',
    ornamentTopRightUrl: '/referensi/frame-tr.webp',
    ornamentBottomLeftUrl: '/referensi/frame-bl.webp',
    guestBoxLabel: 'Kepada Yth. Bapak/Ibu/Saudara/i:',
    guestNameDefault: 'Sahabat Terkasih',
    guestLocationDefault: 'Di Tempat',
  },
  couple: {
    groomNickname: 'Arif',
    groomFullName: 'Ahmad Arif Fauzi, S.Kom.',
    groomParents: 'Putra pertama dari Bpk. Bambang Supeno & Ibu Siti Aminah',
    groomPhotoUrl: '/referensi/797207-gallery-2nbuRtY3o0.jpg',
    groomInstagram: 'arif.fauzi',

    brideNickname: 'Windi',
    brideFullName: 'Windi Astuti, S.Ds.',
    brideParents: 'Putri kedua dari Bpk. Slamet Raharjo & Ibu Sri Mulyani',
    bridePhotoUrl: '/referensi/797207-gallery-8LWkAveVdN.jpg',
    brideInstagram: 'windi.astuti',

    archCouplePhotoUrl: '/referensi/797207-gallery-D7vomq3BEn.jpg',
  },
  quote: {
    greeting: "Assalamu'alaikum Wr. Wb.",
    introText:
      'Tanpa mengurangi rasa hormat, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri dan memberikan doa restu pada acara pernikahan kami:',
    translationText:
      'Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',
    sourceText: 'QS. AR-RUM: 21',
  },
  events: {
    countdownTargetIso: '2027-11-14T08:00:00',
    countdownTitle: 'Menuju Akad Nikah',
    akad: {
      title: 'Akad Nikah',
      badgeLabel: 'AKAD NIKAH',
      dayName: 'Minggu',
      dateFormatted: '14 November 2027',
      isoDateTime: '2027-11-14T08:00:00',
      timeRange: '08.00 - 10.00 WIB',
      venueName: 'Pendopo Dalem Ngabean',
      venueAddress: 'Jl. Suryodiningratan No. 37, Mantrijeron, Yogyakarta',
      googleMapsUrl: 'https://maps.google.com/?q=Pendopo+Dalem+Ngabean+Yogyakarta',
      googleCalendarUrl:
        'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Akad+Nikah+Arif+%26+Windi&dates=20271114T010000Z/20271114T030000Z&details=Akad+Nikah+Ahmad+Arif+Fauzi+%26+Windi+Astuti&location=Pendopo+Dalem+Ngabean+Yogyakarta',
    },
    reception: {
      title: 'Resepsi Pernikahan',
      badgeLabel: 'RESEPSI MEWAH',
      dayName: 'Minggu',
      dateFormatted: '14 November 2027',
      isoDateTime: '2027-11-14T11:00:00',
      timeRange: '11.00 - 14.00 WIB',
      venueName: 'Graha Sakinah Convention Hall',
      venueAddress: 'Jl. Kaliurang KM 9, Sinduharjo, Sleman, D.I. Yogyakarta',
      googleMapsUrl: 'https://maps.google.com/?q=Graha+Sakinah+Yogyakarta',
      googleCalendarUrl:
        'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Resepsi+Arif+%26+Windi&dates=20271114T040000Z/20271114T070000Z&details=Resepsi+Pernikahan+Arif+%26+Windi&location=Graha+Sakinah+Yogyakarta',
    },
  },
  stories: [
    {
      id: 'st-1',
      year: '2021',
      title: 'Awal Perjumpaan',
      description: 'Pertama kali bertukar pandang dan cerita hangat di sudut kedai kopi Yogyakarta saat senja menyapa.',
      iconName: 'Coffee',
    },
    {
      id: 'st-2',
      year: '2023',
      title: 'Menjalin Komitmen',
      description: 'Menemukan frekuensi yang sama, saling mendukung mimpi, dan sepakat melangkah bersama dalam harmoni.',
      iconName: 'HeartHandshake',
    },
    {
      id: 'st-3',
      year: '2026',
      title: 'Lamaran Sakral',
      description: 'Dua keluarga besar bertemu dalam kehangatan adat, memohon restu untuk menyatukan dua jiwa.',
      iconName: 'Gem',
    },
  ],
  memories: [
    {
      id: 'col1-1',
      src: '/referensi/797207-gallery-D7vomq3BEn.jpg',
      caption: 'Beskap Beludru Adat Jawa Sidomukti',
      category: 'Busana Tradisional',
      column: 'left',
    },
    {
      id: 'col1-2',
      src: '/referensi/797207-gallery-COX9fLRlKg.jpg',
      caption: 'Gaun Pengantin Putih Sutra & Rangkaian Mawar Merah',
      category: 'Modern Elegance',
      column: 'left',
    },
    {
      id: 'col1-3',
      src: '/referensi/797207-gallery-cI1oF5BtRz.jpg',
      caption: 'Momen Bahagia Bersanding Payung Adat Pusaka',
      category: 'Adat Keraton',
      column: 'left',
    },
    {
      id: 'col1-4',
      src: '/referensi/797207-gallery-2nbuRtY3o0.jpg',
      caption: 'Ahmad Arif Fauzi dalam Balutan Busana Luhur',
      category: 'Mempelai Pria',
      column: 'left',
    },
    {
      id: 'col2-1',
      src: '/referensi/797207-gallery-8LWkAveVdN.jpg',
      caption: 'Windi Astuti Anggun Bermahkota Ratu Sehari',
      category: 'Mempelai Wanita',
      column: 'right',
    },
    {
      id: 'col2-2',
      src: '/referensi/797207-gallery-jMqU8nYexf.jpg',
      caption: 'Senyum Syukur dan Doa Restu yang Dipanjatkan',
      category: 'Momen Sakral',
      column: 'right',
    },
    {
      id: 'col2-3',
      src: '/referensi/797207-gallery-Lhimda0fph.jpg',
      caption: 'Untaian Janji Setia di Bawah Naungan Kasih',
      category: 'Romansa Suci',
      column: 'right',
    },
    {
      id: 'col2-4',
      src: '/referensi/797207-gallery-DXpEkLolkN.jpg',
      caption: 'Tatapan Penuh Ketulusan Menuju Lembaran Baru',
      category: 'Ikrar Cinta',
      column: 'right',
    },
  ],
  envelopes: {
    sectionTitle: 'Tanda Kasih',
    sectionSubtitle: 'AMPLOP DIGITAL & KADO',
    descriptionText:
      'Doa restu Anda merupakan karunia terindah bagi kami. Bagi keluarga dan sahabat yang ingin memberikan tanda kasih secara digital maupun fisik:',
    bankAccounts: [
      {
        id: 'acc-mandiri',
        bankName: 'Bank Mandiri',
        bankCode: 'MANDIRI',
        accountNumber: '1370019283746',
        accountHolder: 'a.n Ahmad Arif Fauzi',
        badgeColor: 'bg-blue-100 text-blue-800',
      },
      {
        id: 'acc-bca',
        bankName: 'Bank BCA',
        bankCode: 'BCA',
        accountNumber: '8691029384',
        accountHolder: 'a.n Windi Astuti',
        badgeColor: 'bg-blue-100 text-blue-800',
      },
    ],
    qrisImageUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=00020101021126610014ID.LINKAJA.WWW01189360091100223400000215202711140001850303UMI51440014ID.CO.QRIS.WWW0215ID10200234000015204581253033605802ID5919ARIF_WINDI_WEDDING6010YOGYAKARTA61055514362070703A016304C497',
    qrisMerchantName: 'ARIF & WINDI WEDDING (NMID: ID1020023400001)',
    giftAddress: {
      recipientName: 'Arif & Windi',
      phoneNumber: '0812-3456-7890',
      fullAddress: 'Jl. Palagan Tentara Pelajar No. 88, Sariharjo, Ngaglik',
      cityPostal: 'Kabupaten Sleman, D.I. Yogyakarta 55581',
    },
  },
  rsvp: {
    sectionTitle: 'Reservasi & Ucapan Doa',
    sectionSubtitle: 'KONFIRMASI KEHADIRAN',
    descriptionText:
      'Kehadiran dan doa restu Anda adalah pelengkap kebahagiaan kami. Mohon konfirmasikan kehadiran Anda melalui formulir di bawah ini:',
    allowGuestWishes: true,
  },
  buttonTexts: {
    openCoverButton: 'Buka Undangan',
    addToCalendarButton: 'Simpan ke Kalender',
    openMapsButton: 'Petunjuk Arah Google Maps',
    copyAccountButton: 'Salin',
    accountCopiedButton: 'Tersalin!',
    sendRsvpButton: 'Kirim Doa Restu',
  },
  icons: {
    heroIcon: 'Sparkles',
    quoteIcon: 'Heart',
    coupleGroomIcon: 'Crown',
    coupleBrideIcon: 'Flower2',
    countdownIcon: 'Clock',
    eventAkadIcon: 'Calendar',
    eventReceptionIcon: 'GlassWater',
    storyIcon: 'BookHeart',
    memoriesIcon: 'Camera',
    giftIcon: 'Gift',
    rsvpIcon: 'Send',
    musicIcon: 'Music',
  },
  swarm: {
    speedMultiplier: 1.0,
    confettiTheme: 'botanical-sage',
    showCoverFirst: false,
  },
  musicUrl:
    'https://assets.satumomen.com/musics/nadhif-basalamah-kota-ini-tak-sama-tanpamu-official-lyric-video-grp6fcniomm-00-01-02-00-04-28-part.mp3',
  updatedAt: new Date().toISOString(),
};

