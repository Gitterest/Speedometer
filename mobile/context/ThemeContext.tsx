import React, { createContext, useContext, useState } from 'react'

interface ThemeContextProps {
  dark: boolean
  toggleDark: () => void
  colorScheme: 'green' | 'cyan' | 'magenta'
  setColorScheme: (scheme: 'green' | 'cyan' | 'magenta') => void
  batterySaver: boolean
  toggleBatterySaver: () => void
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dark, setDark] = useState(false)
  const [colorScheme, setColorScheme] = useState<'green' | 'cyan' | 'magenta'>('green')
  const [batterySaver, setBatterySaver] = useState(false)
  const toggleDark = () => setDark(d => !d)
  const toggleBatterySaver = () => setBatterySaver(b => !b)
  return (
    <ThemeContext.Provider value={{ dark, toggleDark, colorScheme, setColorScheme, batterySaver, toggleBatterySaver }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
