import React, { useMemo } from 'react';
import * as THREE from 'three';
import {
  createSignboardTexture,
  createSideBannerTexture,
  createVegEmblemTexture,
  createLicensePlateTexture,
  createMenuBoardTexture,
} from './textures';

interface FoodVanProps {
  headlightsOn?: boolean;
}

export const FoodVan: React.FC<FoodVanProps> = ({ headlightsOn = true }) => {
  // Generate procedural textures once
  const signboardTexture = useMemo(() => createSignboardTexture(), []);
  const sideBannerTexture = useMemo(() => createSideBannerTexture(), []);
  const vegEmblemTexture = useMemo(() => createVegEmblemTexture(), []);
  const licensePlateTexture = useMemo(() => createLicensePlateTexture(), []);
  const menuBoardTexture = useMemo(() => createMenuBoardTexture(), []);

  // Materials
  const materials = useMemo(() => {
    return {
      bodyYellow: new THREE.MeshStandardMaterial({
        color: '#F5A623',
        roughness: 0.35,
        metalness: 0.2,
      }),
      bodyRed: new THREE.MeshStandardMaterial({
        color: '#9E1B1B',
        roughness: 0.35,
        metalness: 0.2,
      }),
      accentCream: new THREE.MeshStandardMaterial({
        color: '#FFF8E7',
        roughness: 0.4,
        metalness: 0.1,
      }),
      darkChassis: new THREE.MeshStandardMaterial({
        color: '#1C1917',
        roughness: 0.8,
        metalness: 0.5,
      }),
      chrome: new THREE.MeshStandardMaterial({
        color: '#E5E7EB',
        roughness: 0.15,
        metalness: 0.9,
      }),
      tireRubber: new THREE.MeshStandardMaterial({
        color: '#1A1A1A',
        roughness: 0.9,
        metalness: 0.05,
      }),
      rimSilver: new THREE.MeshStandardMaterial({
        color: '#CBD5E1',
        roughness: 0.25,
        metalness: 0.8,
      }),
      glass: new THREE.MeshPhysicalMaterial({
        color: '#E0F2FE',
        transparent: true,
        opacity: 0.4,
        roughness: 0.1,
        transmission: 0.85,
        thickness: 0.05,
      }),
      stainlessSteel: new THREE.MeshStandardMaterial({
        color: '#E2E8F0',
        roughness: 0.2,
        metalness: 0.85,
      }),
      headlightGlass: new THREE.MeshStandardMaterial({
        color: '#FEF08A',
        emissive: headlightsOn ? '#FEF08A' : '#000000',
        emissiveIntensity: headlightsOn ? 1.2 : 0,
        roughness: 0.1,
        metalness: 0.1,
      }),
      taillightGlass: new THREE.MeshStandardMaterial({
        color: '#EF4444',
        emissive: '#DC2626',
        emissiveIntensity: 0.8,
        roughness: 0.2,
      }),
      indicatorAmber: new THREE.MeshStandardMaterial({
        color: '#F59E0B',
        emissive: '#D97706',
        emissiveIntensity: 0.5,
        roughness: 0.3,
      }),
    };
  }, [headlightsOn]);

  return (
    <group position={[0, 0, 0]}>
      {/* ========================================================
          1. CHASSIS & UNDERCARRIAGE
          ======================================================== */}
      {/* Main chassis frame rails */}
      <mesh position={[0, 0.35, 0]} material={materials.darkChassis} castShadow receiveShadow>
        <boxGeometry args={[1.7, 0.18, 4.4]} />
      </mesh>

      {/* Front cross-member & axles */}
      <mesh position={[0, 0.35, 1.4]} rotation={[0, 0, Math.PI / 2]} material={materials.darkChassis}>
        <cylinderGeometry args={[0.06, 0.06, 2.0, 16]} />
      </mesh>
      {/* Rear axle */}
      <mesh position={[0, 0.35, -1.3]} rotation={[0, 0, Math.PI / 2]} material={materials.darkChassis}>
        <cylinderGeometry args={[0.06, 0.06, 2.0, 16]} />
      </mesh>

      {/* Exhaust Pipe & Muffler */}
      <mesh position={[-0.6, 0.28, -0.6]} rotation={[Math.PI / 2, 0, 0]} material={materials.darkChassis}>
        <cylinderGeometry args={[0.1, 0.1, 0.8, 16]} />
      </mesh>
      <mesh position={[-0.65, 0.26, -1.8]} rotation={[Math.PI / 2, 0, 0]} material={materials.chrome}>
        <cylinderGeometry args={[0.045, 0.045, 0.6, 16]} />
      </mesh>

      {/* ========================================================
          2. WHEELS (4x Realistic Wheels)
          ======================================================== */}
      {/* Front Left Wheel */}
      <Wheel position={[-1.02, 0.38, 1.4]} materials={materials} isLeft />
      {/* Front Right Wheel */}
      <Wheel position={[1.02, 0.38, 1.4]} materials={materials} isLeft={false} />
      {/* Rear Left Wheel */}
      <Wheel position={[-1.02, 0.38, -1.3]} materials={materials} isLeft />
      {/* Rear Right Wheel */}
      <Wheel position={[1.02, 0.38, -1.3]} materials={materials} isLeft={false} />

      {/* ========================================================
          3. LOWER VAN BODY & BUMPERS
          ======================================================== */}
      {/* Lower Skirt (Maroon Red) */}
      <mesh position={[0, 0.62, 0.05]} material={materials.bodyRed} castShadow receiveShadow>
        <boxGeometry args={[1.98, 0.42, 4.3]} />
      </mesh>

      {/* Mudguards / Wheel arches trim (Dark Charcoal) */}
      <mesh position={[-0.99, 0.58, 1.4]} material={materials.darkChassis}>
        <boxGeometry args={[0.08, 0.38, 0.95]} />
      </mesh>
      <mesh position={[0.99, 0.58, 1.4]} material={materials.darkChassis}>
        <boxGeometry args={[0.08, 0.38, 0.95]} />
      </mesh>
      <mesh position={[-0.99, 0.58, -1.3]} material={materials.darkChassis}>
        <boxGeometry args={[0.08, 0.38, 0.95]} />
      </mesh>
      <mesh position={[0.99, 0.58, -1.3]} material={materials.darkChassis}>
        <boxGeometry args={[0.08, 0.38, 0.95]} />
      </mesh>

      {/* Front Bumper with fog light cutouts */}
      <group position={[0, 0.48, 2.24]}>
        <mesh material={materials.bodyRed} castShadow receiveShadow>
          <boxGeometry args={[1.98, 0.25, 0.22]} />
        </mesh>
        {/* Black rubber bumper guard */}
        <mesh position={[0, 0, 0.11]} material={materials.darkChassis}>
          <boxGeometry args={[1.92, 0.08, 0.04]} />
        </mesh>
        {/* Front License plate */}
        <mesh position={[0, -0.01, 0.135]}>
          <planeGeometry args={[0.62, 0.16]} />
          <meshBasicMaterial map={licensePlateTexture} />
        </mesh>
      </group>

      {/* Rear Bumper with step */}
      <group position={[0, 0.45, -2.14]}>
        <mesh material={materials.darkChassis} castShadow receiveShadow>
          <boxGeometry args={[1.95, 0.22, 0.2]} />
        </mesh>
        {/* Metal step plate */}
        <mesh position={[0, 0.12, -0.06]} material={materials.stainlessSteel}>
          <boxGeometry args={[1.2, 0.04, 0.24]} />
        </mesh>
        {/* Rear License plate */}
        <mesh position={[0.3, 0.01, -0.11]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[0.55, 0.14]} />
          <meshBasicMaterial map={licensePlateTexture} />
        </mesh>
      </group>

      {/* ========================================================
          4. MAIN VAN BODY (Vibrant Golden Yellow & Commercial Shape)
          ======================================================== */}
      {/* Rear Cargo / Food Kitchen Box */}
      <mesh position={[0, 1.5, -0.45]} material={materials.bodyYellow} castShadow receiveShadow>
        <boxGeometry args={[1.96, 1.38, 3.25]} />
      </mesh>

      {/* White/Cream accent trim separator between red and yellow */}
      <mesh position={[0, 0.825, -0.45]} material={materials.accentCream}>
        <boxGeometry args={[1.98, 0.04, 3.27]} />
      </mesh>

      {/* Front Cab Main Block */}
      <mesh position={[0, 1.35, 1.45]} material={materials.bodyYellow} castShadow receiveShadow>
        <boxGeometry args={[1.92, 1.1, 1.3]} />
      </mesh>

      {/* Sloped Cab Hood / Bonnet */}
      <group position={[0, 1.05, 1.95]} rotation={[-0.32, 0, 0]}>
        <mesh material={materials.bodyYellow} castShadow receiveShadow>
          <boxGeometry args={[1.88, 0.12, 0.65]} />
        </mesh>
        {/* Red center hood racing/van accent stripe */}
        <mesh position={[0, 0.065, 0]} material={materials.bodyRed}>
          <boxGeometry args={[0.38, 0.01, 0.64]} />
        </mesh>
      </group>

      {/* Front Radiator Grille */}
      <group position={[0, 0.82, 2.19]}>
        <mesh material={materials.darkChassis}>
          <boxGeometry args={[1.35, 0.38, 0.04]} />
        </mesh>
        {/* Chrome slats */}
        {[-0.1, 0, 0.1].map((yOffset, i) => (
          <mesh key={i} position={[0, yOffset, 0.025]} material={materials.chrome}>
            <boxGeometry args={[1.25, 0.028, 0.02]} />
          </mesh>
        ))}
        {/* Center Good Day monogram circle */}
        <mesh position={[0, 0, 0.04]} rotation={[Math.PI / 2, 0, 0]} material={materials.chrome}>
          <cylinderGeometry args={[0.075, 0.075, 0.02, 24]} />
        </mesh>
      </group>

      {/* Front Headlights (Left & Right) */}
      <group position={[-0.72, 0.84, 2.18]}>
        {/* Chrome bezel */}
        <mesh rotation={[Math.PI / 2, 0, 0]} material={materials.chrome}>
          <cylinderGeometry args={[0.13, 0.13, 0.06, 24]} />
        </mesh>
        {/* Lens */}
        <mesh position={[0, 0, 0.025]} rotation={[Math.PI / 2, 0, 0]} material={materials.headlightGlass}>
          <cylinderGeometry args={[0.11, 0.11, 0.03, 24]} />
        </mesh>
        {/* Turn indicator */}
        <mesh position={[-0.14, 0, 0]} material={materials.indicatorAmber}>
          <boxGeometry args={[0.06, 0.16, 0.04]} />
        </mesh>
        {headlightsOn && (
          <spotLight
            position={[0, 0, 0.2]}
            target-position={[-0.72, 0, 6]}
            color="#FFFBEB"
            intensity={2.8}
            angle={0.55}
            penumbra={0.6}
            distance={10}
            castShadow
          />
        )}
      </group>

      <group position={[0.72, 0.84, 2.18]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} material={materials.chrome}>
          <cylinderGeometry args={[0.13, 0.13, 0.06, 24]} />
        </mesh>
        <mesh position={[0, 0, 0.025]} rotation={[Math.PI / 2, 0, 0]} material={materials.headlightGlass}>
          <cylinderGeometry args={[0.11, 0.11, 0.03, 24]} />
        </mesh>
        <mesh position={[0.14, 0, 0]} material={materials.indicatorAmber}>
          <boxGeometry args={[0.06, 0.16, 0.04]} />
        </mesh>
        {headlightsOn && (
          <spotLight
            position={[0, 0, 0.2]}
            target-position={[0.72, 0, 6]}
            color="#FFFBEB"
            intensity={2.8}
            angle={0.55}
            penumbra={0.6}
            distance={10}
            castShadow
          />
        )}
      </group>

      {/* Front Windshield (Slanted) */}
      <group position={[0, 1.48, 1.76]} rotation={[-0.42, 0, 0]}>
        {/* Glass */}
        <mesh material={materials.glass}>
          <boxGeometry args={[1.72, 0.72, 0.03]} />
        </mesh>
        {/* Rubber frame gasket */}
        <mesh position={[0, 0, -0.01]} material={materials.darkChassis}>
          <boxGeometry args={[1.76, 0.76, 0.02]} />
        </mesh>
        {/* Twin Windshield Wipers */}
        <mesh position={[-0.35, -0.22, 0.035]} rotation={[0, 0, 0.25]} material={materials.darkChassis}>
          <boxGeometry args={[0.02, 0.38, 0.015]} />
        </mesh>
        <mesh position={[0.35, -0.22, 0.035]} rotation={[0, 0, 0.25]} material={materials.darkChassis}>
          <boxGeometry args={[0.02, 0.38, 0.015]} />
        </mesh>
      </group>

      {/* Cab Sun Visor Strip */}
      <mesh position={[0, 1.83, 1.62]} rotation={[-0.2, 0, 0]} material={materials.bodyRed}>
        <boxGeometry args={[1.82, 0.12, 0.12]} />
      </mesh>

      {/* Driver & Passenger Side Windows */}
      <mesh position={[-0.97, 1.48, 1.45]} material={materials.glass}>
        <boxGeometry args={[0.02, 0.52, 0.75]} />
      </mesh>
      <mesh position={[0.97, 1.48, 1.45]} material={materials.glass}>
        <boxGeometry args={[0.02, 0.52, 0.75]} />
      </mesh>

      {/* Chrome Side View Mirrors */}
      <group position={[-1.08, 1.42, 1.7]}>
        <mesh material={materials.darkChassis}>
          <boxGeometry args={[0.15, 0.03, 0.03]} />
        </mesh>
        <mesh position={[-0.08, 0, -0.02]} material={materials.chrome}>
          <boxGeometry args={[0.04, 0.24, 0.14]} />
        </mesh>
      </group>
      <group position={[1.08, 1.42, 1.7]}>
        <mesh material={materials.darkChassis}>
          <boxGeometry args={[0.15, 0.03, 0.03]} />
        </mesh>
        <mesh position={[0.08, 0, -0.02]} material={materials.chrome}>
          <boxGeometry args={[0.04, 0.24, 0.14]} />
        </mesh>
      </group>

      {/* ========================================================
          5. CURBSIDE SERVING WINDOW & AWNING (Right Side: +X)
          This is the primary street-food customer interaction hatch!
          ======================================================== */}
      {/* Hatch Cutout Trim / Frame */}
      <group position={[0.99, 1.45, -0.45]}>
        {/* Outer Counter Frame */}
        <mesh material={materials.bodyRed}>
          <boxGeometry args={[0.04, 0.95, 2.3]} />
        </mesh>
        {/* Window opening hole (creates contrast into the interior) */}
        <mesh position={[-0.03, 0.04, 0]} material={materials.darkChassis}>
          <boxGeometry args={[0.04, 0.82, 2.16]} />
        </mesh>
      </group>

      {/* Awning / Lifted Hatch Cover (tilted up at 35 degrees) */}
      <group position={[1.0, 1.94, -0.45]} rotation={[0, 0, -0.65]}>
        {/* The canopy panel */}
        <mesh position={[0, 0.46, 0]} material={materials.bodyRed} castShadow>
          <boxGeometry args={[0.04, 0.94, 2.32]} />
        </mesh>
        {/* Awning decorative yellow scallop / trim */}
        <mesh position={[-0.015, 0.04, 0]} material={materials.bodyYellow}>
          <boxGeometry args={[0.02, 0.1, 2.34]} />
        </mesh>
        {/* Awning under-lettering "GOOD DAY FAST FOOD VAN" */}
        <mesh position={[-0.025, 0.46, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[2.2, 0.45]} />
          <meshBasicMaterial map={signboardTexture} />
        </mesh>
      </group>

      {/* Hydraulic gas struts supporting the open awning */}
      <mesh position={[0.98, 1.55, 0.6]} rotation={[0, 0, -0.48]} material={materials.chrome}>
        <cylinderGeometry args={[0.015, 0.015, 0.72, 12]} />
      </mesh>
      <mesh position={[0.98, 1.55, -1.5]} rotation={[0, 0, -0.48]} material={materials.chrome}>
        <cylinderGeometry args={[0.015, 0.015, 0.72, 12]} />
      </mesh>

      {/* Wide Polished Stainless Steel Serving Shelf / Countertop */}
      <group position={[1.08, 1.02, -0.45]}>
        {/* Main stainless counter slab */}
        <mesh material={materials.stainlessSteel} castShadow receiveShadow>
          <boxGeometry args={[0.42, 0.06, 2.25]} />
        </mesh>

        {/* --- Countertop Details --- */}
        {/* Mini Menu Stand */}
        <group position={[-0.08, 0.16, 0.75]} rotation={[0, -0.4, 0]}>
          <mesh material={materials.chrome}>
            <boxGeometry args={[0.02, 0.24, 0.18]} />
          </mesh>
          <mesh position={[0.012, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[0.16, 0.22]} />
            <meshBasicMaterial map={menuBoardTexture} />
          </mesh>
        </group>

        {/* Red Ketchup & Green Mint Chutney Squeeze Bottles */}
        <group position={[0.04, 0.12, 0.35]}>
          {/* Red Sauce Bottle */}
          <mesh material={materials.bodyRed}>
            <cylinderGeometry args={[0.035, 0.04, 0.18, 16]} />
          </mesh>
          {/* White nozzle */}
          <mesh position={[0, 0.11, 0]} material={materials.accentCream}>
            <coneGeometry args={[0.02, 0.06, 12]} />
          </mesh>
        </group>
        <group position={[0.04, 0.12, 0.24]}>
          {/* Green Chutney Bottle */}
          <mesh>
            <cylinderGeometry args={[0.035, 0.04, 0.18, 16]} />
            <meshStandardMaterial color="#15803D" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.11, 0]} material={materials.accentCream}>
            <coneGeometry args={[0.02, 0.06, 12]} />
          </mesh>
        </group>

        {/* Stainless Steel Napkin Dispenser */}
        <mesh position={[0.02, 0.09, -0.3]} material={materials.chrome} castShadow>
          <boxGeometry args={[0.12, 0.12, 0.15]} />
        </mesh>

        {/* Classic Indian Street Food Order Bell (Brass) */}
        <group position={[0.05, 0.06, -0.65]}>
          <mesh>
            <cylinderGeometry args={[0.045, 0.06, 0.06, 16]} />
            <meshStandardMaterial color="#EAB308" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.04, 0]}>
            <sphereGeometry args={[0.012, 12, 12]} />
            <meshStandardMaterial color="#CA8A04" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      </group>

      {/* Warm Ambient Awning String Bulbs */}
      {[-1.3, -0.7, -0.1, 0.5].map((zPos, index) => (
        <group key={index} position={[1.15, 1.85, zPos]}>
          <mesh>
            <sphereGeometry args={[0.025, 12, 12]} />
            <meshStandardMaterial color="#FDE047" emissive="#F59E0B" emissiveIntensity={1.5} />
          </mesh>
        </group>
      ))}

      {/* Awning / Counter Spotlight illuminating food area */}
      <spotLight
        position={[1.25, 2.05, -0.45]}
        target-position={[1.05, 1.0, -0.45]}
        color="#FDE68A"
        intensity={3.0}
        angle={0.7}
        penumbra={0.7}
        distance={3.5}
        castShadow
      />

      {/* ========================================================
          6. INTERIOR KITCHEN & FOOD PREP AREA
          (Visible when viewing through counter and when entering!)
          ======================================================== */}
      {/* Interior Floor: Slate / Checker */}
      <mesh position={[0, 0.835, -0.45]} material={materials.darkChassis}>
        <boxGeometry args={[1.88, 0.02, 3.18]} />
      </mesh>

      {/* Back Wall (opposite serving window: -X side) */}
      {/* Stainless steel backsplash wall */}
      <mesh position={[-0.94, 1.48, -0.45]} material={materials.stainlessSteel}>
        <boxGeometry args={[0.04, 1.25, 3.15]} />
      </mesh>

      {/* Good Day Street Menu Board Framed on the Interior Back Wall */}
      <group position={[-0.91, 1.55, -0.45]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <planeGeometry args={[1.3, 0.85]} />
          <meshBasicMaterial map={menuBoardTexture} />
        </mesh>
        {/* Frame */}
        <mesh position={[0, 0, -0.01]} material={materials.chrome}>
          <boxGeometry args={[1.34, 0.89, 0.015]} />
        </mesh>
      </group>

      {/* Interior Stainless Countertop / Cooking Line */}
      <group position={[-0.45, 1.05, -0.45]}>
        <mesh material={materials.stainlessSteel} castShadow receiveShadow>
          <boxGeometry args={[0.7, 0.8, 3.0]} />
        </mesh>

        {/* Commercial Flat Top Griddle (Tawa) */}
        <group position={[0.05, 0.42, 0.75]}>
          <mesh material={materials.darkChassis}>
            <boxGeometry args={[0.48, 0.04, 0.65]} />
          </mesh>
          {/* Hot cooking surface with burger patties */}
          {[-0.15, 0.15].map((xP, i) => (
            <mesh key={i} position={[xP, 0.035, 0]}>
              <cylinderGeometry args={[0.075, 0.075, 0.025, 16]} />
              <meshStandardMaterial color="#854D0E" roughness={0.8} />
            </mesh>
          ))}
          {/* Spatula / Turner */}
          <mesh position={[0, 0.03, -0.22]} rotation={[0, 0.3, 0]} material={materials.chrome}>
            <boxGeometry args={[0.08, 0.01, 0.22]} />
          </mesh>
        </group>

        {/* Stainless Steel Momo Steamer Tower (Multi-tiered Indian street food style) */}
        <group position={[0.05, 0.42, 0.0]}>
          {[0, 0.11, 0.22].map((yOffset, i) => (
            <mesh key={i} position={[0, 0.06 + yOffset, 0]} material={materials.stainlessSteel}>
              <cylinderGeometry args={[0.18, 0.18, 0.1, 24]} />
            </mesh>
          ))}
          {/* Steamer Dome Lid with knob */}
          <mesh position={[0, 0.41, 0]} material={materials.stainlessSteel}>
            <sphereGeometry args={[0.18, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          </mesh>
          <mesh position={[0, 0.46, 0]} material={materials.darkChassis}>
            <cylinderGeometry args={[0.02, 0.02, 0.04, 12]} />
          </mesh>
        </group>

        {/* Commercial Deep Fryer with Twin Baskets */}
        <group position={[0.05, 0.42, -0.75]}>
          <mesh material={materials.stainlessSteel}>
            <boxGeometry args={[0.44, 0.12, 0.5]} />
          </mesh>
          {/* Oil vat */}
          <mesh position={[0, 0.05, 0]}>
            <boxGeometry args={[0.38, 0.02, 0.44]} />
            <meshStandardMaterial color="#CA8A04" roughness={0.1} />
          </mesh>
          {/* Wire fryer baskets */}
          {[-0.1, 0.1].map((xPos, idx) => (
            <mesh key={idx} position={[xPos, 0.12, 0]} material={materials.chrome}>
              <boxGeometry args={[0.14, 0.12, 0.35]} />
            </mesh>
          ))}
        </group>
      </group>

      {/* Overhead Stainless Range Hood / Exhaust Vent Canopy inside */}
      <mesh position={[-0.45, 1.95, -0.45]} material={materials.stainlessSteel}>
        <boxGeometry args={[0.75, 0.16, 2.6]} />
      </mesh>

      {/* High Storage Shelves with Ingredient containers & Spice Jars */}
      <group position={[-0.75, 1.82, -0.45]}>
        <mesh material={materials.stainlessSteel}>
          <boxGeometry args={[0.3, 0.03, 2.5]} />
        </mesh>
        {/* Stainless canisters & ingredient jars */}
        {[-0.9, -0.6, -0.3, 0, 0.3, 0.6, 0.9].map((zVal, idx) => (
          <mesh key={idx} position={[0, 0.08, zVal]} material={materials.stainlessSteel}>
            <cylinderGeometry args={[0.07, 0.07, 0.14, 16]} />
          </mesh>
        ))}
      </group>

      {/* Warm Interior Kitchen Glow Lamps */}
      <pointLight position={[0, 1.95, -0.45]} color="#FFA500" intensity={2.2} distance={4} />
      <pointLight position={[0.4, 1.7, 0.2]} color="#FED7AA" intensity={1.8} distance={3} />

      {/* ========================================================
          7. EXTERIOR BRANDING & DECALS
          ======================================================== */}
      {/* Driver Side Wall (+Z / -X Side) Full Good Day Banner */}
      <mesh position={[-0.99, 1.45, -0.45]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[3.2, 0.8]} />
        <meshBasicMaterial map={sideBannerTexture} />
      </mesh>

      {/* 100% Vegetarian Emblem Decal on Driver Side */}
      <mesh position={[-0.995, 1.45, 1.3]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[0.55, 0.55]} />
        <meshBasicMaterial map={vegEmblemTexture} transparent opacity={0.96} />
      </mesh>

      {/* 100% Vegetarian Emblem Decal on Curbside (Serving side near cab) */}
      <mesh position={[0.995, 1.45, 1.3]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.55, 0.55]} />
        <meshBasicMaterial map={vegEmblemTexture} transparent opacity={0.96} />
      </mesh>

      {/* ========================================================
          8. ROOF STRUCTURE & SIGNBOARD
          ======================================================== */}
      {/* Main Roof Cap (Curved Box in Cream/White) */}
      <mesh position={[0, 2.22, -0.2]} material={materials.accentCream} castShadow receiveShadow>
        <boxGeometry args={[1.98, 0.12, 3.8]} />
      </mesh>
      {/* Front Cab Roof */}
      <mesh position={[0, 2.05, 1.4]} material={materials.bodyYellow} castShadow>
        <boxGeometry args={[1.94, 0.1, 1.2]} />
      </mesh>

      {/* Illuminated 3D Roof Signboard: "GOOD DAY FAST FOOD VAN" */}
      <group position={[0, 2.58, -0.3]}>
        {/* Signboard box casing */}
        <mesh material={materials.bodyRed} castShadow>
          <boxGeometry args={[1.82, 0.56, 0.25]} />
        </mesh>
        {/* Gold Frame Bezel */}
        <mesh position={[0, 0, 0.13]} material={materials.chrome}>
          <boxGeometry args={[1.86, 0.6, 0.02]} />
        </mesh>

        {/* Front Face Signboard Texture (Facing Curbside / Front-Right) */}
        <mesh position={[0, 0, 0.142]}>
          <planeGeometry args={[1.8, 0.52]} />
          <meshBasicMaterial map={signboardTexture} />
        </mesh>

        {/* Rear Face Signboard Texture */}
        <mesh position={[0, 0, -0.142]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[1.8, 0.52]} />
          <meshBasicMaterial map={signboardTexture} />
        </mesh>

        {/* Soft Warm Illumination for the Signboard */}
        <pointLight position={[0, 0.1, 0.35]} color="#FEF08A" intensity={1.5} distance={2.5} />
      </group>

      {/* Commercial Stainless Exhaust Chimney on Roof */}
      <group position={[-0.45, 2.45, -0.8]}>
        {/* Base plate */}
        <mesh material={materials.stainlessSteel}>
          <boxGeometry args={[0.35, 0.04, 0.35]} />
        </mesh>
        {/* Pipe */}
        <mesh position={[0, 0.18, 0]} material={materials.stainlessSteel}>
          <cylinderGeometry args={[0.1, 0.1, 0.35, 20]} />
        </mesh>
        {/* Rain cowl / cap */}
        <mesh position={[0, 0.38, 0]} material={materials.stainlessSteel}>
          <coneGeometry args={[0.18, 0.1, 20]} />
        </mesh>
      </group>

      {/* ========================================================
          9. REAR ACCESS DOORS & DETAILS
          ======================================================== */}
      {/* Rear Double Doors Seam and Handles */}
      <group position={[0, 1.45, -2.08]}>
        {/* Door line divider */}
        <mesh material={materials.darkChassis}>
          <boxGeometry args={[0.02, 1.25, 0.02]} />
        </mesh>
        {/* Door Left Handle */}
        <mesh position={[-0.08, 0, -0.02]} material={materials.chrome}>
          <boxGeometry args={[0.03, 0.16, 0.04]} />
        </mesh>
        {/* Door Right Handle */}
        <mesh position={[0.08, 0, -0.02]} material={materials.chrome}>
          <boxGeometry args={[0.03, 0.16, 0.04]} />
        </mesh>

        {/* Rear Taillight Assemblies */}
        <group position={[-0.78, 0.0, 0]}>
          {/* Red Brake Light */}
          <mesh position={[0, 0.12, -0.01]} material={materials.taillightGlass}>
            <boxGeometry args={[0.12, 0.15, 0.03]} />
          </mesh>
          {/* Amber Turn Indicator */}
          <mesh position={[0, -0.05, -0.01]} material={materials.indicatorAmber}>
            <boxGeometry args={[0.12, 0.12, 0.03]} />
          </mesh>
        </group>
        <group position={[0.78, 0.0, 0]}>
          <mesh position={[0, 0.12, -0.01]} material={materials.taillightGlass}>
            <boxGeometry args={[0.12, 0.15, 0.03]} />
          </mesh>
          <mesh position={[0, -0.05, -0.01]} material={materials.indicatorAmber}>
            <boxGeometry args={[0.12, 0.12, 0.03]} />
          </mesh>
        </group>
      </group>
    </group>
  );
};

// Reusable Wheel Component with Rubber Tread and Alloy Rim
interface WheelProps {
  position: [number, number, number];
  materials: {
    tireRubber: THREE.Material;
    rimSilver: THREE.Material;
    bodyRed: THREE.Material;
    darkChassis: THREE.Material;
  };
  isLeft: boolean;
}

const Wheel: React.FC<WheelProps> = ({ position, materials, isLeft }) => {
  return (
    <group position={position}>
      {/* Rubber Tire */}
      <mesh
        material={materials.tireRubber}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[0.38, 0.38, 0.24, 28]} />
      </mesh>

      {/* Silver Rim */}
      <mesh
        position={[isLeft ? -0.02 : 0.02, 0, 0]}
        material={materials.rimSilver}
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry args={[0.24, 0.24, 0.22, 24]} />
      </mesh>

      {/* Red Center Hubcap with chrome ring */}
      <mesh
        position={[isLeft ? -0.12 : 0.12, 0, 0]}
        material={materials.bodyRed}
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry args={[0.08, 0.08, 0.04, 16]} />
      </mesh>

      {/* Wheel Lug Nuts */}
      {[0, (Math.PI * 2) / 5, (Math.PI * 4) / 5, (Math.PI * 6) / 5, (Math.PI * 8) / 5].map((angle, i) => (
        <mesh
          key={i}
          position={[
            isLeft ? -0.11 : 0.11,
            Math.sin(angle) * 0.14,
            Math.cos(angle) * 0.14,
          ]}
          material={materials.darkChassis}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.015, 0.015, 0.03, 8]} />
        </mesh>
      ))}
    </group>
  );
};
