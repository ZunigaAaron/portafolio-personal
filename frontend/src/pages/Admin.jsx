import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

function Admin() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [confirmId, setConfirmId] = useState(null)
  const [generatingImage, setGeneratingImage] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)
  const [previewImages, setPreviewImages] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  
  const [form, setForm] = useState({
    title: '',
    description: '',
    gitHubUrl: '',
    liveUrl: '',
    technologies: '',
    isFeatured: false,
    imageUrl: '',
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
      imageUrl: project.imageUrl || '',
    })
    setPreviewImage(project.imageUrl || null)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = () => {
    api.delete(`/projects/${confirmId}`).then(() => {
      fetchProjects()
      setConfirmId(null)
    })
  }

  const resetForm = () => {
    setForm({ title: '', description: '', gitHubUrl: '', liveUrl: '', technologies: '', isFeatured: false, imageUrl: '' })
    setEditingProject(null)
    setShowForm(false)
    setPreviewImage(null)
    setPreviewImages([])
    setSelectedImage(null)
  }
const generateImage = () => {
  if (!form.title && !form.description) return

  setGeneratingImage(true)
  setPreviewImage(null)
  setPreviewImages([])
  setSelectedImage(null)

  const prompt = `modern web app thumbnail, ${form.title}, ${form.technologies}, ${form.description}, dark UI, neon, minimal`

  const encoded = encodeURIComponent(prompt)

  const images = Array.from({ length: 3 }).map(() => {
    const seed = Math.floor(Math.random() * 999999)
    return `https://image.pollinations.ai/prompt/${encoded}?width=800&height=450&seed=${seed}&nologo=true`
  })
  console.log(images)
  setPreviewImages(images)

  // fallback por si no carga
  setTimeout(() => setGeneratingImage(false), 7000)
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

      {/* ── Modal de confirmación ── */}
      {confirmId && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: '#000000aa',
          backdropFilter: 'blur(4px)',
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px',
        }}>
          <div style={{
            background: 'var(--color-surface)',
            border: '0.5px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '32px',
            maxWidth: '380px',
            width: '100%',
          }}>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '22px',
              color: 'var(--color-text)',
              marginBottom: '8px',
            }}>
              Eliminar proyecto.
            </h3>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'var(--color-text-muted)',
              fontWeight: 300,
              marginBottom: '28px',
              lineHeight: 1.6,
            }}>
              Esta acción no se puede deshacer. ¿Estás seguro de que quieres eliminar este proyecto?
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setConfirmId(null)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--color-text-muted)',
                  background: 'transparent',
                  border: '0.5px solid var(--color-border)',
                  padding: '9px 18px',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                cancelar
              </button>
              <button
                onClick={handleDelete}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: '#fff',
                  background: '#ff6b6b',
                  border: 'none',
                  padding: '9px 18px',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 700, color: 'var(--color-text)' }}>
            Proyectos.
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-text-dim)', marginTop: '4px' }}>
            gestiona tus proyectos
          </p>
        </div>
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
              <input name="title" value={form.title} onChange={handleChange} placeholder="" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>tecnologías</label>
              <input name="technologies" value={form.technologies} onChange={handleChange} placeholder="" style={inputStyle} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={labelStyle}>descripción</label>
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="" rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
            </div>
            <div>
              <label style={labelStyle}>github url</label>
              <input name="gitHubUrl" value={form.gitHubUrl} onChange={handleChange} placeholder="https://github.com/..." style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>live url (opcional)</label>
              <input name="liveUrl" value={form.liveUrl} onChange={handleChange} placeholder="https://..." style={inputStyle} />
            </div>

            {/* ── Imagen con IA ── */}
            <div style={{ gridColumn: 'span 2' }}>
              <label style={labelStyle}>imagen del proyecto</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button
                  onClick={generateImage}
                  disabled={generatingImage || (!form.title && !form.description)}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--color-aqua)',
                    background: 'var(--color-aqua-dim)',
                    border: '0.5px solid var(--color-aqua-border)',
                    padding: '9px 18px',
                    borderRadius: 'var(--radius-sm)',
                    alignSelf: 'flex-start',
                    opacity: (!form.title && !form.description) ? 0.5 : 1,
                  }}
                >
                  {generatingImage ? 'generando...' : '✦ generar imagen con IA'}
                </button>

                {previewImages.length > 0 && (
  <div style={{
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '10px',
    marginBottom: '12px',
    minHeight: '90px'
  }}>
    {previewImages.map((img, index) => (
      <img
        key={index}
        src={img}
        onClick={() => {
          setSelectedImage(img)
          setPreviewImage(img)
        }}
        style={{
          width: '100%',
          height: '90px',
          objectFit: 'cover',
          borderRadius: 'var(--radius-sm)',
          border: selectedImage === img
            ? '2px solid var(--color-aqua)'
            : '0.5px solid var(--color-border)',
          cursor: 'pointer',
          background: 'var(--color-bg)'
        }}
      />
    ))}
  </div>
)}
<div style={{ position: 'relative' }}></div>

                {(previewImage || form.imageUrl) && (
                  <div style={{ position: 'relative' }}>
                    {generatingImage && (
      <div style={{
        width: '100%',
        height: '200px',
        background: 'var(--color-bg)',
        borderRadius: 'var(--radius-sm)',
        border: '0.5px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--color-aqua)',
        }}>
          generando imagen...
        </span>
      </div>
    )}
                    
                    
                    <img
                      src={previewImage || form.imageUrl}
                      alt="preview"
  onLoad={() => setGeneratingImage(false)}
onError={(e) => {
  e.target.style.display = 'none'
}}
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        borderRadius: 'var(--radius-sm)',
                        border: '0.5px solid var(--color-border)',
                        display: 'block',
                      }}
                    />


                        {selectedImage && (
  <button
    onClick={() => {
      setForm(prev => ({ ...prev, imageUrl: selectedImage }))
    }}
    style={{
      position: 'absolute',
      bottom: '8px',
      left: '8px',
      background: 'var(--color-aqua)',
      color: '#080c10',
      fontFamily: 'var(--font-mono)',
      fontSize: '10px',
      border: 'none',
      padding: '4px 10px',
      borderRadius: 'var(--radius-sm)',
    }}
  >
    usar imagen
  </button>
)}





                    
                    <button
                      onClick={() => {
                       setPreviewImage(null)
setPreviewImages([])
setSelectedImage(null)
setForm(prev => ({ ...prev, imageUrl: '' }))
                      }}
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        background: '#000000bb',
                        color: '#ff6b6b',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        border: '0.5px solid #ff6b6b30',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-sm)',
                      }}
                    >
                      quitar
                    </button>
                    <button
                      onClick={generateImage}
                      style={{
                        position: 'absolute',
                        top: '8px',
                        left: '8px',
                        background: '#000000bb',
                        color: 'var(--color-aqua)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        border: '0.5px solid var(--color-aqua-border)',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-sm)',
                      }}
                    >
                      regenerar
                    </button>
                  </div>
                )}
              </div>
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
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
              }}
            >
              {project.imageUrl && (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  style={{
                    width: '100px',
                    height: '70px',
                    objectFit: 'cover',
                    flexShrink: 0,
                  }}
                />
              )}
              <div style={{ flex: 1, padding: project.imageUrl ? '18px 0' : '18px 22px' }}>
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

              <div style={{ display: 'flex', gap: '8px', padding: '18px 22px', flexShrink: 0 }}>
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
                  onClick={() => setConfirmId(project.id)}
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