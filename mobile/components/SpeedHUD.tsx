import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { MotiText, MotiView } from 'moti'
import { useUnit } from '../context/UnitContext'
import { useSpeedContext } from '../context/SpeedContext'
import { useHUD } from '../context/HUDContext'
import { useAchievements } from '../context/AchievementContext'
import { useTheme } from '../context/ThemeContext'
import Svg, { Rect, Line, Text as SvgText, Defs, LinearGradient, Stop, Circle } from 'react-native-svg'

export default function SpeedHUD() {
  const { unit } = useUnit()
  const { speed, error } = useSpeedContext()
  const { mirrored } = useHUD()
  const { unlock, isUnlocked } = useAchievements()
  const { colorScheme, dark, glass, threeD } = useTheme()
  const [key, setKey] = useState(0)
  
  React.useEffect(() => setKey(k => k + 1), [speed])
  React.useEffect(() => {
    if (speed > 100 && !isUnlocked('speedster')) unlock('speedster')
  }, [speed, isUnlocked, unlock])
  
  const unitLabel = unit === 'kmh' ? 'km/h' : 'mph'
  
  // Get neon color based on theme
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
  
  // Contextual empathy - different visual states based on speed
  const isSpeeding = speed > 80;
  const isHighSpeed = speed > 120;
  const isLowSpeed = speed < 20;
  
  return (
    <MotiView
      from={{ opacity: 0.7, scale: 0.96 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        shadowOpacity: isSpeeding ? 1 : 0.7,
        shadowRadius: isSpeeding ? 40 : 32,
      }}
      transition={{ type: 'timing', duration: 400 }}
      style={[
        {
          alignItems: 'center',
          padding: 20,
          borderRadius: 28,
          backgroundColor: glass ? 'rgba(20,30,40,0.65)' : 'rgba(30,40,60,0.55)',
          borderWidth: 2.5,
          borderColor: isSpeeding ? '#ff007f' : neon,
          shadowColor: isSpeeding ? '#ff007f' : neon,
          shadowOpacity: 0.7,
          shadowRadius: 32,
          marginVertical: 12,
          overflow: 'hidden',
          transform: threeD ? [{ rotateX: '2deg' }] : [],
        },
        mirrored ? { transform: [{ scaleX: -1 }] } : null,
      ]}
    >
      {/* Glass overlay */}
      <Svg width={260} height={80} style={{ position: 'absolute', top: 0, left: 0, zIndex: 2, pointerEvents: 'none' }}>
        <Defs>
          <LinearGradient id="glasshud" x1="0" y1="0" x2="260" y2="80">
            <Stop offset="0%" stopColor="#fff" stopOpacity="0.13" />
            <Stop offset="60%" stopColor="#fff" stopOpacity="0.04" />
            <Stop offset="100%" stopColor="#fff" stopOpacity="0.01" />
          </LinearGradient>
          <LinearGradient id="speedGlow" x1="0" y1="0" x2="260" y2="80">
            <Stop offset="0%" stopColor={neon} stopOpacity="0.3" />
            <Stop offset="100%" stopColor={neon} stopOpacity="0" />
          </LinearGradient>
        </Defs>
        <Rect x={0} y={0} width={260} height={80} rx={28} fill="url(#glasshud)" />
        {isSpeeding && <Rect x={0} y={0} width={260} height={80} rx={28} fill="url(#speedGlow)" />}
      </Svg>
      
      {/* AR Ghost Road Overlay - contextual based on speed */}
      <Svg width={260} height={80} style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
        <Defs>
          <LinearGradient id="arline" x1="0" y1="0" x2="0" y2="80">
            <Stop offset="0%" stopColor={neon} stopOpacity="0.7" />
            <Stop offset="100%" stopColor={neon} stopOpacity="0.2" />
          </LinearGradient>
        </Defs>
        {/* Speed limit indicator - contextual width based on speed */}
        <Rect 
          x={100} 
          y={40} 
          width={isSpeeding ? 80 : 60} 
          height={28} 
          rx={14} 
          fill={isSpeeding ? "#ff007f22" : `${neon}22`} 
        />
        <Line x1={130} y1={68} x2={130} y2={18} stroke="url(#arline)" strokeWidth={4} />
        <SvgText x={130} y={36} fill="#fff" fontSize={14} textAnchor="middle">N</SvgText>
        
        {/* Speed-reactive elements */}
        {isHighSpeed && (
          <>
            <Circle cx={50} cy={40} r={8} fill="#ff007f" opacity={0.6} />
            <Circle cx={210} cy={40} r={8} fill="#ff007f" opacity={0.6} />
          </>
        )}
        {isLowSpeed && (
          <Rect x={20} y={35} width={220} height={10} rx={5} fill={`${neon}33`} />
        )}
      </Svg>
      
      {error && (
        <MotiView
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          style={{
            marginBottom: 8,
            paddingHorizontal: 12,
            paddingVertical: 4,
            backgroundColor: '#ff007f',
            borderRadius: 8,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', textShadowColor: '#ff00ff', textShadowRadius: 8 }}>
            {error}
          </Text>
        </MotiView>
      )}
      
      <MotiText
        key={key}
        from={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
        }}
        transition={{ type: 'timing', duration: 200 }}
        testID="speed-display"
        style={{
          fontSize: 68,
          fontWeight: 'bold',
          color: isSpeeding ? '#ff007f' : neon,
          textAlign: 'center',
          textShadowColor: isSpeeding ? '#ff007f' : neon,
          textShadowOffset: { width: 0, height: 0 },
          textShadowRadius: 18,
          fontFamily: 'monospace',
          letterSpacing: 2.5,
          marginTop: 24,
        }}
      >
        {speed.toFixed(1)} {unitLabel}
      </MotiText>
      
      {/* Contextual speed indicator */}
      <MotiView
        from={{ opacity: 0, translateY: -12 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 400 }}
        style={{
          position: 'absolute',
          top: 18,
          right: 24,
          backgroundColor: isSpeeding ? '#ff007f' : neon,
          borderRadius: 12,
          paddingHorizontal: 14,
          paddingVertical: 4,
          shadowColor: isSpeeding ? '#ff007f' : neon,
          shadowOpacity: 0.7,
          shadowRadius: 10,
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14, letterSpacing: 1 }}>
          {isSpeeding ? 'SPEEDING' : 'SPEED LIMIT'}
        </Text>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>
          {isSpeeding ? '!' : '80'}
        </Text>
      </MotiView>
      
      {/* Speed context indicator */}
      {isHighSpeed && (
        <MotiView
          from={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            position: 'absolute',
            top: 18,
            left: 24,
            backgroundColor: '#ff007f',
            borderRadius: 8,
            paddingHorizontal: 8,
            paddingVertical: 2,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>HIGH SPEED</Text>
        </MotiView>
      )}
      
      {isLowSpeed && (
        <MotiView
          from={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            position: 'absolute',
            top: 18,
            left: 24,
            backgroundColor: neon,
            borderRadius: 8,
            paddingHorizontal: 8,
            paddingVertical: 2,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>LOW SPEED</Text>
        </MotiView>
      )}
    </MotiView>
  )
}
