import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useUI } from '../../store/ui'
import Ticker from './Ticker'
import TopNav from './TopNav'
import MobileBottomNav from './MobileBottomNav'
import SideDrawer from './SideDrawer'
import Footer from './Footer'
import SupportLauncher from './SupportLauncher'
import AnnouncementPopup from './AnnouncementPopup'
import AuthModals from '../auth/AuthModals'
import Toasts from '../ui/Toasts'

export default function Layout() {
  const { pathname, search, hash } = useLocation()
  const openAuth = useUI((s) => s.openAuth)

  // scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])

  // deep-link auth: ?modal=login|register and #login / #register
  useEffect(() => {
    const params = new URLSearchParams(search)
    const m = params.get('modal') || params.get('action')
    const h = hash.replace('#', '')
    const want = m || h
    if (want === 'login') openAuth('login')
    else if (want === 'register' || want === 'signup') openAuth('register')
  }, [search, hash, openAuth])

  return (
    <>
      <Ticker />
      <TopNav />
      <div style={{ paddingTop: 'calc(var(--ticker-h) + var(--nav-h))' }}>
        <Outlet />
        <Footer />
      </div>
      <MobileBottomNav />
      <SideDrawer />
      <AuthModals />
      <Toasts />
      <SupportLauncher />
      <AnnouncementPopup />
    </>
  )
}
