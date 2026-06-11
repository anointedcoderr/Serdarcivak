import { Link } from 'react-router-dom'
import { FileText, Shield, FileCheck, Heart, IdCard, Rocket, ArrowLeft } from 'lucide-react'
import { useLang, useT } from '../../i18n'
import { LEGAL } from '../../content/legal'
import { PATHS } from '../../router/paths'

const ICONS = { 'file-text': FileText, shield: Shield, 'file-check': FileCheck, heart: Heart, 'id-card': IdCard, rocket: Rocket }

export default function LegalPage({ docKey }) {
  const t = useT()
  const { lang } = useLang()
  const doc = LEGAL[docKey]
  const c = doc[lang] || doc.tr
  const Icon = ICONS[doc.icon] || FileText

  return (
    <main className="container-page max-w-3xl py-10">
      <div className="mb-6 flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-2xl" style={{ background: 'rgba(212,175,55,0.1)' }}>
          <Icon style={{ width: 24, height: 24, color: 'var(--gold)' }} />
        </span>
        <div>
          <h1 className="font-display text-2xl font-semibold text-foil sm:text-3xl">{c.title}</h1>
          <p className="mt-1 text-sm text-ink-muted">{c.intro}</p>
        </div>
      </div>

      <div className="card-glass p-6 sm:p-8">
        <div className="flex flex-col gap-6">
          {c.sections.map((s, i) => (
            <section key={i}>
              <h2 className="font-display text-base font-semibold text-gold-light">{s.h}</h2>
              <p className="mt-1.5 text-[14px] leading-relaxed text-ink-muted">{s.p}</p>
            </section>
          ))}
        </div>
        <div className="mt-8 border-t border-line pt-5 text-[12px] text-ink-faint">
          {t('legal.updated')}: 11.06.2026
        </div>
      </div>

      <Link to={PATHS.home} className="mt-6 inline-flex items-center gap-2 text-sm text-ink-muted hover:text-gold-light">
        <ArrowLeft style={{ width: 15, height: 15 }} /> {t('legal.back')}
      </Link>
    </main>
  )
}
