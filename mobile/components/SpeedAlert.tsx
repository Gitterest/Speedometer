import React, { useState } from 'react'
import { View, TextInput, Text, Vibration } from 'react-native'
import { useUnit } from '../context/UnitContext'
import { useSpeedContext } from '../context/SpeedContext'
import { useTheme } from '../context/ThemeContext'

export default function SpeedAlert() {
  const { unit } = useUnit()
  const { speed } = useSpeedContext()
  const { colorScheme, glass } = useTheme()
  const [limit, setLimit] = useState(unit === 'kmh' ? 80 : 50)
  const over = speed > limit
  React.useEffect(() => {
    if (over) {
      Vibration.vibrate([0, 200])
    } else {
      Vibration.cancel()
    }
  }, [over])
  const unitLabel = unit === 'kmh' ? 'km/h' : 'mph'
  return (
    <View style={{
      padding: 18,
      borderRadius: 22,
      backgroundColor: glass ? 'rgba(30,40,60,0.55)' : '#181c',
      borderWidth: 2,
      borderColor: colorScheme === 'green' ? '#39ff14cc' : colorScheme === 'cyan' ? '#00ffffcc' : '#ff00ffcc',
      shadowColor: colorScheme === 'green' ? '#39ff14' : colorScheme === 'cyan' ? '#00ffff' : '#ff00ff',
      shadowOpacity: 0.5,
      shadowRadius: 18,
      margin: 10,
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18, marginBottom: 8, textShadowColor: colorScheme === 'green' ? '#39ff14' : colorScheme === 'cyan' ? '#00ffff' : '#ff00ff', textShadowRadius: 8 }}>Speed Alert</Text>
      <Text style={{ color: '#fff', marginBottom: 2 }}>Speed limit ({unitLabel})</Text>
      <TextInput
        keyboardType="numeric"
        value={String(limit)}
        onChangeText={t => setLimit(Number(t) || 0)}
        style={{
          borderWidth: 2,
          borderColor: colorScheme === 'green' ? '#39ff14' : colorScheme === 'cyan' ? '#00ffff' : '#ff00ff',
          backgroundColor: glass ? 'rgba(20,30,40,0.7)' : '#222',
          color: '#fff',
          borderRadius: 10,
          padding: 8,
          fontSize: 18,
          marginBottom: 8,
          textAlign: 'center',
          textShadowColor: colorScheme === 'green' ? '#39ff14' : colorScheme === 'cyan' ? '#00ffff' : '#ff00ff',
          textShadowRadius: 6,
        }}
      />
      {over && <Text style={{ color: '#ff007f', fontWeight: 'bold', fontSize: 20, marginTop: 6, textShadowColor: '#ff007f', textShadowRadius: 10, letterSpacing: 1 }}>Slow down!</Text>}
    </View>
  )
}
