import { useNavigate } from 'react-router-dom'
import { Sparkles, ArrowRight, Coins, TrendingUp } from 'lucide-react'
import { useT } from '../../i18n'
import { useUI } from '../../store/ui'
import { PATHS } from '../../router/paths'
import { JACKPOT_BASE } from '../../services/mock'
import CountUp from '../ui/CountUp'

function Embers() {
  // a handful of rising gold embers, varied by index (no Math.random at module load)
  const seeds = [12, 28, 44, 60, 72, 84, 20, 50, 66, 90, 36, 8]
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {seeds.map((left, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full animate-ember"
          style={{
            left: `${left}%`,
            width: 3 + (i % 3),
            height: 3 + (i % 3),
            background: i % 2 ? 'var(--gold-light)' : 'var(--gold-champagne)',
            boxShadow: '0 0 8px rgba(212,175,55,0.8)',
            animationDuration: `${5 + (i % 5)}s`,
            animationDelay: `${(i % 6) * 0.7}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function Hero() {
  const t = useT()
  const navigate = useNavigate()
  const openAuth = useUI((s) => s.openAuth)

  const items = [0, 1, 2, 3, 4]
  const delay = (i) => ({ animationDelay: `${i * 0.12}s` })

  return (
    <section className="relative overflow-hidden">
      {/* fortune-arc glow */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="absolute left-1/2 top-[-40%] h-[120vmin] w-[120vmin] -translate-x-1/2 animate-spin-slow opacity-50"
          style={{
            background:
              'conic-gradient(from 0deg, transparent 0deg, rgba(212,175,55,0.12) 40deg, transparent 90deg, rgba(212,175,55,0.10) 200deg, transparent 260deg)',
            borderRadius: '50%',
          }}
        />
        <div className="absolute inset-0 bg-radial-gold" />
      </div>
      <Embers />

      <div className="container-page grid items-center gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
        <div>
          <div className="animate-slide-up pill mb-5 border border-line" style={{ ...delay(0), background: 'rgba(212,175,55,0.08)', color: 'var(--gold-light)' }}>
            <Sparkles style={{ width: 13, height: 13 }} />
            {t('hero.badge')}
          </div>

          <h1 className="animate-slide-up font-display text-[44px] font-semibold leading-[1.02] sm:text-[60px]" style={delay(1)}>
            <span className="text-ink">{t('hero.title1')}</span>
            <br />
            <span className="text-shimmer">{t('hero.title2')}</span>
          </h1>

          <p className="animate-slide-up mt-5 max-w-lg text-[15px] leading-relaxed text-ink-muted" style={delay(2)}>
            {t('hero.subtitle')}
          </p>

          <div className="animate-slide-up mt-7 flex flex-wrap gap-3" style={delay(3)}>
            <button onClick={() => openAuth('register')} className="btn-gold px-6 py-3 text-[15px]">
              {t('hero.ctaPrimary')} <ArrowRight style={{ width: 17, height: 17 }} />
            </button>
            <button onClick={() => navigate(PATHS.slots)} className="btn-ghost px-6 py-3 text-[15px]">
              {t('hero.ctaSecondary')}
            </button>
          </div>
        </div>

        {/* jackpot showcase */}
        <div className="animate-slide-up" style={delay(4)}>
          <div className="card-glass relative overflow-hidden p-7">
            <div className="absolute -right-8 -top-8 opacity-10">
              <Coins style={{ width: 150, height: 150, color: 'var(--gold)' }} strokeWidth={1} />
            </div>
            <div className="relative flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-deep">
              <TrendingUp style={{ width: 14, height: 14 }} />
              {t('hero.jackpot')}
            </div>
            <div className="relative mt-3 font-display text-[40px] font-semibold leading-none sm:text-[52px]">
              <CountUp to={JACKPOT_BASE} className="text-shimmer" suffix=" ₺" />
            </div>
            <div className="relative mt-6 grid grid-cols-3 gap-2.5">
              {items.slice(0, 3).map((i) => (
                <div key={i} className="rounded-xl border border-line p-3 text-center" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="tnum text-lg font-semibold text-gold-light">
                    {['98%', '7/24', '3dk'][i]}
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-wide text-ink-faint">
                    {['RTP', t('common.support'), t('common.deposit')][i]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
