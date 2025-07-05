import React from 'react'
import { View } from 'react-native'
import { useHUD } from '../context/HUDContext'
import AnimatedButton from './AnimatedButton'

export default function HUDToggle() {
  const { hud, toggleHUD, mirrored, toggleMirrored } = useHUD()
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <AnimatedButton title={hud ? 'Dashboard' : 'HUD'} onPress={toggleHUD} />
      <AnimatedButton title={mirrored ? 'Mirror: On' : 'Mirror: Off'} onPress={toggleMirrored} />
    </View>
  )
}
