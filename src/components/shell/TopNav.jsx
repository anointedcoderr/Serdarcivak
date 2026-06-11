import { NavLink, Link } from 'react-router-dom'
import { Menu, Disc3, Crown } from 'lucide-react'
import { useT } from '../../i18n'
import { useUI } from '../../store/ui'
import { PATHS } from '../../router/paths'
import Logo from '../brand/Logo'
import LanguageToggle from './LanguageToggle'
import WalletWidget from './WalletWidget'
import { cn } from '../../lib/cn'

export default function TopNav() {
  const t = useT()
  const setDrawer = useUI((s) => s.setDrawer)

  const links = [
    { to: PATHS.sports, label: t('nav.sports'), live: true },
    { to: PATHS.slots, label: t('nav.slots') },
    { to: PATHS.live, label: t('nav.live') },
    { to: PATHS.crash, label: t('nav.crash') },
    { to: PATHS.promotions, label: t('nav.promotions') },
  ]

  return (
    <header
      className="fixed inset-x-0 z-[80]"
      style={{ top: 'var(--ticker-h)', height: 'var(--nav-h)' }}
    >
      <div
        className="h-full border-b border-line backdrop-blur-xl"
        style={{ background: 'rgba(8,8,11,0.92)' }}
      >
        <div className="container-page flex h-full items-center gap-3">
          {/* left: hamburger (mobile) + logo */}
          <button
            onClick={() => setDrawer(true)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-line text-ink-muted hover:text-ink lg:hidden"
            aria-label={t('common.menu')}
          >
            <Menu style={{ width: 18, height: 18 }} />
          </button>

          <Link to={PATHS.home} className="shrink-0">
            <Logo className="hidden sm:inline-flex" />
            <Logo className="sm:hidden" compact />
          </Link>

          {/* wheel + vip quick entry */}
          <div className="ml-1 hidden items-center gap-1 sm:flex">
            <Link
              to={PATHS.wheel}
              className="grid h-9 w-9 place-items-center rounded-full border border-line text-gold-light transition-colors hover:text-gold-champagne"
              title={t('nav.wheel')}
            >
              <Disc3 style={{ width: 18, height: 18 }} className="animate-spin-slow" />
            </Link>
            <Link
              to={PATHS.vip}
              className="grid h-9 w-9 place-items-center rounded-full border border-line text-gold-light transition-colors hover:text-gold-champagne"
              title={t('nav.vip')}
            >
              <Crown style={{ width: 18, height: 18 }} />
            </Link>
          </div>

          {/* center: primary nav (desktop) */}
          <nav className="mx-auto hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    'relative rounded-lg px-3.5 py-2 text-[13.5px] font-medium transition-colors',
                    isActive ? 'text-gold' : 'text-ink-muted hover:text-ink',
                  )
                }
              >
                {({ isActive }) => (
                  <span className="inline-flex items-center gap-1.5">
                    {l.label}
                    {l.live && (
                      <span
                        className="pill animate-pulse-soft px-1.5 py-0.5 text-[9px]"
                        style={{ background: 'rgba(255,77,94,0.16)', color: '#ff8c97' }}
                      >
                        {t('common.live')}
                      </span>
                    )}
                    {isActive && (
                      <span
                        className="absolute inset-x-2 -bottom-[1px] h-0.5 rounded-full"
                        style={{ background: 'linear-gradient(90deg,#b8902f,#f7e7b6)' }}
                      />
                    )}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* right */}
          <div className="ml-auto flex items-center gap-2.5 lg:ml-0">
            <LanguageToggle className="hidden sm:inline-flex" />
            <WalletWidget />
          </div>
        </div>
      </div>
    </header>
  )
}
