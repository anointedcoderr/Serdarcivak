import { useState } from 'react'
import { Gift } from 'lucide-react'
import { useT } from '../../i18n'
import { useUI } from '../../store/ui'
import { PLAYER_BONUSES } from '../../services/mock'
import { cn } from '../../lib/cn'

export default function Bonuses() {
  const t = useT()
  const toast = useUI((s) => s.toast)
  const [tab, setTab] = useState('active')

  const tabs = ['active', 'available', 'used']

  return (
    <div>
      <div className="mb-5">
        <h1 className="font-display text-2xl font-semibold text-ink">{t('bonuses.title')}</h1>
      </div>

      <div className="mb-5 flex gap-1.5">
        {tabs.map((tb) => (
          <button
            key={tb}
            onClick={() => setTab(tb)}
            className={cn('rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors', tab === tb ? 'text-[#120d00]' : 'text-ink-muted hover:text-ink')}
            style={tab === tb ? { background: 'linear-gradient(135deg,#f7e7b6,#d4af37)' } : { background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}
          >
            {t(`bonuses.${tb}`)}
          </button>
        ))}
      </div>

      {tab === 'active' && (
        PLAYER_BONUSES.active.length === 0 ? (
          <Empty t={t} />
        ) : (
          <div className="flex flex-col gap-3">
            {PLAYER_BONUSES.active.map((b) => {
              const pct = Math.min(100, Math.round((b.wagered / b.target) * 100))
              return (
                <div key={b.id} className="card-glass p-5">
                  <div className="flex items-center justify-between">
                    <div className="font-display text-base font-semibold text-ink">{b.title}</div>
                    <div className="tnum text-gold-light">{b.amount.toLocaleString('tr-TR')} ₺</div>
                  </div>
                  <div className="mb-2 mt-4 flex items-center justify-between text-[12px] text-ink-muted">
                    <span>{t('bonuses.wagering')}</span>
                    <span className="tnum">{b.wagered.toLocaleString('tr-TR')} / {b.target.toLocaleString('tr-TR')}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: 'linear-gradient(90deg,#34d399,#6ee7b7)' }} />
                  </div>
                  <div className="mt-2 text-[12px] text-ink-faint">{t('bonuses.expires')}: {b.expires}</div>
                </div>
              )
            })}
          </div>
        )
      )}

      {tab === 'available' && (
        <div className="grid gap-3 sm:grid-cols-2">
          {PLAYER_BONUSES.available.map((b) => (
            <div key={b.id} className="card-glass p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: 'rgba(212,175,55,0.1)' }}>
                  <Gift style={{ width: 18, height: 18, color: 'var(--gold)' }} />
                </span>
                <div>
                  <div className="font-display text-base font-semibold text-ink">{b.title}</div>
                  <div className="text-[12px] text-ink-muted">{b.desc}</div>
                </div>
              </div>
              <button onClick={() => toast(b.cta, 'success')} className="btn-gold mt-4 w-full">{t('bonuses.claim')}</button>
            </div>
          ))}
        </div>
      )}

      {tab === 'used' && (
        <div className="card-glass overflow-hidden">
          <div className="divide-y divide-[color:var(--border)]">
            {PLAYER_BONUSES.used.map((b) => (
              <div key={b.id} className="flex items-center justify-between p-4">
                <div>
                  <div className="text-sm font-medium text-ink">{b.title}</div>
                  <div className="text-[12px] text-ink-faint">{b.date}</div>
                </div>
                <div className="tnum text-sm text-gold-light">{b.amount.toLocaleString('tr-TR')} ₺</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function Empty({ t }) {
  return (
    <div className="card-glass grid place-items-center p-12 text-center">
      <Gift style={{ width: 36, height: 36, color: 'var(--text-faint)' }} />
      <div className="mt-3 text-sm text-ink-muted">{t('bonuses.noActive')}</div>
    </div>
  )
}
