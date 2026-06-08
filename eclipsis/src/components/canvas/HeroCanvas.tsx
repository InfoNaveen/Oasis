import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useRef, useMemo, useState, useEffect } from 'react'

function ParticleField() {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(1200 * 3)
    let idx = 0
    for (let i = 0; i < 3000 && idx < 1200; i++) {
      const x = (Math.random() - 0.5) * 24
      const y = (Math.random() - 0.5) * 24
      const z = (Math.random() - 0.5) * 24
      const dist = Math.sqrt(x * x + y * y + z * z)
      if (dist < 12) {
        arr[idx * 3] = x
        arr[idx * 3 + 1] = y
        arr[idx * 3 + 2] = z
        idx++
      }
    }
    return arr
  }, [])

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y -= delta * 0.015
      ref.current.rotation.x -= delta * 0.008
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#c9a26d"
        size={0.012}
        sizeAttenuation
        depthWrite={false}
        opacity={0.35}
      />
    </Points>
  )
}

function CoreStructure() {
  const groupRef = useRef<THREE.Group>(null)
  const icoRef = useRef<THREE.Mesh>(null)
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)

  const orbitNodes = useMemo(() => [
    { pos: [3.2, 0.8, -1.2] as [number, number, number], s: 0.14, spd: 0.6 },
    { pos: [-2.8, -1.2, 1.5] as [number, number, number], s: 0.11, spd: 0.8 },
    { pos: [1.2, 2.8, -2.2] as [number, number, number], s: 0.09, spd: 1.0 },
    { pos: [-1.8, -2.4, -1.8] as [number, number, number], s: 0.12, spd: 0.5 },
    { pos: [2.4, -1.6, 2.0] as [number, number, number], s: 0.10, spd: 0.7 },
    { pos: [-0.5, 3.0, 0.8] as [number, number, number], s: 0.08, spd: 0.9 },
  ], [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        state.pointer.y * Math.PI * 0.06,
        0.025
      )
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        state.pointer.x * Math.PI * 0.06,
        0.025
      )
      groupRef.current.position.y = Math.sin(t * 0.35) * 0.1
    }

    if (icoRef.current) {
      icoRef.current.rotation.y += 0.002
      icoRef.current.rotation.x = Math.sin(t * 0.25) * 0.08
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += 0.001
      ring1Ref.current.rotation.x += 0.0005
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= 0.0008
      ring2Ref.current.rotation.y += 0.0006
    }
  })

  return (
    <group ref={groupRef}>
      {/* Central Icosahedron — wireframe */}
      <Float speed={1.0} rotationIntensity={0.15} floatIntensity={0.25}>
        <mesh ref={icoRef}>
          <icosahedronGeometry args={[1.8, 1]} />
          <meshStandardMaterial
            color="#c9a26d"
            emissive="#c9a26d"
            emissiveIntensity={0.12}
            wireframe
            transparent
            opacity={0.45}
          />
        </mesh>

        {/* Inner glow core */}
        <mesh scale={0.55}>
          <icosahedronGeometry args={[1.8, 2]} />
          <meshStandardMaterial
            color="#a88560"
            emissive="#c9a26d"
            emissiveIntensity={0.06}
            transparent
            opacity={0.12}
          />
        </mesh>
      </Float>

      {/* Orbital ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[3.0, 0.008, 16, 120]} />
        <meshStandardMaterial
          color="#c9a26d"
          emissive="#c9a26d"
          emissiveIntensity={0.6}
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Orbital ring 2 — tilted */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3.5, 0, Math.PI / 5]}>
        <torusGeometry args={[2.4, 0.006, 16, 90]} />
        <meshStandardMaterial
          color="#a88560"
          emissive="#a88560"
          emissiveIntensity={0.4}
          transparent
          opacity={0.18}
        />
      </mesh>

      {/* Orbital ring 3 */}
      <mesh rotation={[Math.PI / 2.2, Math.PI / 4, 0]}>
        <torusGeometry args={[3.6, 0.005, 16, 100]} />
        <meshStandardMaterial
          color="#8c5a4b"
          emissive="#8c5a4b"
          emissiveIntensity={0.3}
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Orbiting satellite nodes */}
      {orbitNodes.map((node, i) => (
        <Float key={i} speed={node.spd} rotationIntensity={0.4} floatIntensity={0.7}>
          <mesh position={node.pos} scale={node.s}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color="#c9a26d"
              emissive="#c9a26d"
              emissiveIntensity={0.35}
              wireframe
            />
          </mesh>
          {/* Glow point at each node */}
          <mesh position={node.pos} scale={node.s * 3}>
            <sphereGeometry args={[0.5, 8, 8]} />
            <meshBasicMaterial color="#c9a26d" transparent opacity={0.04} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

export default function HeroCanvas() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (isMobile) {
    return (
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 40%, rgba(201,162,109,0.07) 0%, transparent 55%)',
      }} />
    )
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      dpr={[1, 1.5]}
      style={{ pointerEvents: 'auto' }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={['#0f0e0d']} />
      <fog attach="fog" args={['#0f0e0d', 8, 22]} />

      <ambientLight intensity={0.12} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#c9a26d" />
      <pointLight position={[-5, -3, 3]} intensity={0.3} color="#a88560" />
      <pointLight position={[0, 4, -5]} intensity={0.2} color="#8c5a4b" />
      <pointLight position={[3, -4, 2]} intensity={0.15} color="#c9a26d" />

      <ParticleField />
      <CoreStructure />
    </Canvas>
  )
}
