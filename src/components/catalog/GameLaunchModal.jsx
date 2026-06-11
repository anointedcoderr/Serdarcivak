import { useEffect } from 'react'
import { X, Lock, Play, Sparkles } from 'lucide-react'
import { useT } from '../../i18n'
import { useUI } from '../../store/ui'

// Shared game launcher. Guests see a login wall; members get real + demo (demo hidden for live).
export default function GameLaunchModal({ game, type, onClose }) {
  const t = useT()
  const user = useUI((s) => s.user)
  const openAuth = useUI((s) => s.openAuth)
  const toast = useUI((s) => s.toast)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!game) return null

  const launch = (mode) => {
    toast(`${game.name} ${t('catalog.launching')}`, 'info')
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[140] grid place-items-center p-4 animate-fade-in"
      style={{ background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(5px)' }}
      onClick={onClose}
    >
      <div
        className="card-glass relative w-full max-w-md overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="absolute inset-x-0 top-0 h-0.5" style={{ background: 'linear-gradient(90deg,transparent,#d4af37,transparent)' }} />
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full text-ink-muted hover:text-ink"
          style={{ background: 'rgba(0,0,0,0.35)' }}
          aria-label={t('common.close')}
        >
          <X style={{ width: 17, height: 17 }} />
        </button>

        {/* header */}
        <div className="flex items-center gap-3 p-5">
          <span
            className="grid h-14 w-14 shrink-0 place-items-center rounded-xl border border-line"
            style={{ background: `linear-gradient(160deg, ${game.grad[0]}, ${game.grad[1]})` }}
          >
            <Sparkles style={{ width: 22, height: 22, color: 'var(--gold-champagne)' }} />
          </span>
          <div className="min-w-0">
            <div className="truncate font-display text-lg font-semibold text-ink">{game.name}</div>
            <div className="truncate text-[13px] text-gold-light">{game.provider}</div>
          </div>
        </div>

        {/* body */}
        <div className="px-5 pb-6">
          {!user ? (
            <div className="rounded-xl border border-line p-5 text-center" style={{ background: 'rgba(0,0,0,0.25)' }}>
              <span className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full" style={{ background: 'rgba(212,175,55,0.1)' }}>
                <Lock style={{ width: 20, height: 20, color: 'var(--gold-light)' }} />
              </span>
              <p className="mb-4 text-sm text-ink-muted">{t('catalog.loginToPlay')}</p>
              <div className="flex gap-2">
                <button onClick={() => { onClose(); openAuth('login') }} className="btn-gold flex-1">
                  {t('common.login')}
                </button>
                <button onClick={() => { onClose(); openAuth('register') }} className="btn-ghost flex-1">
                  {t('common.register')}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => launch('real')} className="btn-gold flex-1 py-3">
                <Play style={{ width: 16, height: 16 }} fill="#120d00" /> {t('catalog.playReal')}
              </button>
              {type !== 'live' && (
                <button onClick={() => launch('fun')} className="btn-ghost py-3">
                  {t('catalog.playDemo')}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
