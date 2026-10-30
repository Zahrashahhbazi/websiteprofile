import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function FloatingCode() {
  const groupRef = useRef<THREE.Group>(null);

  const shapes = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
      ] as [number, number, number],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
      speed: 0.3 + Math.random() * 0.7,
      size: 0.3 + Math.random() * 0.5,
      type: i % 3,
      color: i % 3 === 0 ? '#2563eb' : i % 3 === 1 ? '#06b6d4' : '#10b981',
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      const s = shapes[i];
      if (s) {
        child.rotation.x += 0.002 * s.speed;
        child.rotation.y += 0.003 * s.speed;
        child.position.y += Math.sin(state.clock.elapsedTime * s.speed + i) * 0.001;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {shapes.map((s, i) => (
        <mesh
          key={i}
          position={s.position}
          rotation={s.rotation}
          scale={s.size}
        >
          {s.type === 0 ? (
            <boxGeometry args={[1, 1, 1]} />
          ) : s.type === 1 ? (
            <sphereGeometry args={[0.5, 8, 8]} />
          ) : (
            <tetrahedronGeometry args={[0.6, 0]} />
          )}
          <meshStandardMaterial
            color={s.color}
            roughness={0.3}
            metalness={0.6}
            transparent
            opacity={0.5}
            emissive={s.color}
            emissiveIntensity={0.05}
          />
        </mesh>
      ))}
    </group>
  );
}

function CodeLines() {
  const lines = useMemo(() => {
    return ['def', 'class', 'import', 'return', 'async', 'await', 'React', 'Vue', 'API'];
  }, []);

  return (
    <group>
      {lines.map((line, i) => (
        <mesh
          key={i}
          position={[-4 + (i % 3) * 4, 2 - i * 0.6, -3 - i * 0.5]}
        >
          <planeGeometry args={[3, 0.3]} />
          <meshBasicMaterial
            color="#1a1a2e"
            transparent
            opacity={0.04}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.5} color="#ffffff" />
      <directionalLight position={[5, 5, 5]} intensity={0.6} color="#2563eb" />
      <pointLight position={[-5, 2, -3]} intensity={0.3} color="#06b6d4" />
      <pointLight position={[3, -2, 2]} intensity={0.2} color="#10b981" />
      <FloatingCode />
      <CodeLines />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
    </>
  );
}

export default function CodeCanvas() {
  return (
    <div className="code-canvas">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }} gl={{ antialias: true, alpha: true }}>
        <Scene3D />
        <EffectComposer>
          <Bloom intensity={0.15} luminanceThreshold={0.8} luminanceSmoothing={0.9} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}