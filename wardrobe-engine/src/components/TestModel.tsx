// import React from "react";
// import * as THREE from 'three';
// import { outfitStore } from "../hooks/outfitStore"

// import { Shiba } from '../3d-models/Shiba_deadpool'

// export const TestModel = ({ unique }: { unique: string }) =>{
//      const {outfits} = outfitStore()
//      let modelInstance = outfits.find((o:any) => o.key === unique)
     
//      let dimensions = [2,2,2]
//      let box = new THREE.BoxGeometry(
//           dimensions[0],dimensions[1],dimensions[2]
//      );
     
//      return(
//           <group
//                position={[0,0,0]}
//                // rotation={[0,0,0]}
//           >
//                <mesh>
//                     <primitive object={box} attach="geometry" />
//                     <meshStandardMaterial 
//                          attach={'material'} 
//                          color={'hotpink'}
//                          // color={color}
//                          // map={texture}
//                          opacity={0.8}
//                          transparent={true}
//                     />
//                </mesh>
//           </group>
//      )
// }

import { useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF, useAnimations, useScroll } from "@react-three/drei"
import { Group, SkinnedMesh } from "three";
import * as THREE from 'three'

import { outfitStore } from "../hooks/outfitStore"

// Model Downloads - https://polyhaven.com/
               //  - https://sketchfab.com/features/gltf
               //  - https://www.mixamo.com/
// Model validator - https://github.khronos.org/glTF-Validator/
// Loading models  - https://docs.pmnd.rs/react-three-fiber/tutorials/loading-models
               //  - https://blog.logrocket.com/configure-3d-models-react-three-fiber/

// More help with gltf/glb models
//   R3F (50mins)   - https://www.youtube.com/watch?v=2jwqotdQmdQ
//   Three.js       - https://www.youtube.com/watch?v=WBe3xrV4CPM
//   R3F Typescript - https://www.youtube.com/watch?v=tBSbgRRpNzI
//   R3F animation  - https://codesandbox.io/p/sandbox/gltf-animations-tied-to-scroll-hg3ejl?file=%2Fsrc%2FApp.js%3A8%2C53-8%2C74
//   R3F animation  - https://www.youtube.com/watch?v=oIE8ugxk01I

// function Model(props) {
export const TestModel = ({ unique }: { unique: string }) =>{
     const {outfits} = outfitStore()
     let modelInstance = outfits.find((o:any) => o.key === unique)

     const { nodes, materials, animations } = useGLTF("/src/3d-models/test-model.glb")
     const { ref, actions } = useAnimations(animations)
     useEffect(() => {
          if (actions.walk) {
               // void (actions.walk.reset().play().paused = true);
               void (actions.walk.reset().play());
          }
     }, []);

     // const bodyMesh = nodes.Ch03.getObjectByName("Ch03_Body") as SkinnedMesh;
     // const bodyMesh = (nodes.Ch03.getObjectByName("Ch03_Body") as THREE.Mesh)

     return (
          <group 
               // {...props} 
               position={[0, -1, 0]} 
               rotation={[Math.PI / 2, 0, 0]} 
               scale={0.02}
               ref={ref as React.Ref<Group>}
          >
               <primitive object={nodes.mixamorigHips} />
               <skinnedMesh 
                    castShadow 
                    receiveShadow 
                    geometry={nodes.Ch03.geometry}
                    material={materials.Ch03_Body}
                    skeleton={nodes.Ch03.skeleton}
                    // geometry={bodyMesh.geometry} 
                    // skeleton={bodyMesh.skeleton} 
               />
          </group>
     )
}