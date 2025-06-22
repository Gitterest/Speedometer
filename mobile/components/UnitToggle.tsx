import React from 'react'
import { Button } from 'react-native'
import { useUnit } from '../context/UnitContext'

export default function UnitToggle() {
  const { unit, toggleUnit } = useUnit()
  return <Button title={unit === 'kmh' ? 'KM/H' : 'MPH'} onPress={toggleUnit} />
}
