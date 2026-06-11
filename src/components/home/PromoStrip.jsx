import { Gift, Percent, Sparkles, ArrowRight } from 'lucide-react'
import { useUI } from '../../store/ui'
import { useT } from '../../i18n'
import { PATHS } from '../../router/paths'
import SectionHeader from './SectionHeader'
import Reveal from '../ui/Reveal'

export default function PromoStrip() {
  const t = useT()
  const openAuth = useUI((s) => s.openAuth)

  const promos = [
    { Icon: Gift, title: t('promos.welcomeTitle'), desc: t('promos.welcomeDesc'), grad: ['#1d2a52', '#0a0f1e'], accent: '#63b3ff' },
    { Icon: Sparkles, title: t('promos.trialTitle'), desc: t('promos.trialDesc'), grad: ['#3a2f0c', '#100c05'], accent: '#e9c96a' },
    { Icon: Percent, title: t('promos.cashbackTitle'), desc: t('promos.cashbackDesc'), grad: ['#0c3326', '#06120d'], accent: '#34d399' },
  ]

  return (
    <section className="container-page py-8">
      <Reveal>
        <SectionHeader title={t('promos.title')} subtitle={t('promos.subtitle')} to={PATHS.promotions} />
      </Reveal>
      <div className="grid gap-3 md:grid-cols-3">
        {promos.map((p, i) => (
          <Reveal key={p.title} delay={i * 90}>
            <div
              className="group relative overflow-hidden rounded-2xl border border-line p-6"
              style={{ background: `linear-gradient(155deg, ${p.grad[0]}, ${p.grad[1]})` }}
            >
              <p.Icon
                className="absolute -right-4 -top-3 opacity-15 transition-transform duration-500 group-hover:scale-110"
                style={{ width: 110, height: 110, color: p.accent }}
                strokeWidth={1.1}
              />
              <span
                className="relative grid h-11 w-11 place-items-center rounded-xl"
                style={{ background: 'rgba(0,0,0,0.3)', border: `1px solid ${p.accent}40` }}
              >
                <p.Icon style={{ width: 22, height: 22, color: p.accent }} />
              </span>
              <div className="relative mt-4 font-display text-xl font-semibold text-ink">{p.title}</div>
              <div className="relative mt-1 text-[13px] text-ink-muted">{p.desc}</div>
              <button
                onClick={() => openAuth('register')}
                className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold"
                style={{ color: p.accent }}
              >
                {t('promos.claim')} <ArrowRight style={{ width: 15, height: 15 }} />
              </button>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
