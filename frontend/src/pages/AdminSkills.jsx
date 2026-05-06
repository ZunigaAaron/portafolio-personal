import { useEffect, useState } from 'react'
import api from '../services/api'

function AdminSkills() {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [confirmId, setConfirmId] = useState(null)
  const [form, setForm] = useState({
    name: '',
    category: 'Backend',
    level: 'Intermedio',
    icon: '',
    order: 0,
  })

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = () => {
    api.get('/skills')
      .then((res) => {
        setSkills(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (!form.name) return
    api.post('/skills', form)
      .then(() => {
        fetchSkills()
        resetForm()
      })
  }

  const handleDelete = () => {
    api.delete(`/skills/${confirmId}`)
      .then(() => {
        fetchSkills()
        setConfirmId(null)
      })
  }

  const resetForm = () => {
    setForm({ name: '', category: 'Backend', level: 'Intermedio', icon: '', order: 0 })
    setShowForm(false)
  }

  const categories = ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools']
  const levels = ['Básico', 'Intermedio', 'Avanzado']

  const levelColor = (level) => {
    if (level === 'Avanzado') return 'var(--color-aqua)'
    if (level === 'Intermedio') return '#f0a500'
    return 'var(--color-text-dim)'
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

      {/* ── Modal confirmación ── */}
      {confirmId && (
        <div style={{ position: 'fixed', inset: 0, background: '#000000aa', backdropFilter: 'blur(4px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
          <div style={{ background: 'var(--color-surface)', border: '0.5px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '32px', maxWidth: '380px', width: '100%' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--color-text)', marginBottom: '8px' }}>
              Eliminar skill.
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-text-muted)', fontWeight: 300, marginBottom: '28px', lineHeight: 1.6 }}>
              ¿Estás seguro de que quieres eliminar esta habilidad?
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button onClick={() => setConfirmId(null)} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-text-muted)', background: 'transparent', border: '0.5px solid var(--color-border)', padding: '9px 18px', borderRadius: 'var(--radius-sm)' }}>
                cancelar
              </button>
              <button onClick={handleDelete} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#fff', background: '#ff6b6b', border: 'none', padding: '9px 18px', borderRadius: 'var(--radius-sm)' }}>
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
            Skills.
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-text-dim)', marginTop: '4px' }}>
            tus tecnologías y habilidades
          </p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(!showForm) }}
          style={{ background: 'var(--color-aqua)', color: '#080c10', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, padding: '9px 20px', borderRadius: 'var(--radius-sm)', border: 'none' }}
        >
          {showForm ? 'cancelar' : '+ agregar skill'}
        </button>
      </div>

      {/* ── Formulario ── */}
      {showForm && (
        <div style={{ background: 'var(--color-surface)', border: '0.5px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '28px', marginBottom: '32px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--color-text)', marginBottom: '24px' }}>
            Nueva skill.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

            <div>
              <label style={labelStyle}>nombre</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="React" style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>ícono (emoji)</label>
              <input name="icon" value={form.icon} onChange={handleChange} placeholder="⚛️" style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>categoría</label>
              <select name="category" value={form.category} onChange={handleChange} style={inputStyle}>
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={labelStyle}>nivel</label>
              <select name="level" value={form.level} onChange={handleChange} style={inputStyle}>
                {levels.map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={labelStyle}>orden</label>
              <input name="order" type="number" value={form.order} onChange={handleChange} placeholder="0" style={inputStyle} />
            </div>

          </div>

          <button
            onClick={handleSubmit}
            style={{ marginTop: '20px', background: 'var(--color-aqua)', color: '#080c10', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, padding: '10px 24px', borderRadius: 'var(--radius-sm)', border: 'none' }}
          >
            agregar skill
          </button>
        </div>
      )}

      {/* ── Lista agrupada por categoría ── */}
      {loading ? (
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-text-dim)' }}>cargando...</p>
      ) : (
        categories.map(category => {
          const categorySkills = skills.filter(s => s.category === category)
          if (categorySkills.length === 0) return null
          return (
            <div key={category} style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-text-dim)', letterSpacing: '2px', textTransform: 'uppercase' }}>
                  {category}
                </span>
                <div style={{ flex: 1, height: '0.5px', background: 'var(--color-border)' }}></div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {categorySkills.map(skill => (
                  <div key={skill.id} style={{ background: 'var(--color-surface)', border: '0.5px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {skill.icon && <span style={{ fontSize: '20px' }}>{skill.icon}</span>}
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-text)' }}>
                        {skill.name}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: levelColor(skill.level), background: `${levelColor(skill.level)}18`, border: `0.5px solid ${levelColor(skill.level)}30`, padding: '2px 8px', borderRadius: '4px', letterSpacing: '1px' }}>
                        {skill.level}
                      </span>
                    </div>
                    <button
                      onClick={() => setConfirmId(skill.id)}
                      style={{ background: 'transparent', color: '#ff6b6b', fontFamily: 'var(--font-mono)', fontSize: '11px', padding: '5px 12px', borderRadius: 'var(--radius-sm)', border: '0.5px solid #ff6b6b30' }}
                    >
                      eliminar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )
        })
      )}

    </main>
  )
}

export default AdminSkills