import React, { useMemo } from 'react';
import * as THREE from 'three';

export const EnvironmentGround: React.FC = () => {
  // Ground pavement texture procedural generator
  const groundTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;

    // Dark asphalt base
    ctx.fillStyle = '#262422';
    ctx.fillRect(0, 0, 1024, 1024);

    // Subtle asphalt speckles
    for (let i = 0; i < 4000; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 1024;
      const radius = Math.random() * 1.5;
      ctx.fillStyle = Math.random() > 0.5 ? '#1F1D1B' : '#33302C';
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Street parking stall line (subtle warm yellow)
    ctx.strokeStyle = 'rgba(245, 166, 35, 0.45)';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(350, 100);
    ctx.lineTo(350, 924);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(674, 100);
    ctx.lineTo(674, 924);
    ctx.stroke();

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    return texture;
  }, []);

  return (
    <group>
      {/* ========================================================
          REALISTIC NATURAL LIGHTING
          ======================================================== */}
      {/* Natural Daylight Sun with Soft Shadows */}
      <directionalLight
        position={[10, 16, 9]}
        intensity={2.0}
        color="#FFFBF2"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={40}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-bias={-0.0005}
      />

      {/* Natural Hemisphere Ambient Light (Sky / Earth bounce) */}
      <hemisphereLight
        args={['#FEF3C7', '#292524', 0.85]}
      />

      {/* Subtle Fill Light from opposite side for soft shadow fill */}
      <directionalLight
        position={[-10, 8, -8]}
        intensity={0.65}
        color="#93C5FD"
      />

      {/* ========================================================
          GROUND & STREET ENVIRONMENT
          ======================================================== */}
      {/* Main Ground Plane (Asphalt / Food Van Court) */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.01, 0]}
        receiveShadow
      >
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial
          map={groundTexture}
          roughness={0.88}
          metalness={0.08}
        />
      </mesh>

      {/* Curbside Sidewalk / Pavement along the serving hatch side (+X) */}
      <group position={[2.9, 0.08, 0]}>
        <mesh receiveShadow>
          <boxGeometry args={[3.2, 0.16, 16]} />
          <meshStandardMaterial
            color="#44403C"
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
        {/* Yellow-and-black curb edge strip */}
        <mesh position={[-1.58, 0.02, 0]} receiveShadow>
          <boxGeometry args={[0.08, 0.18, 16]} />
          <meshStandardMaterial
            color="#D97706"
            roughness={0.7}
          />
        </mesh>
      </group>

      {/* Street / Food court warm lamp post behind the van */}
      <group position={[3.6, 0, -3.2]}>
        {/* Pole */}
        <mesh position={[0, 2.2, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.08, 4.4, 16]} />
          <meshStandardMaterial color="#1C1917" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Lamp arm */}
        <mesh position={[-0.4, 4.3, 0]} rotation={[0, 0, 0.4]}>
          <cylinderGeometry args={[0.04, 0.04, 1.0, 12]} />
          <meshStandardMaterial color="#1C1917" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Lamp Fixture */}
        <mesh position={[-0.8, 4.2, 0]}>
          <cylinderGeometry args={[0.22, 0.15, 0.18, 16]} />
          <meshStandardMaterial color="#292524" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Warm light bulb emission */}
        <mesh position={[-0.8, 4.1, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#FEF08A" emissive="#F59E0B" emissiveIntensity={1.2} />
        </mesh>
        <pointLight
          position={[-0.8, 4.0, 0]}
          color="#FDE68A"
          intensity={1.8}
          distance={10}
        />
      </group>
    </group>
  );
};
