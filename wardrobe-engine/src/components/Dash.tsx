import { useState } from 'react';
import { uiStore } from "../hooks/uiStore"
import { outfitStore } from "../hooks/outfitStore"

// export const Dash = ({ aProp }: { aProp: React.FC }) =>{
export const Dash = () =>{
     const {dashState, outfitList, outfitterState, setDash, setOutfitList, setOutfitter} = uiStore();
     const {outfits, addOutfit, setActiveOutfit} = outfitStore();
     const [createProj, setProjWiz] = useState(false)

     return(
          <div className={`dash-cont 
               ${dashState? 'active':''} 
               ${outfitterState? 'inactive':''}`}
          >
               <div className="glass-display">
                    <button className="open-profile"
                         onClick={()=>{
                              setOutfitter()
                         }}
                    >Show Details</button>
                    <button className="open-proj"
                         onClick={()=>{
                              setOutfitter()
                         }}
                    >Open Project</button>
               </div>
               <div className="dash-body">
                    <div className="dash-inv-border">
                         <i 
                              className="fas fa-arrow-down"
                              onClick={()=>{
                                   setDash()
                              }}
                         ></i>
                    </div>
                    <div className={`dash-outfits-window ${outfitList? 'active':''}`}>
                         <div className="dash-outfit-header">
                              <h2>Your projects</h2>
                              <i className="fas fa-plus"
                                   onClick={()=>{
                                        setOutfitList()
                                        if(!dashState)
                                             setDash()
                                   }}
                              ></i>
                              <i className="fas fa-minus"
                                   onClick={()=>{
                                        setOutfitList()
                                        if(!dashState)
                                             setDash()
                                   }}
                              ></i>
                         </div>
                         <div className="dash-outfits-cont">
                              <div className="dash-card-cont">
                                   <div 
                                        className="dash-card create-card"
                                        onClick={()=>{
                                             setProjWiz(!createProj)
                                        }}
                                   >
                                        <div className="dash-card-label">
                                             <p>Create Project</p>
                                        </div>
                                   </div>
                              </div>
                              {outfits.map((fit:any) =>{
                                   const projName = 
                                        fit.name.charAt(0).toUpperCase() 
                                        + fit.name.slice(1);
                                   const thisKey = fit.key;
                                   console.log('Name is '+fit.name)
                                   return(
                                        <div 
                                             className="dash-card-cont"
                                             key={thisKey}
                                        >
                                             <div className="dash-card">
                                                  <div className="dash-card-label">
                                                       <p>{projName}</p>
                                                       <small>Last Modified: DD/MM/YYYY</small>
                                                  </div>
                                                  <div className="dash-card-overlay">
                                                       <button className="open-proj" 
                                                            onClick={()=>{
                                                                 setActiveOutfit(thisKey)
                                                                 setOutfitter()
                                                            }}
                                                       >Open Project</button>
                                                       <button className="open-profile" 
                                                            onClick={()=>{
                                                                 setActiveOutfit(thisKey)
                                                                 setOutfitter()
                                                            }}
                                                       >Show Details</button>
                                                  </div>
                                             </div>
                                        </div>
                                   )
                              })}
                         </div>
                    </div>

                    {/* Create Outfit */}
                    <div className={`dash-create-outfit ${createProj ? 'active' : ''}`}>
                         <h2>Create Outfit</h2>
                         <div className="create-outfit-name-cont">
                              <label>Outfit Name:</label>
                              <input 
                                   id='create-outfit-name'
                                   type='text'
                                   defaultValue={'untitled '+(outfits.length+1)}
                              />
                         </div>
                         
                         <div className='create-proj-btns'>
                              <button className='create-proj-cancel'
                                   onClick={(e) =>{
                                        e.stopPropagation();
                                        setProjWiz(!createProj);
                                   }}
                              >Cancel</button>
                              <button className='create-proj-confirm'
                                   onClick={(e) =>{
                                        e.stopPropagation();
                                        let name : string
                                        name = (document.getElementById('create-outfit-name') as HTMLInputElement).value
                                        if(name.length === 0){
                                             name = 'untitled '+(outfits.length+1);
                                        }
                                        console.log("Proj Name: "+name);
                                        addOutfit(name)
                                        // setOutfitter()
                                        setProjWiz(!createProj)
                                   }}
                              >Create Project</button>
                         </div>
                    </div>
                    
               </div>
          </div>
     )
}