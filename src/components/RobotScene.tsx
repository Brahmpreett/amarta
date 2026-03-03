import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function RoboticArm() {
  const groupRef = useRef<THREE.Group>(null);
  const joint1Ref = useRef<THREE.Group>(null);
  const joint2Ref = useRef<THREE.Group>(null);
  const joint3Ref = useRef<THREE.Group>(null);

  const metalMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#2a3f5f"),
        metalness: 0.8,
        roughness: 0.3,
      }),
    []
  );

  const accentMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#4a90d9"),
        metalness: 0.9,
        roughness: 0.2,
        emissive: new THREE.Color("#1a4a8a"),
        emissiveIntensity: 0.3,
      }),
    []
  );

  const darkMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1a2a3f"),
        metalness: 0.7,
        roughness: 0.4,
      }),
    []
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.3;
    }
    if (joint1Ref.current) {
      joint1Ref.current.rotation.z = Math.sin(t * 0.5) * 0.2 - 0.3;
    }
    if (joint2Ref.current) {
      joint2Ref.current.rotation.z = Math.sin(t * 0.7 + 1) * 0.3 - 0.2;
    }
    if (joint3Ref.current) {
      joint3Ref.current.rotation.z = Math.sin(t * 0.9 + 2) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.5, 0]}>
      {/* Base */}
      <mesh material={darkMaterial} position={[0, 0.15, 0]}>
        <cylinderGeometry args={[1.2, 1.4, 0.3, 32]} />
      </mesh>
      <mesh material={accentMaterial} position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.5, 0.6, 0.1, 32]} />
      </mesh>

      {/* Joint 1 - lower arm */}
      <group ref={joint1Ref} position={[0, 0.4, 0]}>
        <mesh material={accentMaterial} position={[0, 0.05, 0]}>
          <sphereGeometry args={[0.35, 16, 16]} />
        </mesh>
        <mesh material={metalMaterial} position={[0, 0.8, 0]}>
          <boxGeometry args={[0.3, 1.2, 0.3]} />
        </mesh>

        {/* Joint 2 - upper arm */}
        <group ref={joint2Ref} position={[0, 1.4, 0]}>
          <mesh material={accentMaterial} position={[0, 0, 0]}>
            <sphereGeometry args={[0.25, 16, 16]} />
          </mesh>
          <mesh material={metalMaterial} position={[0, 0.6, 0]}>
            <boxGeometry args={[0.22, 0.9, 0.22]} />
          </mesh>

          {/* Joint 3 - end effector */}
          <group ref={joint3Ref} position={[0, 1.05, 0]}>
            <mesh material={accentMaterial} position={[0, 0, 0]}>
              <sphereGeometry args={[0.18, 16, 16]} />
            </mesh>
            {/* Gripper fingers */}
            <mesh material={darkMaterial} position={[-0.1, 0.25, 0]} rotation={[0, 0, 0.2]}>
              <boxGeometry args={[0.06, 0.3, 0.06]} />
            </mesh>
            <mesh material={darkMaterial} position={[0.1, 0.25, 0]} rotation={[0, 0, -0.2]}>
              <boxGeometry args={[0.06, 0.3, 0.06]} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const count = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#4a90d9" transparent opacity={0.4} />
    </points>
  );
}

export default function RobotScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [3, 2, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#a0c4ff" />
        <directionalLight position={[-3, 3, -3]} intensity={0.3} color="#4a6fa5" />
        <pointLight position={[0, 3, 0]} intensity={0.5} color="#4a90d9" />
        <RoboticArm />
        <Particles />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
}
