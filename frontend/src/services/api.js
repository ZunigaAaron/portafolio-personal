import axios from 'axios'

// La URL base de tu backend
const api = axios.create({
  baseURL: 'https://localhost:7020/api',
})

// Antes de cada petición, revisa si hay un token guardado
// y lo agrega automáticamente al header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api