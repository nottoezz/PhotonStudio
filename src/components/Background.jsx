import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text3D } from "@react-three/drei";
import { useRef, useEffect, useMemo, useState } from "react";
import * as THREE from "three";

function RippleWall({
  text = "PHOTON STUDIO™",
  sizeMultiplier = 1 / 16, // text size relative to viewport height
  gapX = 1.05, // horizontal spacing multiplier
  gapY = 1.2, // vertical spacing multiplier
  brickOffset = 0.5, // how much to offset every other row (0..1 of tile width)
}) {
  const baseRef = useRef();
  const { viewport } = useThree();

  const [geo, setGeo] = useState(null);
  const [tileSize, setTileSize] = useState({ w: 1, h: 1 });

  // Create shader material once
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      glslVersion: THREE.GLSL1,
      transparent: true,
      depthWrite: true,
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        precision highp float;
        uniform float uTime;
        // We use world position so each tile gets a unique wave phase
        void main() {
          vec3 p = position;
          vec3 worldPos = (modelMatrix * vec4(p, 1.0)).xyz;
          float wave = sin(worldPos.x * 1.2 + uTime * 1.5) * 0.08;
          wave += sin(worldPos.y * 1.6 + uTime * 1.2) * 0.08;
          p.z += wave;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragmentShader: `
        precision mediump float;
        void main() {
          // dark watery blue
          gl_FragColor = vec4(0.318, 0.824, 0.859, 1);
        }
      `,
    });
  }, []);

  // Animate uTime
  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  // After base Text3D mounts, capture its geometry + size
  useEffect(() => {
    const m = baseRef.current;
    if (!m) return;
    const g = m.geometry;
    g.center();
    g.computeBoundingBox?.();
    const bb = g.boundingBox;
    const w = bb.max.x - bb.min.x || 1;
    const h = bb.max.y - bb.min.y || 1;
    setGeo(g);
    setTileSize({ w, h });
  }, [viewport.width, viewport.height]);

  // Text size scales with viewport height for stability
  const textSize = viewport.height * sizeMultiplier;

  // Compute grid positions to cover viewport (with a small margin)
  const positions = useMemo(() => {
    if (!tileSize.w || !tileSize.h) return [];

    const tileW = tileSize.w * gapX;
    const tileH = tileSize.h * gapY;

    // +3 gives room for the half-tile shifts on odd rows
    const cols = Math.ceil(viewport.width / tileW) + 3;
    const rows = Math.ceil(viewport.height / tileH) + 2;

    const startX = -((cols - 1) * tileW) / 2;
    const startY = -((rows - 1) * tileH) / 2;

    const arr = [];
    const brick = brickOffset ?? 10; // 0.5 = classic running bond

    for (let r = 0; r < rows; r++) {
      const offsetX = r % 2 ? brick * tileW : 5; // shift odd rows by % of tile width
      for (let c = 0; c < cols; c++) {
        const x = startX + c * tileW + offsetX;
        const y = startY + r * tileH;
        arr.push([x, y, 0]);
      }
    }
    return arr;
  }, [
    tileSize.w,
    tileSize.h,
    gapX,
    gapY,
    brickOffset,
    viewport.width,
    viewport.height,
  ]);

  return (
    <>
      {/* Hidden base: generates the geometry at the right size */}
      <Text3D
        ref={baseRef}
        font="public/fonts/helvetiker_bold.typeface.json"
        size={textSize}
        height={0.15}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.015}
        visible={false}
      >
        {text}
      </Text3D>

      {/* Once geo is ready, plaster the wall */}
      {geo &&
        positions.map((pos, i) => (
          <mesh key={i} geometry={geo} material={material} position={pos} />
        ))}
    </>
  );
}

export default function Background() {
  return (
    <Canvas
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => {
        // Transparent canvas so DOM shows through
        gl.setClearColor(0x000000, 0);
        gl.getContext().getExtension("OES_standard_derivatives");
      }}
      camera={{ position: [0, 0, 20], fov: 60 }}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[2, 2, 5]} intensity={1} />
      <RippleWall />
    </Canvas>
  );
}
