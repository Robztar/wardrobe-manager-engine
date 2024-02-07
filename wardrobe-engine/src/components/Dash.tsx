import { uiStore, outfitStore } from "../hooks/robeStore"

// export const Dash = ({ aProp }: { aProp: React.FC }) =>{
export const Dash = ({ aProp }: { aProp: number }) =>{
     // const {menu, page, colorScheme, switchMenu, setPage, setScheme}
     // = uiStore();
     const placeholder = aProp;

     return(
          <div className="dash-cont">
               <div className="glass-display"></div>
               <div className="dash-body">
                    <div className="dash-card-cont">
                         <div className="dash-card">Outfit 1</div>
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
     )
}