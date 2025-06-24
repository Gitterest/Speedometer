import React, { createContext, useContext, useState } from 'react'

interface HUDContextProps {
  hud: boolean
  toggleHUD: () => void
}

const HUDContext = createContext<HUDContextProps | undefined>(undefined)

export const HUDProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hud, setHUD] = useState(false)
  const toggleHUD = () => setHUD(h => !h)
  return <HUDContext.Provider value={{ hud, toggleHUD }}>{children}</HUDContext.Provider>
}

export const useHUD = () => {
  const ctx = useContext(HUDContext)
  if (!ctx) throw new Error('useHUD must be used within HUDProvider')
  return ctx
}
