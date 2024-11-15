// Ground.js
import React, { useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { MeshReflectorMaterial } from "@react-three/drei";
import { TextureLoader, RepeatWrapping, sRGBEncoding, RGBAFormat, UnsignedByteType } from "three";

export default function Ground() {
  const [roughness, normal] = useLoader(TextureLoader, [
    process.env.PUBLIC_URL + "/textures/terrain-roughness.jpg",
    process.env.PUBLIC_URL + "/textures/terrain-normal.jpg",
  ]);

  useEffect(() => {
    [normal, roughness].forEach((t) => {
      t.wrapS = RepeatWrapping;
      t.wrapT = RepeatWrapping;
      t.repeat.set(5, 5);
      t.offset.set(0, 0);
      t.encoding = sRGBEncoding;
      t.format = RGBAFormat;
      t.type = UnsignedByteType;
    });
  }, [normal, roughness]);

  useFrame((state, delta) => {
    let t = -state.clock.getElapsedTime() * 0.128;
    roughness.offset.set(0, t % 1);
    normal.offset.set(0, t % 1);
  });

  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, -0.1, 0]}>
      <planeGeometry args={[100, 100]} />
      <MeshReflectorMaterial
        roughnessMap={roughness}
        normalMap={normal}
        roughness={1}
        blur={[300, 100]}
        mixBlur={0.7}
        reflectivity={0.5}
      />
    </mesh>
  );
}