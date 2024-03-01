import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky, OrbitControls, SoftShadows } from "@react-three/drei"
import { Model } from './Model';
import { TestModel } from './TestModel';
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
     const {outfitterState, setOutfitter} = uiStore()
     const {outfits, activeOutfit, setActiveOutfit, delOutfit} = outfitStore()
     let fitInstance = outfits.find((o:any) => o.key === activeOutfit)
     const [editWindow, setEditWindow] = useState(false)
     let fitKey: string
     let fitName: string = 'No Name'

     if(fitInstance){
          fitKey = fitInstance.key
          fitName = fitInstance.name.charAt(0).toUpperCase() + fitInstance.name.slice(1)
          console.log('Outfit Key: '+ fitKey+'Outfit Name: '+ fitName)
     }
     // console.log('Outfit Instance: '+fitInstance)

     return(
          <div className={`fitter-cont ${outfitterState? 'active':''}`}>
               <div className={`outfit-profile ${editWindow? '':'active'}`}>
                    <div className='profile-sidebar-cont'>
                         <div className="profile-sidebar">
                              <h2 className="outfit-name">{fitName}</h2>
                              <div className="outfit-date">DD/MM/YYY</div>
                              <button 
                                   className="outfit-open"
                                   onClick={()=>{
                                        setEditWindow(true)
                                   }}
                              >Open Project</button>
                              <i className='far fa-edit fit-proj-edit' 
                                   onClick={()=>{

                              }}></i>
                              <i className="fas fa-trash del-outfit"
                                   onClick={()=>{
                                        setActiveOutfit('')
                                        delOutfit(fitKey)
                                        setOutfitter()
                                        setEditWindow(false)
                                   }}
                              ></i>
                              <div className="outfit-details"></div>
                         </div>
                    </div>
                    <div className='profile-body-cont'>
                         <i className="far fa-times-circle close-outfitter"
                              onClick={()=>{
                                   setOutfitter()
                                   setActiveOutfit('')
                              }}
                         ></i>
                         <div className='profile-body'>
                              
                              <img className="outfit-thumbnail" alt='project image'></img>
                         </div>
                    </div>
               </div>
               <div className={`fitter-nav ${editWindow? 'active':''}`}>
                    <i className="fas fa-trash del-outfit"
                         onClick={()=>{
                              setActiveOutfit('')
                              delOutfit(fitKey)
                              setOutfitter()
                              setEditWindow(false)
                         }}
                    ></i>
                    <h3 className='nav-outfit-name'>
                         {fitName}
                    </h3>
                    <i className="far fa-times-circle close-outfitter"
                         onClick={()=>{
                              // setOutfitter()
                              // setActiveOutfit('')
                              setEditWindow(false)
                         }}
                    ></i>
               </div>
               <Canvas id='outfit-canvas' className={`${editWindow? 'active':''}`}>
                    {/* <Sky sunPosition={[30, 30, 20]} />
                    <ambientLight />
                    <pointLight castShadow intensity={0.7} position={[-2, 1, 1]} /> */}
                    <color attach="background" args={["#f0f0f0"]} />
                    <fog attach="fog" args={["#f0f0f0", 0, 20]} />
                    <ambientLight intensity={1} />
                    <directionalLight intensity={5} position={[-5, 5, 5]} castShadow shadow-mapSize={2048} shadow-bias={-0.0001} />
                    <OrbitControls minPolarAngle={-Math.PI/2} maxPolarAngle={Math.PI/2} />
                    {/* <Model /> */}
                    {outfits.map((fit: any) =>{
                         // console.log("Outfit key: "+selKey);
                         const thisKey = fit.key;
                              
                         if(fitKey === thisKey){
                              return(
                                   // <Model 
                                   //      key = {thisKey}
                                   //      unique = {thisKey}
                                   // />
                                   <TestModel 
                                        key = {thisKey}
                                        unique = {thisKey}
                                   />
                              )
                         }
                         return null;
                    })}
                    <SoftShadows size={40} samples={16} />
                    <Ground />
               </Canvas> 
          </div>
     )
}