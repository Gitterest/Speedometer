import { createContext, useState, useContext } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false)
  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      <div
        className={`min-h-screen transition-colors duration-500 ${
          dark ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
        }`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
