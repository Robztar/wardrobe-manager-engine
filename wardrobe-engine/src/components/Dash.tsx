import { uiStore } from "../hooks/robeStore"

// export const Dash = ({ aProp }: { aProp: React.FC }) =>{
export const Dash = ({ aProp }: { aProp: number }) =>{
     const {dashState, outfitList, outfitterState, setDash, setOutfitList, setOutfitter} = uiStore();
     const placeholder = aProp;

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