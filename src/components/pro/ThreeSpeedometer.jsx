import { Suspense, useMemo } from "react"
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'
import { useSpeedContext } from '../../context/SpeedContext'
import { useUnit } from '../../context/UnitContext'
import { speedToAngle } from '../../common/speedToAngle'

function Needle({ angle }) {
  return (
    <animated.mesh rotation-z={angle.to(a => a)} position={[0, 0, 0.01]}>
      <boxGeometry args={[0.02, 0.5, 0.02]} />
      <meshPhysicalMaterial color="#e11d48" emissive="#ff7f7f" roughness={0.3} />
    </animated.mesh>
  )
}

function Dial() {
  const ticks = useMemo(() => Array.from({ length: 60 }), [])
  return (
    <group rotation-x={-Math.PI / 2}>
      <mesh>
        <ringGeometry args={[0.9, 1, 64]} />
        <meshStandardMaterial color="#222" metalness={0.6} roughness={0.4} />
      </mesh>
      {ticks.map((_, i) => {
        const angle = (i / 60) * Math.PI * 2
        const length = i % 5 === 0 ? 0.1 : 0.05
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.95, Math.sin(angle) * 0.95, 0]}
            rotation={[0, 0, angle]}
          >
            <boxGeometry args={[0.005, length, 0.02]} />
            <meshBasicMaterial color="#888" />
          </mesh>
        )
      })}
    </group>
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
