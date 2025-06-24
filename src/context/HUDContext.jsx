import { createContext, useContext, useState } from 'react'

const HUDContext = createContext()

export function HUDProvider({ children }) {
  const [hud, setHUD] = useState(false)
  const toggleHUD = () => setHUD(h => !h)
  return (
    <HUDContext.Provider value={{ hud, toggleHUD }}>
      {children}
    </HUDContext.Provider>
  )
}

export function useHUD() {
  return useContext(HUDContext)
}
