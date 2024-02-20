import { create } from 'zustand'
import {persist} from 'zustand/middleware'

interface UIStates {
     menu: boolean
     page: string
     colorScheme: boolean
     dashState: boolean
     outfitWindow: boolean
     switchMenu: () => void
     setPage: (by: string) => void
     setScheme: () => void
     setDash: () => void
     setOutfitWindow: () => void
}
interface OutfitStates {
     outfit: string
     initWind: () => void
}

// Store for the web app's UI states
export const uiStore = create<UIStates>()(
     persist(
          (set) => ({
               menu: false,
               page: 'dash',  // stores the selected window
               colorScheme: true,
               dashState: false,
               outfitWindow: false,
               switchMenu: () => {
                    set((state) => ({menu: !state.menu }))
               },
               setPage: (newPage) => {
                    set(() => ({ page: newPage }))
                    // console.log('store is working. elem is now: '+ newPage)
               }, // activates the selected window
               setScheme: () => {
                    set((state) => ({colorScheme: !state.colorScheme }))
               },
               setDash: () => {
                    set((state) => ({dashState: !state.dashState }))
               },
               setOutfitWindow: () => {
                    set((state) => ({outfitWindow: !state.outfitWindow }))
               },
          }),{ name: 'uistate' }
     )
);

// 
export const outfitStore = create<OutfitStates>()((set) => ({
     outfit: '',
     initWind: () => {
          set(() => ({ outfit: '' }))
          console.log('reset all')
     }, // resets all wind attributes
}));

