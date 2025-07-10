import React, { createContext, useContext, useState } from 'react'

interface ThemeContextProps {
  dark: boolean
  toggleDark: () => void
  colorScheme: 'green' | 'cyan' | 'magenta' | 'blue' | 'orange' | 'purple'
  setColorScheme: (scheme: 'green' | 'cyan' | 'magenta' | 'blue' | 'orange' | 'purple') => void
  batterySaver: boolean
  toggleBatterySaver: () => void
  glass: boolean
  toggleGlass: () => void
  threeD: boolean
  toggleThreeD: () => void
  animationSpeed: number
  setAnimationSpeed: (v: number) => void
  glowIntensity: number
  setGlowIntensity: (v: number) => void
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dark, setDark] = useState(false)
  const [colorScheme, setColorScheme] = useState<'green' | 'cyan' | 'magenta' | 'blue' | 'orange' | 'purple'>('green')
  const [batterySaver, setBatterySaver] = useState(false)
  const [glass, setGlass] = useState(true)
  const [threeD, setThreeD] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [glowIntensity, setGlowIntensity] = useState(1)
  const toggleDark = () => setDark(d => !d)
  const toggleBatterySaver = () => setBatterySaver(b => !b)
  const toggleGlass = () => setGlass(g => !g)
  const toggleThreeD = () => setThreeD(t => !t)
  return (
    <ThemeContext.Provider value={{ dark, toggleDark, colorScheme, setColorScheme, batterySaver, toggleBatterySaver, glass, toggleGlass, threeD, toggleThreeD, animationSpeed, setAnimationSpeed, glowIntensity, setGlowIntensity }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
