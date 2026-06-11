import { useState } from 'react'
import { Gift, Sparkles, Percent, ChevronDown } from 'lucide-react'
import { useT } from '../i18n'
import { useUI } from '../store/ui'
import { PROMOS, PROMO_THEMES } from '../services/mock'
import Reveal from '../components/ui/Reveal'
import { cn } from '../lib/cn'

const ICONS = { gift: Gift, sparkles: Sparkles, percent: Percent }

function PromoCard({ promo }) {
  const t = useT()
  const openAuth = useUI((s) => s.openAuth)
  const [open, setOpen] = useState(false)
  const Icon = ICONS[promo.icon] || Gift
  const theme = PROMO_THEMES[promo.theme] || PROMO_THEMES.welcome

  return (
    <div className="card-glass flex flex-col overflow-hidden">
      <div className="relative p-5" style={{ background: `linear-gradient(155deg, ${theme.grad[0]}, ${theme.grad[1]})` }}>
        <Icon className="absolute -right-3 -top-2 opacity-15" style={{ width: 92, height: 92, color: theme.accent }} strokeWidth={1.1} />
        <span className="pill" style={{ background: `${theme.accent}26`, color: theme.accent }}>{promo.badge}</span>
        <div className="relative mt-3 font-display text-xl font-semibold text-ink">{promo.title}</div>
        <div className="relative mt-1 text-[13px] text-ink-muted">{promo.desc}</div>
      </div>

      <div className="grid grid-cols-3 divide-x divide-[color:var(--border)] border-y border-line text-center">
        <Stat label={t('promoPage.wager')} value={promo.stats.wager} />
        <Stat label={t('promoPage.slot')} value={promo.stats.slot} />
        <Stat label={t('promoPage.maxWin')} value={promo.stats.maxWin} />
      </div>

      <button onClick={() => setOpen((o) => !o)} className="flex items-center justify-between px-5 py-3 text-[13px] text-ink-muted hover:text-ink">
        {t('promoPage.terms')}
        <ChevronDown style={{ width: 16, height: 16, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>
      {open && (
        <ul className="space-y-1.5 px-5 pb-4 text-[12.5px] text-ink-muted">
          {promo.terms.map((tm, i) => (
            <li key={i} className="flex gap-2"><span className="text-gold-deep">•</span>{tm}</li>
          ))}
        </ul>
      )}

      <div className="mt-auto p-4 pt-0">
        <button onClick={() => openAuth('register')} className="btn-gold w-full">{t('promoPage.claim')}</button>
      </div>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="px-2 py-3">
      <div className="text-[10px] uppercase tracking-wide text-ink-faint">{label}</div>
      <div className="tnum mt-0.5 text-sm font-semibold text-gold-light">{value}</div>
    </div>
  )
}

export default function Promotions() {
  const t = useT()
  return (
    <main className="container-page py-8">
      <div className="mb-6">
        <div className="mb-2 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">
          <Gift style={{ width: 14, height: 14 }} /> {t('promos.title')}
        </div>
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-[40px]">
          {t('promos.title').split(' ')[0]} <span className="text-foil">{t('promos.title').split(' ').slice(1).join(' ')}</span>
        </h1>
        <p className="mt-2 text-sm text-ink-muted">{t('promos.subtitle')}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {PROMOS.map((p, i) => (
          <Reveal key={p.id} delay={i * 70}>
            <PromoCard promo={p} />
          </Reveal>
        ))}
      </div>
    </main>
  )
}
