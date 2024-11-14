// import React, { Suspense } from 'react';
// import './style.css';
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, PerspectiveCamera, SpotLight } from "@react-three/drei";
// import Ground from "./Ground";
// import { Car } from "./Car";
// import { FloatingGrid } from "./FloatingGrid";
// import { City } from "./City"; // Import the City component

// function CarShow() {
//   return (
//     <>
//       <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
//       <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />
//       <color args={["#0b0c10"]} attach="background" />

//       <SpotLight color={[1, 1, 1]} intensity={1.5} position={[5, 5, 5]} castShadow />
//       <SpotLight color={[1, 0.6, 0.2]} intensity={1.5} position={[-5, 5, -5]} castShadow />
//       <ambientLight intensity={0.4} />

//       <Ground />
//       <FloatingGrid />
      
//       {/* Use Suspense for individual models */}
//       <Suspense fallback={null}>
//         <City />
//       </Suspense>
//       <Suspense fallback={null}>
//         <Car />
//       </Suspense>
//     </>
//   );
// }

// function App() {
//   return (
//     <>
//       {/* Loading state outside of Canvas */}
//       <div className="loading">Loading 3D Models...</div>  {/* This div is now outside of Canvas */}

//       {/* Suspense wrapper to handle loading */}
//       <Suspense fallback={<div className="loading">Loading...</div>}> 
//         <Canvas shadows>
//           <CarShow />
//         </Canvas>
//       </Suspense>
//     </>
//   );
// }

// export default App;
import React, { Suspense, useState } from 'react';
import './style.css';
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, SpotLight } from "@react-three/drei";
import Ground from "./Ground";
import { Car } from "./Car";
import { City } from "./City";

function CarShow() {
  const [partitionPosition, setPartitionPosition] = useState({ x: 0, y: 0, z: 0 });

  return (
    <>
      {/* Adjusted camera y-position for a higher view */}
      <PerspectiveCamera makeDefault fov={50} position={[3, 5, 5]} />
      <color args={["#0b0c10"]} attach="background" />

      <SpotLight color={[1, 1, 1]} intensity={1.5} position={[5, 5, 5]} castShadow />
      <SpotLight color={[1, 0.6, 0.2]} intensity={1.5} position={[-5, 5, -5]} castShadow />
      <ambientLight intensity={0.4} />

      <Ground />

      <Suspense fallback={null}>
        <City setPartitionPosition={setPartitionPosition} />
      </Suspense>

      <Suspense fallback={null}>
        <Car partitionPosition={partitionPosition} />
      </Suspense>
    </>
  );
}

function App() {
  return (
    <Canvas shadows>
      <CarShow />
    </Canvas>
  );
}

export default App;