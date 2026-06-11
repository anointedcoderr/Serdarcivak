import { useUI } from '../../store/ui'
import { useT } from '../../i18n'
import GameThumb from '../ui/GameThumb'
import SectionHeader from './SectionHeader'
import Reveal from '../ui/Reveal'

// Reusable rail of game cards. Guest click opens register; member would launch the game.
export default function GameRail({ title, subtitle, to, games }) {
  const t = useT()
  const user = useUI((s) => s.user)
  const openAuth = useUI((s) => s.openAuth)
  const toast = useUI((s) => s.toast)

  const onPlay = (game) => {
    if (!user) {
      openAuth('register')
    } else {
      toast(`${game.name} ${t('common.play')}…`, 'info')
    }
  }

  return (
    <section className="container-page py-8">
      <Reveal>
        <SectionHeader title={title} subtitle={subtitle} to={to} />
      </Reveal>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {games.map((g, i) => (
          <Reveal key={g.id} delay={(i % 6) * 60}>
            <GameThumb game={g} onPlay={onPlay} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
