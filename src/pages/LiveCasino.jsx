import { useT } from '../i18n'
import CatalogShell from '../components/catalog/CatalogShell'
import { CATALOG_LIVE, providerCounts } from '../services/mock'

const PROVIDERS = providerCounts(CATALOG_LIVE).sort((a, b) => b.count - a.count)
const CATS = ['roulette', 'blackjack', 'baccarat', 'show', 'turkish']

export default function LiveCasino() {
  const t = useT()
  return (
    <CatalogShell
      type="live"
      games={CATALOG_LIVE}
      providers={PROVIDERS}
      categories={CATS}
      eyebrow={t('catalog.liveEyebrow')}
      title={t('catalog.liveTitle')}
      subtitle={t('catalog.liveSub')}
      searchPlaceholder={t('catalog.searchLive')}
    />
  )
}
