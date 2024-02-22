import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { nanoid } from 'nanoid';

interface OutfitStates {
     outfits: any
     activeOutfit: string
     addOutfit: (by: string) => void
     setActiveOutfit: (by: string) => void
     // saveOutfits: () => void
     delOutfit: (by: string) => void
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
                              },
                         ]
                    }))
               },
               setActiveOutfit: (active) => {
                    set(() => ({ activeOutfit : active }))
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