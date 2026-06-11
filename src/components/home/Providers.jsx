import { useT } from '../../i18n'
import { PROVIDERS } from '../../config/site'
import Reveal from '../ui/Reveal'

export default function Providers() {
  const t = useT()
  return (
    <section className="container-page py-10">
      <Reveal>
        <div className="mb-5 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">
          {t('providers.title')}
        </div>
      </Reveal>
      <Reveal delay={80}>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {PROVIDERS.map((p) => (
            <span
              key={p}
              className="rounded-xl border border-line px-4 py-2.5 font-display text-sm text-ink-muted transition-colors hover:text-gold-light"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              {p}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
