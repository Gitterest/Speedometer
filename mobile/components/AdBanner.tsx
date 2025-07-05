import React, { useEffect, useState, useRef } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useAchievements } from '../context/AchievementContext'
import { MotiView } from 'moti'
import { captureRef } from 'react-native-view-shot'
import * as Sharing from 'expo-sharing'

export default function AdBanner() {
  const { lastUnlocked } = useAchievements()
  const [visible, setVisible] = useState(false)
  const popupRef = useRef(null)
  useEffect(() => {
    if (lastUnlocked) {
      setVisible(true)
      const t = setTimeout(() => setVisible(false), 3000)
      return () => clearTimeout(t)
    }
  }, [lastUnlocked])
  if (!lastUnlocked || !visible) return null

  const handleShare = async () => {
    try {
      const uri = await captureRef(popupRef, { format: 'png', quality: 0.95 })
      await Sharing.shareAsync(uri)
    } catch (e) {
      // handle error
    }
  }

  return (
    <MotiView
      ref={popupRef}
      from={{ opacity: 0, translateY: 40 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: 40 }}
      transition={{ type: 'spring', duration: 600 }}
      style={{ backgroundColor: '#222', borderRadius: 16, padding: 16, alignItems: 'center', marginTop: 16, borderWidth: 2, borderColor: '#39ff14', shadowColor: '#39ff14', shadowOpacity: 0.7, shadowRadius: 12 }}
    >
      <Text style={{ color: '#39ff14', fontWeight: 'bold', fontSize: 18, marginBottom: 4 }}>Achievement Unlocked!</Text>
      <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>{lastUnlocked.title}</Text>
      <Text style={{ color: '#fff', fontSize: 14 }}>{lastUnlocked.description}</Text>
      <TouchableOpacity onPress={handleShare} style={{ marginTop: 10 }} activeOpacity={0.8}>
        <MotiView
          from={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 400 }}
          style={{ backgroundColor: '#39ff14', borderRadius: 8, paddingHorizontal: 18, paddingVertical: 6 }}
        >
          <Text style={{ color: '#222', fontWeight: 'bold', fontSize: 16 }}>Share</Text>
        </MotiView>
      </TouchableOpacity>
    </MotiView>
  )
}
