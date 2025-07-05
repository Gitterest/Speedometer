import React from 'react'
import AnimatedButton from './AnimatedButton'
import { useTheme } from '../context/ThemeContext'

export default function BatterySaverToggle() {
  const { batterySaver, toggleBatterySaver } = useTheme()
  return <AnimatedButton title={batterySaver ? 'Battery Saver: On' : 'Battery Saver: Off'} onPress={toggleBatterySaver} />
} 