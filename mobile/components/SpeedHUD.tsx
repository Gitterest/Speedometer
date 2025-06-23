import React from 'react'
import { Text, View } from 'react-native'
import { useUnit } from '../context/UnitContext'
import { useSpeedContext } from '../context/SpeedContext'

export default function SpeedHUD() {
  const { unit } = useUnit()
  const { speed, error } = useSpeedContext()
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
