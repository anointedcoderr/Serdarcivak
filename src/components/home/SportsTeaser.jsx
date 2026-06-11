import { useNavigate } from 'react-router-dom'
import { Clock } from 'lucide-react'
import { useT } from '../../i18n'
import { MATCHES } from '../../services/mock'
import { PATHS } from '../../router/paths'
import SectionHeader from './SectionHeader'
import Reveal from '../ui/Reveal'

function OddButton({ label, value, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-1 flex-col items-center rounded-lg border border-line py-2 transition-colors hover:border-gold/60"
      style={{ background: 'rgba(255,255,255,0.02)' }}
    >
      <span className="text-[10px] uppercase tracking-wide text-ink-faint">{label}</span>
      <span className="tnum text-sm font-semibold text-gold-light">{value}</span>
    </button>
  )
}

export default function SportsTeaser() {
  const t = useT()
  const navigate = useNavigate()

  return (
    <section className="container-page py-8">
      <Reveal>
        <SectionHeader title={t('sports.title')} subtitle={t('sports.subtitle')} to={PATHS.sports} />
      </Reveal>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {MATCHES.map((m, i) => (
          <Reveal key={m.id} delay={i * 70}>
            <div className="card-glass p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={`https://flagcdn.com/20x15/${m.cc}.png`}
                    alt=""
                    width={20}
                    height={15}
                    className="rounded-sm"
                    loading="lazy"
                  />
                  <span className="text-[12px] text-ink-muted">{m.league}</span>
                </div>
                {m.live ? (
                  <span className="pill animate-pulse-soft" style={{ background: 'rgba(255,77,94,0.14)', color: '#ff8c97' }}>
                    {t('common.live')} {m.minute}'
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] text-ink-muted">
                    <Clock style={{ width: 12, height: 12 }} /> {m.time}
                  </span>
                )}
              </div>

              <div className="mb-3 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-ink">{m.home}</div>
                  <div className="text-sm font-medium text-ink">{m.away}</div>
                </div>
                {m.score && <div className="tnum text-lg font-semibold text-gold-light">{m.score}</div>}
              </div>

              <div className="flex gap-2">
                <OddButton label={t('sports.matchWin1')} value={m.odds['1']} onClick={() => navigate(PATHS.sports)} />
                <OddButton label={t('sports.draw')} value={m.odds.X} onClick={() => navigate(PATHS.sports)} />
                <OddButton label={t('sports.matchWin2')} value={m.odds['2']} onClick={() => navigate(PATHS.sports)} />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
