import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { useLang, useT } from '../i18n'
import { FAQ } from '../content/faq'

export default function Faq() {
  const t = useT()
  const { lang } = useLang()
  const items = FAQ[lang] || FAQ.tr
  const [open, setOpen] = useState(0)

  return (
    <main className="container-page max-w-3xl py-10">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl" style={{ background: 'rgba(212,175,55,0.1)' }}>
          <HelpCircle style={{ width: 24, height: 24, color: 'var(--gold)' }} />
        </div>
        <h1 className="font-display text-3xl font-semibold text-foil sm:text-4xl">{t('faq.title')}</h1>
        <p className="mt-2 text-sm text-ink-muted">{t('faq.subtitle')}</p>
      </div>

      <div className="flex flex-col gap-2.5">
        {items.map((item, i) => {
          const isOpen = open === i
          return (
            <div key={i} className="card-glass overflow-hidden">
              <button onClick={() => setOpen(isOpen ? -1 : i)} className="flex w-full items-center justify-between gap-3 p-4 text-left">
                <span className="text-[15px] font-medium text-ink">{item.q}</span>
                <ChevronDown style={{ width: 18, height: 18, color: 'var(--gold-light)', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }} />
              </button>
              {isOpen && <div className="px-4 pb-4 text-[14px] leading-relaxed text-ink-muted">{item.a}</div>}
            </div>
          )
        })}
      </div>
    </main>
  )
}
