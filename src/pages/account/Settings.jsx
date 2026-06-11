import { useState } from 'react'
import { ShieldCheck, Globe } from 'lucide-react'
import { useT } from '../../i18n'
import { useUI } from '../../store/ui'
import LanguageToggle from '../../components/shell/LanguageToggle'

function LimitRow({ label, value, onValue, period, onPeriod, periods, t }) {
  return (
    <div className="flex flex-col gap-2 border-b border-line py-4 sm:flex-row sm:items-center">
      <div className="flex-1 text-sm text-ink">{label}</div>
      <div className="flex gap-2">
        <select
          value={period}
          onChange={(e) => onPeriod(e.target.value)}
          className="rounded-lg border border-line bg-[#1d1d1d] px-3 py-2 text-sm text-ink outline-none"
        >
          {periods.map((p) => (
            <option key={p} value={p}>{t(`settings.period.${p}`)}</option>
          ))}
        </select>
        <div className="flex items-stretch overflow-hidden rounded-lg border border-line" style={{ background: '#1d1d1d' }}>
          <input type="number" value={value} onChange={(e) => onValue(e.target.value)} className="tnum w-28 bg-transparent px-3 py-2 text-ink outline-none" style={{ fontSize: 16 }} />
          <span className="grid place-items-center border-l border-line px-2.5 text-gold-light">₺</span>
        </div>
      </div>
    </div>
  )
}

export default function Settings() {
  const t = useT()
  const toast = useUI((s) => s.toast)
  const [dep, setDep] = useState(5000)
  const [depP, setDepP] = useState('daily')
  const [loss, setLoss] = useState(2500)
  const [lossP, setLossP] = useState('weekly')
  const [session, setSession] = useState(120)

  const periods = ['daily', 'weekly', 'monthly']

  return (
    <div>
      <div className="mb-5">
        <h1 className="font-display text-2xl font-semibold text-ink">{t('settings.title')}</h1>
        <p className="mt-1 text-sm text-ink-muted">{t('settings.subtitle')}</p>
      </div>

      {/* responsible gaming */}
      <div className="card-glass p-5">
        <div className="mb-2 flex items-center gap-2">
          <ShieldCheck style={{ width: 18, height: 18, color: 'var(--gold)' }} />
          <h2 className="font-display text-base font-semibold text-ink">{t('settings.rg')}</h2>
        </div>
        <LimitRow label={t('settings.depositLimit')} value={dep} onValue={setDep} period={depP} onPeriod={setDepP} periods={periods} t={t} />
        <LimitRow label={t('settings.lossLimit')} value={loss} onValue={setLoss} period={lossP} onPeriod={setLossP} periods={periods} t={t} />
        <div className="flex flex-col gap-2 border-b border-line py-4 sm:flex-row sm:items-center">
          <div className="flex-1 text-sm text-ink">{t('settings.sessionLimit')}</div>
          <div className="flex items-stretch overflow-hidden rounded-lg border border-line" style={{ background: '#1d1d1d', maxWidth: 140 }}>
            <input type="number" value={session} onChange={(e) => setSession(e.target.value)} className="tnum w-full bg-transparent px-3 py-2 text-ink outline-none" style={{ fontSize: 16 }} />
            <span className="grid place-items-center border-l border-line px-2.5 text-gold-light">dk</span>
          </div>
        </div>
        <div className="flex items-center justify-between py-4">
          <div>
            <div className="text-sm text-ink">{t('settings.selfExclude')}</div>
            <div className="text-[12px] text-ink-muted">{t('settings.selfExcludeDesc')}</div>
          </div>
          <button onClick={() => toast(t('settings.selfExclude'), 'info')} className="btn-ghost" style={{ color: 'var(--ruby)', borderColor: 'rgba(255,77,94,0.4)' }}>
            {t('settings.selfExclude')}
          </button>
        </div>
        <p className="text-[12px] text-ink-faint">{t('settings.rgNote')}</p>
        <button onClick={() => toast(t('settings.saved'), 'success')} className="btn-gold mt-4">{t('settings.save')}</button>
      </div>

      {/* language */}
      <div className="card-glass mt-4 flex items-center justify-between p-5">
        <div className="flex items-center gap-2">
          <Globe style={{ width: 18, height: 18, color: 'var(--gold)' }} />
          <span className="text-sm text-ink">{t('settings.language')}</span>
        </div>
        <LanguageToggle />
      </div>
    </div>
  )
}
