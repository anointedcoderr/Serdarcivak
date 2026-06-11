import { create } from 'zustand'

// Global UI + mock session state. Swap the auth actions for real API calls later.
export const useUI = create((set) => ({
  // 'login' | 'register' | 'forgot' | null
  authModal: null,
  openAuth: (which) => set({ authModal: which, drawerOpen: false }),
  closeAuth: () => set({ authModal: null }),

  drawerOpen: false,
  setDrawer: (open) => set({ drawerOpen: open }),

  // Mock session. balance is in kuruş-free TRY for the demo.
  user: null, // { name, balance }
  login: () => set({ user: { name: 'Oyuncu', balance: 2750 }, authModal: null }),
  logout: () => set({ user: null }),

  // Mock transaction ledger (newest first). Real data comes from the backend later.
  transactions: [
    { id: 't-1003', type: 'deposit', method: 'Papara', amount: 1500, status: 'approved', date: '10.06.2026 14:22' },
    { id: 't-1002', type: 'withdraw', method: 'Havale', amount: 800, status: 'pending', date: '09.06.2026 19:05' },
    { id: 't-1001', type: 'bonus', method: 'Hoşgeldin', amount: 250, status: 'approved', date: '08.06.2026 11:40' },
    { id: 't-1000', type: 'deposit', method: 'USDT', amount: 1000, status: 'approved', date: '07.06.2026 22:18' },
  ],
  addTransaction: (tx) =>
    set((s) => ({
      transactions: [{ id: 't-' + (1000 + s.transactions.length + 1), status: 'pending', ...tx }, ...s.transactions],
    })),

  // Bet slip (sportsbook). Each selection: { key, eventId, match, market, pick, odd }
  betSlip: [],
  addSelection: (sel) =>
    set((s) => {
      // one pick per event+market; toggle off if same key clicked again
      const exists = s.betSlip.find((b) => b.key === sel.key)
      if (exists) return { betSlip: s.betSlip.filter((b) => b.key !== sel.key) }
      const sameMarket = s.betSlip.filter((b) => !(b.eventId === sel.eventId && b.market === sel.market))
      return { betSlip: [...sameMarket, sel] }
    }),
  removeSelection: (key) => set((s) => ({ betSlip: s.betSlip.filter((b) => b.key !== key) })),
  clearSlip: () => set({ betSlip: [] }),

  // Placed coupons (bet history)
  coupons: [
    {
      id: 'c-2001', stake: 100, odds: 4.2, status: 'won', date: '09.06.2026 21:10',
      legs: [{ match: 'Galatasaray - Fenerbahçe', pick: 'MS1', odd: '2.10' }, { match: 'Arsenal - Chelsea', pick: 'MS1', odd: '2.00' }],
    },
    {
      id: 'c-2000', stake: 50, odds: 2.35, status: 'lost', date: '08.06.2026 18:40',
      legs: [{ match: 'Real Madrid - Barcelona', pick: 'MS1', odd: '2.35' }],
    },
  ],
  placeCoupon: ({ stake, odds, legs }) =>
    set((s) => ({
      coupons: [{ id: 'c-' + (2000 + s.coupons.length + 1), stake, odds, status: 'open', date: 'şimdi', legs }, ...s.coupons],
      betSlip: [],
    })),

  // Notifications
  notifications: [
    { id: 'n-3', title: 'Hoşgeldin bonusun hazır', body: 'İlk yatırımına %100 bonus seni bekliyor.', date: '10.06.2026', unread: true, type: 'bonus' },
    { id: 'n-2', title: 'Para yatırma onaylandı', body: '1.500 ₺ bakiyene eklendi.', date: '10.06.2026', unread: true, type: 'deposit' },
    { id: 'n-1', title: 'Hesabına hoş geldin', body: 'Serdarcivak ailesine katıldın. Bol şanslar!', date: '07.06.2026', unread: false, type: 'info' },
  ],
  markNotificationsRead: () =>
    set((s) => ({ notifications: s.notifications.map((n) => ({ ...n, unread: false })) })),

  // Toasts
  toasts: [],
  toast: (message, type = 'info') =>
    set((s) => ({ toasts: [...s.toasts, { id: Date.now() + Math.round(performance.now()), message, type }] })),
  dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))
