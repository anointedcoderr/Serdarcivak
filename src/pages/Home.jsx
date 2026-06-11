import { useT } from '../i18n'
import { PATHS } from '../router/paths'
import { SLOTS, LIVE } from '../services/mock'
import Hero from '../components/home/Hero'
import CategoryTiles from '../components/home/CategoryTiles'
import BigWins from '../components/home/BigWins'
import GameRail from '../components/home/GameRail'
import SportsTeaser from '../components/home/SportsTeaser'
import PromoStrip from '../components/home/PromoStrip'
import Providers from '../components/home/Providers'

export default function Home() {
  const t = useT()
  return (
    <main>
      <Hero />
      <CategoryTiles />
      <BigWins />
      <GameRail
        title={t('rails.popularSlots')}
        subtitle={t('rails.popularSlotsSub')}
        to={PATHS.slots}
        games={SLOTS}
      />
      <SportsTeaser />
      <GameRail
        title={t('rails.popularLive')}
        subtitle={t('rails.popularLiveSub')}
        to={PATHS.live}
        games={LIVE}
      />
      <PromoStrip />
      <Providers />
    </main>
  )
}
