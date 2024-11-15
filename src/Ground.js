import React, { useEffect } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial } from "@react-three/drei";
import { TextureLoader, RepeatWrapping, LinearEncoding, RGBAFormat, UnsignedByteType } from "three";

export default function Ground() {
  // Load the textures for roughness and normal maps
  const [roughness, normal] = useLoader(TextureLoader, [
    process.env.PUBLIC_URL + "/textures/terrain-roughness.jpg",
    process.env.PUBLIC_URL + "/textures/terrain-normal.jpg",
  ]);

  // Set texture properties once they're loaded
  useEffect(() => {
    [normal, roughness].forEach((t) => {
      t.wrapS = RepeatWrapping;
      t.wrapT = RepeatWrapping;
      t.repeat.set(5, 5);  // Adjust repeat to fit the size of the ground
      t.offset.set(0, 0);

      // Force the textures to use RGBAFormat and UnsignedByteType
      t.format = RGBAFormat;
      t.type = UnsignedByteType;
      t.encoding = LinearEncoding;  // Set the encoding to Linear
    });
  }, [normal, roughness]);

  // Animate the texture offsets
  useFrame((state, delta) => {
    let t = -state.clock.getElapsedTime() * 0.128;  // Speed of animation
    roughness.offset.set(0, t % 1);  // Move the roughness texture
    normal.offset.set(0, t % 1);  // Move the normal texture
  });

  return (
    // A large plane to represent the ground
    <mesh rotation-x={-Math.PI / 2} position={[0, -0.1, 0]}>
      <planeGeometry args={[100, 100]} /> {/* Plane size */}
      <MeshReflectorMaterial
        roughnessMap={roughness}  // Apply roughness map
        normalMap={normal}        // Apply normal map
        roughness={1}             // Adjust the roughness for the ground material
        blur={[300, 100]}         // Optional blur effect for reflection
        mixBlur={0.7}             // Optional mixing of blur effects
        reflectivity={0.5}        // Control the reflectivity of the material
      />
    </mesh>
  );
}
