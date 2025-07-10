import React, { useMemo, useRef, useEffect, useState } from 'react'
import { View, Text, Animated as RNAnimated } from 'react-native'
import Svg, { Path, Line, G, Defs, RadialGradient, Stop, Filter, FeGaussianBlur, Circle, LinearGradient as SvgLinearGradient } from 'react-native-svg'
import { MotiView, MotiText } from 'moti'
import RetroDash from './RetroDash'
import { useTheme } from '../context/ThemeContext'

const colorMap = {
  green: ['#39ff14', '#00ffff'],
  cyan: ['#00ffff', '#39ff14'],
  magenta: ['#ff00ff', '#00ffff'],
}

export default function Gauge({ value = 0, max = 180, colorScheme = 'green', onRetroMode }: { value?: number; max?: number; colorScheme?: 'green' | 'cyan' | 'magenta'; onRetroMode?: (active: boolean) => void }) {
  const { dark } = useTheme();
  const angle = -90 + Math.min(value, max) / max * 180
  const [mainColor, secondaryColor] = colorMap[colorScheme]
  const ticks = useMemo(() => Array.from({ length: 13 }, (_, i) => i), [])

  // Speed history arc
  const history = useRef<number[]>([])
  useEffect(() => {
    history.current = [...history.current.slice(-29), value]
  }, [value])

  // Energy ring animation
  const ringAnim = useRef(new RNAnimated.Value(1)).current
  useEffect(() => {
    RNAnimated.sequence([
      RNAnimated.timing(ringAnim, { toValue: 1.18, duration: 120, useNativeDriver: true }),
      RNAnimated.timing(ringAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start()
  }, [value])

  // Add animated glass overlay effect
  const [glassAnim, setGlassAnim] = useState(0)
  useEffect(() => {
    setGlassAnim(Math.random())
  }, [value])

  // History arc path
  const historyPath = useMemo(() => {
    let d = ''
    const hist = history.current
    for (let i = 0; i < hist.length; i++) {
      const a = -90 + Math.min(hist[i], max) / max * 180
      const r = 45
      const x = 50 + r * Math.cos((a * Math.PI) / 180)
      const y = 50 + r * Math.sin((a * Math.PI) / 180)
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
        style={{ borderRadius: 999, width: 260, height: 160, justifyContent: 'center', alignItems: 'center', backgroundColor: dark ? '#0a0a1cdd' : '#111c' }}
      >
        <Svg viewBox="0 0 100 60" width="240" height="140">
          {/* 3D Glass Reflection Overlay */}
          <Defs>
            <SvgLinearGradient id="glass" x1="0" y1="0" x2="100" y2="60">
              <Stop offset="0%" stopColor="#fff" stopOpacity={0.18 + 0.12 * glassAnim} />
              <Stop offset="60%" stopColor="#fff" stopOpacity={0.04 + 0.08 * glassAnim} />
              <Stop offset="100%" stopColor="#fff" stopOpacity={0.01} />
            </SvgLinearGradient>
          </Defs>
          <Path d="M10 10 Q50 0 90 10 Q100 30 90 50 Q50 60 10 50 Q0 30 10 10 Z" fill="url(#glass)" opacity={0.22} />
          {/* Energy ring (outer) */}
          <G>
            <RNAnimated.View style={{ position: 'absolute', left: 0, top: 0, width: 240, height: 140, transform: [{ scale: ringAnim }] }} pointerEvents="none">
              <Svg width="240" height="140" viewBox="0 0 100 60" style={{ position: 'absolute', left: 0, top: 0 }}>
                <Circle cx="50" cy="55" r="54" fill="none" stroke="url(#energy)" strokeWidth="2.5" opacity="0.18" />
              </Svg>
            </RNAnimated.View>
          </G>
          {/* Speed history arc */}
          <Path d={historyPath} fill="none" stroke={mainColor} strokeWidth={3.5} opacity={0.18} />
          {/* Neon-glow arc (main) */}
          <Path
            d="M5 55 A50 50 0 0 1 95 55"
            fill="none"
            stroke="url(#neon)"
            strokeWidth={12}
            strokeLinecap="round"
            filter="url(#glow)"
          />
          {/* Tick marks */}
          {ticks.map(i => {
            const a = (-90 + (i / 12) * 180) * (Math.PI / 180)
            const x1 = 50 + 40 * Math.cos(a)
            const y1 = 55 + 40 * Math.sin(a)
            const x2 = 50 + 50 * Math.cos(a)
            const y2 = 55 + 50 * Math.sin(a)
            return (
              <Line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#fff"
                strokeWidth={i % 3 === 0 ? 3 : 1.2}
                opacity={i % 3 === 0 ? 0.9 : 0.5}
                filter={i % 3 === 0 ? 'url(#tickGlow)' : undefined}
              />
            )
          })}
          {/* Animated needle */}
          <G origin="50,55" rotation={angle}>
            <Line
              x1="50"
              y1="55"
              x2="50"
              y2="15"
              stroke="url(#needle)"
              strokeWidth="5.5"
              strokeLinecap="round"
              opacity={0.98}
              filter="url(#needleBlur)"
            />
            {/* Needle base circle */}
            <Circle cx="50" cy="55" r="3.5" fill={secondaryColor} opacity={0.9} filter="url(#glow)" />
          </G>
          <Defs>
            <SvgLinearGradient id="neon" x1="0" y1="0" x2="100" y2="0">
              <Stop offset="0%" stopColor={mainColor} />
              <Stop offset="100%" stopColor={secondaryColor} />
            </SvgLinearGradient>
            <SvgLinearGradient id="needle" x1="50" y1="55" x2="50" y2="15">
              <Stop offset="0%" stopColor={secondaryColor} />
              <Stop offset="100%" stopColor={mainColor} />
            </SvgLinearGradient>
            <SvgLinearGradient id="energy" x1="0" y1="0" x2="100" y2="0">
              <Stop offset="0%" stopColor={secondaryColor} />
              <Stop offset="100%" stopColor={mainColor} />
            </SvgLinearGradient>
            <Filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <FeGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            </Filter>
            <Filter id="needleBlur" x="-20%" y="-20%" width="140%" height="140%">
              <FeGaussianBlur stdDeviation="2.2" />
            </Filter>
            <Filter id="tickGlow" x="-20%" y="-20%" width="140%" height="140%">
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
            top: 60,
            left: 0,
            right: 0,
            textAlign: 'center',
            fontSize: 48,
            fontWeight: 'bold',
            color: mainColor,
            textShadowColor: mainColor,
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 16,
            fontFamily: 'monospace',
            letterSpacing: 2,
            textTransform: 'uppercase',
          }}
          onPress={handleTripleTap}
        >
          {value.toFixed(1)}
        </MotiText>
      </MotiView>
      <Text style={{ color: mainColor, fontSize: 14, marginTop: 10, letterSpacing: 2, textShadowColor: secondaryColor, textShadowRadius: 8 }}>
        {`0`} <Text style={{ color: '#fff' }}>SPEED</Text> {max}
      </Text>
    </View>
  )
}
