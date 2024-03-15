import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { nanoid } from 'nanoid';

interface OutfitStates {
     outfits: any
     activeOutfit: string
     addOutfit: (n: string) => void
     setActiveOutfit: (id: string) => void
     setModifyDate: (d: Date, id: string) => void
     setThumbnail: (t: string, id: string) => void
     delOutfit: (id: string) => void
}

const getOutfitData = (key:string) => localStorage.getItem(key);

export const outfitStore = create<OutfitStates>()(
     persist(
          (set) => ({
               outfits: getOutfitData('outfits') || [], 
               activeOutfit: '',

               addOutfit: (name: string) => {
                    set((state:any) => ({
                         outfits: [...state.outfits,
                              { 
                                   key: nanoid(),      // outfit ID
                                   name: name,         // outfit name
                                   dateCreated: new Date(),         // date created
                                   lastModified: new Date(),         // date last modified
                                   thumbnail: '',         // screenshot of the up to date project
                              },
                         ]
                    }))
               },
               setActiveOutfit: (active) => {
                    set(() => ({ activeOutfit : active }))
               },
               setModifyDate: (newDate, id) =>{
                    set((state) =>({
                         outfits: state.outfits.map((outfit:any) =>
                              outfit.key === id
                                   ? ({...outfit, lastModified: newDate})
                                   : outfit
                         ),
                    }))
               },
               setThumbnail: (newThumb, id) =>{
                    set((state) =>({
                         outfits: state.outfits.map((outfit:any) =>
                              outfit.key === id
                                   ? ({...outfit, thumbnail: newThumb})
                                   : outfit
                         ),
                    }))
               },
               delOutfit: (id: string) => {
                    set((state) => ({
                         outfits: state.outfits.filter((outfit:any) => outfit.key !== id)
                    }));
               },
          }
          ),{ 
               name: 'outfits', 
               storage: createJSONStorage(() => localStorage),
          }
     )
);