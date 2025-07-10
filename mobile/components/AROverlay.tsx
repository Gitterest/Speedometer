import React from 'react'
import { View, Text } from 'react-native'
import { MotiView, MotiText } from 'moti'
import Svg, { Circle, Path, Text as SvgText, Defs, LinearGradient, Stop } from 'react-native-svg'
import { useTheme } from '../context/ThemeContext'

export default function AROverlay() {
  const { colorScheme, glass, threeD } = useTheme()
  
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
    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>
      {/* AR Compass */}
      <MotiView
        from={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', duration: 600 }}
        style={{
          position: 'absolute',
          top: 60,
          right: 20,
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: glass ? 'rgba(20,30,40,0.7)' : 'rgba(30,40,60,0.8)',
          borderWidth: 2,
          borderColor: neon,
          shadowColor: neon,
          shadowOpacity: 0.6,
          shadowRadius: 16,
          alignItems: 'center',
          justifyContent: 'center',
          transform: threeD ? [{ rotateX: '5deg' }] : [],
        }}
      >
        <Svg width={60} height={60} viewBox="0 0 60 60">
          <Defs>
            <LinearGradient id="compassGlow" x1="0" y1="0" x2="60" y2="60">
              <Stop offset="0%" stopColor={neon} stopOpacity="0.8" />
              <Stop offset="100%" stopColor={neon} stopOpacity="0.2" />
            </LinearGradient>
          </Defs>
          <Circle cx="30" cy="30" r="25" fill="none" stroke={neon} strokeWidth="2" />
          <Path d="M30 10 L32 30 L30 50 L28 30 Z" fill="url(#compassGlow)" />
          <SvgText x="30" y="25" fill="#fff" fontSize="12" textAnchor="middle">N</SvgText>
          <SvgText x="30" y="45" fill="#fff" fontSize="12" textAnchor="middle">S</SvgText>
        </Svg>
      </MotiView>

      {/* AR Fuel Gauge */}
      <MotiView
        from={{ opacity: 0, translateX: 20 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ type: 'spring', duration: 600, delay: 200 }}
        style={{
          position: 'absolute',
          top: 160,
          right: 20,
          width: 80,
          height: 40,
          borderRadius: 20,
          backgroundColor: glass ? 'rgba(20,30,40,0.7)' : 'rgba(30,40,60,0.8)',
          borderWidth: 2,
          borderColor: neon,
          shadowColor: neon,
          shadowOpacity: 0.6,
          shadowRadius: 16,
          alignItems: 'center',
          justifyContent: 'center',
          transform: threeD ? [{ rotateX: '5deg' }] : [],
        }}
      >
        <Text style={{ color: neon, fontSize: 12, fontWeight: 'bold' }}>FUEL</Text>
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>75%</Text>
      </MotiView>

      {/* AR Speed Limit Sign */}
      <MotiView
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', duration: 600, delay: 400 }}
        style={{
          position: 'absolute',
          top: 220,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: 8,
          backgroundColor: glass ? 'rgba(20,30,40,0.7)' : 'rgba(30,40,60,0.8)',
          borderWidth: 2,
          borderColor: neon,
          shadowColor: neon,
          shadowOpacity: 0.6,
          shadowRadius: 16,
          alignItems: 'center',
          justifyContent: 'center',
          transform: threeD ? [{ rotateX: '5deg' }] : [],
        }}
      >
        <Text style={{ color: neon, fontSize: 10, fontWeight: 'bold' }}>LIMIT</Text>
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>80</Text>
      </MotiView>

      {/* AR Road Lines */}
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ type: 'timing', duration: 1000 }}
        style={{
          position: 'absolute',
          bottom: 100,
          left: 0,
          right: 0,
          height: 2,
          backgroundColor: neon,
          shadowColor: neon,
          shadowOpacity: 0.8,
          shadowRadius: 8,
        }}
      />

      {/* AR Distance Indicator */}
      <MotiView
        from={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', duration: 600, delay: 600 }}
        style={{
          position: 'absolute',
          bottom: 120,
          left: 20,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 12,
          backgroundColor: glass ? 'rgba(20,30,40,0.7)' : 'rgba(30,40,60,0.8)',
          borderWidth: 1.5,
          borderColor: neon,
          shadowColor: neon,
          shadowOpacity: 0.6,
          shadowRadius: 12,
          transform: threeD ? [{ rotateX: '5deg' }] : [],
        }}
      >
        <Text style={{ color: neon, fontSize: 10, fontWeight: 'bold' }}>DISTANCE</Text>
        <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>2.5 km</Text>
      </MotiView>

      {/* AR Weather Indicator */}
      <MotiView
        from={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', duration: 600, delay: 800 }}
        style={{
          position: 'absolute',
          top: 60,
          left: 20,
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: glass ? 'rgba(20,30,40,0.7)' : 'rgba(30,40,60,0.8)',
          borderWidth: 2,
          borderColor: neon,
          shadowColor: neon,
          shadowOpacity: 0.6,
          shadowRadius: 16,
          alignItems: 'center',
          justifyContent: 'center',
          transform: threeD ? [{ rotateX: '5deg' }] : [],
        }}
      >
        <Text style={{ fontSize: 24 }}>☀️</Text>
        <Text style={{ color: neon, fontSize: 10, fontWeight: 'bold' }}>22°C</Text>
      </MotiView>
    </View>
  )
} 