import React from 'react'
import { View, Text, Button } from 'react-native'
import { useUnit } from '../context/UnitContext'
import { useSpeedContext } from '../context/SpeedContext'

export default function TripSummary() {
  const { unit } = useUnit()
  const { distance, duration, avgSpeed, maxSpeed, clearTrip } = useSpeedContext()
  const dist = unit === 'kmh' ? distance / 1000 : distance / 1609.34
  const distUnit = unit === 'kmh' ? 'km' : 'mi'
  const speedUnit = unit === 'kmh' ? 'km/h' : 'mph'
  return (
    <View className="p-4">
      <Text>Distance: {dist.toFixed(2)} {distUnit}</Text>
      <Text>Duration: {Math.floor(duration)} s</Text>
      <Text>Avg: {avgSpeed.toFixed(1)} {speedUnit}</Text>
      <Text>Max: {maxSpeed.toFixed(1)} {speedUnit}</Text>
      <Button title="Clear trip" onPress={clearTrip} />
    </View>
  )
}
