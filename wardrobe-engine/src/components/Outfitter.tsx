import { Canvas } from '@react-three/fiber';
import { Sky, OrbitControls} from '@react-three/drei';

import { Model } from './Model';
// import { outfitStore } from "../hooks/robeStore"
import { outfitStore } from "../hooks/outfitStore"
import { uiStore } from "../hooks/uiStore"

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
     const {outfits, activeOutfit, setActiveOutfit, delOutfit} = outfitStore();
     let selKey: string = activeOutfit;

     return(
          <div className={`fitter-cont ${outfitterState? 'active':''}`}
          >
               
               <div className="fitter-nav">
                    <i className="fas fa-trash del-outfit"
                         onClick={()=>{
                              setActiveOutfit('')
                              delOutfit(selKey)
                              setOutfitter()
                              // console.log('Outfits State: '+ outfits[0].key)
                         }}
                    ></i>
                    <i className="far fa-times-circle close-outfitter"
                         onClick={()=>{
                              setOutfitter()
                              setActiveOutfit('')
                         }}
                    ></i>
               </div>
               <Canvas id='outfit-canvas'>
                    <Sky sunPosition={[30, 30, 20]} />
                    <ambientLight />
                    <pointLight castShadow intensity={0.7} position={[-2, 1, 1]} />
                    <OrbitControls minPolarAngle={-Math.PI/2} maxPolarAngle={Math.PI/2} />
                    {/* <Model /> */}
                    {outfits.map((key: string) =>{
                         // console.log("Outfit key: "+selKey);
                              
                         if(selKey === key){
                              return(
                                   <Model 
                                        key = {key}
                                        unique = {key}
                                   />
                              )
                         }
                         return null;
                    })}
                    <Ground />
               </Canvas> 
          </div>
     )
}