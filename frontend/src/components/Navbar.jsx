import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

function Navbar() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const isActive = (path) => location.pathname === path

  const navLinks = [
    { path: '/', label: 'inicio' },
    { path: '/projects', label: 'proyectos' },
    { path: '/contact', label: 'contacto' },
  ]

  const styles = {
    nav: {
      borderBottom: '0.5px solid var(--color-border)',
      background: '#080c10ee',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(12px)',
    },
    navInner: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 32px',
    },
    logo: {
      fontFamily: 'var(--font-display)',
      fontSize: '20px',
      fontWeight: 700,
      color: 'var(--color-text)',
    },
    logoAccent: {
      color: 'var(--color-aqua)',
    },
    linksContainer: {
      display: 'flex',
      gap: '28px',
    },
    githubBtn: {
      fontFamily: 'var(--font-mono)',
      fontSize: '11px',
      color: 'var(--color-aqua)',
      border: '0.5px solid var(--color-aqua-border)',
      padding: '7px 14px',
      borderRadius: 'var(--radius-sm)',
      background: 'var(--color-aqua-dim)',
      textDecoration: 'none',
    },
    hamburger: {
      display: 'none',
      flexDirection: 'column',
      gap: '5px',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      padding: '4px',
    },
    bar: {
      width: '22px',
      height: '1.5px',
      background: 'var(--color-text)',
      borderRadius: '2px',
      transition: 'all 0.2s',
    },
    mobileMenu: {
      borderTop: '0.5px solid var(--color-border)',
      padding: '20px 32px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
  }

  const getLink = (path) => ({
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    color: isActive(path) ? 'var(--color-text)' : 'var(--color-text-muted)',
    fontWeight: isActive(path) ? 500 : 400,
  })

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-github { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>

      <nav style={styles.nav}>
        <div style={styles.navInner}>

          <Link to="/" style={styles.logo}>
            Aaron Zúñiga<span style={styles.logoAccent}>.</span>
          </Link>

          <div className="nav-links" style={styles.linksContainer}>
            {navLinks.map(({ path, label }) => (
              <Link key={path} to={path} style={getLink(path)}>
                {label}
              </Link>
            ))}
          </div>

          
           
        <a  
            href="https://github.com/ZunigaAaron"
            target="_blank"
            rel="noreferrer"
            style={styles.githubBtn}
            className="nav-github">
            github
          </a>

          <button
            className="nav-hamburger"
            style={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span style={styles.bar}></span>
            <span style={styles.bar}></span>
            <span style={styles.bar}></span>
          </button>

        </div>

        {menuOpen && (
          <div style={styles.mobileMenu}>
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                style={getLink(path)}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            
          
            <a
              href="https://github.com/ZunigaAaron"
              target="_blank"
              rel="noreferrer"
              style={{ ...styles.githubBtn, alignSelf: 'flex-start' }}>
              github
            </a>
          </div>
        )}

      </nav>
    </>
  )
}

export default Navbar