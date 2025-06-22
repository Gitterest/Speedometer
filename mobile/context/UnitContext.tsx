import React, { createContext, useContext, useState } from 'react'

export type Unit = 'kmh' | 'mph'

interface UnitContextProps {
  unit: Unit
  toggleUnit: () => void
}

const UnitContext = createContext<UnitContextProps | undefined>(undefined)

export const UnitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [unit, setUnit] = useState<Unit>('kmh')
  const toggleUnit = () => setUnit(u => (u === 'kmh' ? 'mph' : 'kmh'))
  return (
    <UnitContext.Provider value={{ unit, toggleUnit }}>
      {children}
    </UnitContext.Provider>
  )
}

export const useUnit = () => {
  const ctx = useContext(UnitContext)
  if (!ctx) throw new Error('useUnit must be used within UnitProvider')
  return ctx
}
