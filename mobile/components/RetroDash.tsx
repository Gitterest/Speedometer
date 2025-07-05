import React from 'react'
import { View, Text } from 'react-native'

const colorMap = {
  green: '#39ff14',
  cyan: '#00ffff',
  magenta: '#ff00ff',
}

export default function RetroDash({ value = 0, max = 180, colorScheme = 'green' }: { value?: number; max?: number; colorScheme?: 'green' | 'cyan' | 'magenta' }) {
  const neon = colorMap[colorScheme]
  return (
    <View style={{ alignItems: 'center', padding: 24, backgroundColor: '#111', borderRadius: 20, borderWidth: 2, borderColor: neon, margin: 8, width: 220 }}>
      {/* Neon grid background */}
      <View style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', zIndex: -1 }}>
        {[...Array(8)].map((_, i) => (
          <View key={i} style={{ position: 'absolute', left: `${i * 12.5}%`, top: 0, bottom: 0, width: 1, backgroundColor: neon + '33' }} />
        ))}
        {[...Array(4)].map((_, i) => (
          <View key={i} style={{ position: 'absolute', top: `${i * 25}%`, left: 0, right: 0, height: 1, backgroundColor: neon + '33' }} />
        ))}
      </View>
      <Text style={{ fontFamily: 'monospace', fontSize: 56, color: neon, textShadowColor: neon, textShadowRadius: 16, fontWeight: 'bold', letterSpacing: 2, marginBottom: 8 }}>
        {value.toFixed(1)}
      </Text>
      <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', letterSpacing: 2, marginBottom: 4 }}>RETRO MODE</Text>
      <Text style={{ color: neon, fontSize: 14, letterSpacing: 2 }}>{`0 - ${max}`}</Text>
    </View>
  )
} 