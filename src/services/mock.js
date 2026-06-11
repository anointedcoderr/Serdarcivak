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
