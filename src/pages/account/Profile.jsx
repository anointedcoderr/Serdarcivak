import { Link } from 'react-router-dom'
import { Coins, Plus, Banknote, ShieldCheck, ArrowRight } from 'lucide-react'
import { useT } from '../../i18n'
import { useUI } from '../../store/ui'
import { PATHS } from '../../router/paths'
import TxRow from '../../components/account/TxRow'

export default function Profile() {
  const t = useT()
  const user = useUI((s) => s.user)
  const transactions = useUI((s) => s.transactions)

  return (
    <div className="flex flex-col gap-5">
      {/* balance card */}
      <div className="card-glass relative overflow-hidden p-6">
        <div className="absolute -right-6 -top-6 opacity-10">
          <Coins style={{ width: 130, height: 130, color: 'var(--gold)' }} strokeWidth={1} />
        </div>
        <div className="relative text-xs font-semibold uppercase tracking-[0.18em] text-gold-deep">
          {t('account.welcome')}, {user.name}
        </div>
        <div className="relative mt-1 text-sm text-ink-muted">{t('account.balance')}</div>
        <div className="relative mt-1 font-display text-[40px] font-semibold leading-none text-foil">
          <span className="tnum">{user.balance.toLocaleString('tr-TR')}</span> ₺
        </div>
        <div className="relative mt-5 flex flex-wrap gap-2">
          <Link to={PATHS.deposit} className="btn-gold">
            <Plus style={{ width: 16, height: 16 }} /> {t('account.quickDeposit')}
          </Link>
          <Link to={PATHS.withdraw} className="btn-ghost">
            <Banknote style={{ width: 16, height: 16 }} /> {t('account.quickWithdraw')}
          </Link>
        </div>
      </div>

      {/* kyc + note */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="card-glass flex items-center gap-3 p-5">
          <span className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: 'rgba(245,158,11,0.12)' }}>
            <ShieldCheck style={{ width: 20, height: 20, color: '#f59e0b' }} />
          </span>
          <div>
            <div className="text-[13px] text-ink-muted">{t('account.kycStatus')}</div>
            <div className="font-display text-base font-semibold text-ink">{t('account.kycPending')}</div>
          </div>
        </div>
        <div className="card-glass flex items-center p-5 text-[13px] text-ink-muted">
          {t('account.profileNote')}
        </div>
      </div>

      {/* recent */}
      <div className="card-glass overflow-hidden">
        <div className="flex items-center justify-between border-b border-line p-4">
          <h2 className="font-display text-base font-semibold text-ink">{t('account.recent')}</h2>
          <Link to={PATHS.transactions} className="inline-flex items-center gap-1 text-[13px] text-gold-light hover:text-gold-champagne">
            {t('common.seeAll')} <ArrowRight style={{ width: 14, height: 14 }} />
          </Link>
        </div>
        <div className="divide-y divide-[color:var(--border)]">
          {transactions.slice(0, 4).map((tx) => (
            <TxRow key={tx.id} tx={tx} />
          ))}
        </div>
      </div>
    </div>
  )
}
