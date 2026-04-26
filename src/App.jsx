import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import TopBar from './components/TopBar'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'
import Timeline from './pages/Timeline'
import Guide from './pages/Guide'
import Chat from './pages/Chat'
import Quiz from './pages/Quiz'
import Glossary from './pages/Glossary'

function Layout() {
  const location = useLocation()
  return (
    <div style={{ minHeight: '100vh', background: '#0C0C14' }}>
      <TopBar />
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <Outlet key={location.pathname} />
      </main>
      <div className="bottom-nav-spacer" />
      <BottomNav />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/"          element={<Home />}     />
          <Route path="/timeline"  element={<Timeline />} />
          <Route path="/guide"     element={<Guide />}    />
          <Route path="/chat"      element={<Chat />}     />
          <Route path="/quiz"      element={<Quiz />}     />
          <Route path="/glossary"  element={<Glossary />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
