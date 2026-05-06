import { createContext, useContext, useEffect, useState } from 'react'
import api from '../services/api'

const ProfileContext = createContext()

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/profile')
      .then((res) => {
        setProfile(res.data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  const updateProfile = (newProfile) => {
    setProfile(newProfile)
  }

  return (
    <ProfileContext.Provider value={{ profile, loading, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  return useContext(ProfileContext)
}