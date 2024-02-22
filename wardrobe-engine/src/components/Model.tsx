// import React from "react";

export const Model = () =>{
     return(
          <mesh position={[0,0,0]}>
               <boxGeometry args={[2, 2, 2]} />
               <meshLambertMaterial attach={'material'} color={'hotpink'} />
          </mesh>
     )
}