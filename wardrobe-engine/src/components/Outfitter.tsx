import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, SoftShadows } from "@react-three/drei"
import { Model } from './Model';
import { TestModel } from './TestModel';
import { outfitStore } from "../hooks/outfitStore"
import { uiStore } from "../hooks/uiStore"
import { getThumbnail } from '../functions/getThumbnail';


const DeleteWindow = ({...props}:any) =>{
     const delProj = props.delProj
     const fitKey = props.fitKey
     const delProjWiz = props.delProjWiz
     const setActiveOutfit = props.setActiveOutfit
     const delOutfit = props.delOutfit
     const setOutfitter = props.setOutfitter
     const setEditWindow = props.setEditWindow
     // console.log(delProj)

     return(
          <div className={`del-outfit-window ${delProj ? 'active' : ''}`}>
               <h2>Delete Outfit</h2>
               <p>Are you sure you want to delete this project?</p>
               
               <div className='del-proj-btns'>
                    <button className='cancel-del'
                         onClick={(e) =>{
                              e.stopPropagation();
                              props.delProjWiz(!delProj);
                         }}
                    >Cancel</button>
                    <button className='confirm-del'
                         onClick={(e) =>{
                              e.stopPropagation();
                              delProjWiz(!delProj);
                              setActiveOutfit('')
                              delOutfit(fitKey)
                              setOutfitter()
                              setEditWindow(false)
                         }}
                    >Delete Project</button>
               </div>
          </div>
     )
}

function Ground(){
     return(
          <mesh position={[0,-2,0]} rotation={[-Math.PI/2, 0, 0]}>
               <planeGeometry attach={'geometry'} args={[100,100]}/>
               <meshLambertMaterial attach={'material'} color={'white'} />
          </mesh>
     )
}

export const Outfitter = () =>{
     const {outfitterState, editWindow, setOutfitter, setEditWindow} = uiStore()
     const {outfits, activeOutfit, setActiveOutfit, setModifyDate, setThumbnail, delOutfit} = outfitStore()
     const [delProj, delProjWiz] = useState(false)

     
     let fitInstance = outfits.find((o:any) => o.key === activeOutfit)
     let fitKey: string = ''
     let fitName: string = 'No Name'
     let dateCreated: Date = new Date("2000-01-01");
     let lastModified: Date = new Date("2000-01-01");
     let startDateString, lastDateString: string = ''
     let fitThumbnail: string = ''

     if(fitInstance){
          let initDay, initMonth, lastDay, lastMonth  : string = '0'
          fitKey = fitInstance.key
          fitName = fitInstance.name.charAt(0).toUpperCase() + fitInstance.name.slice(1)
          dateCreated = new Date(fitInstance.dateCreated)
          lastModified = new Date(fitInstance.lastModified)
          
          initDay = dateCreated.getDate() < 10 ? 
               `0${dateCreated.getDate()}` :
               dateCreated.getDate()
          initMonth = dateCreated.getMonth() < 9 ? 
               `0${dateCreated.getMonth()+1}` :
               `${dateCreated.getMonth()+1}` 

          startDateString = initDay+"/"+ initMonth+"/" 
          + lastModified.getFullYear()

          lastDay = lastModified.getDate() < 10 ? 
               `0${lastModified.getDate()}` :
               lastModified.getDate()
          lastMonth = lastModified.getMonth() < 9 ? 
               `0${lastModified.getMonth()+1}` :
               `${lastModified.getMonth()+1}` 

          lastDateString = lastDay+"/"+ lastMonth+"/" 
          + lastModified.getFullYear()

          fitThumbnail = fitInstance.thumbnail
          // console.log('Outfit Key: '+ fitKey+'. Outfit Name: '+ fitName)
          // console.log('Outfit Created: '+ dateCreated +'. Outfit Modified: '+ lastModified)
          // console.log('Outfit Date String: '+ dateString)
          // console.log('The image in state '+ fitInstance.thumbnail)
     }

     return(
          <div className={`fitter-cont ${outfitterState? 'active':''}`}>
               {/* Outfit Detail Window */}
               <div className={`outfit-profile ${editWindow? '':'active'}`}>
                    <div className='profile-sidebar-cont'>
                         <div className="profile-sidebar">
                              <div className="profile-labels">
                                   <h2 className="outfit-name">
                                        {fitName}
                                        <i className='far fa-edit fit-proj-edit' 
                                             onClick={()=>{}}></i>
                                   </h2>
                                   <small className="outfit-date">Last Modified: {lastDateString}</small>
                              </div>
                              <div className="profile-btns">
                                   <button 
                                        className="outfit-open"
                                        onClick={()=>{
                                             setEditWindow(true)
                                        }}
                                   >Open Project</button>
                                   <div className="profile-ctrls">
                                        <i className="fas fa-gear outfit-set"
                                             onClick={()=>{}}
                                        ></i>
                                        <i className="fas fa-trash del-outfit"
                                             onClick={()=>{
                                                  delProjWiz(!delProj)
                                             }}
                                        ></i>
                                   </div>
                                   
                              </div>
                              <div className="outfit-details">
                                   <small className="outfit-date">Date Created: {startDateString}</small>
                              </div>
                         </div>
                    </div>
                    <div className='profile-body-cont'>
                         <div className='profile-body'>
                              <img 
                                   className="outfit-thumbnail" 
                                   src={fitThumbnail}
                                   alt='project image'
                              />
                         </div>
                    </div>
               </div>

               {/* Edit Window */}
               <div className={`fitter-nav ${editWindow? 'active':''}`}>
                    <i className="fas fa-trash del-outfit"
                         onClick={()=>{
                              delProjWiz(!delProj)
                         }}
                    ></i>
                    <h3 
                         className='nav-outfit-name'
                         onClick={()=>{
                              getThumbnail(fitKey, setThumbnail)
                         }}
                    >
                         {fitName}
                    </h3>
                    <i className="far fa-times-circle close-edit-window"
                         onClick={()=>{
                              setModifyDate(new Date(), fitKey)
                              getThumbnail(fitKey, setThumbnail)
                              setEditWindow(false)
                         }}
                    ></i>
               </div>
               <Canvas id='outfit-canvas' 
                    className={`${editWindow? 'active':''}`}
                    gl={{ preserveDrawingBuffer: true }}
               >
                    <color attach="background" args={["#f0f0f0"]} />
                    <fog attach="fog" args={["#f0f0f0", 0, 20]} />
                    <ambientLight intensity={5} />
                    <directionalLight intensity={5} position={[-5, 3, 5]} castShadow shadow-mapSize={2048} shadow-bias={-0.0001} />
                    <directionalLight intensity={5} position={[10, 3, -5]} castShadow shadow-mapSize={2048} shadow-bias={-0.0001} />
                    <OrbitControls minPolarAngle={-Math.PI/2} maxPolarAngle={Math.PI/2} />
                    {outfits.map((fit: any) =>{
                         const thisKey = fit.key;
                              
                         if(fitKey === thisKey){
                              return(
                                   <Model 
                                        key = {thisKey}
                                        unique = {thisKey}
                                   />
                                   // <TestModel 
                                   //      key = {thisKey}
                                   //      unique = {thisKey}
                                   // />
                              )
                         }
                         return null;
                    })}
                    <SoftShadows size={40} samples={16} />
                    <Ground />
               </Canvas> 

               {/* Delete Project Pop-up */}
               <DeleteWindow
                    delProj={delProj}
                    fitKey = {fitKey}
                    delProjWiz = {delProjWiz}
                    setActiveOutfit = {setActiveOutfit}
                    delOutfit = {delOutfit}
                    setOutfitter = {setOutfitter}
                    setEditWindow = {setEditWindow}
               />
          </div>
     )
}