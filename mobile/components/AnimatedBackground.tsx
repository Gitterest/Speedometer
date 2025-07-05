import React from 'react'
import { Dimensions } from 'react-native'
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg'
import Animated, { useSharedValue, useAnimatedProps, withRepeat, withTiming, Easing } from 'react-native-reanimated'

const { width, height } = Dimensions.get('window')
const AnimatedPath = Animated.createAnimatedComponent(Path)

export default function AnimatedBackground({ speed = 0 }: { speed?: number }) {
  // Animate gradient stops based on speed
  const color1 = speed < 40 ? '#00ffff' : speed < 80 ? '#39ff14' : '#ff00ff'
  const color2 = speed < 40 ? '#111133' : speed < 80 ? '#003300' : '#330033'

  // Animate energy wave
  const wave = useSharedValue(0)
  React.useEffect(() => {
    wave.value = withRepeat(
      withTiming(2 * Math.PI, { duration: 3000 - Math.min(speed * 20, 2000), easing: Easing.linear }),
      -1,
      false
    )
  }, [speed])

  const animatedProps = useAnimatedProps(() => {
    // Create a sine wave path
    let d = 'M 0 ' + (height * 0.7)
    for (let x = 0; x <= width; x += 10) {
      const y = height * 0.7 + Math.sin(x / 60 + wave.value) * 24
      d += ` L ${x} ${y}`
    }
    d += ` L ${width} ${height} L 0 ${height} Z`
    return { d }
  })

  return (
    <Svg width={width} height={height} style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}>
      <Defs>
        <LinearGradient id="bg" x1="0" y1="0" x2="0" y2={height}>
          <Stop offset="0%" stopColor={color1} stopOpacity="0.25" />
          <Stop offset="100%" stopColor={color2} stopOpacity="0.7" />
        </LinearGradient>
      </Defs>
      <Path d={`M0 0 H${width} V${height} H0 Z`} fill="url(#bg)" />
      <AnimatedPath
        animatedProps={animatedProps}
        fill="#00ffff33"
        opacity={0.7}
      />
    </Svg>
  )
} 