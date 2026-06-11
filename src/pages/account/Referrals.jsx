import { Copy, Users, UserCheck, Coins } from 'lucide-react'
import { useT } from '../../i18n'
import { useUI } from '../../store/ui'
import { REFERRAL } from '../../services/mock'

export default function Referrals() {
  const t = useT()
  const toast = useUI((s) => s.toast)

  const copy = (text) => {
    try {
      navigator.clipboard?.writeText(text)
    } catch {
      // ignore
    }
    toast(t('referral.copied'), 'success')
  }

  const stats = [
    { Icon: Users, label: t('referral.invited'), value: REFERRAL.invited },
    { Icon: UserCheck, label: t('referral.activeRef'), value: REFERRAL.active },
    { Icon: Coins, label: t('referral.earned'), value: `${REFERRAL.earned.toLocaleString('tr-TR')} ₺` },
  ]

  return (
    <div>
      <div className="mb-5">
        <h1 className="font-display text-2xl font-semibold text-ink">{t('referral.title')}</h1>
        <p className="mt-1 text-sm text-ink-muted">{t('referral.subtitle')}</p>
      </div>

      {/* code + link */}
      <div className="card-glass p-5">
        <div className="text-[12px] font-medium text-ink-muted">{t('referral.yourCode')}</div>
        <div className="mt-1.5 flex items-stretch gap-2">
          <div className="tnum flex-1 rounded-lg border border-line px-4 py-3 font-display text-lg font-semibold tracking-wider text-gold-light" style={{ background: 'rgba(212,175,55,0.06)' }}>
            {REFERRAL.code}
          </div>
          <button onClick={() => copy(REFERRAL.code)} className="btn-gold px-4"><Copy style={{ width: 16, height: 16 }} /></button>
        </div>
        <div className="mt-4 text-[12px] font-medium text-ink-muted">{t('referral.yourLink')}</div>
        <div className="mt-1.5 flex items-stretch gap-2">
          <div className="flex-1 truncate rounded-lg border border-line px-4 py-3 text-sm text-ink-muted" style={{ background: '#1d1d1d' }}>
            {REFERRAL.link}
          </div>
          <button onClick={() => copy(REFERRAL.link)} className="btn-ghost px-4">{t('referral.copy')}</button>
        </div>
      </div>

      {/* stats */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="card-glass p-4 text-center">
            <s.Icon className="mx-auto" style={{ width: 20, height: 20, color: 'var(--gold)' }} />
            <div className="tnum mt-2 font-display text-xl font-semibold text-foil">{s.value}</div>
            <div className="text-[11px] text-ink-faint">{s.label}</div>
          </div>
        ))}
      </div>

      {/* how */}
      <h2 className="mb-4 mt-8 font-display text-lg font-semibold text-ink">{t('referral.howTitle')}</h2>
      <div className="grid gap-3 sm:grid-cols-3">
        {t('referral.steps').map((step, i) => (
          <div key={i} className="card-glass p-5">
            <span className="grid h-9 w-9 place-items-center rounded-full font-display font-semibold text-[#120d00]" style={{ background: 'linear-gradient(135deg,#f7e7b6,#d4af37)' }}>{i + 1}</span>
            <div className="mt-3 text-[13px] text-ink-muted">{step}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
