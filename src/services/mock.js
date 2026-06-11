// Mock data layer. Original game names + generated art (no copyrighted assets).
// Replace these arrays with real API calls later; component code stays the same.

// gradient + icon drive each generated thumbnail
const G = {
  gold: ['#3a2f0c', '#0c0b08'],
  ruby: ['#3a0f16', '#0c0708'],
  emerald: ['#0c3326', '#06100c'],
  violet: ['#241038', '#0a0712'],
  ocean: ['#0b2b3a', '#06101a'],
  ember: ['#3a1c08', '#100806'],
  royal: ['#152040', '#070a14'],
}

export const SLOTS = [
  { id: 'sweet-riches', name: 'Sweet Riches', provider: 'Imperial', tag: 'hot', icon: 'candy', grad: G.ruby },
  { id: 'gates-of-gold', name: 'Gates of Gold', provider: 'Imperial', tag: 'hot', icon: 'crown', grad: G.gold },
  { id: 'olympus-rising', name: 'Olympus Rising', provider: 'Olympus', tag: null, icon: 'zap', grad: G.violet },
  { id: 'big-bass-hunt', name: 'Big Bass Hunt', provider: 'Reel', tag: 'new', icon: 'fish', grad: G.ocean },
  { id: 'sugar-storm', name: 'Sugar Storm', provider: 'Imperial', tag: null, icon: 'candy', grad: G.ruby },
  { id: 'wolf-fortune', name: 'Wolf Fortune', provider: 'Wild', tag: 'hot', icon: 'mountain', grad: G.ember },
  { id: 'starlight-queen', name: 'Starlight Queen', provider: 'Olympus', tag: null, icon: 'star', grad: G.violet },
  { id: 'phoenix-flame', name: 'Phoenix Flame', provider: 'Wild', tag: 'new', icon: 'flame', grad: G.ember },
  { id: 'aztec-treasure', name: 'Aztec Treasure', provider: 'Reel', tag: null, icon: 'gem', grad: G.emerald },
  { id: 'diamond-crown', name: 'Diamond Crown', provider: 'Imperial', tag: 'hot', icon: 'gem', grad: G.gold },
  { id: 'lucky-dragon', name: 'Lucky Dragon', provider: 'Dynasty', tag: null, icon: 'sparkles', grad: G.ruby },
  { id: 'royal-fruits', name: 'Royal Fruits', provider: 'Reel', tag: null, icon: 'cherry', grad: G.emerald },
]

export const LIVE = [
  { id: 'imperial-roulette', name: 'Imperial Roulette', provider: 'Live Studio', tag: 'live', icon: 'circle-dot', grad: G.ruby },
  { id: 'lightning-wheel', name: 'Lightning Wheel', provider: 'Live Studio', tag: 'live', icon: 'zap', grad: G.violet },
  { id: 'gold-blackjack', name: 'Gold Blackjack', provider: 'Live Studio', tag: null, icon: 'spade', grad: G.gold },
  { id: 'turkish-roulette', name: 'Türk Ruleti', provider: 'Live Studio', tag: 'live', icon: 'circle-dot', grad: G.royal },
  { id: 'crazy-prize', name: 'Crazy Prize', provider: 'Show', tag: 'hot', icon: 'party-popper', grad: G.ocean },
  { id: 'vip-baccarat', name: 'VIP Baccarat', provider: 'Live Studio', tag: null, icon: 'diamond', grad: G.emerald },
  { id: 'mega-wheel', name: 'Mega Wheel', provider: 'Show', tag: 'live', icon: 'loader', grad: G.ember },
  { id: 'speed-roulette', name: 'Speed Roulette', provider: 'Live Studio', tag: null, icon: 'gauge', grad: G.violet },
]

export const BIG_WINS = [
  { id: 1, user: 'Mert***', game: 'Gates of Gold', amount: 184250, mult: '1750x' },
  { id: 2, user: 'Ayşe***', game: 'Sweet Riches', amount: 92500, mult: '925x' },
  { id: 3, user: 'Can***', game: 'Phoenix Flame', amount: 247000, mult: '2100x' },
  { id: 4, user: 'Deniz***', game: 'Wolf Fortune', amount: 51300, mult: '640x' },
  { id: 5, user: 'Elif***', game: 'Lucky Dragon', amount: 133600, mult: '1180x' },
  { id: 6, user: 'Burak***', game: 'Olympus Rising', amount: 308900, mult: '2750x' },
  { id: 7, user: 'Zeynep***', game: 'Diamond Crown', amount: 76400, mult: '870x' },
  { id: 8, user: 'Emre***', game: 'Aztec Treasure', amount: 42100, mult: '410x' },
]

export const MATCHES = [
  {
    id: 'm1', league: 'Süper Lig', live: true, minute: '67', cc: 'tr',
    home: 'Galatasaray', away: 'Fenerbahçe', score: '1 - 1',
    odds: { '1': '2.10', X: '3.20', '2': '3.05' },
  },
  {
    id: 'm2', league: 'Premier League', live: true, minute: '34', cc: 'gb',
    home: 'Arsenal', away: 'Chelsea', score: '2 - 0',
    odds: { '1': '1.55', X: '4.10', '2': '5.50' },
  },
  {
    id: 'm3', league: 'La Liga', live: false, time: '21:45', cc: 'es',
    home: 'Real Madrid', away: 'Barcelona', score: null,
    odds: { '1': '2.35', X: '3.40', '2': '2.80' },
  },
  {
    id: 'm4', league: 'Serie A', live: false, time: '22:00', cc: 'it',
    home: 'Juventus', away: 'Milan', score: null,
    odds: { '1': '2.05', X: '3.10', '2': '3.60' },
  },
]

export const JACKPOT_BASE = 4821940

export const PROMO_THEMES = {
  welcome: { grad: ['#1d2a52', '#0a0f1e'], accent: '#63b3ff' },
  trial: { grad: ['#3a2f0c', '#100c05'], accent: '#e9c96a' },
  cashback: { grad: ['#0c3326', '#06120d'], accent: '#34d399' },
}

/* ============================================================
   Larger generated catalogs (original branding, no real assets).
   Deterministic generation by index so results are stable.
   ============================================================ */
const GRADS = [G.gold, G.ruby, G.emerald, G.violet, G.ocean, G.ember, G.royal]
const SLOT_ICONS = ['gem', 'crown', 'zap', 'flame', 'star', 'sparkles', 'cherry', 'candy', 'fish', 'mountain', 'diamond']

// Original studio names used as "providers" for the in-house clones.
export const SLOT_PROVIDERS = ['Imperial', 'Olympus', 'Reel Kings', 'Wild Forge', 'Dynasty', 'Vega', 'Nova Play', 'Titan']
export const LIVE_PROVIDERS = ['Live Studio', 'Royal Live', 'Prime Live', 'Show Arena']

const SLOT_ADJ = ['Golden', 'Royal', 'Wild', 'Mystic', 'Lucky', 'Diamond', 'Crimson', 'Imperial', 'Sacred', 'Frozen', 'Blazing', 'Ancient', 'Cosmic', 'Turbo', 'Velvet', 'Thunder']
const SLOT_NOUN = ['Riches', 'Fortune', 'Dragon', 'Pharaoh', 'Joker', 'Gems', 'Tigers', 'Olympus', 'Reels', 'Vault', 'Phoenix', 'Wolves', 'Treasure', 'Crown', 'Buffalo', 'Bonanza', 'Empire', 'Nights']
// slot quick categories
export const SLOT_CATS = ['all', 'hot', 'new', 'megaways', 'jackpot']

function makeSlots(n) {
  const out = []
  const seen = new Set()
  let i = 0
  let guard = 0
  while (out.length < n && guard < n * 6) {
    guard++
    const adj = SLOT_ADJ[(i * 5 + 3) % SLOT_ADJ.length]
    const noun = SLOT_NOUN[(i * 7 + 2) % SLOT_NOUN.length]
    i++
    const name = `${adj} ${noun}`
    if (seen.has(name)) continue
    seen.add(name)
    const idx = out.length
    const tag = idx % 9 === 0 ? 'hot' : idx % 11 === 0 ? 'new' : null
    const cat = idx % 6 === 0 ? 'megaways' : idx % 8 === 0 ? 'jackpot' : 'all'
    out.push({
      id: `slot-${idx}-${adj}-${noun}`.toLowerCase().replace(/\s+/g, '-'),
      name,
      provider: SLOT_PROVIDERS[idx % SLOT_PROVIDERS.length],
      icon: SLOT_ICONS[idx % SLOT_ICONS.length],
      grad: GRADS[idx % GRADS.length],
      tag,
      cat,
    })
  }
  return out
}

// live tables: name + category + provider
const LIVE_DEFS = [
  { base: 'Roulette', cat: 'roulette', icon: 'circle-dot' },
  { base: 'Lightning Roulette', cat: 'roulette', icon: 'zap' },
  { base: 'Blackjack', cat: 'blackjack', icon: 'spade' },
  { base: 'Speed Blackjack', cat: 'blackjack', icon: 'gauge' },
  { base: 'Baccarat', cat: 'baccarat', icon: 'diamond' },
  { base: 'Speed Baccarat', cat: 'baccarat', icon: 'gauge' },
  { base: 'Mega Wheel', cat: 'show', icon: 'loader' },
  { base: 'Crazy Prize', cat: 'show', icon: 'party-popper' },
  { base: 'Dragon Tiger', cat: 'show', icon: 'sparkles' },
]
const LIVE_PREFIX = ['', 'VIP ', 'Türkçe ', 'Gold ', 'Auto ', 'Prestige ', 'Royal ']
export const LIVE_CATS = ['all', 'roulette', 'blackjack', 'baccarat', 'show', 'turkish']

function makeLive(n) {
  const out = []
  const seen = new Set()
  let i = 0
  let guard = 0
  while (out.length < n && guard < n * 8) {
    guard++
    const def = LIVE_DEFS[i % LIVE_DEFS.length]
    const prefix = LIVE_PREFIX[(i * 3) % LIVE_PREFIX.length]
    i++
    const name = `${prefix}${def.base}`.trim()
    if (seen.has(name)) continue
    seen.add(name)
    const idx = out.length
    const isTurkish = prefix.trim() === 'Türkçe'
    out.push({
      id: `live-${idx}`,
      name,
      provider: LIVE_PROVIDERS[idx % LIVE_PROVIDERS.length],
      icon: def.icon,
      grad: GRADS[(idx + 2) % GRADS.length],
      tag: idx % 4 === 0 ? 'live' : null,
      cat: def.cat,
      turkish: isTurkish,
    })
  }
  return out
}

export const CATALOG_SLOTS = makeSlots(64)
export const CATALOG_LIVE = makeLive(48)

// provider list with counts, for filter tabs
export function providerCounts(games) {
  const map = new Map()
  games.forEach((g) => map.set(g.provider, (map.get(g.provider) || 0) + 1))
  return [...map.entries()].map(([name, count]) => ({ name, count }))
}

/* ===================== Sportsbook ===================== */
export const SPORTS = [
  { key: 'all', icon: 'layers' },
  { key: 'football', icon: 'circle' },
  { key: 'basketball', icon: 'dribbble' },
  { key: 'tennis', icon: 'circle-dot' },
  { key: 'volleyball', icon: 'volleyball' },
]

export const SPORT_EVENTS = [
  {
    id: 'e1', sport: 'football', league: 'Süper Lig', cc: 'tr', live: true, minute: '67', home: 'Galatasaray', away: 'Fenerbahçe', score: '1 - 1',
    markets: [
      { name: 'MS', picks: [{ label: 'MS1', odd: '2.10' }, { label: 'X', odd: '3.20' }, { label: 'MS2', odd: '3.05' }] },
      { name: '2.5 Ü/A', picks: [{ label: 'Üst', odd: '1.85' }, { label: 'Alt', odd: '1.95' }] },
      { name: 'KG', picks: [{ label: 'Var', odd: '1.70' }, { label: 'Yok', odd: '2.05' }] },
    ],
  },
  {
    id: 'e2', sport: 'football', league: 'Premier League', cc: 'gb', live: true, minute: '34', home: 'Arsenal', away: 'Chelsea', score: '2 - 0',
    markets: [
      { name: 'MS', picks: [{ label: 'MS1', odd: '1.55' }, { label: 'X', odd: '4.10' }, { label: 'MS2', odd: '5.50' }] },
      { name: '2.5 Ü/A', picks: [{ label: 'Üst', odd: '1.60' }, { label: 'Alt', odd: '2.30' }] },
      { name: 'ÇŞ', picks: [{ label: '1X', odd: '1.20' }, { label: '12', odd: '1.35' }, { label: 'X2', odd: '2.40' }] },
    ],
  },
  {
    id: 'e3', sport: 'football', league: 'La Liga', cc: 'es', live: false, time: '21:45', home: 'Real Madrid', away: 'Barcelona', score: null,
    markets: [
      { name: 'MS', picks: [{ label: 'MS1', odd: '2.35' }, { label: 'X', odd: '3.40' }, { label: 'MS2', odd: '2.80' }] },
      { name: '2.5 Ü/A', picks: [{ label: 'Üst', odd: '1.72' }, { label: 'Alt', odd: '2.08' }] },
    ],
  },
  {
    id: 'e4', sport: 'basketball', league: 'NBA', cc: 'us', live: true, minute: 'Q3', home: 'Lakers', away: 'Celtics', score: '78 - 72',
    markets: [
      { name: 'MS', picks: [{ label: '1', odd: '1.90' }, { label: '2', odd: '1.90' }] },
      { name: 'H', picks: [{ label: '1 (-4.5)', odd: '1.85' }, { label: '2 (+4.5)', odd: '1.95' }] },
    ],
  },
  {
    id: 'e5', sport: 'tennis', league: 'ATP', cc: 'fr', live: false, time: '20:00', home: 'Djokovic', away: 'Alcaraz', score: null,
    markets: [{ name: 'MS', picks: [{ label: '1', odd: '2.05' }, { label: '2', odd: '1.75' }] }],
  },
  {
    id: 'e6', sport: 'football', league: 'Serie A', cc: 'it', live: false, time: '22:00', home: 'Juventus', away: 'Milan', score: null,
    markets: [
      { name: 'MS', picks: [{ label: 'MS1', odd: '2.05' }, { label: 'X', odd: '3.10' }, { label: 'MS2', odd: '3.60' }] },
      { name: '2.5 Ü/A', picks: [{ label: 'Üst', odd: '1.95' }, { label: 'Alt', odd: '1.85' }] },
    ],
  },
  {
    id: 'e7', sport: 'volleyball', league: 'CEV', cc: 'pl', live: false, time: '19:30', home: 'Zaksa', away: 'Perugia', score: null,
    markets: [{ name: 'MS', picks: [{ label: '1', odd: '1.65' }, { label: '2', odd: '2.20' }] }],
  },
]

/* ===================== Crash ===================== */
export const CRASH_HISTORY = [2.34, 1.05, 8.71, 1.52, 3.08, 1.21, 15.4, 1.92, 4.6, 1.01, 2.77, 6.33]
export const CRASH_LIVE_BETS = [
  { user: 'Mert***', amount: 250, mult: 2.4, cashed: true },
  { user: 'Ayşe***', amount: 100, mult: null, cashed: false },
  { user: 'Can***', amount: 500, mult: 1.8, cashed: true },
  { user: 'Deniz***', amount: 75, mult: null, cashed: false },
  { user: 'Elif***', amount: 1000, mult: 3.1, cashed: true },
  { user: 'Burak***', amount: 320, mult: null, cashed: false },
]

/* ===================== Promotions ===================== */
export const PROMOS = [
  {
    id: 'welcome', theme: 'welcome', badge: 'Hoşgeldin', icon: 'gift',
    title: '%100 Hoşgeldin Bonusu', desc: 'İlk yatırımına 10.000₺’ye kadar %100 bonus.',
    stats: { wager: '10x', slot: '%100', maxWin: '100.000₺' },
    terms: ['Minimum 1.000₺ yatırım', 'Çevrim: bonus + yatırım x10', 'Tek sefer, yeni üyelere özel', 'Maksimum kazanç 100.000₺'],
  },
  {
    id: 'trial', theme: 'trial', badge: 'Deneme', icon: 'sparkles',
    title: '2500₺ Deneme Bonusu', desc: 'Çevrim şartı olmadan deneme bonusu.',
    stats: { wager: 'YOK', slot: '%100', maxWin: '50.000₺' },
    terms: ['Çevrim şartı yok', 'Minimum 1 yatırım gerekli', 'Maksimum çekim 50.000₺', '48 saat geçerli'],
  },
  {
    id: 'cashback', theme: 'cashback', badge: 'Kayıp Bonusu', icon: 'percent',
    title: '%30 Slot Kayıp Bonusu', desc: 'Her hafta kaybının %30’u geri yüklenir.',
    stats: { wager: '25x', slot: '%100', maxWin: '-' },
    terms: ['Çarşamba & Cumartesi geçerli', '19.999₺’ye kadar %15, üzeri %30', 'Çevrim: bonus x25', 'Sadece slot oyunları'],
  },
  {
    id: 'reload', theme: 'welcome', badge: 'Yatırım', icon: 'percent',
    title: '%30 Slot Yatırım Bonusu', desc: 'Minimum 100₺ yatırımlarına %30 ek bonus.',
    stats: { wager: '25x', slot: '%100', maxWin: 'VIP’e göre' },
    terms: ['Minimum 100₺ yatırım', 'Çevrim: bonus x25', 'Kayıp bonusu ile birlikte kullanılamaz', 'Maksimum tutar VIP seviyene göre artar'],
  },
]

/* ===================== VIP ===================== */
export const VIP_TIERS = [
  { name: 'Gold', icon: 'medal', cashback: '%5', color: '#f59e0b', perks: ['Öncelikli müşteri desteği', 'Haftalık kayıp bonusu', 'Özel slot turnuvaları'] },
  { name: 'Platinum', icon: 'gem', cashback: '%10', color: '#63b3ff', perks: ['Kişisel hesap yöneticisi', 'Hızlı çekim önceliği', 'Doğum günü bonusu'] },
  { name: 'Diamond', icon: 'crown', cashback: '%15', color: '#a78bfa', perks: ['7/24 özel destek hattı', 'Yüksek çekim limitleri', 'Özel etkinlik davetleri'] },
  { name: 'Black', icon: 'shield', cashback: '%20', color: '#e2e8f0', perks: ['Sınırsız çekim limiti', 'Lüks hediyeler & tatil', 'Özel masalar & limitler'] },
]

/* ===================== Wheel ===================== */
export const WHEEL_SEGMENTS = [
  { label: '50₺', color: 'rgba(59,130,246,0.5)', kind: 'cash', value: 50 },
  { label: '10 FS', color: 'rgba(16,185,129,0.5)', kind: 'fs', value: 10 },
  { label: '100₺', color: 'rgba(245,158,11,0.5)', kind: 'cash', value: 100 },
  { label: 'VIP 100', color: 'rgba(239,68,68,0.5)', kind: 'vip', value: 100 },
  { label: '25₺', color: 'rgba(139,92,246,0.5)', kind: 'cash', value: 25 },
  { label: '50 FS', color: 'rgba(20,184,166,0.5)', kind: 'fs', value: 50 },
  { label: '250₺', color: 'rgba(244,63,94,0.5)', kind: 'cash', value: 250 },
  { label: 'Tekrar', color: 'rgba(59,130,246,0.3)', kind: 'again', value: 0 },
]

/* ===================== Referrals ===================== */
export const REFERRAL = {
  code: 'SERDAR-7F3K',
  link: 'https://serdarcivak.com/?ref=SERDAR-7F3K',
  invited: 12,
  active: 5,
  earned: 1850,
  reward: 250,
}

/* ===================== Bonuses (player) ===================== */
export const PLAYER_BONUSES = {
  active: [
    { id: 'b1', title: '%100 Hoşgeldin Bonusu', amount: 1000, wagered: 6400, target: 10000, expires: '5 gün' },
  ],
  available: [
    { id: 'b2', title: '2500₺ Deneme Bonusu', desc: 'Çevrim şartı yok', cta: 'Talep Et' },
    { id: 'b3', title: '%30 Slot Kayıp Bonusu', desc: 'Çarşamba & Cumartesi', cta: 'Talep Et' },
  ],
  used: [
    { id: 'b0', title: 'İlk Üyelik Bonusu', amount: 250, date: '07.06.2026' },
  ],
}
