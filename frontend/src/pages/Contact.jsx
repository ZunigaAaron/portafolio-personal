import { useState } from 'react'
import api from '../services/api'

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return
    setSending(true)
    setError(false)

    api.post('/contact', form)
      .then(() => {
        setSuccess(true)
        setForm({ name: '', email: '', message: '' })
        setTimeout(() => setSuccess(false), 3000)
      })
      .catch(() => setError(true))
      .finally(() => setSending(false))
  }

  const inputStyle = {
    width: '100%',
    background: 'var(--color-surface)',
    border: '0.5px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    padding: '12px 16px',
    color: 'var(--color-text)',
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    fontWeight: 300,
    outline: 'none',
  }

  const labelStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: '10px',
    color: 'var(--color-text-dim)',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    marginBottom: '8px',
    display: 'block',
  }

  return (
    <main style={{ padding: '64px 32px', maxWidth: '600px', margin: '0 auto' }}>

      <div style={{ marginBottom: '48px' }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 5vw, 56px)',
          fontWeight: 700,
          color: 'var(--color-text)',
          marginBottom: '12px',
        }}>
          Contacto.
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          color: 'var(--color-text-muted)',
          fontWeight: 300,
        }}>
          Tienes un proyecto en mente o quieres platicar? Escríbeme.
        </p>
      </div>

      {success ? (
        <div style={{
          background: 'var(--color-surface)',
          border: '0.5px solid var(--color-aqua-border)',
          borderRadius: 'var(--radius-md)',
          padding: '32px',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: '24px',
            color: 'var(--color-aqua)',
            marginBottom: '8px',
          }}>
            Mensaje enviado.
          </p>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            color: 'var(--color-text-muted)',
            fontWeight: 300,
          }}>
            Te respondo pronto.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          <div>
            <label style={labelStyle}>nombre</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Tu nombre"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>mensaje</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Cuéntame tu idea..."
              rows={5}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>

          {error && (
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: '#ff6b6b',
            }}>
              algo salió mal, intenta de nuevo
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={sending}
            style={{
              background: sending ? 'var(--color-surface)' : 'var(--color-aqua)',
              color: sending ? 'var(--color-text-muted)' : '#080c10',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 500,
              padding: '12px 28px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              alignSelf: 'flex-start',
              transition: 'all 0.2s',
            }}
          >
            {sending ? 'enviando...' : 'enviar mensaje'}
          </button>

        </div>
      )}

    </main>
  )
}

export default Contact