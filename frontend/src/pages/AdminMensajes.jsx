import { useEffect, useState } from 'react'
import api from '../services/api'

function AdminMensajes() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [confirmId, setConfirmId] = useState(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = () => {
    api.get('/contact')
      .then((res) => {
        setMessages(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  const handleMarkRead = (id) => {
    api.put(`/contact/${id}/read`)
      .then(() => fetchMessages())
  }

  const unread = messages.filter(m => !m.isRead).length

  return (
    <main style={{ padding: '48px 32px', maxWidth: '900px', margin: '0 auto' }}>

      {/* ── Modal confirmación ── */}
      {confirmId && (
        <div style={{ position: 'fixed', inset: 0, background: '#000000aa', backdropFilter: 'blur(4px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
          <div style={{ background: 'var(--color-surface)', border: '0.5px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '32px', maxWidth: '380px', width: '100%' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--color-text)', marginBottom: '8px' }}>
              Eliminar mensaje.
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-text-muted)', fontWeight: 300, marginBottom: '28px', lineHeight: 1.6 }}>
              ¿Estás seguro de que quieres eliminar este mensaje?
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button onClick={() => setConfirmId(null)} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-text-muted)', background: 'transparent', border: '0.5px solid var(--color-border)', padding: '9px 18px', borderRadius: 'var(--radius-sm)' }}>
                cancelar
              </button>
              <button
                onClick={() => {
                  api.delete(`/contact/${confirmId}`)
                    .then(() => { fetchMessages(); setConfirmId(null) })
                }}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#fff', background: '#ff6b6b', border: 'none', padding: '9px 18px', borderRadius: 'var(--radius-sm)' }}
              >
                eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Header ── */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 700, color: 'var(--color-text)' }}>
          Mensajes.
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-text-dim)' }}>
            mensajes de contacto
          </p>
          {unread > 0 && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--color-aqua)', background: 'var(--color-aqua-dim)', border: '0.5px solid var(--color-aqua-border)', padding: '2px 8px', borderRadius: '4px', letterSpacing: '1px' }}>
              {unread} sin leer
            </span>
          )}
        </div>
      </div>

      {/* ── Lista ── */}
      {loading ? (
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-text-dim)' }}>cargando...</p>
      ) : messages.length === 0 ? (
        <div style={{ background: 'var(--color-surface)', border: '0.5px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '48px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-text-dim)' }}>
            no hay mensajes todavía
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                background: 'var(--color-surface)',
                border: `0.5px solid ${msg.isRead ? 'var(--color-border)' : 'var(--color-aqua-border)'}`,
                borderRadius: 'var(--radius-md)',
                padding: '20px 24px',
                position: 'relative',
              }}
            >
              {!msg.isRead && (
                <div style={{ position: 'absolute', top: '20px', right: '24px', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-aqua)' }} />
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '17px', color: 'var(--color-text)', fontWeight: 600 }}>
                  {msg.name}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-text-dim)' }}>
                  {msg.email}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-text-faint)', marginLeft: 'auto', paddingRight: '16px' }}>
                  {new Date(msg.sentAt).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })}
                </span>
              </div>

              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-text-muted)', fontWeight: 300, lineHeight: 1.7, marginBottom: '16px' }}>
                {msg.message}
              </p>

              <div style={{ display: 'flex', gap: '8px' }}>
                {!msg.isRead && (
                  <button
                    onClick={() => handleMarkRead(msg.id)}
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-aqua)', background: 'var(--color-aqua-dim)', border: '0.5px solid var(--color-aqua-border)', padding: '6px 14px', borderRadius: 'var(--radius-sm)' }}
                  >
                    marcar como leído
                  </button>
                )}
                <a
                
                  href={`mailto:${msg.email}`}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-text-muted)', background: 'transparent', border: '0.5px solid var(--color-border)', padding: '6px 14px', borderRadius: 'var(--radius-sm)', textDecoration: 'none' }}
                  responder
                />
                <button
                  onClick={() => setConfirmId(msg.id)}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#ff6b6b', background: 'transparent', border: '0.5px solid #ff6b6b30', padding: '6px 14px', borderRadius: 'var(--radius-sm)' }}
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

export default AdminMensajes