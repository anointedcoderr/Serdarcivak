import { NavLink, Outlet } from 'react-router-dom'
import { User, Plus, Banknote, Receipt, Gift, Users, ShieldCheck, LogOut, Lock } from 'lucide-react'
import { useT } from '../../i18n'
import { useUI } from '../../store/ui'
import { PATHS } from '../../router/paths'
import { cn } from '../../lib/cn'

const NAV = [
  { to: PATHS.profile, key: 'profile', Icon: User },
  { to: PATHS.deposit, key: 'deposit', Icon: Plus },
  { to: PATHS.withdraw, key: 'withdraw', Icon: Banknote },
  { to: PATHS.transactions, key: 'transactions', Icon: Receipt },
  { to: PATHS.bonuses, key: 'bonuses', Icon: Gift },
  { to: PATHS.referrals, key: 'referrals', Icon: Users },
  { to: PATHS.kyc, key: 'kyc', Icon: ShieldCheck },
]

export default function AccountLayout() {
  const t = useT()
  const user = useUI((s) => s.user)
  const openAuth = useUI((s) => s.openAuth)
  const logout = useUI((s) => s.logout)

  if (!user) {
    return (
      <main className="container-page grid min-h-[60vh] place-items-center py-16">
        <div className="card-glass w-full max-w-md p-8 text-center">
          <span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl" style={{ background: 'rgba(212,175,55,0.1)' }}>
            <Lock style={{ width: 24, height: 24, color: 'var(--gold-light)' }} />
          </span>
          <h1 className="text-2xl font-semibold text-foil">{t('account.gateTitle')}</h1>
          <p className="mx-auto mb-6 mt-2 max-w-xs text-sm text-ink-muted">{t('account.gateBody')}</p>
          <div className="flex justify-center gap-2">
            <button onClick={() => openAuth('login')} className="btn-gold">{t('common.login')}</button>
            <button onClick={() => openAuth('register')} className="btn-ghost">{t('common.register')}</button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="container-page py-8">
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        {/* sidebar */}
        <aside className="lg:sticky lg:top-[calc(var(--ticker-h)+var(--nav-h)+16px)] lg:self-start">
          <div className="card-glass overflow-hidden p-4">
            <div className="flex items-center gap-3 border-b border-line pb-4">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-line text-gold" style={{ background: 'rgba(0,0,0,0.3)' }}>
                <User style={{ width: 20, height: 20 }} />
              </span>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-ink">{user.name}</div>
                <div className="tnum text-[13px] text-gold-light">{user.balance.toLocaleString('tr-TR')} ₺</div>
              </div>
            </div>
            <nav className="mt-3 flex gap-1 overflow-x-auto lg:flex-col">
              {NAV.map(({ to, key, Icon }) => (
                <NavLink
                  key={key}
                  to={to}
                  end
                  className={({ isActive }) =>
                    cn(
                      'flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition-colors',
                      isActive ? 'text-[#120d00]' : 'text-ink-muted hover:bg-white/5 hover:text-ink',
                    )
                  }
                  style={({ isActive }) => (isActive ? { background: 'linear-gradient(135deg,#f7e7b6,#d4af37)' } : undefined)}
                >
                  <Icon style={{ width: 17, height: 17 }} />
                  {t(`account.nav.${key}`)}
                </NavLink>
              ))}
              <button
                onClick={logout}
                className="flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-ink-muted transition-colors hover:text-ruby"
              >
                <LogOut style={{ width: 17, height: 17 }} />
                {t('account.logout')}
              </button>
            </nav>
          </div>
        </aside>

        {/* content */}
        <div>
          <Outlet />
        </div>
      </div>
    </main>
  )
}
