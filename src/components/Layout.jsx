
import { useState } from 'react'
import { NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Coins,
  Gem,
  Scale,
  FileText,
  History,
  User,
  LogOut,
  Menu,
  X,
} from 'lucide-react'

import { useStore } from '../store.jsx'

const links = [
  ['/app', 'Tableau de bord', LayoutDashboard, true],
  ['/app/or', 'Or', Coins],
  ['/app/diamants', 'Diamants', Gem],
  ['/app/estimations', 'Estimations', Scale],
  ['/app/documents', 'Documents', FileText],
  ['/app/historique', 'Historique', History],
  ['/app/profil', 'Profil', User],
]

export default function Layout() {
  const { auth, logout, data } = useStore()
  const [open, setOpen] = useState(false)
  const nav = useNavigate()

  if (!auth) {
    return <Navigate to="/connexion" replace />
  }

  const who = [
    data?.profile?.name,
    data?.profile?.org,
  ]
    .filter(Boolean)
    .join(' · ') || 'Mon espace'

  return (
    <div className="shell">
      <div className="frame">
        <aside className={'side' + (open ? ' open' : '')}>
          <div className="brand">
            <img
              src="image/L1.jpeg"
              alt="Logo"
              className="brand-logo"
            />
          </div>

          <nav>
            {links.map(([to, label, Icon, end]) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={() => setOpen(false)}
              >
                <Icon size={18} />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>

          <button
            className="navbtn"
            onClick={() => {
              logout()
              nav('/')
            }}
          >
            <LogOut size={18} />
            <span>Se déconnecter</span>
          </button>
        </aside>

        <div className="main">
          <header className="top">
            <button
              className="icon menu"
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {open ? <X /> : <Menu />}
            </button>

            <span className="muted">{who}</span>
          </header>

          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
