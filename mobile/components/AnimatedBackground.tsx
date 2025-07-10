import React from 'react'
import { Dimensions } from 'react-native'
import Svg, { Defs, LinearGradient, Stop, Path, Circle, RadialGradient, G } from 'react-native-svg'
import Animated, { useSharedValue, useAnimatedProps, withRepeat, withTiming, Easing, interpolate } from 'react-native-reanimated'
import { useTheme } from '../context/ThemeContext'

const { width, height } = Dimensions.get('window')
const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)

function getParticleField(speed: number, colorScheme: string) {
  const particles = []
  const count = Math.max(20, Math.floor(speed / 5) + 20)
  const baseColor = colorScheme === 'green' ? '#39ff14' : colorScheme === 'cyan' ? '#00ffff' : colorScheme === 'magenta' ? '#ff00ff' : '#00aaff'
  
  for (let i = 0; i < count; i++) {
    const x = Math.random() * width
    const y = Math.random() * height
    const r = 1 + Math.random() * 3
    const opacity = 0.05 + 0.15 * Math.random()
    const velocity = 0.5 + Math.random() * 2
    particles.push({ x, y, r, opacity, velocity, color: baseColor })
  }
  return particles
}

function getEnergyWaves(speed: number, colorScheme: string) {
  const waves = []
  const count = Math.max(2, Math.floor(speed / 40) + 2)
  const baseColor = colorScheme === 'green' ? '#39ff14' : colorScheme === 'cyan' ? '#00ffff' : colorScheme === 'magenta' ? '#ff00ff' : '#00aaff'
  
  for (let i = 0; i < count; i++) {
    const radius = 100 + i * 80
    const opacity = 0.1 - i * 0.02
    waves.push({ radius, opacity, color: baseColor })
  }
  return waves
}

export default function AnimatedBackground({ speed = 0 }: { speed?: number }) {
  const { colorScheme, dark, animationSpeed } = useTheme();
  
  // Animate gradient stops based on speed
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
  const color2 = dark ? '#111133' : '#222';

  // Animate energy wave
  const wave = useSharedValue(0)
  const particleAnim = useSharedValue(0)
  const energyPulse = useSharedValue(0)
  
  React.useEffect(() => {
    const duration = Math.max(1000, 3000 - Math.min(speed * 20, 2000)) / animationSpeed
    wave.value = withRepeat(
      withTiming(2 * Math.PI, { duration, easing: Easing.linear }),
      -1,
      false
    )
    particleAnim.value = withRepeat(
      withTiming(1, { duration: 2000 / animationSpeed, easing: Easing.linear }),
      -1,
      false
    )
    energyPulse.value = withRepeat(
      withTiming(1, { duration: 1500 / animationSpeed, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    )
  }, [speed, animationSpeed])

  const animatedWaveProps = useAnimatedProps(() => {
    let d = 'M 0 ' + (height * 0.7)
    for (let x = 0; x <= width; x += 10) {
      const y = height * 0.7 + Math.sin(x / 60 + wave.value) * (24 + speed * 0.5)
      d += ` L ${x} ${y}`
    }
    d += ` L ${width} ${height} L 0 ${height} Z`
    return { d }
  })

  const animatedParticleProps = useAnimatedProps(() => {
    return {
      opacity: interpolate(particleAnim.value, [0, 1], [0.3, 1]),
      scale: interpolate(particleAnim.value, [0, 1], [0.8, 1.2]),
    }
  })

  // Generate dynamic content
  const particles = getParticleField(speed, colorScheme)
  const energyWaves = getEnergyWaves(speed, colorScheme)

  return (
    <Svg width={width} height={height} style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}>
      <Defs>
        <LinearGradient id="bg" x1="0" y1="0" x2="0" y2={height}>
          <Stop offset="0%" stopColor={neon} stopOpacity="0.15" />
          <Stop offset="50%" stopColor={neon} stopOpacity="0.08" />
          <Stop offset="100%" stopColor={color2} stopOpacity="0.9" />
        </LinearGradient>
        <RadialGradient id="energyGlow" cx="50%" cy="60%" r="80%">
          <Stop offset="0%" stopColor={neon} stopOpacity="0.25" />
          <Stop offset="70%" stopColor={neon} stopOpacity="0.08" />
          <Stop offset="100%" stopColor={color2} stopOpacity="0.01" />
        </RadialGradient>
        <RadialGradient id="speedGlow" cx="50%" cy="50%" r="60%">
          <Stop offset="0%" stopColor={neon} stopOpacity="0.3" />
          <Stop offset="100%" stopColor={neon} stopOpacity="0" />
        </RadialGradient>
      </Defs>
      
      {/* Background gradient */}
      <Path d={`M0 0 H${width} V${height} H0 Z`} fill="url(#bg)" />
      
      {/* Energy waves that pulse with speed */}
      {energyWaves.map((wave, i) => (
        <AnimatedCircle
          key={i}
          cx={width/2}
          cy={height*0.7}
          r={wave.radius + energyPulse.value * 20}
          fill="none"
          stroke={wave.color}
          strokeWidth={2}
          opacity={wave.opacity}
        />
      ))}
      
      {/* Central energy glow */}
      <Circle cx={width/2} cy={height*0.7} r={width*0.4} fill="url(#energyGlow)" opacity={0.3} />
      
      {/* Speed-reactive glow */}
      <AnimatedCircle
        cx={width/2}
        cy={height*0.7}
        r={50 + speed * 2}
        fill="url(#speedGlow)"
        opacity={0.4}
      />
      
      {/* Animated energy wave */}
      <AnimatedPath
        animatedProps={animatedWaveProps}
        fill={`${neon}33`}
        opacity={0.6}
      />
      
      {/* Floating particles */}
      {particles.map((p, i) => (
        <AnimatedCircle
          key={i}
          cx={p.x}
          cy={p.y}
          r={p.r}
          fill={p.color}
          opacity={p.opacity}
          animatedProps={animatedParticleProps}
        />
      ))}
      
      {/* Speed streaks - more intense at higher speeds */}
      {speed > 20 && Array.from({ length: Math.floor(speed / 20) }, (_, i) => (
        <Path
          key={`streak-${i}`}
          d={`M${Math.random() * width} ${Math.random() * height} L${Math.random() * width} ${Math.random() * height}`}
          stroke={neon}
          strokeWidth={1 + Math.random() * 2}
          opacity={0.2 + Math.random() * 0.3}
          strokeLinecap="round"
        />
      ))}
    </Svg>
  )
} 