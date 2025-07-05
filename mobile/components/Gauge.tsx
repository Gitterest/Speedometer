import React, { useMemo, useRef, useEffect, useState } from 'react'
import { View, Text, Animated as RNAnimated } from 'react-native'
import Svg, { Path, Line, G, Defs, RadialGradient, Stop, Filter, FeGaussianBlur, Circle } from 'react-native-svg'
import { MotiView, MotiText } from 'moti'
import RetroDash from './RetroDash'

const colorMap = {
  green: '#39ff14',
  cyan: '#00ffff',
  magenta: '#ff00ff',
}

export default function Gauge({ value = 0, max = 180, colorScheme = 'green', onRetroMode }: { value?: number; max?: number; colorScheme?: 'green' | 'cyan' | 'magenta'; onRetroMode?: (active: boolean) => void }) {
  const angle = -90 + Math.min(value, max) / max * 180
  const arcColor = colorMap[colorScheme]
  const ticks = useMemo(() => Array.from({ length: 10 }, (_, i) => i), [])

  // Speed history arc
  const history = useRef<number[]>([])
  useEffect(() => {
    history.current = [...history.current.slice(-29), value]
  }, [value])

  // Energy ring animation
  const ringAnim = useRef(new RNAnimated.Value(1)).current
  useEffect(() => {
    RNAnimated.sequence([
      RNAnimated.timing(ringAnim, { toValue: 1.2, duration: 120, useNativeDriver: true }),
      RNAnimated.timing(ringAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start()
  }, [value])

  // History arc path
  const historyPath = useMemo(() => {
    let d = ''
    const hist = history.current
    for (let i = 0; i < hist.length; i++) {
      const a = -90 + Math.min(hist[i], max) / max * 180
      const r = 45
      const x = 50 + r * Math.cos((a * Math.PI) / 180)
      const y = 45 + r * Math.sin((a * Math.PI) / 180)
      d += i === 0 ? `M${x} ${y}` : `L${x} ${y}`
    }
    return d
  }, [value, max])

  const [retroMode, setRetroMode] = useState(false)
  const tapCount = useRef(0)
  const lastTap = useRef(0)

  const handleTripleTap = () => {
    const now = Date.now()
    if (now - lastTap.current < 600) {
      tapCount.current += 1
      if (tapCount.current === 3) {
        setRetroMode(r => {
          const next = !r
          onRetroMode && onRetroMode(next)
          return next
        })
        tapCount.current = 0
      }
    } else {
      tapCount.current = 1
    }
    lastTap.current = now
  }

  if (retroMode) {
    return <RetroDash value={value} max={max} colorScheme={colorScheme} />
  }

  return (
    <View style={{ alignItems: 'center', padding: 16 }}>
      <MotiView
        from={{ shadowOpacity: 0.5, scale: 0.98 }}
        animate={{ shadowOpacity: 1, scale: 1 }}
        transition={{ type: 'timing', duration: 600 }}
        style={{ borderRadius: 999, width: 220, height: 120, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1118' }}
      >
        <Svg viewBox="0 0 100 50" width="200" height="100">
          {/* Energy ring */}
          <G>
            <RNAnimated.View style={{ position: 'absolute', left: 0, top: 0, width: 200, height: 100, transform: [{ scale: ringAnim }] }} pointerEvents="none">
              <Svg width="200" height="100" viewBox="0 0 100 50" style={{ position: 'absolute', left: 0, top: 0 }}>
                <Circle cx="50" cy="45" r="48" fill="none" stroke={arcColor} strokeWidth="2" opacity="0.12" />
              </Svg>
            </RNAnimated.View>
          </G>
          {/* Speed history arc */}
          <Path d={historyPath} fill="none" stroke={arcColor} strokeWidth={4} opacity={0.25} />
          {/* Neon-glow arc */}
          <Path
            d="M5 45 A45 45 0 0 1 95 45"
            fill="none"
            stroke={arcColor}
            strokeWidth={6}
            strokeLinecap="round"
            filter="url(#glow)"
          />
          {/* Tick marks */}
          {ticks.map(i => {
            const a = (-90 + (i / 9) * 180) * (Math.PI / 180)
            const x1 = 50 + 40 * Math.cos(a)
            const y1 = 45 + 40 * Math.sin(a)
            const x2 = 50 + 45 * Math.cos(a)
            const y2 = 45 + 45 * Math.sin(a)
            return (
              <Line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#fff"
                strokeWidth={i % 3 === 0 ? 2.5 : 1}
                opacity={0.7}
              />
            )
          })}
          {/* Animated needle */}
          <G origin="50,45" rotation={angle}>
            <Line
              x1="50"
              y1="45"
              x2="50"
              y2="15"
              stroke={arcColor}
              strokeWidth="4"
              strokeLinecap="round"
              opacity={0.95}
              filter="url(#needleBlur)"
            />
          </G>
          <Defs>
            <Filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <FeGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            </Filter>
            <Filter id="needleBlur" x="-20%" y="-20%" width="140%" height="140%">
              <FeGaussianBlur stdDeviation="1.2" />
            </Filter>
            <RadialGradient id="bg" cx="50%" cy="80%" r="80%">
              <Stop offset="0%" stopColor="#222" stopOpacity="1" />
              <Stop offset="100%" stopColor="#111" stopOpacity="0.8" />
            </RadialGradient>
          </Defs>
        </Svg>
        {/* Digital speed readout */}
        <MotiText
          from={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'timing', duration: 300 }}
          style={{
            position: 'absolute',
            top: 38,
            left: 0,
            right: 0,
            textAlign: 'center',
            fontSize: 38,
            fontWeight: 'bold',
            color: arcColor,
            textShadowColor: arcColor,
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 12,
            fontFamily: 'monospace',
            letterSpacing: 1.5,
          }}
          onPress={handleTripleTap}
        >
          {value.toFixed(1)}
        </MotiText>
      </MotiView>
      <Text style={{ color: arcColor, fontSize: 12, marginTop: 8, letterSpacing: 2 }}>
        {`0`} <Text style={{ color: '#fff' }}>SPEED</Text> {max}
      </Text>
    </View>
  )
}
