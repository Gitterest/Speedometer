import React from 'react'
import { View, Text } from 'react-native'
import AnimatedButton from './AnimatedButton'
import { useTheme } from '../context/ThemeContext'
import { MotiView } from 'moti'

const schemes = [
  { key: 'green', label: 'Neon Green', color: '#39ff14' },
  { key: 'cyan', label: 'Neon Cyan', color: '#00ffff' },
  { key: 'magenta', label: 'Neon Magenta', color: '#ff00ff' },
  { key: 'blue', label: 'Neon Blue', color: '#00aaff' },
  { key: 'orange', label: 'Neon Orange', color: '#ff9900' },
  { key: 'purple', label: 'Neon Purple', color: '#a259ff' },
] as const

type SchemeKey = typeof schemes[number]['key']

export default function ThemeSelector() {
  const { colorScheme, setColorScheme } = useTheme()
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginVertical: 12, gap: 12 }}>
      {schemes.map(s => (
        <AnimatedButton
          key={s.key}
          title={s.label}
          onPress={() => setColorScheme(s.key as SchemeKey)}
          colorScheme={s.key as any}
          style={{ borderColor: s.color, shadowColor: s.color, backgroundColor: colorScheme === s.key ? s.color + '22' : '#111', minWidth: 90, margin: 2 }}
        >
          <MotiView
            from={{ scale: 0.8, opacity: 0.7 }}
            animate={{ scale: colorScheme === s.key ? 1.15 : 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 300 }}
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
          >
            <View style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: s.color, marginRight: 7, borderWidth: 2, borderColor: '#fff', shadowColor: s.color, shadowOpacity: 0.7, shadowRadius: 8 }} />
            <Text style={{ color: s.color, fontWeight: 'bold', fontSize: 16 }}>{s.label}</Text>
          </MotiView>
        </AnimatedButton>
      ))}
    </View>
  )
} 