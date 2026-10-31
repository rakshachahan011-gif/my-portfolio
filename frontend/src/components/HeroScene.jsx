import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus } from '@react-three/drei';
import * as THREE from 'three';

const ACCENT = '#e67e22';

function FloatingOrb() {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * 0.15;
    ref.current.position.x = Math.sin(t) * 0.8;
    ref.current.position.y = Math.cos(t * 0.7) * 0.5;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
      <Sphere ref={ref} args={[1.4, 64, 64]} position={[2.5, 0.5, -4]}>
        <meshStandardMaterial
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={0.25}
          roughness={0.4}
          metalness={0.3}
          transparent
          opacity={0.5}
        />
      </Sphere>
    </Float>
  );
}

function FloatingTorusKnot() {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.06;
    ref.current.rotation.y = state.clock.elapsedTime * 0.1;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.35}>
      <mesh ref={ref} position={[-2.2, -0.3, -3]}>
        <torusKnotGeometry args={[0.9, 0.28, 128, 32]} />
        <MeshDistortMaterial
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={0.12}
          distort={0.3}
          speed={1.2}
          roughness={0.35}
          metalness={0.5}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
}

function FloatingRing() {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.04;
    ref.current.rotation.z = state.clock.elapsedTime * 0.06;
  });
  return (
    <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.25}>
      <Torus ref={ref} args={[1.6, 0.03, 32, 64]} position={[1.8, -1, -5]} rotation={[Math.PI / 2.2, 0, 0]}>
        <meshBasicMaterial color={ACCENT} transparent opacity={0.35} />
      </Torus>
    </Float>
  );
}

function ParticleField() {
  const count = 1200;
  const positions = new Float32Array(count * 3);
  const ref = useRef();
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 20;
    positions[i + 1] = (Math.random() - 0.5) * 20;
    positions[i + 2] = (Math.random() - 0.5) * 15 - 2;
  }
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.015;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color={ACCENT}
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function BackdropSphere() {
  return (
    <Sphere args={[8, 32, 32]} position={[0, 0, -12]}>
      <meshBasicMaterial
        color="#0a0a0f"
        transparent
        opacity={0.4}
        side={THREE.BackSide}
      />
    </Sphere>
  );
}

function GradientGlow() {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * 0.02;
  });
  return (
    <mesh ref={ref} position={[0, 0, -6]}>
      <planeGeometry args={[25, 25]} />
      <meshBasicMaterial
        color={ACCENT}
        transparent
        opacity={0.03}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <>
      <color attach="background" args={['#050508']} />
      <fog attach="fog" args={['#050508', 6, 22]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[8, 8, 5]} intensity={0.6} />
      <pointLight position={[-4, 2, 4]} color={ACCENT} intensity={0.4} />
      <pointLight position={[4, -2, 3]} color={ACCENT} intensity={0.2} />
      <BackdropSphere />
      <GradientGlow />
      <ParticleField />
      <FloatingOrb />
      <FloatingTorusKnot />
      <FloatingRing />
    </>
  );
}
