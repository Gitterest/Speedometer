import React from 'react'
import Svg, { Path, Line, G } from 'react-native-svg'
import { View } from 'react-native'
import { motion } from 'moti'

export default function Gauge({ value = 0, max = 180 }: { value?: number; max?: number }) {
  const angle = (-90 + Math.min(value, max) / max * 180)
  return (
    <View className="items-center p-4">
      <Svg viewBox="0 0 100 50" width="200" height="100">
        <Path d="M5 45 A45 45 0 0 1 95 45" fill="none" stroke="#555" strokeWidth="4" />
        <G origin="50,45" rotation={angle}>
          <Line x1="50" y1="45" x2="50" y2="15" stroke="currentColor" strokeWidth="4" />
        </G>
      </Svg>
    </View>
  )
}
