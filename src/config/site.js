// Single white-label config. Swap brand/logo/contact here to reskin the whole platform.
export const SITE = {
  name: 'Serdarcivak',
  // Frontend display contact (per build brief).
  email: 'info@anointedcoder.com',
  // Brand social channels (placeholders until the client supplies real handles).
  social: {
    telegram: 'https://t.me/serdarcivak',
    instagram: 'https://instagram.com/serdarcivak',
    whatsapp: 'https://wa.me/900000000000',
  },
  // Mirror-domain notice in the ticker, like the reference market expects.
  currentDomain: 'serdarcivak.com',
  nextDomain: 'serdarcivak1.com',
}

// Build credit + reach-out used on the Under Development pages and footer.
export const BUILDER = {
  name: 'Anointed Coder',
  email: 'info@anointedcoder.com',
  telegram: 'https://t.me/AnointedCoder',
  whatsapp: 'https://wa.link/fi5z8a',
}

export const PAYMENTS = [
  'Papara', 'Havale', 'Süper Havale', 'Paycell', 'PayCo', 'Pep',
  'Bitcoin', 'USDT', 'Ethereum', 'Litecoin',
]

export const PROVIDERS = [
  'Pragmatic', 'Evolution', 'NetEnt', 'Hacksaw', 'NoLimit',
  'Red Tiger', 'EGT', 'Wazdan', 'Yggdrasil', 'BGaming',
]

// Deposit/withdraw rails. min in TRY. icon = lucide name used in the wallet UI.
export const DEPOSIT_METHODS = [
  { id: 'papara', name: 'Papara', kind: 'fiat', min: 100, max: 50000, icon: 'wallet', eta: 'Anında' },
  { id: 'havale', name: 'Banka Havalesi', kind: 'fiat', min: 250, max: 100000, icon: 'landmark', eta: '5-15 dk' },
  { id: 'paycell', name: 'Paycell', kind: 'fiat', min: 100, max: 20000, icon: 'smartphone', eta: 'Anında' },
  { id: 'usdt', name: 'USDT (TRC20)', kind: 'crypto', min: 200, max: 500000, icon: 'bitcoin', eta: '1-3 onay' },
  { id: 'btc', name: 'Bitcoin', kind: 'crypto', min: 500, max: 500000, icon: 'bitcoin', eta: '1-3 onay' },
  { id: 'eth', name: 'Ethereum', kind: 'crypto', min: 500, max: 500000, icon: 'bitcoin', eta: '1-3 onay' },
]

export const AMOUNT_PRESETS = [250, 500, 1000, 2500, 5000, 10000]
