import React, { useState } from 'react'
import { View, TextInput, Text } from 'react-native'
import { useUnit } from '../context/UnitContext'
import { useSpeedContext } from '../context/SpeedContext'

export default function SpeedAlert() {
  const { unit } = useUnit()
  const { speed } = useSpeedContext()
  const [limit, setLimit] = useState(unit === 'kmh' ? 80 : 50)
  const over = speed > limit
  const unitLabel = unit === 'kmh' ? 'km/h' : 'mph'
  return (
    <View className="p-4">
      <Text>Speed limit ({unitLabel})</Text>
      <TextInput
        keyboardType="numeric"
        value={String(limit)}
        onChangeText={t => setLimit(Number(t) || 0)}
        className="border p-1"
      />
      {over && <Text className="text-red-600">Slow down!</Text>}
    </View>
  )
}
