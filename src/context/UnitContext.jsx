import { createContext, useContext, useState } from 'react'

const UnitContext = createContext()

export function UnitProvider({ children }) {
  const [unit, setUnit] = useState('kmh')
  const toggleUnit = () => setUnit(u => (u === 'kmh' ? 'mph' : 'kmh'))
  return (
    <UnitContext.Provider value={{ unit, toggleUnit }}>
      {children}
    </UnitContext.Provider>
  )
}

export function useUnit() {
  return useContext(UnitContext)
}
