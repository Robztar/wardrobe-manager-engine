import { uiStore } from "../hooks/robeStore"

export const Nav = () =>{
     const {menu, switchMenu} = uiStore();

     return(
          <div className={`navbar-cont ${menu? 'active' : ''}`}>
               <div className='menu-toggle-cont'>
                    <div 
                         className='menu-toggle'
                         onClick={()=>{
                              switchMenu();
                         }}
                    >
                         <div className='tripbar'></div>
                    </div>
               </div>

               <div className='side-page-sel'>
                    <a className='side-page-btn'>
                         <div className='side-page-icon'><i className="fa-solid fa-house"></i></div>
                         <div className='side-page-label'>Dashboard</div>
                    </a>
                    <a className='side-page-btn'>
                         <div className='side-page-icon'><i className="fa-solid fa-info-circle"></i></div>
                         <div className='side-page-label'>About</div>
                    </a>
                    <a className='side-page-btn'>
                         <div className='side-page-icon'><i className="fa-solid fa-gear"></i></div>
                         <div className='side-page-label'>Settings</div>
                    </a>
               </div>
          </div>
     )
}