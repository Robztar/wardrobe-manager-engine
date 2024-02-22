import { Canvas } from '@react-three/fiber';
import { Sky, OrbitControls} from '@react-three/drei';

import { Model } from './Model';
import { uiStore, outfitStore } from "../hooks/robeStore"

function Ground(){
     return(
          <mesh position={[0,-1,0]} rotation={[-Math.PI/2, 0, 0]}>
               <planeGeometry attach={'geometry'} args={[100,100]}/>
               <meshLambertMaterial attach={'material'} color={'white'} />
          </mesh>
     )
}

export const Outfitter = () =>{
     const {outfitterState, setOutfitter} = uiStore();

     return(
          <div className={`fitter-cont ${outfitterState? 'active':''}`}
          >
               <i className="far fa-times-circle close-outfitter"
                    onClick={()=>{
                         setOutfitter()
                    }}
               ></i>
               <Canvas id='outfit-canvas'>
                    <Sky sunPosition={[30, 30, 20]} />
                    <ambientLight />
                    <pointLight castShadow intensity={0.7} position={[-2, 1, 1]} />
                    <OrbitControls minPolarAngle={-Math.PI/2} maxPolarAngle={Math.PI/2} />
                    <Model />
                    <Ground />
               </Canvas> 
          </div>
     )
}