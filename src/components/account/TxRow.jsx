import { ArrowDownLeft, ArrowUpRight, Gift, Dices } from 'lucide-react'
import { useT } from '../../i18n'

const TYPE = {
  deposit: { Icon: ArrowDownLeft, color: 'var(--emerald)', sign: '+' },
  withdraw: { Icon: ArrowUpRight, color: 'var(--ruby)', sign: '-' },
  bonus: { Icon: Gift, color: 'var(--gold-light)', sign: '+' },
  bet: { Icon: Dices, color: 'var(--text-muted)', sign: '' },
}

const STATUS = {
  pending: { bg: 'rgba(245,158,11,0.14)', color: '#f0b44b' },
  approved: { bg: 'rgba(52,211,153,0.14)', color: '#6ee7b7' },
  rejected: { bg: 'rgba(255,77,94,0.14)', color: '#ff8c97' },
}

export default function TxRow({ tx }) {
  const t = useT()
  const ty = TYPE[tx.type] || TYPE.bet
  const st = STATUS[tx.status] || STATUS.pending

  return (
    <div className="flex items-center gap-3 p-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line" style={{ background: 'rgba(0,0,0,0.25)' }}>
        <ty.Icon style={{ width: 18, height: 18, color: ty.color }} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium text-ink">{t(`tx.types.${tx.type}`)}</div>
        <div className="truncate text-[12px] text-ink-faint">{tx.method} · {tx.date}</div>
      </div>
      <div className="text-right">
        <div className="tnum text-sm font-semibold" style={{ color: ty.color }}>
          {ty.sign}{tx.amount.toLocaleString('tr-TR')} ₺
        </div>
        <span className="pill mt-0.5" style={{ background: st.bg, color: st.color }}>
          {t(`tx.statuses.${tx.status}`)}
        </span>
      </div>
    </div>
  )
}
