// import React, { useRef, useEffect, useState } from "react";
// import { useLoader, useFrame } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { Mesh, Color, Vector3 } from "three";
// import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

// export function CarAndCity() {
//   const [gltf, setGltf] = useState(null);
//   const [loaded, setLoaded] = useState(false);

//   const arrowRef = useRef();
//   const cameraTarget = useRef(new Vector3());

//   useEffect(() => {
//     const loader = new GLTFLoader();
//     const dracoLoader = new DRACOLoader();
//     dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");
//     loader.setDRACOLoader(dracoLoader);

//     loader.load(
//       [
//         process.env.PUBLIC_URL + "/models/car/arrow.glb",
//         process.env.PUBLIC_URL + "/models/city.glb"
//       ],
//       (loadedGltf) => {
//         setGltf(loadedGltf);
//         setLoaded(true);
//       },
//       undefined,
//       (error) => {
//         console.error(error);
//       }
//     );
//   }, []);

//   const initialPosition = 0;
//   const speed = 0.1;
//   const pathLength = 20;
//   const resetTime = 45;

//   useEffect(() => {
//     if (gltf && gltf.scenes) {
//       const arrowScene = gltf.scenes[0];
//       const cityScene = gltf.scenes[1];

//       arrowScene.scale.set(0.03, 0.03, 0.03);
//       arrowScene.position.set(0.06, 0.1, initialPosition);
//       arrowScene.rotation.x = -Math.PI / 2;
//       arrowScene.rotation.y = -Math.PI / 2;
//       arrowScene.rotation.z = 0;

//       cityScene.traverse((object) => {
//         if (object.isMesh) {
//           object.material.color = new Color("#495c6b");
//         }
//       });

//       arrowRef.current = arrowScene;
//     }
//   }, [gltf]);

//   useFrame((state, delta) => {
//     if (arrowRef.current) {
//       const elapsedTime = state.clock.getElapsedTime();
//       arrowRef.current.position.z = initialPosition + (elapsedTime * speed) % pathLength;

//       if (elapsedTime > resetTime) {
//         arrowRef.current.position.set(0.06, 0.1, initialPosition);
//         state.clock.start();
//       }

//       cameraTarget.current.copy(arrowRef.current.position);
//       cameraTarget.current.y = arrowRef.current.position.y + 0.2;
//       cameraTarget.current.z = arrowRef.current.position.z - 0.7;

//       const cameraPosition = state.camera.position;
//       cameraPosition.lerp(cameraTarget.current, 0.1);
//       state.camera.lookAt(arrowRef.current.position);
//     }
//   });

//   if (!loaded || !gltf || !gltf.scenes) {
//     return null;
//   }

//   return (
//     <>
//       <primitive ref={arrowRef} object={gltf.scenes[0]} />
//       <primitive object={gltf.scenes[1]} scale={1} position={[0, 0, 0]} />
//     </>
//   );
// }