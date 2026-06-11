import { Crown, Medal, Gem, Shield, Zap, Banknote, User, Gift, Trophy, Cake } from 'lucide-react'
import { useT } from '../i18n'
import { VIP_TIERS } from '../services/mock'
import Reveal from '../components/ui/Reveal'

const TIER_ICONS = { medal: Medal, gem: Gem, crown: Crown, shield: Shield }
const BENEFIT_ICONS = [Banknote, Zap, User, Gift, Trophy, Cake]

export default function Vip() {
  const t = useT()
  const benefits = t('vip.benefits')
  // current mock progress: between Gold and Platinum
  const currentIndex = 0
  const progress = 64

  return (
    <main className="container-page py-8">
      {/* hero */}
      <Reveal>
        <div className="card-glass relative overflow-hidden p-8 text-center sm:p-12">
          <div className="absolute inset-0 bg-radial-gold opacity-60" />
          <div className="relative mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-light">
            <Crown style={{ width: 13, height: 13 }} /> {t('vip.eyebrow')}
          </div>
          <h1 className="relative font-display text-3xl font-semibold sm:text-5xl">
            <span className="text-ink">{t('vip.title').split(' ')[0]} </span>
            <span className="text-shimmer">{t('vip.title').split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="relative mx-auto mt-3 max-w-md text-sm text-ink-muted">{t('vip.subtitle')}</p>
        </div>
      </Reveal>

      {/* progress */}
      <Reveal delay={60}>
        <div className="card-glass mt-6 p-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-ink">{t('vip.progressTitle')}</h2>
            <span className="tnum text-sm text-gold-light">{progress}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div className="h-full rounded-full" style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#b8902f,#f7e7b6)' }} />
          </div>
          <div className="mt-2 flex justify-between text-[12px] text-ink-muted">
            <span style={{ color: VIP_TIERS[currentIndex].color }}>{VIP_TIERS[currentIndex].name}</span>
            <span>{VIP_TIERS[currentIndex + 1]?.name}</span>
          </div>
          <p className="mt-3 text-[12.5px] text-ink-faint">{t('vip.progressNote')}</p>
        </div>
      </Reveal>

      {/* tiers */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {VIP_TIERS.map((tier, i) => {
          const Icon = TIER_ICONS[tier.icon] || Crown
          return (
            <Reveal key={tier.name} delay={i * 70}>
              <div className="card-glass h-full p-5" style={{ borderColor: `${tier.color}40` }}>
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: `${tier.color}1a` }}>
                    <Icon style={{ width: 22, height: 22, color: tier.color }} />
                  </span>
                  <span className="font-display text-lg font-semibold" style={{ color: tier.color }}>{tier.name}</span>
                </div>
                <div className="mt-4 tnum font-display text-3xl font-semibold text-foil">{tier.cashback}</div>
                <div className="text-[12px] text-ink-muted">{t('vip.weekly')}</div>
                <ul className="mt-4 space-y-2 border-t border-line pt-4 text-[12.5px] text-ink-muted">
                  {tier.perks.map((p, j) => (
                    <li key={j} className="flex gap-2"><span style={{ color: tier.color }}>•</span>{p}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )
        })}
      </div>

      {/* benefits */}
      <h2 className="mb-4 mt-10 font-display text-2xl font-semibold text-ink">{t('vip.benefitsTitle')}</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((b, i) => {
          const Icon = BENEFIT_ICONS[i] || Gift
          return (
            <Reveal key={i} delay={i * 50}>
              <div className="card-glass flex items-start gap-3 p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl" style={{ background: 'rgba(212,175,55,0.1)' }}>
                  <Icon style={{ width: 20, height: 20, color: 'var(--gold)' }} />
                </span>
                <div>
                  <div className="font-display text-base font-semibold text-ink">{b.t}</div>
                  <div className="mt-0.5 text-[13px] text-ink-muted">{b.d}</div>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </main>
  )
}
