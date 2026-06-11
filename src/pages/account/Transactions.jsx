import { Receipt } from 'lucide-react'
import { useT } from '../../i18n'
import { useUI } from '../../store/ui'
import TxRow from '../../components/account/TxRow'

export default function Transactions() {
  const t = useT()
  const transactions = useUI((s) => s.transactions)

  return (
    <div>
      <div className="mb-5">
        <h1 className="font-display text-2xl font-semibold text-ink">{t('tx.title')}</h1>
        <p className="mt-1 text-sm text-ink-muted">{t('tx.subtitle')}</p>
      </div>

      {transactions.length === 0 ? (
        <div className="card-glass grid place-items-center p-12 text-center">
          <Receipt style={{ width: 38, height: 38, color: 'var(--text-faint)' }} />
          <div className="mt-3 text-sm text-ink-muted">{t('tx.empty')}</div>
        </div>
      ) : (
        <div className="card-glass overflow-hidden">
          <div className="divide-y divide-[color:var(--border)]">
            {transactions.map((tx) => (
              <TxRow key={tx.id} tx={tx} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
