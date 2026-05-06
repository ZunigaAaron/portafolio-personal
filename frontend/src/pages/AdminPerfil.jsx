import { useEffect, useState, useRef } from 'react'
import api from '../services/api'
import { useProfile } from '../context/ProfileContext'

function AdminPerfil() {
  const { updateProfile } = useProfile()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [photoPreview, setPhotoPreview] = useState(null)
  const fileInputRef = useRef(null)

  const [form, setForm] = useState({
    name: '', role: '', bio: '', photoUrl: '',
    phone: '', location: '', locationLat: '', locationLng: '',
    gitHubUrl: '', linkedInUrl: '', twitterUrl: '',
    instagramUrl: '', youtubeUrl: '', cvUrl: '',
    isAvailable: true,
  })

  useEffect(() => {
    api.get('/profile')
      .then((res) => {
        setForm(res.data)
        setPhotoPreview(res.data.photoUrl || null)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm({ ...form, [e.target.name]: value })
  }

  const handlePhotoFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const base64 = event.target.result
      setPhotoPreview(base64)
      setForm(prev => ({ ...prev, photoUrl: base64 }))
    }
    reader.readAsDataURL(file)
  }

  const handleLocationSearch = () => {
    if (!form.location) return
    const encoded = encodeURIComponent(form.location)
    fetch(`https://nominatim.openstreetmap.org/search?q=${encoded}&format=json&limit=1`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setForm(prev => ({
            ...prev,
            locationLat: data[0].lat,
            locationLng: data[0].lon,
          }))
        }
      })
  }

  const handleSubmit = () => {
    setSaving(true)
    const request = (form.id && form.id > 0)
      ? api.put('/profile', form)
      : api.post('/profile', form)

    request
      .then((res) => {
        setForm(res.data)
        updateProfile(res.data)
        setSuccess(true)
        setSaving(false)
        setTimeout(() => setSuccess(false), 3000)
      })
      .catch(() => setSaving(false))
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

  const sectionStyle = {
    background: 'var(--color-surface)',
    border: '0.5px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    padding: '24px',
    marginBottom: '16px',
  }

  const sectionTitle = {
    fontFamily: 'var(--font-display)',
    fontSize: '18px',
    color: 'var(--color-text)',
    fontWeight: 600,
    marginBottom: '20px',
  }

  if (loading) return (
    <p style={{ padding: '48px 32px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-text-dim)' }}>
      cargando...
    </p>
  )

  return (
    <main style={{ padding: '48px 32px', maxWidth: '900px', margin: '0 auto' }}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 700, color: 'var(--color-text)' }}>
            Perfil.
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-text-dim)', marginTop: '4px' }}>
            información pública de tu portafolio
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {success && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-aqua)' }}>
              ✓ guardado correctamente
            </span>
          )}
          <button
            onClick={handleSubmit}
            disabled={saving}
            style={{
              background: saving ? 'var(--color-surface)' : 'var(--color-aqua)',
              color: saving ? 'var(--color-text-muted)' : '#080c10',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 500,
              padding: '9px 20px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
            }}
          >
            {saving ? 'guardando...' : 'guardar perfil'}
          </button>
        </div>
      </div>

      {/* ── Foto de perfil ── */}
      <div style={sectionStyle}>
        <p style={sectionTitle}>Foto de perfil</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div
            onClick={() => fileInputRef.current.click()}
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'var(--color-bg)',
              border: '0.5px dashed var(--color-aqua)',
              overflow: 'hidden',
              flexShrink: 0,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            {photoPreview ? (
              <img src={photoPreview} alt="foto" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-text-dim)', textAlign: 'center', padding: '8px' }}>
                clic para subir
              </span>
            )}
          </div>

          <div style={{ flex: 1 }}>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoFile}
              accept="image/*"
              style={{ display: 'none' }}
            />
            <button
              onClick={() => fileInputRef.current.click()}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--color-aqua)',
                background: 'var(--color-aqua-dim)',
                border: '0.5px solid var(--color-aqua-border)',
                padding: '8px 16px',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                marginBottom: '10px',
                display: 'block',
              }}
            >
              seleccionar imagen
            </button>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-text-dim)' }}>
              JPG, PNG o WebP. Se guarda directamente en la base de datos.
            </p>
          </div>
        </div>
      </div>

      {/* ── Info básica ── */}
      <div style={sectionStyle}>
        <p style={sectionTitle}>Información básica</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>nombre completo</label>
            <input name="name" value={form.name || ''} onChange={handleChange} placeholder="Aaron Zúñiga" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>rol / título</label>
            <input name="role" value={form.role || ''} onChange={handleChange} placeholder="Desarrollador Full Stack" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>teléfono</label>
            <input name="phone" value={form.phone || ''} onChange={handleChange} placeholder="+52 449 000 0000" style={inputStyle} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '20px' }}>
            <input type="checkbox" name="isAvailable" checked={form.isAvailable} onChange={handleChange} id="available" />
            <label htmlFor="available" style={{ ...labelStyle, marginBottom: 0, cursor: 'pointer' }}>
              disponible para oportunidades
            </label>
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <label style={labelStyle}>bio</label>
            <textarea
              name="bio"
              value={form.bio || ''}
              onChange={handleChange}
              placeholder="Cuéntate brevemente — quién eres, qué construyes, qué te apasiona..."
              rows={4}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>
        </div>
      </div>

      {/* ── Ubicación ── */}
      <div style={sectionStyle}>
        <p style={sectionTitle}>Ubicación</p>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
          <input
            name="location"
            value={form.location || ''}
            onChange={handleChange}
            placeholder="Aguascalientes, México"
            style={{ ...inputStyle, flex: 1 }}
          />
          <button
            onClick={handleLocationSearch}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--color-aqua)',
              background: 'var(--color-aqua-dim)',
              border: '0.5px solid var(--color-aqua-border)',
              padding: '10px 16px',
              borderRadius: 'var(--radius-sm)',
              whiteSpace: 'nowrap',
            }}
          >
            buscar en mapa
          </button>
        </div>

        {form.locationLat && form.locationLng && (
          <iframe
            title="mapa"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(form.locationLng) - 0.05},${parseFloat(form.locationLat) - 0.05},${parseFloat(form.locationLng) + 0.05},${parseFloat(form.locationLat) + 0.05}&layer=mapnik&marker=${form.locationLat},${form.locationLng}`}
            style={{
              width: '100%',
              height: '200px',
              borderRadius: 'var(--radius-sm)',
              border: '0.5px solid var(--color-border)',
              display: 'block',
            }}
          />
        )}
      </div>

      {/* ── Redes sociales ── */}
      <div style={sectionStyle}>
        <p style={sectionTitle}>Redes sociales y contacto</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

          {[
            { name: 'gitHubUrl', label: 'GitHub', placeholder: 'https://github.com/...' },
            { name: 'linkedInUrl', label: 'LinkedIn', placeholder: 'https://linkedin.com/in/...' },
            { name: 'twitterUrl', label: 'X / Twitter', placeholder: 'https://x.com/...' },
            { name: 'instagramUrl', label: 'Instagram', placeholder: 'https://instagram.com/...' },
            { name: 'youtubeUrl', label: 'YouTube', placeholder: 'https://youtube.com/...' },
          ].map(({ name, label, placeholder }) => (
            <div key={name}>
              <label style={labelStyle}>{label}</label>
              <input
                name={name}
                value={form[name] || ''}
                onChange={handleChange}
                placeholder={placeholder}
                style={inputStyle}
              />
            </div>
          ))}

          <div>
            <label style={labelStyle}>CV (link a Google Drive, Dropbox, etc.)</label>
            <input
              name="cvUrl"
              value={form.cvUrl || ''}
              onChange={handleChange}
              placeholder="https://drive.google.com/..."
              style={inputStyle}
            />
          </div>

        </div>
      </div>

    </main>
  )
}

export default AdminPerfil