import { createContext, useContext, useEffect, useState } from 'react'
import api from '../services/api'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState({
    accentColor: '#3ECFCF',
    backgroundColor: '#080c10',
    surfaceColor: '#0d1117',
    textColor: '#e8eaf0',
    fontDisplay: 'Cormorant Garamond',
    fontBody: 'Outfit',
  })

  useEffect(() => {
    api.get('/theme')
      .then((res) => {
        const t = res.data
        setTheme(t)
        applyTheme(t)
      })
      .catch(() => {
        // Si no hay tema en la DB usa los valores por defecto
        applyTheme(theme)
      })
  }, [])

  const applyTheme = (t) => {
    const root = document.documentElement
    root.style.setProperty('--color-aqua', t.accentColor)
    root.style.setProperty('--color-bg', t.backgroundColor)
    root.style.setProperty('--color-surface', t.surfaceColor)
    root.style.setProperty('--color-text', t.textColor)
    root.style.setProperty('--font-display', `'${t.fontDisplay}', serif`)
    root.style.setProperty('--font-body', `'${t.fontBody}', sans-serif`)
  }

  const updateTheme = (newTheme) => {
    setTheme(newTheme)
    applyTheme(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}