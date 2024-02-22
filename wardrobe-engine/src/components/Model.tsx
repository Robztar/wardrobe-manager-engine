// import React from "react";
import * as THREE from 'three';
import { outfitStore } from "../hooks/outfitStore"

export const Model = ({ unique }: { unique: string }) =>{
     const {outfits} = outfitStore()
     let modelInstance = outfits.find((o:any) => o.key === unique)
     
     let dimensions = [2,2,2]
     let box = new THREE.BoxGeometry(
          dimensions[0],dimensions[1],dimensions[2]
     );
     // let color = modelInstance.color
     // let texture = modelInstance.texture
     // texture.repeat.set(dimensions[1],dimensions[2]);
     
     return(
          // <mesh position={[0,0,0]}>
          //      <boxGeometry args={[2, 2, 2]} />
          //      <meshLambertMaterial attach={'material'} color={'hotpink'} />
          // </mesh>
          <group
               position={[0,0,0]}
               // rotation={[0,0,0]}
          >
               <mesh>
                    <primitive object={box} attach="geometry" />
                    <meshStandardMaterial 
                         attach={'material'} 
                         color={'hotpink'}
                         // color={color}
                         // map={texture}
                         opacity={0.8}
                         transparent={true}
                    />
               </mesh>
          </group>
     )
}