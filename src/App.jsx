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
      <Navbar />
      <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <Outlet />
      </main>
    </div>
  )
}

function AppRoutes() {
  const location = useLocation()

  useEffect(() => {
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

