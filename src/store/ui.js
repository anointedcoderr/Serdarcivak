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

  // Toasts
  toasts: [],
  toast: (message, type = 'info') =>
    set((s) => ({ toasts: [...s.toasts, { id: Date.now() + Math.round(performance.now()), message, type }] })),
  dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))
