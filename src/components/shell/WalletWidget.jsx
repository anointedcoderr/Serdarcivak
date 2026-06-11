import { useNavigate } from 'react-router-dom'
import { Plus, Coins } from 'lucide-react'
import { useUI } from '../../store/ui'
import { useT } from '../../i18n'
import { PATHS } from '../../router/paths'

// Shows guest auth buttons or, for a mock-logged-in user, the balance + deposit.
export default function WalletWidget() {
  const t = useT()
  const navigate = useNavigate()
  const user = useUI((s) => s.user)
  const openAuth = useUI((s) => s.openAuth)

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <button onClick={() => openAuth('login')} className="btn-ghost px-4 py-2 text-[13px]">
          {t('common.login')}
        </button>
        <button onClick={() => openAuth('register')} className="btn-gold px-4 py-2 text-[13px]">
          {t('common.register')}
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <div
        className="flex items-center gap-2 rounded-lg border border-line px-3 py-1.5"
        style={{ background: 'rgba(15,15,15,0.9)' }}
      >
        <Coins style={{ width: 16, height: 16, color: 'var(--gold)' }} />
        <span className="tnum text-[13px] font-semibold text-ink">
          {user.balance.toLocaleString('tr-TR')} ₺
        </span>
      </div>
      <button onClick={() => navigate(PATHS.deposit)} className="btn-gold px-3 py-2 text-[13px]">
        <Plus style={{ width: 15, height: 15 }} />
        <span className="hidden sm:inline">{t('wallet.deposit')}</span>
      </button>
    </div>
  )
}
