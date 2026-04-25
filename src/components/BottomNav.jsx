import { useLocation, NavLink } from 'react-router-dom'
import { Home, GitBranch, BookOpen, MessageCircle, Brain } from 'lucide-react'

const navItems = [
  { path: '/',         icon: Home,          label: 'Home'     },
  { path: '/timeline', icon: GitBranch,     label: 'Timeline' },
  { path: '/guide',    icon: BookOpen,      label: 'Guide'    },
  { path: '/chat',     icon: MessageCircle, label: 'Chat'     },
  { path: '/quiz',     icon: Brain,         label: 'Quiz'     },
]

export default function BottomNav() {
  const location = useLocation()

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        background: 'rgba(19,19,30,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '9999px',
        padding: '10px 20px',
        display: 'flex',
        gap: '28px',
        alignItems: 'center',
      }}
    >
      {navItems.map(({ path, icon: Icon, label }) => {
        const isActive = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)
        return (
          <NavLink
            key={path}
            to={path}
            style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}
            aria-label={label}
          >
            <Icon
              size={20}
              strokeWidth={1.5}
              color={isActive ? '#FFFFFF' : '#6B6B7A'}
            />
            {isActive && (
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#FF9933' }} />
            )}
            {!isActive && (
              <div style={{ width: '4px', height: '4px' }} />
            )}
          </NavLink>
        )
      })}
    </div>
  )
}
