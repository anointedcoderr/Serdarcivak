import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Wallet, Landmark, Smartphone, Bitcoin, Check, CheckCircle2, ArrowRight } from 'lucide-react'
import { useT } from '../../i18n'
import { useUI } from '../../store/ui'
import { DEPOSIT_METHODS, AMOUNT_PRESETS } from '../../config/site'
import { PATHS } from '../../router/paths'
import { cn } from '../../lib/cn'

const ICONS = { wallet: Wallet, landmark: Landmark, smartphone: Smartphone, bitcoin: Bitcoin }

export default function Deposit() {
  const t = useT()
  const addTransaction = useUI((s) => s.addTransaction)
  const toast = useUI((s) => s.toast)
  const [methodId, setMethodId] = useState(DEPOSIT_METHODS[0].id)
  const [amount, setAmount] = useState(1000)
  const [done, setDone] = useState(false)

  const method = DEPOSIT_METHODS.find((m) => m.id === methodId)
  const fiat = DEPOSIT_METHODS.filter((m) => m.kind === 'fiat')
  const crypto = DEPOSIT_METHODS.filter((m) => m.kind === 'crypto')

  const submit = () => {
    if (!amount || amount < method.min) {
      toast(`${t('deposit.min')} ${method.min.toLocaleString('tr-TR')} ₺`, 'error')
      return
    }
    addTransaction({ type: 'deposit', method: method.name, amount: Number(amount) })
    setDone(true)
  }

  if (done) {
    return (
      <div className="card-glass relative mx-auto max-w-lg overflow-hidden p-8 text-center">
        <span className="absolute inset-x-0 top-0 h-0.5" style={{ background: 'linear-gradient(90deg,transparent,#d4af37,transparent)' }} />
        <span className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full" style={{ background: 'rgba(52,211,153,0.12)' }}>
          <CheckCircle2 style={{ width: 30, height: 30, color: 'var(--emerald)' }} />
        </span>
        <h1 className="text-2xl font-semibold text-foil">{t('deposit.successTitle')}</h1>
        <p className="mx-auto mb-2 mt-2 max-w-sm text-sm text-ink-muted">{t('deposit.successBody')}</p>
        <div className="tnum my-4 font-display text-3xl font-semibold text-gold-light">
          +{Number(amount).toLocaleString('tr-TR')} ₺
        </div>
        <div className="flex justify-center gap-2">
          <Link to={PATHS.transactions} className="btn-gold">
            {t('deposit.viewHistory')} <ArrowRight style={{ width: 15, height: 15 }} />
          </Link>
          <button onClick={() => setDone(false)} className="btn-ghost">{t('deposit.again')}</button>
        </div>
      </div>
    )
  }

  const MethodCard = (m) => {
    const Icon = ICONS[m.icon] || Wallet
    const active = m.id === methodId
    return (
      <button
        key={m.id}
        onClick={() => setMethodId(m.id)}
        className={cn(
          'flex items-center gap-3 rounded-xl border p-3 text-left transition-colors',
          active ? 'border-gold/60' : 'border-line hover:border-gold/30',
        )}
        style={{ background: active ? 'rgba(212,175,55,0.08)' : 'rgba(255,255,255,0.02)' }}
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg" style={{ background: 'rgba(0,0,0,0.3)' }}>
          <Icon style={{ width: 18, height: 18, color: active ? 'var(--gold)' : 'var(--text-muted)' }} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium text-ink">{m.name}</span>
          <span className="block text-[11px] text-ink-faint">{t('deposit.min')} {m.min.toLocaleString('tr-TR')} ₺ · {m.eta}</span>
        </span>
        {active && <Check style={{ width: 16, height: 16, color: 'var(--gold)' }} />}
      </button>
    )
  }

  return (
    <div>
      <div className="mb-5">
        <h1 className="font-display text-2xl font-semibold text-ink">{t('deposit.title')}</h1>
        <p className="mt-1 text-sm text-ink-muted">{t('deposit.subtitle')}</p>
      </div>

      <div className="card-glass p-5 sm:p-6">
        <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-gold-deep">{t('deposit.fiat')}</div>
        <div className="grid gap-2.5 sm:grid-cols-3">{fiat.map(MethodCard)}</div>

        <div className="mb-2 mt-5 text-[11px] font-semibold uppercase tracking-wide text-gold-deep">{t('deposit.crypto')}</div>
        <div className="grid gap-2.5 sm:grid-cols-3">{crypto.map(MethodCard)}</div>

        {/* amount */}
        <div className="mt-6">
          <div className="mb-2 text-[12px] font-medium text-ink-muted">{t('deposit.amount')}</div>
          <div className="mb-3 flex flex-wrap gap-2">
            {AMOUNT_PRESETS.map((p) => (
              <button
                key={p}
                onClick={() => setAmount(p)}
                className={cn(
                  'tnum rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors',
                  amount === p ? 'border-transparent text-[#120d00]' : 'border-line text-ink-muted hover:text-ink',
                )}
                style={amount === p ? { background: 'linear-gradient(135deg,#f7e7b6,#d4af37)' } : { background: 'rgba(255,255,255,0.02)' }}
              >
                {p.toLocaleString('tr-TR')} ₺
              </button>
            ))}
          </div>
          <div className="flex items-stretch overflow-hidden rounded-lg border border-line" style={{ background: '#1d1d1d' }}>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={t('deposit.amountPlaceholder')}
              className="tnum w-full bg-transparent px-3.5 py-3 text-ink outline-none placeholder:text-ink-faint"
              style={{ fontSize: 16 }}
            />
            <span className="grid place-items-center border-l border-line px-4 text-gold-light">₺</span>
          </div>
        </div>

        <button onClick={submit} className="btn-gold mt-5 w-full py-3">
          {t('deposit.submit')}
        </button>
        <p className="mt-3 text-center text-[11px] text-ink-faint">{t('auth.demoNote')}</p>
      </div>
    </div>
  )
}
