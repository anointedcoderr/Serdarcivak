import { useState } from 'react'
import { Ticket, X, Trash2 } from 'lucide-react'
import { useT } from '../../i18n'
import { useUI } from '../../store/ui'

export default function BetSlip({ onClose }) {
  const t = useT()
  const slip = useUI((s) => s.betSlip)
  const remove = useUI((s) => s.removeSelection)
  const clear = useUI((s) => s.clearSlip)
  const place = useUI((s) => s.placeCoupon)
  const user = useUI((s) => s.user)
  const openAuth = useUI((s) => s.openAuth)
  const toast = useUI((s) => s.toast)
  const [stake, setStake] = useState(50)

  const totalOdds = slip.reduce((acc, b) => acc * parseFloat(b.odd), 1)
  const payout = (Number(stake) || 0) * totalOdds

  const submit = () => {
    if (slip.length === 0) return
    if (!user) {
      openAuth('login')
      return
    }
    place({
      stake: Number(stake),
      odds: Number(totalOdds.toFixed(2)),
      legs: slip.map((b) => ({ match: b.match, pick: b.pick, odd: b.odd })),
    })
    toast(t('sb.placed'), 'success')
    onClose?.()
  }

  return (
    <div className="card-glass overflow-hidden">
      <div className="flex items-center justify-between border-b border-line p-4">
        <div className="flex items-center gap-2">
          <Ticket style={{ width: 18, height: 18, color: 'var(--gold)' }} />
          <span className="font-display text-base font-semibold text-ink">{t('sb.betslip')}</span>
          {slip.length > 0 && (
            <span className="pill" style={{ background: 'rgba(212,175,55,0.14)', color: 'var(--gold-light)' }}>
              {slip.length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {slip.length > 0 && (
            <button onClick={clear} className="grid h-8 w-8 place-items-center rounded-lg text-ink-muted hover:text-ruby" aria-label={t('sb.clear')}>
              <Trash2 style={{ width: 16, height: 16 }} />
            </button>
          )}
          {onClose && (
            <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-lg text-ink-muted hover:text-ink lg:hidden" aria-label="close">
              <X style={{ width: 16, height: 16 }} />
            </button>
          )}
        </div>
      </div>

      {slip.length === 0 ? (
        <div className="grid place-items-center p-8 text-center">
          <Ticket style={{ width: 34, height: 34, color: 'var(--text-faint)' }} />
          <p className="mt-3 text-sm text-ink-muted">{t('sb.empty')}</p>
        </div>
      ) : (
        <>
          <div className="max-h-[40vh] overflow-y-auto lg:max-h-none">
            {slip.map((b) => (
              <div key={b.key} className="flex items-start gap-2 border-b border-line p-3">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-medium text-ink">{b.match}</div>
                  <div className="text-[11px] text-ink-muted">{b.market} · <span className="text-gold-light">{b.pick}</span></div>
                </div>
                <div className="tnum text-sm font-semibold text-gold-light">{b.odd}</div>
                <button onClick={() => remove(b.key)} className="text-ink-faint hover:text-ruby" aria-label="remove">
                  <X style={{ width: 15, height: 15 }} />
                </button>
              </div>
            ))}
          </div>

          <div className="p-4">
            <div className="mb-2 flex items-center justify-between text-[12px] text-ink-muted">
              <span>{slip.length > 1 ? t('sb.combo') : t('sb.single')}</span>
              <span className="tnum text-gold-light">{t('sb.totalOdds')}: {totalOdds.toFixed(2)}</span>
            </div>
            <div className="mb-3 flex items-stretch overflow-hidden rounded-lg border border-line" style={{ background: '#1d1d1d' }}>
              <span className="grid place-items-center px-3 text-[12px] text-ink-muted">{t('sb.stake')}</span>
              <input
                type="number"
                value={stake}
                onChange={(e) => setStake(e.target.value)}
                className="tnum w-full bg-transparent px-2 py-2.5 text-right text-ink outline-none"
                style={{ fontSize: 16 }}
              />
              <span className="grid place-items-center border-l border-line px-3 text-gold-light">₺</span>
            </div>
            <div className="mb-3 flex items-center justify-between rounded-lg border border-line p-3" style={{ background: 'rgba(212,175,55,0.06)' }}>
              <span className="text-[12px] text-ink-muted">{t('sb.payout')}</span>
              <span className="tnum font-display text-lg font-semibold text-foil">{payout.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ₺</span>
            </div>
            <button onClick={submit} className="btn-gold w-full py-3">{t('sb.place')}</button>
          </div>
        </>
      )}
    </div>
  )
}
