// Central path map. Nav, footer, and router all read from here.
export const PATHS = {
  home: '/',
  // lobby
  slots: '/slot',
  live: '/canli-casino',
  sports: '/spor',
  crash: '/crash',
  promotions: '/promosyonlar',
  vip: '/vip',
  wheel: '/cark',
  search: '/arama',
  // account
  profile: '/hesap',
  deposit: '/para-yatir',
  withdraw: '/para-cek',
  transactions: '/islemler',
  bonuses: '/bonuslarim',
  kyc: '/dogrulama',
  referrals: '/referans',
  coupons: '/kuponlarim',
  settings: '/ayarlar',
  notifications: '/bildirimler',
  // support + legal
  contact: '/iletisim',
  faq: '/sss',
  terms: '/hukum-kosullar',
  privacy: '/gizlilik',
  termsOfUse: '/kullanim-sartlari',
  responsible: '/sorumlu-oyun',
  kycPolicy: '/kyc-politikasi',
  howItWorks: '/nasil-calisir',
  // admin
  admin: '/admin',
}

// Page title key (i18n) per path, shown on the Under Development screen.
export const PAGE_TITLES = {
  [PATHS.slots]: 'nav.slots',
  [PATHS.live]: 'nav.live',
  [PATHS.sports]: 'nav.sports',
  [PATHS.crash]: 'nav.crash',
  [PATHS.promotions]: 'nav.promotions',
  [PATHS.vip]: 'nav.vip',
  [PATHS.wheel]: 'nav.wheel',
  [PATHS.contact]: 'footer.contact',
  [PATHS.faq]: 'footer.faq',
  [PATHS.terms]: 'footer.terms',
  [PATHS.privacy]: 'footer.privacy',
  [PATHS.termsOfUse]: 'footer.terms',
  [PATHS.responsible]: 'footer.responsible',
  [PATHS.kycPolicy]: 'footer.kyc',
  [PATHS.profile]: 'footer.profile',
  [PATHS.deposit]: 'common.deposit',
  [PATHS.withdraw]: 'footer.withdraw',
  [PATHS.transactions]: 'footer.transactions',
}

// Every route that exists but is not built yet renders the placeholder.
// Home is the only fully built route in this milestone.
export const UNDER_DEV_PATHS = [
  PATHS.slots, PATHS.live, PATHS.sports, PATHS.crash, PATHS.promotions,
  PATHS.vip, PATHS.wheel, PATHS.search,
  PATHS.profile, PATHS.deposit, PATHS.withdraw, PATHS.transactions, PATHS.bonuses,
  PATHS.kyc, PATHS.referrals, PATHS.coupons, PATHS.settings, PATHS.notifications,
  PATHS.contact, PATHS.faq, PATHS.terms, PATHS.privacy, PATHS.termsOfUse,
  PATHS.responsible, PATHS.kycPolicy, PATHS.howItWorks,
  PATHS.admin,
]
