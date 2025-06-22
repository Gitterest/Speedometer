import React from 'react'
import { View, Text } from 'react-native'
import { useUnit } from '../context/UnitContext'
import useSpeed from '../hooks/useSpeed'

export default function TripSummary() {
  const { unit } = useUnit()
  const { distance, duration, avgSpeed } = useSpeed(unit)
  const dist = unit === 'kmh' ? distance / 1000 : distance / 1609.34
  const distUnit = unit === 'kmh' ? 'km' : 'mi'
  const speedUnit = unit === 'kmh' ? 'km/h' : 'mph'
  return (
    <View className="p-4">
      <Text>Distance: {dist.toFixed(2)} {distUnit}</Text>
      <Text>Duration: {Math.floor(duration)} s</Text>
      <Text>Avg: {avgSpeed.toFixed(1)} {speedUnit}</Text>
    </View>
  )
}
