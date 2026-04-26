import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const links = [
  { to: '/',      label: 'Home'  },
  { to: '/quiz',  label: 'Quiz'  },
  { to: '/chat',  label: 'Chat'  },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-surface3 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/" onClick={() => setOpen(false)} className="font-display text-xl font-bold text-dark">
          Elect<span className="text-saffron">I</span>Q
        </NavLink>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive
                  ? 'text-sm font-semibold text-saffron border-b-2 border-saffron pb-0.5'
                  : 'text-sm text-muted hover:text-dark transition-colors'
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-dark hover:bg-surface2 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-white border-t border-surface3 px-4 py-3 flex flex-col gap-1">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `py-2.5 px-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive ? 'text-saffron bg-orange-50' : 'text-muted hover:text-dark hover:bg-surface2'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  )
}
