import React from 'react'
import { Button } from 'react-native'
import { useHUD } from '../context/HUDContext'

export default function HUDToggle() {
  const { hud, toggleHUD } = useHUD()
  return <Button title={hud ? 'Dashboard' : 'HUD'} onPress={toggleHUD} />
}
