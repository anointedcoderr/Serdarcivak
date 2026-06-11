import { NavLink } from 'react-router-dom'
import { Trophy, Dices, Headset, Radio, Menu } from 'lucide-react'
import { useT } from '../../i18n'
import { useUI } from '../../store/ui'
import { PATHS } from '../../router/paths'
import { cn } from '../../lib/cn'

export default function MobileBottomNav() {
  const t = useT()
  const setDrawer = useUI((s) => s.setDrawer)
  const toast = useUI((s) => s.toast)

  const item = (Icon, label, active) => (
    <span className="flex flex-col items-center gap-1">
      <span className="relative">
        <Icon style={{ width: 21, height: 21 }} />
      </span>
      <span className="text-[10px] font-medium leading-none">{label}</span>
    </span>
  )

  const linkCls = ({ isActive }) =>
    cn('flex-1 py-2 transition-colors', isActive ? 'text-gold' : 'text-ink-muted')

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-[85] flex items-stretch border-t border-line backdrop-blur-xl lg:hidden"
      style={{
        height: 'calc(var(--bottomnav-h) + env(safe-area-inset-bottom))',
        paddingBottom: 'env(safe-area-inset-bottom)',
        background: 'rgba(8,8,11,0.96)',
      }}
    >
      <NavLink to={PATHS.sports} className={linkCls}>
        {({ isActive }) => item(Trophy, t('nav.sports'), isActive)}
      </NavLink>
      <NavLink to={PATHS.slots} className={linkCls}>
        {({ isActive }) => item(Dices, t('nav.slots'), isActive)}
      </NavLink>

      {/* center support */}
      <button onClick={() => toast(t('support.title'), 'info')} className="flex-1 py-2 text-ink-muted">
        <span className="flex flex-col items-center gap-1">
          <span className="relative grid place-items-center">
            <Headset style={{ width: 22, height: 22, color: 'var(--gold)' }} />
            <span
              className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full animate-pulse-soft"
              style={{ background: 'var(--emerald)' }}
            />
          </span>
          <span className="text-[10px] font-medium leading-none text-gold-light">{t('common.support')}</span>
        </span>
      </button>

      <NavLink to={PATHS.live} className={linkCls}>
        {({ isActive }) => item(Radio, t('common.live'), isActive)}
      </NavLink>
      <button onClick={() => setDrawer(true)} className="flex-1 py-2 text-ink-muted">
        {item(Menu, t('common.menu'), false)}
      </button>
    </nav>
  )
}
