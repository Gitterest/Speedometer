import React, { createContext, useContext, useState } from 'react'

interface HUDContextProps {
  hud: boolean
  toggleHUD: () => void
  mirrored: boolean
  toggleMirrored: () => void
}

const HUDContext = createContext<HUDContextProps | undefined>(undefined)

export const HUDProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hud, setHUD] = useState(false)
  const [mirrored, setMirrored] = useState(false)
  const toggleHUD = () => setHUD(h => !h)
  const toggleMirrored = () => setMirrored(m => !m)
  return <HUDContext.Provider value={{ hud, toggleHUD, mirrored, toggleMirrored }}>{children}</HUDContext.Provider>
}

export const useHUD = () => {
  const ctx = useContext(HUDContext)
  if (!ctx) throw new Error('useHUD must be used within HUDProvider')
  return ctx
}
