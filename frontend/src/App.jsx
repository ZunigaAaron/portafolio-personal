import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import AdminNavbar from './components/AdminNavbar'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Admin from './pages/Admin'
import AdminPerfil from './pages/AdminPerfil'
import AdminSkills from './pages/AdminSkills'
import AdminMensajes from './pages/AdminMensajes'
import AdminTema from './pages/AdminTema.jsx'

function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
      {isAdminRoute ? <AdminNavbar /> : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
        <Route path="/admin/perfil" element={<PrivateRoute><AdminPerfil /></PrivateRoute>} />
        <Route path="/admin/skills" element={<PrivateRoute><AdminSkills /></PrivateRoute>} />
        <Route path="/admin/mensajes" element={<PrivateRoute><AdminMensajes /></PrivateRoute>} />
        <Route path="/admin/tema" element={<PrivateRoute><AdminTema /></PrivateRoute>} />
      </Routes>
    </div>
  )
}

export default App