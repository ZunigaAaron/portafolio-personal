import { createContext, useContext, useState } from 'react'

// Creamos el contexto
const AuthContext = createContext()

// Este componente envuelve toda la app y comparte el estado
export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'))

  const login = (newToken) => {
    localStorage.setItem('token', newToken)
    setToken(newToken)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  // isAuthenticated es true si hay un token guardado
  const isAuthenticated = !!token

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook para usar el contexto fácilmente en cualquier componente
export function useAuth() {
  return useContext(AuthContext)
}