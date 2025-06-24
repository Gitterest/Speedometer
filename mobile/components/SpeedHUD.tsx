import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { MotiText } from 'moti'
import { useUnit } from '../context/UnitContext'
import { useSpeedContext } from '../context/SpeedContext'

export default function SpeedHUD() {
  const { unit } = useUnit()
  const { speed, error } = useSpeedContext()
  const [key, setKey] = useState(0)
  React.useEffect(() => setKey(k => k + 1), [speed])
  const unitLabel = unit === 'kmh' ? 'km/h' : 'mph'
  return (
    <View className="items-center p-4">
      {error && <Text className="text-red-500 mb-2 text-sm">{error}</Text>}
      <MotiText
        key={key}
        from={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'timing', duration: 200 }}
        testID="speed-display"
        className="text-7xl font-bold text-green-400"
      >
        {speed.toFixed(1)} {unitLabel}
      </MotiText>
    </View>
  )
}
