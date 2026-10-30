import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  void main() {
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 point = (vUv - 0.5) * vec2(aspect, 1.0);
    float flow = sin(point.y * 3.1 + uTime * 0.18) * 0.11
      + sin(point.y * 6.2 - uTime * 0.12) * 0.035;
    float leftDistance = abs(point.x - (-0.67 + flow + point.y * 0.12));
    float rightDistance = abs(point.x - (0.67 - flow * 0.8 + point.y * 0.1));
    float leftBody = 1.0 - smoothstep(0.06, 0.48, leftDistance);
    float rightBody = 1.0 - smoothstep(0.06, 0.48, rightDistance);
    float leftGlow = exp(-pow((leftDistance - 0.14) * 15.0, 2.0));
    float rightGlow = exp(-pow((rightDistance - 0.14) * 15.0, 2.0));
    float leftShine = exp(-pow((leftDistance - 0.115) * 70.0, 2.0));
    float rightShine = exp(-pow((rightDistance - 0.115) * 70.0, 2.0));

    vec3 color = vec3(0.018, 0.027, 0.019);
    color += (leftBody + rightBody) * vec3(0.025, 0.045, 0.014);
    color += (leftGlow + rightGlow) * vec3(0.11, 0.19, 0.025);
    color += (leftShine + rightShine) * vec3(0.44, 0.55, 0.16);
    float vignette = 1.0 - smoothstep(0.45, 1.05, length(point * vec2(0.72, 1.0)));
    color *= 0.62 + vignette * 0.38;
    gl_FragColor = vec4(color, 1.0);
  }
`;

function ShaderPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(1, 1) },
  }), []);

  useFrame(({ clock, size }) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = clock.elapsedTime;
    materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        toneMapped={false}
      />
    </mesh>
  );
}

export default function HeroShader() {
  const reducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div className="code-canvas" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 50 }}
        dpr={[1, 1.5]}
        frameloop={reducedMotion ? 'demand' : 'always'}
        gl={{ antialias: false, alpha: false, powerPreference: 'low-power' }}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  );
}