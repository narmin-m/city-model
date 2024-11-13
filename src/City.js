// import React from 'react';
// import { useGLTF } from '@react-three/drei';

// export function City() {
//   // Load the GLTF model using useGLTF hook
//   const { scene } = useGLTF(process.env.PUBLIC_URL + "/models/city.glb");

//   // Ensure the model is loaded before returning
//   if (!scene) {
//     return null;  // Return null if the scene is not loaded
//   }

//   // Return the city model as a primitive object
//   return <primitive object={scene} scale={1} position={[0, 0, 0]} />;
// }


import React, { useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { Color } from 'three';

export function City({ setPartitionPosition }) {
  const { scene } = useGLTF(process.env.PUBLIC_URL + "/models/__city.glb");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (scene) {
      // Find the partition object in the city model
      const partition = scene.getObjectByName('partition');
      if (partition) {
        const partitionPosition = partition.position;
        console.log('Partition position:', partitionPosition);
        setPartitionPosition(partitionPosition);
      }

      // Traverse the entire scene and adjust the material colors
      scene.traverse((object) => {
        if (object.isMesh) {
          object.material.color = new Color('#495c6b'); 
        }
      });

      setLoaded(true);
    }
  }, [scene, setPartitionPosition]);

  if (!loaded || !scene) {
    return null;
  }

  return <primitive object={scene} scale={1} position={[0, 0, 0]} />;
}

