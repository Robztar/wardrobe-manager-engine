import { useState } from 'react';
import { uiStore } from "../hooks/uiStore"
import { outfitStore } from "../hooks/outfitStore"

// export const Dash = ({ aProp }: { aProp: React.FC }) =>{
export const Dash = () =>{
     const {dashState, outfitList, outfitterState,
          setDash, setOutfitList, setOutfitter, setEditWindow} 
          = uiStore();
     const {outfits, addOutfit, setActiveOutfit} = outfitStore();
     const [createProj, setProjWiz] = useState(false)
     let sortedFitObjs: { key: string, date: Date }[] =[]

     outfits.map((fit:any) =>{
          const thisKey = fit.key
          const lastModified = new Date(fit.lastModified)
          sortedFitObjs.push({'key':thisKey, 'date':lastModified})
     })

     sortedFitObjs.sort((a, b) => b.date.valueOf() - a.date.valueOf());
     // console.log('First object date: '+sortedFitObjs[0].date)
     
     function latestProj() {
          if(sortedFitObjs){
               let lastFit = outfits.find((o:any) => o.key === sortedFitObjs[0].key)
               const projName = 
                    lastFit.name.charAt(0).toUpperCase() 
                    + lastFit.name.slice(1)
               const lastModified = new Date(lastFit.lastModified)
               let dateString: string = ''
               if(lastModified){
                    let day, month : string = '0'
                    day = lastModified.getDate() < 10 ? 
                         `0${lastModified.getDate()}` :
                         lastModified.getDate()
                    month = lastModified.getMonth() < 9 ? 
                         `0${lastModified.getMonth()+1}` :
                         `${lastModified.getMonth()+1}` 
                    dateString = day+"/"+month+"/"+lastModified.getFullYear()
               }
               return(
                    <div className="glass-display">
                         <h2 className='latest-name'>{projName}</h2>
                         <small className='latest-date'>Last Modified: {dateString}</small>
                         <div className="latest-btns-cont">
                              <button className="open-profile"
                                   onClick={()=>{
                                        setActiveOutfit(lastFit.key)
                                        setOutfitter()
                                        setEditWindow(false)
                                   }}
                              >Show Details</button>
                              <button className="open-proj"
                                   onClick={()=>{
                                        setActiveOutfit(lastFit.key)
                                        setOutfitter()
                                        setEditWindow(true)
                                   }}
                              >Open Project</button>
                         </div>
                    </div>
               )
          }
          return(
               <div className="glass-display"> </div>
          )
     }
     
     return(
          <div className={`dash-cont 
               ${dashState? 'active':''} 
               ${outfitterState? 'inactive':''}`}
          >

               {latestProj()}
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
                              {sortedFitObjs.map((sorted:any) =>{
                                   const orderedKey = sorted.key
                                   let orderedInst = outfits.find((o:any) => o.key === orderedKey)
                                   const projName = 
                                        orderedInst.name.charAt(0).toUpperCase() 
                                        + orderedInst.name.slice(1)
                                   const lastModified = new Date(sorted.date)
                                   let dateString: string = ''
                                   if(lastModified){
                                        let day, month : string = '0'
                                        day = lastModified.getDate() < 10 ? 
                                             `0${lastModified.getDate()}` :
                                             lastModified.getDate()
                                        month = lastModified.getMonth() < 9 ? 
                                             `0${lastModified.getMonth()+1}` :
                                             `${lastModified.getMonth()+1}` 
                                        dateString = day+"/"+ month+"/" 
                                        + lastModified.getFullYear()
                                   }

                                   console.log('Name is '+projName)
                                   console.log(orderedKey + ' = ' + lastModified);
                                   return(
                                        <div 
                                             className="dash-card-cont"
                                             key={orderedKey}
                                        >
                                             <div className="dash-card">
                                                  <div className="dash-card-label">
                                                       <p>{projName}</p>
                                                       <small>Last Modified: {dateString? dateString : 'DD/MM/YYY'}</small>
                                                  </div>
                                                  <div className="dash-card-overlay">
                                                       <button className="open-proj" 
                                                            onClick={()=>{
                                                                 setActiveOutfit(orderedKey)
                                                                 setOutfitter()
                                                                 setEditWindow(true)
                                                            }}
                                                       >Open Project</button>
                                                       <button className="open-profile" 
                                                            onClick={()=>{
                                                                 setActiveOutfit(orderedKey)
                                                                 setOutfitter()
                                                                 setEditWindow(false)
                                                            }}
                                                       >Show Details</button>
                                                  </div>
                                             </div>
                                        </div>
                                   )
                              })}
                         </div>
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
                         <button className='cancel-create'
                              onClick={(e) =>{
                                   e.stopPropagation();
                                   setProjWiz(!createProj);
                              }}
                         >Cancel</button>
                         <button className='confirm-create'
                              onClick={(e) =>{
                                   e.stopPropagation();
                                   let name : string
                                   name = (document.getElementById('create-outfit-name') as HTMLInputElement).value
                                   if(name.length === 0){
                                        name = 'untitled '+(outfits.length+1);
                                   }
                                   console.log("Proj Name: "+name);
                                   addOutfit(name)
                                   setProjWiz(!createProj)
                                   // if(sortedFitObjs[0]){
                                   //      setActiveOutfit(sortedFitObjs[0].key)
                                   //      setOutfitter()
                                   //      setEditWindow(false)
                                   // }
                              }}
                         >Create Project</button>
                    </div>
               </div>
          </div>
     )
}