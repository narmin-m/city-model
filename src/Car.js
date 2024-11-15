// import React, { useEffect } from "react";
// import { useFrame, useLoader } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { Mesh } from "three";
// import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

// export function Car() {
//   // Load the 3D model using the GLTFLoader and DRACOLoader
//   const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + "/models/car/rx7.glb", (loader) => {
//     const dracoLoader = new DRACOLoader();
//     dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");
//     loader.setDRACOLoader(dracoLoader);
//   });

//   useEffect(() => {
//     // Check if the model is loaded and set properties
//     if (gltf && gltf.scene) {
//       // Scale down the car to fit within the streets
//       gltf.scene.scale.set(0.1, 0.1, 0.1);  // Adjust as needed for smaller size
//       gltf.scene.position.set(0, -0.035, 0);  // Position adjustments

//       // Traverse the model to set shadows and other properties
//       gltf.scene.traverse((object) => {
//         if (object instanceof Mesh) {
//           object.castShadow = true;
//           object.receiveShadow = true;
//           object.material.envMapIntensity = 17; // Set reflection intensity
//         }
//       });
//     }
//   }, [gltf]); // Only run when 'gltf' is updated

//   useFrame((state) => {
//     // Animate the wheels
//     if (gltf && gltf.scene) {
//       let t = state.clock.getElapsedTime() * 2;
//       let group = gltf.scene.children[0]?.children[0]?.children[0]?.children[0]?.children[1]?.children[5]?.children[0];

//       if (group) {
//         // Rotate the wheels
//         group.children[0].rotation.x = t; // Rotate front-left wheel
//         group.children[1].rotation.x = t; // Rotate front-right wheel
//         group.children[2].rotation.x = t; // Rotate back-left wheel
//         group.children[3].rotation.x = t; // Rotate back-right wheel
//       }
//     }
//   });

//   // Return the 3D model
//   return <primitive object={gltf.scene} />;

// import React, { useEffect } from "react";
// import { useLoader } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { Mesh, Color } from "three";
// import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

// export function Car({ partitionPosition = { x: 0, y: 0, z: 0 } }) {
//   const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + "/models/car/carArrow.glb", (loader) => {
//     const dracoLoader = new DRACOLoader();
//     dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");
//     loader.setDRACOLoader(dracoLoader);
//   });

//   useEffect(() => {
//     if (gltf && gltf.scene) {
//       // Scale down the model further to make it smaller
//       gltf.scene.scale.set(0.03, 0.03, 0.03);

//       // Move a little to the right by adjusting the x value (e.g., by 0.05)
//       gltf.scene.position.set(partitionPosition.x + 0.05, partitionPosition.y + 0.1, partitionPosition.z);

//       // Rotate 180 degrees to face the opposite direction (flip on the Y axis)
//       gltf.scene.rotation.y = Math.PI;  // 180 degrees in radians

//       // Set material properties
//       gltf.scene.traverse((object) => {
//         if (object instanceof Mesh) {
//           object.castShadow = true;
//           object.receiveShadow = true;
//           object.material.color = new Color("#358737");  // Set color to #358737
//           object.material.envMapIntensity = 1.5;
//         }
//       });
//     }
//   }, [gltf, partitionPosition]);

//   return <primitive object={gltf.scene} />;
// }
// import React, { useRef, useEffect } from "react";
// import { useLoader, useFrame } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { Mesh, Color, Vector3 } from "three";
// import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

// export function Car({ partitionPosition = { x: 0, y: 0, z: 0 } }) {
//   const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + "/models/car/direction_arrow.glb", (loader) => {
//     const dracoLoader = new DRACOLoader();
//     dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");
//     loader.setDRACOLoader(dracoLoader);
//   });

//   const arrowRef = useRef();
//   const cameraTarget = useRef(new Vector3());
//   const initialPosition = partitionPosition.z;
//   const speed = 0.1;
//   const pathLength = 20;
  
//   const resetTime = 45;  // Time after which the arrow will reset position, in seconds

//   useEffect(() => {
//     if (gltf && gltf.scene) {
//       gltf.scene.scale.set(0.03, 0.03, 0.03);
//       gltf.scene.position.set(partitionPosition.x + 0.06, partitionPosition.y + 0.1, initialPosition);
//       gltf.scene.rotation.y = -Math.PI / 2;

//       gltf.scene.traverse((object) => {
//         if (object instanceof Mesh) {
//           object.castShadow = true;
//           object.receiveShadow = true;
//           object.material.color = new Color("#358737");
//           object.material.envMapIntensity = 1.5;
//         }
//       });
//     }
//   }, [gltf, partitionPosition, initialPosition]);

//   useFrame((state, delta) => {
//     const elapsedTime = state.clock.getElapsedTime();

//     // Move arrow forward along z-axis
//     arrowRef.current.position.z = initialPosition + (elapsedTime * speed) % pathLength;

//     // Reset the position after 45 seconds, and allow the movement to continue
//     if (elapsedTime > resetTime) {
//       // Reset to initial position after resetTime seconds
//       arrowRef.current.position.set(partitionPosition.x + 0.06, partitionPosition.y + 0.1, initialPosition);

//       // Reset clock to continue from there and maintain smooth movement
//       state.clock.start();  // Start the clock again to continue moving the arrow forward
//     }

//     // Update the camera target to follow the arrow, positioned just behind and close to the ground
//     cameraTarget.current.copy(arrowRef.current.position);

//     // Position camera slightly behind the arrow and close to street level
//     cameraTarget.current.y = arrowRef.current.position.y + 0.2; // Just above ground level
//     cameraTarget.current.z = arrowRef.current.position.z - 0.7;  // Closer to the arrow, behind it

//     // Smooth camera movement to follow the arrow at street level
//     const cameraPosition = state.camera.position;
//     cameraPosition.lerp(cameraTarget.current, 0.1); // Smoothly move towards target position
//     state.camera.lookAt(arrowRef.current.position);  // Always look at the arrow to stay in frame
//   });

//   return <primitive ref={arrowRef} object={gltf.scene} />;
// }

import React, { useRef, useEffect } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh, Color, Vector3 } from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

export function Car({ partitionPosition = { x: 0, y: 0, z: 0 } }) {
  const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + "/models/car/arrow.glb", (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");
    loader.setDRACOLoader(dracoLoader);
  });

  const arrowRef = useRef();
  const cameraTarget = useRef(new Vector3());

  const initialPosition = partitionPosition.z - 3; // Adjusted initial position closer to camera
  const speed = 0.28;
  const pathLength = 20;
  const resetTime = 38;

  useEffect(() => {
    if (gltf && gltf.scene) {
      gltf.scene.scale.set(0.03, 0.03, 0.03);

      // Position the arrow a bit closer to the camera on the z-axis
      gltf.scene.position.set(partitionPosition.x + 0.06, partitionPosition.y + 0.1, initialPosition - 2.5); // Minor adjustment

      gltf.scene.rotation.x = -Math.PI / 2;
      gltf.scene.rotation.y = -Math.PI / 2;
      gltf.scene.rotation.z = 0;

      gltf.scene.traverse((object) => {
        if (object instanceof Mesh) {
          object.castShadow = true;
          object.receiveShadow = true;
          object.material.envMapIntensity = 1.5;
          object.material.color = new Color("#00fe88");
        }
      });
    }
  }, [gltf, partitionPosition, initialPosition]);

  useFrame((state, delta) => {
    const elapsedTime = state.clock.getElapsedTime();

    // Adjust the arrow's movement to stay slightly closer to the camera
    const currentZ = initialPosition + (elapsedTime * speed) % pathLength;
    arrowRef.current.position.set(partitionPosition.x + 0.06, partitionPosition.y + 0.1, currentZ - 2.5); // Minor adjustment for a consistent back position

    if (elapsedTime > resetTime) {
      state.clock.start();
    }

    // Adjust camera to keep it following slightly above and behind the arrow
    cameraTarget.current.copy(arrowRef.current.position);
    cameraTarget.current.y += 0.3; // Slightly elevated view
    cameraTarget.current.z -= 0.5;

    const cameraPosition = state.camera.position;
    cameraPosition.lerp(cameraTarget.current, 0.1);

    state.camera.lookAt(arrowRef.current.position);
  });

  return <primitive ref={arrowRef} object={gltf.scene} />;
}
