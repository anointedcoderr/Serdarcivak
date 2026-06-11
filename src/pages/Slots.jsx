import { useT } from '../i18n'
import CatalogShell from '../components/catalog/CatalogShell'
import { CATALOG_SLOTS, SLOT_PROVIDERS, providerCounts } from '../services/mock'

const PROVIDERS = providerCounts(CATALOG_SLOTS).sort((a, b) => b.count - a.count)
const CATS = ['hot', 'new', 'megaways', 'jackpot']

export default function Slots() {
  const t = useT()
  return (
    <CatalogShell
      type="slot"
      games={CATALOG_SLOTS}
      providers={PROVIDERS}
      categories={CATS}
      eyebrow={t('catalog.slotsEyebrow')}
      title={t('catalog.slotsTitle')}
      subtitle={t('catalog.slotsSub')}
      searchPlaceholder={t('catalog.searchSlots')}
    />
  )
}
