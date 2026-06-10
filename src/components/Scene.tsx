import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, ScreenQuad } from '@react-three/drei';
import * as THREE from 'three';
import { advanceWaveTime } from '../waveClock';

function OceanWaves() {
  const ref = useRef<any>(null);
  const { viewport } = useThree();

  const [positions] = useMemo(() => {
    const count = 12000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 100;
      const z = -Math.random() * 200;
      positions[i * 3] = x;
      positions[i * 3 + 1] = 0; // Y
      positions[i * 3 + 2] = z + 10;
    }
    return [positions];
  }, []);

  useFrame((_state, delta) => {
    if (!ref.current) return;
    // Monotonic wave clock: time + |scroll delta|, never runs backwards,
    // so the water keeps moving when scrolling up.
    const waveTime = advanceWaveTime(delta);
    const array = ref.current.geometry.attributes.position.array;
    const bottomY = -viewport.height * 0.68;

    for (let i = 0; i < 12000; i++) {
        const x = array[i * 3];
        const z = array[i * 3 + 2];
        // Smoother, highly elegant formula using slightly lower frequencies
        array[i * 3 + 1] = Math.sin(x * 0.08 + waveTime) * 0.35 + Math.cos(z * 0.04 + waveTime) * 0.35 + bottomY;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#22d3ee"
        size={0.12}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.3}
      />
    </Points>
  );
}

// Ambient bubble columns rising from the deep — wobble sideways as they climb,
// wrap back to the bottom once they rise out of view.
function AmbientBubbles() {
  const ref = useRef<any>(null);
  const { viewport } = useThree();

  const { positions, meta } = useMemo(() => {
    const count = 220;
    const positions = new Float32Array(count * 3);
    const meta = Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 90,
      z: -Math.random() * 180 + 5,
      speed: 0.5 + Math.random() * 1.2,
      phase: Math.random() * Math.PI * 2,
      offset: Math.random() * 30,
    }));
    return { positions, meta };
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const arr = ref.current.geometry.attributes.position.array;
    const floor = -viewport.height * 0.68;
    const span = 30;

    for (let i = 0; i < meta.length; i++) {
      const b = meta[i];
      arr[i * 3] = b.x + Math.sin(t * 1.5 + b.phase) * 0.4;
      arr[i * 3 + 1] = floor + ((t * b.speed + b.offset) % span);
      arr[i * 3 + 2] = b.z;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#a5f3fc"
        size={0.09}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.35}
      />
    </Points>
  );
}

// "Marine snow": fine particles sinking slowly with a sideways drift. This is
// what makes real underwater footage feel alive — the water itself is visible.
function MarineSnow() {
  const ref = useRef<any>(null);

  const { positions, meta } = useMemo(() => {
    const count = 350;
    const positions = new Float32Array(count * 3);
    const meta = Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 110,
      z: -Math.random() * 170 + 8,
      speed: 0.15 + Math.random() * 0.35,
      phase: Math.random() * Math.PI * 2,
      offset: Math.random() * 26,
    }));
    return { positions, meta };
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const arr = ref.current.geometry.attributes.position.array;
    const top = 13;
    const span = 26;

    for (let i = 0; i < meta.length; i++) {
      const p = meta[i];
      arr[i * 3] = p.x + Math.sin(t * 0.3 + p.phase) * 1.2;
      arr[i * 3 + 1] = top - ((t * p.speed + p.offset) % span);
      arr[i * 3 + 2] = p.z;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#e0f2fe"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.22}
      />
    </Points>
  );
}

// Three loose schools of bioluminescent "fish" drifting across the dive path.
// Each school travels together at its own depth/speed; individual fish jitter
// around the school centre with a small swim wiggle.
const SCHOOLS = [
  { speed: 4.0, z: -18, y: -1.0, range: 80, dir: 1, phase: 0 },
  { speed: 2.8, z: -32, y: 1.5, range: 80, dir: -1, phase: 27 },
  { speed: 5.2, z: -48, y: -3.0, range: 80, dir: 1, phase: 55 },
];

function FishSchool() {
  const ref = useRef<any>(null);

  const { positions, meta } = useMemo(() => {
    const count = 90;
    const positions = new Float32Array(count * 3);
    const meta = Array.from({ length: count }, (_, i) => ({
      school: i % SCHOOLS.length,
      ox: (Math.random() - 0.5) * 7,
      oy: (Math.random() - 0.5) * 2.5,
      oz: (Math.random() - 0.5) * 5,
      phase: Math.random() * Math.PI * 2,
      wiggle: 0.6 + Math.random() * 0.9,
    }));
    return { positions, meta };
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const arr = ref.current.geometry.attributes.position.array;

    for (let i = 0; i < meta.length; i++) {
      const f = meta[i];
      const s = SCHOOLS[f.school];
      // School centre sweeps across and wraps off-screen (range > visible width).
      const travel = (t * s.speed + s.phase) % s.range;
      const cx = s.dir * (travel - s.range / 2);

      arr[i * 3] = cx + f.ox;
      arr[i * 3 + 1] = s.y + f.oy + Math.sin(t * 2 * f.wiggle + f.phase) * 0.3;
      arr[i * 3 + 2] = s.z + f.oz;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#67e8f9"
        size={0.18}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.55}
      />
    </Points>
  );
}

const RAY_VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = position.xy * 0.5 + 0.5;
    gl_Position = vec4(position.xy, 1.0, 1.0);
  }
`;

const RAY_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;
  uniform float uOpacity;
  uniform float uAspect;

  float hash(float n) {
    return fract(sin(n * 127.1) * 43758.5453123);
  }

  float vnoise(float x) {
    float i = floor(x);
    float f = fract(x);
    float u = f * f * (3.0 - 2.0 * f);
    return mix(hash(i), hash(i + 1.0), u);
  }

  // Parallel light shafts: each beam is a tilted column whose brightness
  // comes from two noise fields sliding in opposite directions. Their
  // product shimmers in place — like sunlight refracted through a moving
  // water surface — instead of marching across the screen.
  float beams(vec2 uv, float freq, float speed, float slant, float t, float sharp) {
    float x = uv.x * uAspect + (1.0 - uv.y) * slant;
    float a = vnoise(x * freq + t * speed);
    float b = vnoise(x * freq * 1.93 - t * speed * 1.37 + 19.7);
    return pow(clamp(a * b * 1.6, 0.0, 1.0), sharp);
  }

  void main() {
    float t = uTime;

    // Slow global sway of the beam angle, like swell rolling overhead.
    float sway = sin(t * 0.18) * 0.08;

    float r = 0.0;
    r += beams(vUv, 0.9, 0.30, 0.42 + sway,       t,        2.2) * 0.55; // broad shafts
    r += beams(vUv, 2.1, 0.45, 0.50 + sway * 1.4, t + 40.0, 2.6) * 0.35; // medium beams
    r += beams(vUv, 4.7, 0.75, 0.38 + sway * 0.7, t + 90.0, 3.0) * 0.22; // fine shimmer

    // Rays belong to the surface: bright up top, dissolved ~70% down.
    float depthFade = smoothstep(0.05, 0.85, vUv.y);
    depthFade *= depthFade;

    // Soft ambient glow hugging the surface line.
    float surfaceGlow = pow(max(vUv.y - 0.55, 0.0) / 0.45, 3.0) * 0.18;

    float strength = (r * depthFade + surfaceGlow) * uOpacity;

    vec3 deep = vec3(0.02, 0.45, 0.60);
    vec3 bright = vec3(0.55, 0.95, 1.0);
    vec3 col = mix(deep, bright, clamp(strength * 1.4, 0.0, 1.0));

    gl_FragColor = vec4(col * strength, strength);
  }
`;

function SunRays({ opacityRef }: { opacityRef: React.MutableRefObject<number> }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uOpacity: { value: 1 },
      uAspect: { value: 1 },
    }),
    []
  );

  useFrame((state) => {
    if (!matRef.current) return;
    const u = matRef.current.uniforms;
    u.uTime.value = state.clock.elapsedTime;
    u.uAspect.value = size.width / size.height;
    u.uOpacity.value = THREE.MathUtils.lerp(u.uOpacity.value, opacityRef.current, 0.08);
  });

  return (
    <ScreenQuad renderOrder={10} frustumCulled={false}>
      <shaderMaterial
        ref={matRef}
        vertexShader={RAY_VERTEX_SHADER}
        fragmentShader={RAY_FRAGMENT_SHADER}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        depthTest={false}
        blending={THREE.AdditiveBlending}
      />
    </ScreenQuad>
  );
}

export function Scene() {
  const lightRef = useRef<THREE.PointLight>(null);
  const rayOpacity = useRef(1);

  useFrame((state) => {
    let introProgress = 0;
    let diveProgress = 0;

    const diveSection = document.getElementById('dive-section');
    if (diveSection) {
        introProgress = Math.min(1, Math.max(0, window.scrollY / diveSection.offsetTop));
        const rect = diveSection.getBoundingClientRect();
        if (rect.top <= 0) {
           diveProgress = Math.min(1, Math.max(0, -rect.top / (rect.height - window.innerHeight)));
        }
    }

        // Camera no longer goes too far down, just shifts a bit to give perspective
    const y = THREE.MathUtils.lerp(0, -2, introProgress);

    // Dive deep into Z along the waves when scrolling project section - shallower maximum depth
    const z = THREE.MathUtils.lerp(10, -45, diveProgress);

    // Deepens background darkness
    const darkness = introProgress * 0.4 + diveProgress * 0.55;

    // Sun rays die off as we leave the surface and dive down.
    rayOpacity.current = Math.max(0, 1 - (introProgress * 1.15 + diveProgress));

    // Apply soft easing to camera movement
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, z, 0.1);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, y, 0.1);

    if (lightRef.current) {
      state.scene.background = new THREE.Color().lerpColors(
        new THREE.Color('#082f49'),
        new THREE.Color('#02040a'),
        darkness
      );
      lightRef.current.intensity = THREE.MathUtils.lerp(4, 0.05, darkness);
    }
  });

  return (
    <>
      <color attach="background" args={['#082f49']} />
      <fog attach="fog" args={['#02040a', 15, 60]} />

      {/* Surface light source */}
      <pointLight ref={lightRef} position={[0, 10, 5]} intensity={4} color="#22d3ee" distance={100} />
      <ambientLight intensity={0.2} color="#0284c7" />

      <OceanWaves />
      <FishSchool />
      <AmbientBubbles />
      <MarineSnow />
      <SunRays opacityRef={rayOpacity} />
    </>
  );
}
