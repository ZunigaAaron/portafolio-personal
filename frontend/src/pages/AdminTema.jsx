import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import api from '../services/api'

function AdminTema() {
  const { theme, updateTheme } = useTheme()
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [localTheme, setLocalTheme] = useState(theme)

  const accentPresets = [
    { name: 'Aqua', color: '#3ECFCF' },
    { name: 'Esmeralda', color: '#2ECC71' },
    { name: 'Violeta', color: '#8B5CF6' },
    { name: 'Rosa', color: '#EC4899' },
    { name: 'Naranja', color: '#F97316' },
    { name: 'Azul', color: '#3B82F6' },
    { name: 'Dorado', color: '#F59E0B' },
    { name: 'Rojo', color: '#EF4444' },
  ]

  const fontOptions = [
    { label: 'Cormorant Garamond — elegante serif', value: 'Cormorant Garamond' },
    { label: 'Playfair Display — clásica serif', value: 'Playfair Display' },
    { label: 'Syne — geométrica bold', value: 'Syne' },
    { label: 'DM Serif Display — editorial', value: 'DM Serif Display' },
  ]

  const fontBodyOptions = [
    { label: 'Outfit — moderna geométrica', value: 'Outfit' },
    { label: 'DM Sans — limpia neutral', value: 'DM Sans' },
    { label: 'Inter — estándar tech', value: 'Inter' },
    { label: 'Manrope — contemporánea', value: 'Manrope' },
  ]

  const handleAccent = (color) => {
    const updated = { ...localTheme, accentColor: color }
    setLocalTheme(updated)
    updateTheme(updated)
  }

  const handleFont = (e) => {
    const updated = { ...localTheme, fontDisplay: e.target.value }
    setLocalTheme(updated)
    updateTheme(updated)
  }

  const handleFontBody = (e) => {
    const updated = { ...localTheme, fontBody: e.target.value }
    setLocalTheme(updated)
    updateTheme(updated)
  }

  const handleSave = () => {
    setSaving(true)
    const request = localTheme.id
      ? api.put('/theme', localTheme)
      : api.post('/theme', localTheme)

    request
      .then(() => {
        setSaving(false)
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      })
      .catch(() => setSaving(false))
  }

  const labelStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: '10px',
    color: 'var(--color-text-dim)',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    marginBottom: '12px',
    display: 'block',
  }

  const selectStyle = {
    width: '100%',
    background: 'var(--color-bg)',
    border: '0.5px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    padding: '10px 14px',
    color: 'var(--color-text)',
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    outline: 'none',
  }

  return (
    <main style={{ padding: '48px 32px', maxWidth: '900px', margin: '0 auto' }}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 700, color: 'var(--color-text)' }}>
            Tema.
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-text-dim)', marginTop: '4px' }}>
            personaliza el aspecto visual de tu portafolio
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {success && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-aqua)' }}>
              ✓ guardado
            </span>
          )}
          <button
            onClick={handleSave}
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
            {saving ? 'guardando...' : 'guardar tema'}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

        {/* ── Color de acento ── */}
        <div style={{ background: 'var(--color-surface)', border: '0.5px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '28px' }}>
          <label style={labelStyle}>color de acento</label>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
            {accentPresets.map(({ name, color }) => (
              <button
                key={color}
                onClick={() => handleAccent(color)}
                title={name}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-sm)',
                  background: color,
                  border: localTheme.accentColor === color ? '2px solid white' : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'transform 0.1s',
                  transform: localTheme.accentColor === color ? 'scale(1.1)' : 'scale(1)',
                }}
              />
            ))}
          </div>

          {/* Color personalizado */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-text-dim)' }}>
              personalizado
            </span>
            <input
              type="color"
              value={localTheme.accentColor}
              onChange={(e) => handleAccent(e.target.value)}
              style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', border: 'none', background: 'none', cursor: 'pointer' }}
            />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-aqua)' }}>
              {localTheme.accentColor}
            </span>
          </div>
        </div>

        {/* ── Tipografía ── */}
        <div style={{ background: 'var(--color-surface)', border: '0.5px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '28px' }}>
          <label style={labelStyle}>tipografía de títulos</label>
          <select value={localTheme.fontDisplay} onChange={handleFont} style={{ ...selectStyle, marginBottom: '20px' }}>
            {fontOptions.map(({ label, value }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>

          <div style={{ marginBottom: '20px', padding: '16px', background: 'var(--color-bg)', borderRadius: 'var(--radius-sm)', border: '0.5px solid var(--color-border)' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: 'var(--color-text)', fontWeight: 700 }}>
              Desarrollador Full Stack.
            </span>
          </div>

          <label style={labelStyle}>tipografía de cuerpo</label>
          <select value={localTheme.fontBody} onChange={handleFontBody} style={selectStyle}>
            {fontBodyOptions.map(({ label, value }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>

          <div style={{ marginTop: '12px', padding: '16px', background: 'var(--color-bg)', borderRadius: 'var(--radius-sm)', border: '0.5px solid var(--color-border)' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-text-muted)', fontWeight: 300 }}>
              Construyo APIs robustas e interfaces que conectan con las personas.
            </span>
          </div>
        </div>

        {/* ── Preview ── */}
        <div style={{ background: 'var(--color-surface)', border: '0.5px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '28px' }}>
          <label style={labelStyle}>preview en tiempo real</label>
          <div style={{ background: 'var(--color-bg)', borderRadius: 'var(--radius-sm)', padding: '32px', border: '0.5px solid var(--color-border)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-aqua)', letterSpacing: '2px', marginBottom: '12px' }}>
              ● disponible para oportunidades
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 700, color: 'var(--color-text)', marginBottom: '8px', lineHeight: 1 }}>
              Desarrollador<br />
              <span style={{ color: 'var(--color-aqua)' }}>Full Stack.</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-text-muted)', fontWeight: 300, marginTop: '12px' }}>
              Construyo APIs robustas e interfaces que conectan con las personas.
            </p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
              <span style={{ background: 'var(--color-aqua)', color: '#080c10', fontFamily: 'var(--font-body)', fontSize: '12px', padding: '8px 16px', borderRadius: 'var(--radius-sm)' }}>
                ver proyectos
              </span>
              <span style={{ border: '0.5px solid var(--color-border)', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)', fontSize: '11px', padding: '8px 16px', borderRadius: 'var(--radius-sm)' }}>
                contacto
              </span>
            </div>
          </div>
        </div>

      </div>

    </main>
  )
}

export default AdminTema