import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { FoodVan } from './FoodVan';
import { EnvironmentGround } from './EnvironmentGround';

// Floating / Idling Van Wrapper with scroll parallax
const AnimatedVanGroup: React.FC<{ scrollProgress: number }> = ({ scrollProgress }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Subtle gentle idle suspension breathing (if reduced motion is not preferred)
    if (!prefersReducedMotion) {
      groupRef.current.position.y = Math.sin(t * 1.4) * 0.025;
      groupRef.current.rotation.z = Math.sin(t * 0.8) * 0.005;
    }

    // Scroll-driven parallax interpolation: subtle rotation and depth glide
    const targetRotY = scrollProgress * 0.45;
    const targetPosZ = -scrollProgress * 0.8;
    const targetPosX = scrollProgress * 0.3;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      0.08
    );
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      targetPosZ,
      0.08
    );
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      targetPosX,
      0.08
    );
  });

  return (
    <group ref={groupRef}>
      <FoodVan headlightsOn={true} />
    </group>
  );
};

interface HeroVanCanvasProps {
  scrollProgress: number;
}

export const HeroVanCanvas: React.FC<HeroVanCanvasProps> = ({ scrollProgress }) => {
  const [hasWebGLError, setHasWebGLError] = useState(false);
  const [is3DReady, setIs3DReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device for performance optimization
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // WebGL Fallback if device does not support WebGL or context was lost
  if (hasWebGLError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#1C1917] to-[#121110] p-8 text-center" role="img" aria-label="Good Day Fast Food Van Hero Graphic">
        <div className="w-28 h-28 rounded-3xl bg-[#9E1B1B] border-2 border-[#F5A623] flex items-center justify-center text-6xl shadow-2xl mb-4">
          🚐
        </div>
        <h3 className="text-2xl font-bold text-white font-display">GOOD DAY FAST FOOD VAN</h3>
        <p className="text-sm text-[#F5A623] mt-1 font-semibold uppercase tracking-wider">
          100% Pure Vegetarian Street Food
        </p>
      </div>
    );
  }

  // When scrolled well past the hero section (> 1.2), suspend 3D frameloop to save GPU/CPU
  const isOffScreen = scrollProgress > 1.25;

  return (
    <div className="w-full h-full relative">
      {/* 3D Scene Loading Placeholder (fades out as soon as canvas is ready) */}
      {!is3DReady && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#141210] pointer-events-none transition-opacity duration-700">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-2xl bg-[#9E1B1B] border border-[#F5A623] flex items-center justify-center text-2xl shadow-lg animate-pulse">
              🚐
            </div>
            <span className="text-xs font-bold text-[#F5A623] tracking-widest uppercase">
              Preparing 3D Van...
            </span>
          </div>
        </div>
      )}

      <Canvas
        shadows={!isMobile}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        frameloop={isOffScreen ? 'never' : 'always'}
        gl={{
          antialias: !isMobile,
          powerPreference: 'high-performance',
          alpha: false,
          preserveDrawingBuffer: false,
        }}
        camera={{
          position: [4.8, 2.2, 4.4],
          fov: 40,
          near: 0.1,
          far: 60,
        }}
        onCreated={({ gl }) => {
          if (!gl) {
            setHasWebGLError(true);
            return;
          }
          // Listen for WebGL context loss to prevent app crash
          const canvasEl = gl.domElement;
          const handleContextLost = (event: Event) => {
            event.preventDefault();
            console.warn('WebGL context lost, switching to graceful fallback');
            setHasWebGLError(true);
          };
          canvasEl.addEventListener('webglcontextlost', handleContextLost);

          setIs3DReady(true);
        }}
      >
        <color attach="background" args={['#161413']} />
        <fog attach="fog" args={['#161413', 12, 38]} />

        <Suspense fallback={null}>
          <EnvironmentGround />
          <AnimatedVanGroup scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
};
