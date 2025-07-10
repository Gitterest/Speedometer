import React from 'react'
import { View, Text } from 'react-native'
import { useUnit } from '../context/UnitContext'
import { useSpeedContext } from '../context/SpeedContext'
import AnimatedButton from './AnimatedButton'
import { useTheme } from '../context/ThemeContext'

export default function TripSummary() {
  const { unit } = useUnit()
  const { distance, duration, avgSpeed, maxSpeed, clearTrip } = useSpeedContext()
  const { colorScheme, glass } = useTheme()
  const dist = unit === 'kmh' ? distance / 1000 : distance / 1609.34
  const distUnit = unit === 'kmh' ? 'km' : 'mi'
  const speedUnit = unit === 'kmh' ? 'km/h' : 'mph'

  const getColor = () => {
    switch (colorScheme) {
      case 'green': return '#39ff14';
      case 'cyan': return '#00ffff';
      case 'magenta': return '#ff00ff';
      case 'blue': return '#00aaff';
      case 'orange': return '#ff9900';
      case 'purple': return '#a259ff';
      default: return '#39ff14';
    }
  };
  const neon = getColor();

  return (
    <View style={{
      padding: 18,
      borderRadius: 22,
      backgroundColor: glass ? 'rgba(30,40,60,0.55)' : '#181c',
      borderWidth: 2,
      borderColor: neon,
      shadowColor: neon,
      shadowOpacity: 0.5,
      shadowRadius: 18,
      margin: 10,
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Animated neon background accent */}
      <View style={{
        position: 'absolute',
        left: 0, top: 0, right: 0, bottom: 0,
        opacity: 0.13,
        backgroundColor: neon,
        borderRadius: 22,
        zIndex: 0,
      }} />
      <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18, marginBottom: 8, textShadowColor: neon, textShadowRadius: 8 }}>Trip Summary</Text>
      <Text style={{ color: '#fff', marginBottom: 2 }}>Distance: <Text style={{ color: neon }}>{dist.toFixed(2)} {distUnit}</Text></Text>
      <Text style={{ color: '#fff', marginBottom: 2 }}>Duration: <Text style={{ color: neon }}>{Math.floor(duration)} s</Text></Text>
      <Text style={{ color: '#fff', marginBottom: 2 }}>Avg: <Text style={{ color: neon }}>{avgSpeed.toFixed(1)} {speedUnit}</Text></Text>
      <Text style={{ color: '#fff', marginBottom: 8 }}>Max: <Text style={{ color: neon }}>{maxSpeed.toFixed(1)} {speedUnit}</Text></Text>
      <AnimatedButton title="Clear trip" onPress={clearTrip} colorScheme={['green','cyan','magenta'].includes(colorScheme) ? colorScheme as 'green'|'cyan'|'magenta' : 'green'} />
    </View>
  )
}
