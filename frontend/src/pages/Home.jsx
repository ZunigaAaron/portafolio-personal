import { useEffect, useState } from 'react'
import api from '../services/api'

function Home() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    api.get('/projects/featured')
      .then((res) => {
        setProjects(res.data)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])
  return (
    <main>

      {/* ── Hero ── */}
      <section style={{
        padding: '80px 32px 64px',
        maxWidth: '900px',
        margin: '0 auto',
        position: 'relative',
      }}>

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--color-aqua)',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span style={{
            width: '6px', height: '6px',
            borderRadius: '50%',
            background: 'var(--color-aqua)',
            display: 'inline-block',
          }}></span>
          disponible para oportunidades
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(42px, 7vw, 72px)',
          fontWeight: 700,
          lineHeight: 1.0,
          letterSpacing: '-1px',
          color: 'var(--color-text)',
          marginBottom: '16px',
        }}>
          Desarrollador<br />
          <span style={{ color: 'var(--color-aqua)' }}>Full Stack.</span>
        </h1>

        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          color: 'var(--color-text-dim)',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          marginBottom: '20px',
        }}>
          .NET · React · SQL
        </p>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '15px',
          color: 'var(--color-text-muted)',
          fontWeight: 300,
          maxWidth: '420px',
          lineHeight: 1.7,
          marginBottom: '40px',
        }}>
          Construyo APIs robustas e interfaces que conectan con las personas.
          Enfocado en código limpio y soluciones que escalan.
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          
    
          <a
              href="/projects"
              style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 500,
              background: 'var(--color-aqua)',
              color: '#080c10',
              padding: '11px 24px',
              borderRadius: 'var(--radius-sm)',
              textDecoration: 'none',
            }}
          >
            ver proyectos
          </a>
          
       
          <a
              href="/contact"
              style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--color-text-muted)',
              padding: '11px 20px',
              borderRadius: 'var(--radius-sm)',
              textDecoration: 'none',
              border: '0.5px solid var(--color-border)',
            }}
          >
            contacto
          </a>
        </div>

      </section>

      {/* ── Proyectos destacados ── */}
      <section style={{
        padding: '0 32px 80px',
        maxWidth: '900px',
        margin: '0 auto',
      }}>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '24px',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--color-text-dim)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}>
            proyectos destacados
          </span>
          <div style={{
            flex: 1,
            height: '0.5px',
            background: 'var(--color-border)',
          }}></div>
        </div>

        {loading && (
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--color-text-dim)',
          }}>
            cargando...
          </p>
        )}

        {error && (
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: '#ff6b6b',
          }}>
            no se pudo conectar con el backend
          </p>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '12px',
        }}>
          {projects.map((project, index) => (
            <div
              key={project.id}
              style={{
                background: 'var(--color-surface)',
                border: '0.5px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '22px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                color: 'var(--color-aqua)',
                background: 'var(--color-aqua-dim)',
                border: '0.5px solid var(--color-aqua-border)',
                padding: '3px 8px',
                borderRadius: '4px',
                display: 'inline-block',
                marginBottom: '12px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}>
                destacado
              </div>

              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '20px',
                fontWeight: 600,
                color: 'var(--color-text)',
                marginBottom: '8px',
              }}>
                {project.title}
              </h3>

              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: 'var(--color-text-dim)',
                fontWeight: 300,
                lineHeight: 1.6,
                marginBottom: '16px',
              }}>
                {project.description}
              </p>

              <div style={{
                display: 'flex',
                gap: '5px',
                flexWrap: 'wrap',
                marginBottom: '16px',
              }}>
                {project.technologies.split(',').map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9px',
                      color: 'var(--color-text-dim)',
                      background: 'var(--color-border)',
                      padding: '3px 8px',
                      borderRadius: '20px',
                    }}
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>

              
            
              <a
                  href={project.gitHubUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  color: 'var(--color-aqua)',
                  letterSpacing: '0.5px',
                }}
              >
                github
              </a>

              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '72px',
                fontWeight: 700,
                color: '#ffffff04',
                position: 'absolute',
                bottom: '-8px',
                right: '14px',
                lineHeight: 1,
                userSelect: 'none',
              }}>
                {String(index + 1).padStart(2, '0')}
              </div>

            </div>
          ))}
        </div>

      </section>

    </main>
  )
}

export default Home