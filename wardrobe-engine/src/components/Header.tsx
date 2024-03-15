import { getThumbnail } from '../functions/getThumbnail';
import { outfitStore } from "../hooks/outfitStore"
import { uiStore } from "../hooks/uiStore"

export const Header = () =>{
     const {outfitterState, editWindow, setOutfitter, setEditWindow} = uiStore()
     const {activeOutfit, setActiveOutfit, setModifyDate, setThumbnail} = outfitStore()

     
     return(
          <div className="header-cont">
               <div></div>
               <i 
                    className={`
                         fas fa-arrow-left back-to-dash 
                         ${outfitterState? 'active':''}
                    `}
                    onClick={()=>{
                         if(editWindow){
                              getThumbnail(activeOutfit, setThumbnail)
                              setModifyDate(new Date(), activeOutfit)
                              setEditWindow(false)
                         }
                         setOutfitter()
                         setActiveOutfit('')
                    }}
               ></i>
          </div>
     )
}