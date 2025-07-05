import React from 'react'
import { useUnit } from '../context/UnitContext'
import AnimatedButton from './AnimatedButton'

export default function UnitToggle() {
  const { unit, toggleUnit } = useUnit()
  return <AnimatedButton title={unit === 'kmh' ? 'KM/H' : 'MPH'} onPress={toggleUnit} />
}
