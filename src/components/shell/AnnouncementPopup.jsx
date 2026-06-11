import { useEffect, useState } from 'react'
import { X, Gift } from 'lucide-react'
import { useT } from '../../i18n'
import { useUI } from '../../store/ui'

const VERSION = 'welcome-2026-06'

// Session-once welcome popup, keyed by content version (bump VERSION to re-show).
export default function AnnouncementPopup() {
  const t = useT()
  const openAuth = useUI((s) => s.openAuth)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let dismissed = false
    try {
      dismissed =
        localStorage.getItem('ann_dismissed') === VERSION ||
        sessionStorage.getItem('ann_seen') === VERSION
    } catch {
      dismissed = false
    }
    if (dismissed) return
    const id = setTimeout(() => {
      setOpen(true)
      try {
        sessionStorage.setItem('ann_seen', VERSION)
      } catch {
        // ignore
      }
    }, 1400)
    return () => clearTimeout(id)
  }, [])

  if (!open) return null

  const dontShow = () => {
    try {
      localStorage.setItem('ann_dismissed', VERSION)
    } catch {
      // ignore
    }
    setOpen(false)
  }

  return (
    <div
      className="fixed inset-0 z-[130] grid place-items-center px-5 animate-fade-in"
      style={{ background: 'rgba(0,0,0,0.82)' }}
      onClick={() => setOpen(false)}
    >
      <div
        className="card-glass relative w-full max-w-sm overflow-hidden p-0 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full text-ink-muted hover:text-ink"
          style={{ background: 'rgba(0,0,0,0.4)' }}
          aria-label={t('common.close')}
        >
          <X style={{ width: 16, height: 16 }} />
        </button>

        <div
          className="relative grid place-items-center px-6 py-10 text-center"
          style={{ background: 'linear-gradient(160deg, #2a2208, #0c0a05)' }}
        >
          <div className="absolute inset-0 bg-radial-gold opacity-70" />
          <Gift className="relative animate-floaty" style={{ width: 52, height: 52, color: 'var(--gold)' }} strokeWidth={1.4} />
          <div className="relative mt-4 font-display text-2xl font-semibold text-foil">
            {t('promos.welcomeTitle')}
          </div>
          <div className="relative mt-1 text-sm text-ink-muted">{t('promos.welcomeDesc')}</div>
        </div>

        <div className="p-5">
          <button
            onClick={() => {
              setOpen(false)
              openAuth('register')
            }}
            className="btn-gold w-full"
          >
            {t('common.register')}
          </button>
          <label className="mt-4 flex cursor-pointer items-center justify-center gap-2 text-xs text-ink-muted">
            <input type="checkbox" onChange={dontShow} style={{ accentColor: 'var(--gold)' }} />
            {t('common.dontShow')}
          </label>
        </div>
      </div>
    </div>
  )
}
