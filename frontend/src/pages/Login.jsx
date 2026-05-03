import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

function Login() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!form.username || !form.password) return
    setLoading(true)
    setError(false)

    api.post('/auth/login', form)
      .then((res) => {
        login(res.data.token)
        navigate('/admin')
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
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
    <main style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px',
    }}>

      <div style={{
        width: '100%',
        maxWidth: '400px',
        background: 'var(--color-surface)',
        border: '0.5px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '40px',
      }}>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '32px',
          fontWeight: 700,
          color: 'var(--color-text)',
          marginBottom: '8px',
        }}>
          Admin.
        </h1>

        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--color-text-dim)',
          marginBottom: '32px',
          letterSpacing: '1px',
        }}>
          acceso restringido
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          <div>
            <label style={labelStyle}>usuario</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="tu usuario"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>contraseña</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              style={inputStyle}
            />
          </div>

          {error && (
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: '#ff6b6b',
            }}>
              credenciales incorrectas
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              background: loading ? 'var(--color-surface-2)' : 'var(--color-aqua)',
              color: loading ? 'var(--color-text-muted)' : '#080c10',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 500,
              padding: '12px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              width: '100%',
              transition: 'all 0.2s',
            }}
          >
            {loading ? 'entrando...' : 'entrar'}
          </button>

        </div>

      </div>

    </main>
  )
}

export default Login