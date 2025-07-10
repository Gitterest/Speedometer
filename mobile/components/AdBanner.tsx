import React, { useEffect, useState, useRef } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useAchievements } from '../context/AchievementContext'
import { MotiView } from 'moti'
import { captureRef } from 'react-native-view-shot'
import * as Sharing from 'expo-sharing'

const neonGradient = {
  background: 'linear-gradient(90deg, #00ffff 0%, #39ff14 50%, #ff00ff 100%)',
}

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
      from={{ opacity: 0, translateY: 40, shadowOpacity: 0 }}
      animate={{ opacity: 1, translateY: 0, shadowOpacity: 1 }}
      exit={{ opacity: 0, translateY: 40, shadowOpacity: 0 }}
      transition={{ type: 'spring', duration: 600 }}
      style={{
        backgroundColor: 'rgba(30,40,60,0.85)',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        marginTop: 18,
        borderWidth: 2.5,
        borderColor: '#00ffff',
        shadowColor: '#00ffff',
        shadowOpacity: 1,
        shadowRadius: 24,
        elevation: 8,
      }}
    >
      <Text style={{ color: '#39ff14', fontWeight: 'bold', fontSize: 20, marginBottom: 6, textShadowColor: '#00ffff', textShadowRadius: 8 }}>🏆 Achievement Unlocked!</Text>
      <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18, textShadowColor: '#ff00ff', textShadowRadius: 6 }}>{lastUnlocked.title}</Text>
      <Text style={{ color: '#fff', fontSize: 15, marginBottom: 6 }}>{lastUnlocked.description}</Text>
      <TouchableOpacity onPress={handleShare} style={{ marginTop: 12 }} activeOpacity={0.8}>
        <MotiView
          from={{ scale: 0.8, opacity: 0.7, shadowOpacity: 0 }}
          animate={{ scale: 1.08, opacity: 1, shadowOpacity: 1 }}
          transition={{ type: 'spring', duration: 400, loop: true }}
          style={{
            backgroundColor: '#39ff14',
            borderRadius: 10,
            paddingHorizontal: 22,
            paddingVertical: 8,
            shadowColor: '#00ffff',
            shadowOpacity: 1,
            shadowRadius: 16,
          }}
        >
          <Text style={{ color: '#222', fontWeight: 'bold', fontSize: 17, textShadowColor: '#00ffff', textShadowRadius: 6 }}>Share</Text>
        </MotiView>
      </TouchableOpacity>
    </MotiView>
  )
}
