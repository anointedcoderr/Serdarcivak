import { Routes, Route } from 'react-router-dom'
import Layout from './components/shell/Layout'
import AccountLayout from './components/account/AccountLayout'
import Home from './pages/Home'
import Slots from './pages/Slots'
import LiveCasino from './pages/LiveCasino'
import Profile from './pages/account/Profile'
import Deposit from './pages/account/Deposit'
import Withdraw from './pages/account/Withdraw'
import Transactions from './pages/account/Transactions'
import UnderDevelopment from './pages/UnderDevelopment'
import { UNDER_DEV_PATHS, PATHS } from './router/paths'

// Routes that are fully built; excluded from the placeholder map.
const BUILT = new Set([
  PATHS.home, PATHS.slots, PATHS.live,
  PATHS.profile, PATHS.deposit, PATHS.withdraw, PATHS.transactions,
])

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={PATHS.home} element={<Home />} />
        <Route path={PATHS.slots} element={<Slots />} />
        <Route path={PATHS.live} element={<LiveCasino />} />

        {/* Account area (gated shell + sidebar) */}
        <Route element={<AccountLayout />}>
          <Route path={PATHS.profile} element={<Profile />} />
          <Route path={PATHS.deposit} element={<Deposit />} />
          <Route path={PATHS.withdraw} element={<Withdraw />} />
          <Route path={PATHS.transactions} element={<Transactions />} />
        </Route>

        {/* Every other inventory route exists and resolves to the placeholder for now. */}
        {UNDER_DEV_PATHS.filter((p) => !BUILT.has(p)).map((path) => (
          <Route key={path} path={path} element={<UnderDevelopment />} />
        ))}
        <Route path="*" element={<UnderDevelopment />} />
      </Route>
    </Routes>
  )
}
