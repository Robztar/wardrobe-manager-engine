import { uiStore } from "../hooks/uiStore"
import { outfitStore } from "../hooks/outfitStore"

// export const Dash = ({ aProp }: { aProp: React.FC }) =>{
export const Dash = () =>{
     const {dashState, outfitList, outfitterState, setDash, setOutfitList, setOutfitter} = uiStore();
     const {outfits, addOutfit, setActiveOutfit} = outfitStore();

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
                                             addOutfit('new-outfit')
                                             setOutfitter()
                                        }}
                                   >
                                        <div className="dash-card-label">
                                             <p>Create Project</p>
                                        </div>
                                   </div>
                              </div>
                              {outfits.map((key:any) =>{
                                   const projName = 
                                        key.name.charAt(0).toUpperCase() 
                                        + key.name.slice(1);
                                   const thisKey = key;
                                   console.log('Name is '+key.name)
                                   return(
                                        <div 
                                             className="dash-card-cont"
                                             key={key}
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
               </div>
          </div>
     )
}