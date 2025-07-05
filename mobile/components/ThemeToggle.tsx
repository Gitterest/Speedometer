import React from 'react'
import { useTheme } from '../context/ThemeContext'
import AnimatedButton from './AnimatedButton'

export default function ThemeToggle() {
  const { dark, toggleDark } = useTheme()
  return <AnimatedButton title={dark ? 'Day' : 'Night'} onPress={toggleDark} />
}
