import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { nanoid } from 'nanoid';

interface OutfitStates {
     outfits: any
     initWind: () => void
     addOutfit: (by: string) => void
     saveOutfits: () => void
     delOutfit: (by: string) => void
}

// const getOutfitData = (key:string) => JSON.parse(window.localStorage?.getItem(key) || '{}');
// const setOutfitData = (key:string, value:string[]) =>
//      window.localStorage.setItem(key, JSON.stringify(value));
const getOutfitData = (key:string) => localStorage.getItem(key);
const setOutfitData = (key:string, value:any) => localStorage.setItem(key, JSON.stringify(value));
// const getLocalStorage = (key: string) => JSON.parse(window.localStorage.getItem(key));
// const setLocalStorage = (key: string, value: any) =>
//      window.localStorage.setItem(key, JSON.stringify(value));

export const outfitStore = create<OutfitStates>()(
     // persist(
          (set) => ({
               outfits: getOutfitData('outfits') || [], 

               initWind: () => {
                    set(() => ({ outfits: [''] }))
                    console.log('reset all')
               }, // resets all wind attributes
               addOutfit: (name: string) => {
                    set((state) => ({
                         outfits: [...state.outfits,
                              { 
                                   key: nanoid(),      // unique project identifier
                                   name: name,         // project name
                              },
                         ]
                    }))
               },
               saveOutfits: () => set((state) => {
                         if(typeof(Storage) !== undefined){
                              setOutfitData('outfits', state.outfits)
                         }
               }),
               delOutfit: (id: string) => {
                    set((state) => ({
                         // outfits: state.outfits.filter((outfit:any) => outfit.key !== id)
                         outfits: state.outfits.filter((outfit:any) => outfit.name !== id)
                    }));
               },
          }
          // ),{ 
          //      name: 'outfits', 
          //      storage: createJSONStorage(() => localStorage),
          // }
     )
     
);

// export const useStore = create((set) => ({
     // ortho: true, 
     // iniPos: [0, 0, 0],
     // projects: getLocalStorage('projects') || [],

     // addProj: (name: string, scale: number, conv: string) => {
     //      set((state) => ({
     //           projects: [...state.projects,
     //                { 
     //                     key: nanoid(),      // unique project identifier
     //                     name: name,         // project name
     //                     scale: scale,       // measurement scale
     //                     conversion: conv,   // measurement standard
     //                },
     //           ]
     //      }));
     // },
     // saveProjects: () => {
     //      set((state) => {
     //           setLocalStorage('projects', state.projects);
     //      });
     // },

     // delProject: (id: string) => {
     //      set((state) => ({
     //           projects: state.projects.filter((project) => project.key !== id)
     //      }));
     // },
// }));
