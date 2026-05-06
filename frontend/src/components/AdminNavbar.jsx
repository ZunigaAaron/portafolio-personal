import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function AdminNavbar() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const sections = [
    { path: '/admin', label: 'proyectos' },
    { path: '/admin/perfil', label: 'perfil' },
    { path: '/admin/skills', label: 'skills' },
    { path: '/admin/mensajes', label: 'mensajes' },
    { path: '/admin/tema', label: 'tema' },
  ]

  const tabStyle = (path) => ({
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    color: isActive(path) ? 'var(--color-aqua)' : 'var(--color-text-muted)',
    borderBottom: isActive(path) ? '1px solid var(--color-aqua)' : '1px solid transparent',
    padding: '6px 0',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    borderBottom: isActive(path) ? '1px solid var(--color-aqua)' : '1px solid transparent',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  })

  return (
    <nav style={{
      borderBottom: '0.5px solid var(--color-border)',
      background: 'var(--color-surface)',
      padding: '0 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>

      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '18px',
          fontWeight: 700,
          color: 'var(--color-text)',
          padding: '16px 0',
        }}>
          Admin<span style={{ color: 'var(--color-aqua)' }}>.</span>
        </span>

        <div style={{ display: 'flex', gap: '24px' }}>
          {sections.map(({ path, label }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              style={tabStyle(path)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--color-text-muted)',
            background: 'transparent',
            border: '0.5px solid var(--color-border)',
            padding: '7px 14px',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
          }}
        >
          ver sitio
        </button>
        <button
          onClick={handleLogout}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: '#ff6b6b',
            background: 'transparent',
            border: '0.5px solid #ff6b6b30',
            padding: '7px 14px',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
          }}
        >
          cerrar sesión
        </button>
      </div>

    </nav>
  )
}

export default AdminNavbar