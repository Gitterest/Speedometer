import React from 'react'
import { View, Text } from 'react-native'
import AnimatedButton from './AnimatedButton'
import { useTheme } from '../context/ThemeContext'

const schemes = [
  { key: 'green', label: 'Neon Green', color: '#39ff14' },
  { key: 'cyan', label: 'Neon Cyan', color: '#00ffff' },
  { key: 'magenta', label: 'Neon Magenta', color: '#ff00ff' },
] as const

type SchemeKey = typeof schemes[number]['key']

export default function ThemeSelector() {
  const { colorScheme, setColorScheme } = useTheme()
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 12, gap: 12 }}>
      {schemes.map(s => (
        <AnimatedButton
          key={s.key}
          title={s.label}
          onPress={() => setColorScheme(s.key as SchemeKey)}
          style={{ borderColor: s.color, shadowColor: s.color, backgroundColor: colorScheme === s.key ? s.color + '22' : '#111' }}
        >
          <Text style={{ color: s.color, fontWeight: 'bold', fontSize: 16 }}>{s.label}</Text>
        </AnimatedButton>
      ))}
    </View>
  )
} 