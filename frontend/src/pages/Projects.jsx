import { useEffect, useState } from 'react'
import api from '../services/api'

function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    api.get('/projects')
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
    <main style={{ padding: '64px 32px', maxWidth: '900px', margin: '0 auto' }}>

      <div style={{ marginBottom: '48px' }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 5vw, 56px)',
          fontWeight: 700,
          color: 'var(--color-text)',
          marginBottom: '12px',
        }}>
          Proyectos.
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          color: 'var(--color-text-muted)',
          fontWeight: 300,
        }}>
          Cosas que he construido.
        </p>
      </div>

      {loading && (
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-text-dim)' }}>
          cargando...
        </p>
      )}

      {error && (
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#ff6b6b' }}>
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
              color: project.isFeatured ? 'var(--color-aqua)' : 'var(--color-text-dim)',
              background: project.isFeatured ? 'var(--color-aqua-dim)' : 'var(--color-border)',
              border: `0.5px solid ${project.isFeatured ? 'var(--color-aqua-border)' : 'var(--color-border)'}`,
              padding: '3px 8px',
              borderRadius: '4px',
              display: 'inline-block',
              marginBottom: '12px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}>
              {project.isFeatured ? 'destacado' : 'proyecto'}
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
                <span key={tech} style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  color: 'var(--color-text-dim)',
                  background: 'var(--color-border)',
                  padding: '3px 8px',
                  borderRadius: '20px',
                }}>
                  {tech.trim()}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              
              
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
              {project.liveUrl && (
                
              
                <a     
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: 'var(--color-text-muted)',
                    letterSpacing: '0.5px',
                  }}>
                  live
                </a>
              )}
            </div>

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

    </main>
  )
}

export default Projects