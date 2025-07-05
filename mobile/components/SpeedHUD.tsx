import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { MotiText } from 'moti'
import { useUnit } from '../context/UnitContext'
import { useSpeedContext } from '../context/SpeedContext'
import { useHUD } from '../context/HUDContext'
import { useAchievements } from '../context/AchievementContext'
import Svg, { Rect, Line, Text as SvgText } from 'react-native-svg'

export default function SpeedHUD() {
  const { unit } = useUnit()
  const { speed, error } = useSpeedContext()
  const { mirrored } = useHUD()
  const { unlock, isUnlocked } = useAchievements()
  const [key, setKey] = useState(0)
  React.useEffect(() => setKey(k => k + 1), [speed])
  React.useEffect(() => {
    if (speed > 100 && !isUnlocked('speedster')) unlock('speedster')
  }, [speed, isUnlocked, unlock])
  const unitLabel = unit === 'kmh' ? 'km/h' : 'mph'
  return (
    <View style={[{ alignItems: 'center', padding: 16 }, mirrored ? { transform: [{ scaleX: -1 }] } : null]}>
      {/* AR Ghost Road Overlay */}
      <Svg width={220} height={60} style={{ position: 'absolute', top: 0, left: 0 }}>
        <Rect x={90} y={30} width={40} height={20} rx={10} fill="#00ffff22" />
        <Line x1={110} y1={50} x2={110} y2={10} stroke="#39ff14" strokeWidth={2} />
        <SvgText x={110} y={25} fill="#fff" fontSize={10} textAnchor="middle">N</SvgText>
      </Svg>
      {error && <Text style={{ color: '#f00', marginBottom: 8, fontSize: 14 }}>{error}</Text>}
      <MotiText
        key={key}
        from={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'timing', duration: 200 }}
        testID="speed-display"
        style={{ fontSize: 56, fontWeight: 'bold', color: '#39ff14', textAlign: 'center' }}
      >
        {speed.toFixed(1)} {unitLabel}
      </MotiText>
      {/* Speed limit indicator */}
      <View style={{ position: 'absolute', top: 8, right: 16, backgroundColor: '#ff007f', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2 }}>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 12 }}>SPEED LIMIT</Text>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>80</Text>
      </View>
    </View>
  )
}
