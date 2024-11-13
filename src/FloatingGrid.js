import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { RepeatWrapping, TextureLoader } from "three";
import { PlaneGeometry, MeshBasicMaterial, Mesh } from "three";

export function FloatingGrid() {
  // Load the grid texture
  const diffuse = useLoader(TextureLoader, process.env.PUBLIC_URL + "/textures/grid-texture.png");

  // Configure the texture once it's loaded
  useEffect(() => {
    diffuse.wrapS = RepeatWrapping;
    diffuse.wrapT = RepeatWrapping;
    diffuse.anisotropy = 4;
    diffuse.repeat.set(30, 30);  // Adjust how many times the texture repeats
    diffuse.offset.set(0, 0);  // Initial offset
  }, [diffuse]);

  // Animate the texture offset over time
  useFrame((state, delta) => {
    let t = -state.clock.getElapsedTime() * 0.68;  // Speed of animation
    diffuse.offset.set(0, t);  // Update the texture offset
  });

  return (
    // PlaneGeometry to display the texture
    <mesh>
      <planeGeometry args={[100, 100]} />  {/* Plane size */}
      <meshBasicMaterial map={diffuse} />  {/* Apply the texture */}
    </mesh>
  );
}
