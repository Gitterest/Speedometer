import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'
import { useSpeedContext } from '../../context/SpeedContext'
import { useUnit } from '../../context/UnitContext'
import { speedToAngle } from '../../common/speedToAngle'

function Needle({ angle }) {
  return (
    <animated.mesh rotation-z={angle.to(a => a)}>
      <boxGeometry args={[0.02, 0.4, 0.02]} />
      <meshStandardMaterial color="red" />
    </animated.mesh>
  )
}

function Dial() {
  return (
    <mesh rotation-x={-Math.PI / 2}>
      <torusGeometry args={[1, 0.05, 16, 100]} />
      <meshStandardMaterial color="#444" metalness={0.6} roughness={0.4} />
    </mesh>
  )
}

export default function ThreeSpeedometer({ max = 240 }) {
  const { speed } = useSpeedContext()
  const { unit } = useUnit()
  const unitLabel = unit === 'kmh' ? 'km/h' : 'mph'
  const { angle } = useSpring({
    angle: speedToAngle(speed, max, -120, 120) * Math.PI / 180,
    config: { mass: 1, tension: 170, friction: 26 }
  })

  return (
    <div className="w-full h-64">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[2, 2, 2]} />
        <Suspense fallback={null}>
          <Dial />
          <Needle angle={angle} />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
      <div className="text-center mt-2 font-digital text-neon-green">
        {speed.toFixed(1)} {unitLabel}
      </div>
    </div>
  )
}
