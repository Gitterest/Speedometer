import React from 'react'
import { Pressable, Text, ViewStyle, StyleProp } from 'react-native'
import { MotiView } from 'moti'

interface AnimatedButtonProps {
  title?: string
  onPress: () => void
  style?: StyleProp<ViewStyle>
  children?: React.ReactNode
}

export default function AnimatedButton({ title, onPress, style, children }: AnimatedButtonProps) {
  const [pressed, setPressed] = React.useState(false)
  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={{ borderRadius: 12, overflow: 'hidden' }}
    >
      <MotiView
        animate={{ scale: pressed ? 0.93 : 1, shadowOpacity: pressed ? 0.7 : 1 }}
        transition={{ type: 'timing', duration: 120 }}
        style={[{
          backgroundColor: '#111',
          borderRadius: 12,
          paddingVertical: 10,
          paddingHorizontal: 18,
          shadowColor: '#39ff14',
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: 12,
          shadowOpacity: 0.8,
          borderWidth: 1.5,
          borderColor: '#39ff14',
          alignItems: 'center',
        }, style]}
      >
        {children || <Text style={{ color: '#39ff14', fontWeight: 'bold', fontSize: 16 }}>{title}</Text>}
      </MotiView>
    </Pressable>
  )
} 