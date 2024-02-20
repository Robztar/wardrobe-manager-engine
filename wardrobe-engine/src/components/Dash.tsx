import { uiStore, outfitStore } from "../hooks/robeStore"

// export const Dash = ({ aProp }: { aProp: React.FC }) =>{
export const Dash = ({ aProp }: { aProp: number }) =>{
     const {dashState, outfitWindow, setDash, setOutfitWindow} = uiStore();
     const placeholder = aProp;

     return(
          <div className={`dash-cont ${dashState? 'active':''}`}>
               <div className="glass-display"></div>
               <div className="dash-body">
                    <div className="dash-inv-border">
                         <i 
                              className="fas fa-arrow-down"
                              onClick={()=>{
                                   setDash()
                              }}
                         ></i>
                    </div>
                    <div className={`dash-outfits-window ${outfitWindow? 'active':''}`}>
                         <div className="dash-outfit-header">
                              <h2>Your projects</h2>
                              <i className="fas fa-plus"
                                   onClick={()=>{
                                        setOutfitWindow()
                                        if(!dashState)
                                             setDash()
                                   }}
                              ></i>
                              <i className="fas fa-minus"
                                   onClick={()=>{
                                        setOutfitWindow()
                                        if(!dashState)
                                             setDash()
                                   }}
                              ></i>
                         </div>
                         <div className="dash-outfits-cont">
                              <div className="dash-card-cont card-preview">
                                   <div className="dash-card">
                                        <div className="dash-card-label">
                                             <p>Create Project</p>
                                        </div>
                                   </div>
                              </div>
                              <div className="dash-card-cont card-preview">
                                   <div className="dash-card">
                                        <div className="dash-card-label">
                                             <p>Outfit 1</p>
                                             <small>DD/MM/YYYY</small>
                                        </div>
                                        <div className="dash-card-overlay">
                                             <button className="open-proj">Open Project</button>
                                             <button className="open-profile">Show Details</button>
                                        </div>
                                   </div>
                              </div>
                              <div className="dash-card-cont card-preview">
                                   <div className="dash-card">
                                   <div className="dash-card-label">
                                             <p>Outfit 1</p>
                                             <small>DD/MM/YYYY</small>
                                        </div>
                                        <div className="dash-card-overlay">
                                             <button className="open-proj">Open Project</button>
                                             <button className="open-profile">Show Details</button>
                                        </div>
                                   </div>
                              </div>
                              <div className="dash-card-cont card-preview">
                                   <div className="dash-card"></div>
                              </div>
                              <div className="dash-card-cont">
                                   <div className="dash-card"></div>
                              </div>
                              <div className="dash-card-cont">
                                   <div className="dash-card"></div>
                              </div>
                              <div className="dash-card-cont">
                                   <div className="dash-card"></div>
                              </div>
                         </div>
                    </div>
                    
                    
               </div>
          </div>
     )
}