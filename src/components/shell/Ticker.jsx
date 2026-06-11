import { useState } from 'react'
import { X, Link2 } from 'lucide-react'
import { useT } from '../../i18n'

// Fixed marquee above the navbar. CSS-driven loop (duplicated unit for seamless scroll).
export default function Ticker() {
  const t = useT()
  const [open, setOpen] = useState(true)
  if (!open) return null

  return (
    <div
      className="fixed inset-x-0 top-0 z-[90] flex items-center overflow-hidden"
      style={{ height: 'var(--ticker-h)', background: '#16110a', borderBottom: '1px solid var(--border)' }}
    >
      <div className="grid h-full place-items-center px-3" style={{ background: 'rgba(212,175,55,0.08)' }}>
        <Link2 style={{ width: 14, height: 14, color: 'var(--gold-light)' }} />
      </div>
      <div className="relative min-w-0 flex-1 overflow-hidden">
        <div className="flex w-max animate-marquee whitespace-nowrap will-change-transform">
          <span className="px-8 text-[12.5px] text-gold-light">{t('ticker.text')}</span>
          <span className="px-8 text-[12.5px] text-gold-light">{t('ticker.text')}</span>
        </div>
      </div>
      <button
        onClick={() => setOpen(false)}
        className="grid h-full place-items-center px-3 text-ink-muted hover:text-ink"
        aria-label={t('common.close')}
      >
        <X style={{ width: 14, height: 14 }} />
      </button>
    </div>
  )
}
