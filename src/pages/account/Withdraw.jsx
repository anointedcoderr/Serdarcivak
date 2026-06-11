import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, ArrowRight, Banknote } from 'lucide-react'
import { useT } from '../../i18n'
import { useUI } from '../../store/ui'
import { DEPOSIT_METHODS, AMOUNT_PRESETS } from '../../config/site'
import { PATHS } from '../../router/paths'
import { cn } from '../../lib/cn'

export default function Withdraw() {
  const t = useT()
  const user = useUI((s) => s.user)
  const addTransaction = useUI((s) => s.addTransaction)
  const toast = useUI((s) => s.toast)
  const [methodId, setMethodId] = useState(DEPOSIT_METHODS[0].id)
  const [amount, setAmount] = useState(500)
  const [account, setAccount] = useState('')
  const [done, setDone] = useState(false)

  const method = DEPOSIT_METHODS.find((m) => m.id === methodId)
  const presets = AMOUNT_PRESETS.filter((p) => p <= user.balance).slice(0, 4)

  const submit = () => {
    if (!amount || Number(amount) <= 0) return
    if (Number(amount) > user.balance) {
      toast(t('withdraw.insufficient'), 'error')
      return
    }
    addTransaction({ type: 'withdraw', method: method.name, amount: Number(amount) })
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
        <p className="mx-auto mb-2 mt-2 max-w-sm text-sm text-ink-muted">{t('withdraw.successBody')}</p>
        <div className="tnum my-4 font-display text-3xl font-semibold text-gold-light">
          {Number(amount).toLocaleString('tr-TR')} ₺
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

  return (
    <div>
      <div className="mb-5">
        <h1 className="font-display text-2xl font-semibold text-ink">{t('withdraw.title')}</h1>
        <p className="mt-1 text-sm text-ink-muted">{t('withdraw.subtitle')}</p>
      </div>

      <div className="card-glass p-5 sm:p-6">
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-line p-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
          <span className="grid h-10 w-10 place-items-center rounded-lg" style={{ background: 'rgba(212,175,55,0.1)' }}>
            <Banknote style={{ width: 18, height: 18, color: 'var(--gold)' }} />
          </span>
          <div>
            <div className="text-[12px] text-ink-muted">{t('withdraw.available')}</div>
            <div className="tnum font-display text-xl font-semibold text-gold-light">{user.balance.toLocaleString('tr-TR')} ₺</div>
          </div>
        </div>

        {/* method */}
        <div className="mb-2 text-[12px] font-medium text-ink-muted">{t('withdraw.method')}</div>
        <div className="no-scrollbar mb-5 flex gap-2 overflow-x-auto">
          {DEPOSIT_METHODS.map((m) => (
            <button
              key={m.id}
              onClick={() => setMethodId(m.id)}
              className={cn(
                'shrink-0 rounded-lg border px-3.5 py-2 text-sm transition-colors',
                m.id === methodId ? 'border-transparent text-[#120d00]' : 'border-line text-ink-muted hover:text-ink',
              )}
              style={m.id === methodId ? { background: 'linear-gradient(135deg,#f7e7b6,#d4af37)' } : { background: 'rgba(255,255,255,0.02)' }}
            >
              {m.name}
            </button>
          ))}
        </div>

        {/* amount */}
        <div className="mb-2 text-[12px] font-medium text-ink-muted">{t('deposit.amount')}</div>
        {presets.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {presets.map((p) => (
              <button
                key={p}
                onClick={() => setAmount(p)}
                className="tnum rounded-lg border border-line px-3.5 py-2 text-sm text-ink-muted transition-colors hover:text-ink"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                {p.toLocaleString('tr-TR')} ₺
              </button>
            ))}
          </div>
        )}
        <div className="mb-4 flex items-stretch overflow-hidden rounded-lg border border-line" style={{ background: '#1d1d1d' }}>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="tnum w-full bg-transparent px-3.5 py-3 text-ink outline-none"
            style={{ fontSize: 16 }}
          />
          <span className="grid place-items-center border-l border-line px-4 text-gold-light">₺</span>
        </div>

        {/* account */}
        <div className="mb-2 text-[12px] font-medium text-ink-muted">{t('withdraw.account')}</div>
        <input
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          placeholder={t('withdraw.accountPlaceholder')}
          className="w-full rounded-lg border border-line bg-[#1d1d1d] px-3.5 py-3 text-ink outline-none placeholder:text-ink-faint focus:border-gold/50"
          style={{ fontSize: 16 }}
        />

        <button onClick={submit} className="btn-gold mt-5 w-full py-3">
          {t('withdraw.submit')}
        </button>
        <p className="mt-3 text-center text-[11px] text-ink-faint">{t('auth.demoNote')}</p>
      </div>
    </div>
  )
}
