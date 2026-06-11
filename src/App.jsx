import { Routes, Route } from 'react-router-dom'
import Layout from './components/shell/Layout'
import AccountLayout from './components/account/AccountLayout'
import Home from './pages/Home'
import Slots from './pages/Slots'
import LiveCasino from './pages/LiveCasino'
import Sportsbook from './pages/Sportsbook'
import Crash from './pages/Crash'
import Promotions from './pages/Promotions'
import Vip from './pages/Vip'
import Wheel from './pages/Wheel'
import Contact from './pages/Contact'
import Faq from './pages/Faq'
import LegalPage from './components/legal/LegalPage'
import Profile from './pages/account/Profile'
import Deposit from './pages/account/Deposit'
import Withdraw from './pages/account/Withdraw'
import Transactions from './pages/account/Transactions'
import Kyc from './pages/account/Kyc'
import Bonuses from './pages/account/Bonuses'
import Referrals from './pages/account/Referrals'
import Coupons from './pages/account/Coupons'
import Settings from './pages/account/Settings'
import Notifications from './pages/account/Notifications'
import UnderDevelopment from './pages/UnderDevelopment'
import { UNDER_DEV_PATHS, PATHS } from './router/paths'

// Fully built routes; excluded from the placeholder map.
const BUILT = new Set([
  PATHS.home, PATHS.slots, PATHS.live, PATHS.sports, PATHS.crash,
  PATHS.promotions, PATHS.vip, PATHS.wheel,
  PATHS.contact, PATHS.faq, PATHS.terms, PATHS.privacy, PATHS.termsOfUse,
  PATHS.responsible, PATHS.kycPolicy, PATHS.howItWorks,
  PATHS.profile, PATHS.deposit, PATHS.withdraw, PATHS.transactions,
  PATHS.kyc, PATHS.bonuses, PATHS.referrals, PATHS.coupons, PATHS.settings, PATHS.notifications,
])

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={PATHS.home} element={<Home />} />
        <Route path={PATHS.slots} element={<Slots />} />
        <Route path={PATHS.live} element={<LiveCasino />} />
        <Route path={PATHS.sports} element={<Sportsbook />} />
        <Route path={PATHS.crash} element={<Crash />} />
        <Route path={PATHS.promotions} element={<Promotions />} />
        <Route path={PATHS.vip} element={<Vip />} />
        <Route path={PATHS.wheel} element={<Wheel />} />

        {/* support + legal */}
        <Route path={PATHS.contact} element={<Contact />} />
        <Route path={PATHS.faq} element={<Faq />} />
        <Route path={PATHS.terms} element={<LegalPage docKey="terms" />} />
        <Route path={PATHS.privacy} element={<LegalPage docKey="privacy" />} />
        <Route path={PATHS.termsOfUse} element={<LegalPage docKey="termsOfUse" />} />
        <Route path={PATHS.responsible} element={<LegalPage docKey="responsible" />} />
        <Route path={PATHS.kycPolicy} element={<LegalPage docKey="kycPolicy" />} />
        <Route path={PATHS.howItWorks} element={<LegalPage docKey="howItWorks" />} />

        {/* account area (gated shell + sidebar) */}
        <Route element={<AccountLayout />}>
          <Route path={PATHS.profile} element={<Profile />} />
          <Route path={PATHS.deposit} element={<Deposit />} />
          <Route path={PATHS.withdraw} element={<Withdraw />} />
          <Route path={PATHS.transactions} element={<Transactions />} />
          <Route path={PATHS.kyc} element={<Kyc />} />
          <Route path={PATHS.bonuses} element={<Bonuses />} />
          <Route path={PATHS.referrals} element={<Referrals />} />
          <Route path={PATHS.coupons} element={<Coupons />} />
          <Route path={PATHS.settings} element={<Settings />} />
          <Route path={PATHS.notifications} element={<Notifications />} />
        </Route>

        {/* Remaining inventory routes still resolve to the placeholder (Search, Admin). */}
        {UNDER_DEV_PATHS.filter((p) => !BUILT.has(p)).map((path) => (
          <Route key={path} path={path} element={<UnderDevelopment />} />
        ))}
        <Route path="*" element={<UnderDevelopment />} />
      </Route>
    </Routes>
  )
}
