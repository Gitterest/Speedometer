import React from 'react'
import { Button } from 'react-native'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { dark, toggleDark } = useTheme()
  return <Button title={dark ? 'Day' : 'Night'} onPress={toggleDark} />
}
