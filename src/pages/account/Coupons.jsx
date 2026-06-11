import { Ticket } from 'lucide-react'
import { useT } from '../../i18n'
import { useUI } from '../../store/ui'

const STATUS = {
  open: { bg: 'rgba(245,158,11,0.14)', color: '#f0b44b' },
  won: { bg: 'rgba(52,211,153,0.14)', color: '#6ee7b7' },
  lost: { bg: 'rgba(255,77,94,0.14)', color: '#ff8c97' },
}

export default function Coupons() {
  const t = useT()
  const coupons = useUI((s) => s.coupons)

  return (
    <div>
      <div className="mb-5">
        <h1 className="font-display text-2xl font-semibold text-ink">{t('coupons.title')}</h1>
        <p className="mt-1 text-sm text-ink-muted">{t('coupons.subtitle')}</p>
      </div>

      {coupons.length === 0 ? (
        <div className="card-glass grid place-items-center p-12 text-center">
          <Ticket style={{ width: 36, height: 36, color: 'var(--text-faint)' }} />
          <div className="mt-3 text-sm text-ink-muted">{t('coupons.empty')}</div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {coupons.map((c) => {
            const st = STATUS[c.status] || STATUS.open
            return (
              <div key={c.id} className="card-glass overflow-hidden">
                <div className="flex items-center justify-between border-b border-line p-3">
                  <span className="text-[12px] text-ink-muted">{c.legs.length} {t('coupons.legs')} · {c.date}</span>
                  <span className="pill" style={{ background: st.bg, color: st.color }}>{t(`coupons.statuses.${c.status}`)}</span>
                </div>
                <div className="divide-y divide-[color:var(--border)]">
                  {c.legs.map((l, i) => (
                    <div key={i} className="flex items-center justify-between p-3">
                      <div className="min-w-0">
                        <div className="truncate text-[13px] text-ink">{l.match}</div>
                        <div className="text-[11px] text-gold-light">{l.pick}</div>
                      </div>
                      <div className="tnum text-[13px] text-ink-muted">{l.odd}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between p-3 text-[13px]">
                  <span className="text-ink-muted">{t('coupons.stake')}: <span className="tnum text-ink">{c.stake} ₺</span></span>
                  <span className="text-ink-muted">{t('coupons.odds')}: <span className="tnum text-gold-light">{c.odds}</span></span>
                  <span className="text-ink-muted">{t('coupons.payout')}: <span className="tnum text-emerald">{(c.stake * c.odds).toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺</span></span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
