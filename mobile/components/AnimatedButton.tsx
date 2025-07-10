import React from 'react'
import { Pressable, Text, ViewStyle, StyleProp } from 'react-native'
import { MotiView } from 'moti'
import { useTheme } from '../context/ThemeContext'

interface AnimatedButtonProps {
  title?: string
  onPress: () => void
  style?: StyleProp<ViewStyle>
  children?: React.ReactNode
  colorScheme?: 'green' | 'cyan' | 'magenta'
}

const colorMap = {
  green: '#39ff14',
  cyan: '#00ffff',
  magenta: '#ff00ff',
  blue: '#00aaff',
  orange: '#ff9900',
  purple: '#a259ff',
}

export default function AnimatedButton({ title, onPress, style, children, colorScheme }: AnimatedButtonProps) {
  const [pressed, setPressed] = React.useState(false)
  const theme = useTheme()
  const neon = colorScheme ? colorMap[colorScheme] : colorMap[theme.colorScheme] || colorMap.green
  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={{ borderRadius: 14, overflow: 'hidden' }}
    >
      <MotiView
        animate={{ scale: pressed ? 0.93 : 1, shadowOpacity: pressed ? 1 : 0.85, shadowRadius: pressed ? 22 : 16, rotateZ: theme.threeD ? (pressed ? '-2deg' : '0deg') : '0deg' }}
        transition={{ type: 'timing', duration: 120 }}
        style={[{
          backgroundColor: theme.glass ? 'rgba(30,40,60,0.45)' : '#181c',
          borderRadius: 14,
          paddingVertical: 12,
          paddingHorizontal: 22,
          shadowColor: neon,
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: theme.threeD ? 22 : 14,
          shadowOpacity: 0.85 * theme.glowIntensity,
          borderWidth: 2.5,
          borderColor: neon,
          alignItems: 'center',
          borderStyle: 'solid',
        }, style]}
      >
        {children || <Text style={{ color: neon, fontWeight: 'bold', fontSize: 18, textShadowColor: neon, textShadowRadius: 8 }}>{title}</Text>}
      </MotiView>
    </Pressable>
  )
} 