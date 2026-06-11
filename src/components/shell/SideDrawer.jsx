import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { X, Trophy, Dices, Radio, Rocket, Gift, Crown, Disc3 } from 'lucide-react'
import { useT } from '../../i18n'
import { useUI } from '../../store/ui'
import { PATHS } from '../../router/paths'
import Logo from '../brand/Logo'
import LanguageToggle from './LanguageToggle'

export default function SideDrawer() {
  const t = useT()
  const open = useUI((s) => s.drawerOpen)
  const setDrawer = useUI((s) => s.setDrawer)
  const openAuth = useUI((s) => s.openAuth)
  const user = useUI((s) => s.user)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setDrawer(false)
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, setDrawer])

  const items = [
    { to: PATHS.sports, label: t('nav.sports'), Icon: Trophy },
    { to: PATHS.slots, label: t('nav.slots'), Icon: Dices },
    { to: PATHS.live, label: t('nav.live'), Icon: Radio },
    { to: PATHS.crash, label: t('nav.crash'), Icon: Rocket },
    { to: PATHS.promotions, label: t('nav.promotions'), Icon: Gift },
    { to: PATHS.wheel, label: t('nav.wheel'), Icon: Disc3 },
    { to: PATHS.vip, label: t('nav.vip'), Icon: Crown },
  ]

  return (
    <>
      <div
        className="fixed inset-0 z-[100] transition-opacity duration-300"
        style={{
          background: 'rgba(0,0,0,0.6)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
        }}
        onClick={() => setDrawer(false)}
      />
      <aside
        className="fixed right-0 top-0 z-[101] flex h-full w-[300px] max-w-[85vw] flex-col border-l border-line transition-transform duration-300"
        style={{
          background: 'var(--bg-1)',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
        }}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-line p-4">
          <Logo />
          <button
            onClick={() => setDrawer(false)}
            className="grid h-9 w-9 place-items-center rounded-lg text-ink-muted hover:text-ink"
            aria-label={t('common.close')}
          >
            <X style={{ width: 18, height: 18 }} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <div className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-deep">
            {t('common.menu')}
          </div>
          <nav className="flex flex-col gap-1">
            {items.map(({ to, label, Icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setDrawer(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink transition-colors hover:bg-white/5"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg border border-line text-gold-light">
                  <Icon style={{ width: 17, height: 17 }} />
                </span>
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {!user && (
          <div className="border-t border-line p-4">
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setDrawer(false)
                  openAuth('login')
                }}
                className="btn-ghost flex-1"
              >
                {t('common.login')}
              </button>
              <button
                onClick={() => {
                  setDrawer(false)
                  openAuth('register')
                }}
                className="btn-gold flex-1"
              >
                {t('common.register')}
              </button>
            </div>
            <div className="mt-4 flex justify-center">
              <LanguageToggle />
            </div>
          </div>
        )}
      </aside>
    </>
  )
}
