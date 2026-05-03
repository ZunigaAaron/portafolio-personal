import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

function Admin() {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [form, setForm] = useState({
    title: '',
    description: '',
    gitHubUrl: '',
    liveUrl: '',
    technologies: '',
    isFeatured: false,
  })

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    fetchProjects()
  }, [isAuthenticated])

  const fetchProjects = () => {
    api.get('/projects')
      .then((res) => {
        setProjects(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm({ ...form, [e.target.name]: value })
  }

  const handleSubmit = () => {
    if (!form.title || !form.description || !form.gitHubUrl || !form.technologies) return

    const request = editingProject
      ? api.put(`/projects/${editingProject.id}`, { ...form, id: editingProject.id })
      : api.post('/projects', form)

    request.then(() => {
      fetchProjects()
      resetForm()
    })
  }

  const handleEdit = (project) => {
    setEditingProject(project)
    setForm({
      title: project.title,
      description: project.description,
      gitHubUrl: project.gitHubUrl,
      liveUrl: project.liveUrl || '',
      technologies: project.technologies,
      isFeatured: project.isFeatured,
    })
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar este proyecto?')) return
    api.delete(`/projects/${id}`).then(() => fetchProjects())
  }

  const resetForm = () => {
    setForm({ title: '', description: '', gitHubUrl: '', liveUrl: '', technologies: '', isFeatured: false })
    setEditingProject(null)
    setShowForm(false)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const inputStyle = {
    width: '100%',
    background: 'var(--color-bg)',
    border: '0.5px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    padding: '10px 14px',
    color: 'var(--color-text)',
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    fontWeight: 300,
    outline: 'none',
  }

  const labelStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: '10px',
    color: 'var(--color-text-dim)',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    marginBottom: '6px',
    display: 'block',
  }

  return (
    <main style={{ padding: '48px 32px', maxWidth: '900px', margin: '0 auto' }}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 700, color: 'var(--color-text)' }}>
            Panel Admin.
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-text-dim)', marginTop: '4px' }}>
            gestiona tus proyectos
          </p>
        </div>
<div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
  <button
    onClick={() => { resetForm(); setShowForm(!showForm) }}
    style={{
      background: 'var(--color-aqua)',
      color: '#080c10',
      fontFamily: 'var(--font-body)',
      fontSize: '13px',
      fontWeight: 500,
      padding: '9px 20px',
      borderRadius: 'var(--radius-sm)',
      border: 'none',
    }}
  >
    {showForm ? 'cancelar' : '+ nuevo proyecto'}
  </button>

  <div style={{ width: '0.5px', height: '20px', background: 'var(--color-border)' }}></div>

  <button
    onClick={handleLogout}
    style={{
      background: 'transparent',
      color: '#ff6b6b',
      fontFamily: 'var(--font-mono)',
      fontSize: '11px',
      padding: '9px 16px',
      borderRadius: 'var(--radius-sm)',
      border: '0.5px solid #ff6b6b30',
    }}
  >
    cerrar sesión
  </button>
</div>
      </div>

      {/* ── Formulario ── */}
      {showForm && (
        <div style={{
          background: 'var(--color-surface)',
          border: '0.5px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          padding: '28px',
          marginBottom: '32px',
        }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--color-text)', marginBottom: '24px' }}>
            {editingProject ? 'Editar proyecto.' : 'Nuevo proyecto.'}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

            <div>
              <label style={labelStyle}>título</label>
              <input name="title" value={form.title} onChange={handleChange} placeholder="Mi Proyecto" style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>technologies</label>
              <input name="technologies" value={form.technologies} onChange={handleChange} placeholder="React, .NET, SQL" style={inputStyle} />
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={labelStyle}>descripción</label>
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe tu proyecto..." rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
            </div>

            <div>
              <label style={labelStyle}>github url</label>
              <input name="gitHubUrl" value={form.gitHubUrl} onChange={handleChange} placeholder="https://github.com/..." style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>live url (opcional)</label>
              <input name="liveUrl" value={form.liveUrl} onChange={handleChange} placeholder="https://..." style={inputStyle} />
            </div>

            <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange} id="featured" />
              <label htmlFor="featured" style={{ ...labelStyle, marginBottom: 0, cursor: 'pointer' }}>
                marcar como destacado
              </label>
            </div>

          </div>

          <button
            onClick={handleSubmit}
            style={{
              marginTop: '20px',
              background: 'var(--color-aqua)',
              color: '#080c10',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 500,
              padding: '10px 24px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
            }}
          >
            {editingProject ? 'guardar cambios' : 'crear proyecto'}
          </button>
        </div>
      )}

      {/* ── Lista de proyectos ── */}
      {loading ? (
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-text-dim)' }}>cargando...</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {projects.map((project) => (
            <div
              key={project.id}
              style={{
                background: 'var(--color-surface)',
                border: '0.5px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '18px 22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--color-text)' }}>
                    {project.title}
                  </h3>
                  {project.isFeatured && (
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9px',
                      color: 'var(--color-aqua)',
                      background: 'var(--color-aqua-dim)',
                      border: '0.5px solid var(--color-aqua-border)',
                      padding: '2px 7px',
                      borderRadius: '4px',
                      letterSpacing: '1px',
                    }}>
                      destacado
                    </span>
                  )}
                </div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-text-dim)' }}>
                  {project.technologies}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => handleEdit(project)}
                  style={{
                    background: 'transparent',
                    color: 'var(--color-text-muted)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    padding: '7px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '0.5px solid var(--color-border)',
                  }}
                >
                  editar
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  style={{
                    background: 'transparent',
                    color: '#ff6b6b',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    padding: '7px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '0.5px solid #ff6b6b30',
                  }}
                >
                  eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </main>
  )
}

export default Admin