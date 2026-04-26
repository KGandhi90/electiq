import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { initAnalytics, trackPageView } from './utils/analytics'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import Chat from './pages/Chat'

function Layout() {
  return (
    <div className="min-h-screen bg-base">
      <a href="#main-content" 
         className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-saffron text-white px-4 py-2 rounded-lg z-50 text-sm font-medium">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <Outlet />
      </main>
    </div>
  )
}

function AppRoutes() {
  const location = useLocation()

  useEffect(() => {
    const titles = {
      '/':       'ElectIQ — Indian Elections Guide',
      '/quiz':   'Election Quiz — ElectIQ',
      '/chat':   'Ask the Expert — ElectIQ',
    }
    document.title = titles[location.pathname] || 'ElectIQ'
    trackPageView(location.pathname, document.title)
  }, [location])

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/"     element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/chat" element={<Chat />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  useEffect(() => {
    initAnalytics()
  }, [])

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

