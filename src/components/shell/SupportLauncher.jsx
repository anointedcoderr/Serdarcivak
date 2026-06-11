import { useState } from 'react'
import { Headset, X, Send, MessageCircle } from 'lucide-react'
import { useT } from '../../i18n'
import { BUILDER } from '../../config/site'

// Floating live-support launcher (desktop). Mobile uses the bottom-nav Destek button.
export default function SupportLauncher() {
  const t = useT()
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-5 right-5 z-[110] hidden md:block">
      {open && (
        <div className="card-glass mb-3 w-60 overflow-hidden p-4 animate-slide-up">
          <div className="mb-3 text-sm font-semibold text-ink">{t('support.title')}</div>
          <div className="flex flex-col gap-2">
            <a href={BUILDER.telegram} target="_blank" rel="noopener noreferrer" className="btn-ghost justify-start text-[13px]">
              <Send style={{ width: 16, height: 16 }} />
              Telegram
            </a>
            <a href={BUILDER.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-ghost justify-start text-[13px]">
              <MessageCircle style={{ width: 16, height: 16 }} />
              WhatsApp
            </a>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        className="grid h-14 w-14 place-items-center rounded-full shadow-glow"
        style={{ background: 'linear-gradient(135deg,#f7e7b6,#d4af37)' }}
        aria-label={t('common.support')}
      >
        {open ? (
          <X style={{ width: 22, height: 22, color: '#120d00' }} />
        ) : (
          <Headset style={{ width: 24, height: 24, color: '#120d00' }} />
        )}
      </button>
    </div>
  )
}
