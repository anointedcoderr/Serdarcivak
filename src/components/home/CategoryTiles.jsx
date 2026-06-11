import { useNavigate } from 'react-router-dom'
import { Dices, Radio, Trophy, Rocket } from 'lucide-react'
import { useT } from '../../i18n'
import { PATHS } from '../../router/paths'
import Reveal from '../ui/Reveal'

export default function CategoryTiles() {
  const t = useT()
  const navigate = useNavigate()

  const tiles = [
    { to: PATHS.slots, Icon: Dices, title: t('categories.slots'), desc: t('categories.slotsDesc'), grad: ['#3a2f0c', '#0c0b08'] },
    { to: PATHS.live, Icon: Radio, title: t('categories.live'), desc: t('categories.liveDesc'), grad: ['#3a0f16', '#0c0708'] },
    { to: PATHS.sports, Icon: Trophy, title: t('categories.sports'), desc: t('categories.sportsDesc'), grad: ['#152040', '#070a14'] },
    { to: PATHS.crash, Icon: Rocket, title: t('categories.crash'), desc: t('categories.crashDesc'), grad: ['#0c3326', '#06100c'] },
  ]

  return (
    <section className="container-page py-8">
      <Reveal>
        <h2 className="mb-5 font-display text-2xl font-semibold text-ink sm:text-[28px]">{t('categories.title')}</h2>
      </Reveal>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {tiles.map((tile, i) => (
          <Reveal key={tile.to} delay={i * 80}>
            <button
              onClick={() => navigate(tile.to)}
              className="group relative h-full w-full overflow-hidden rounded-2xl border border-line p-5 text-left transition-transform hover:-translate-y-1"
              style={{ background: `linear-gradient(160deg, ${tile.grad[0]}, ${tile.grad[1]})` }}
            >
              <tile.Icon
                className="absolute -right-3 -top-2 opacity-15 transition-transform duration-500 group-hover:scale-110"
                style={{ width: 90, height: 90, color: 'var(--gold-light)' }}
                strokeWidth={1.2}
              />
              <span className="relative grid h-11 w-11 place-items-center rounded-xl border border-line" style={{ background: 'rgba(0,0,0,0.3)' }}>
                <tile.Icon style={{ width: 22, height: 22, color: 'var(--gold)' }} />
              </span>
              <div className="relative mt-4 font-display text-lg font-semibold text-ink">{tile.title}</div>
              <div className="relative mt-0.5 text-[12.5px] text-ink-muted">{tile.desc}</div>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
