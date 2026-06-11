import { useState } from 'react'
import { IdCard, Home, CreditCard, Camera, Upload, Check } from 'lucide-react'
import { useT } from '../../i18n'
import { useUI } from '../../store/ui'

const DOCS = [
  { id: 'id', Icon: IdCard, k: 'idDoc' },
  { id: 'address', Icon: Home, k: 'address' },
  { id: 'payment', Icon: CreditCard, k: 'payment' },
  { id: 'selfie', Icon: Camera, k: 'selfie' },
]

export default function Kyc() {
  const t = useT()
  const toast = useUI((s) => s.toast)
  const [uploaded, setUploaded] = useState({})

  return (
    <div>
      <div className="mb-5">
        <h1 className="font-display text-2xl font-semibold text-ink">{t('kyc.title')}</h1>
        <p className="mt-1 text-sm text-ink-muted">{t('kyc.subtitle')}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {DOCS.map(({ id, Icon, k }) => {
          const done = uploaded[id]
          return (
            <div key={id} className="card-glass p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: done ? 'rgba(52,211,153,0.12)' : 'rgba(212,175,55,0.1)' }}>
                  <Icon style={{ width: 20, height: 20, color: done ? 'var(--emerald)' : 'var(--gold)' }} />
                </span>
                <div className="min-w-0">
                  <div className="font-display text-base font-semibold text-ink">{t(`kyc.${k}`)}</div>
                  <div className="truncate text-[12px] text-ink-muted">{t(`kyc.${k}Desc`)}</div>
                </div>
              </div>
              <button
                onClick={() => setUploaded((u) => ({ ...u, [id]: true }))}
                className={done ? 'btn-ghost mt-4 w-full' : 'btn-gold mt-4 w-full'}
              >
                {done ? <><Check style={{ width: 16, height: 16 }} /> {t('kyc.uploaded')}</> : <><Upload style={{ width: 16, height: 16 }} /> {t('kyc.upload')}</>}
              </button>
            </div>
          )
        })}
      </div>

      <p className="mt-4 text-[12.5px] text-ink-faint">{t('kyc.note')}</p>
      <button onClick={() => toast(t('kyc.pending'), 'info')} className="btn-gold mt-4 w-full sm:w-auto sm:px-8">
        {t('kyc.submit')}
      </button>
    </div>
  )
}
