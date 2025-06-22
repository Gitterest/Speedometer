import React from 'react'
import { Text, View } from 'react-native'
import { useUnit } from '../context/UnitContext'
import useSpeed from '../hooks/useSpeed'

export default function SpeedHUD() {
  const { unit } = useUnit()
  const { speed, error } = useSpeed(unit)
  const unitLabel = unit === 'kmh' ? 'km/h' : 'mph'
  return (
    <View className="items-center p-4">
      {error && <Text className="text-red-500 mb-2 text-sm">{error}</Text>}
      <Text testID="speed-display" className="text-6xl font-bold">
        {speed.toFixed(1)} {unitLabel}
      </Text>
    </View>
  )
}
