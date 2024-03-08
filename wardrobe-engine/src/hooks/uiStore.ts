import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIStates {
     menu: boolean
     page: string
     colorScheme: boolean
     dashState: boolean
     outfitList: boolean
     outfitterState: boolean
     editWindow: boolean
     switchMenu: () => void
     setPage: (by: string) => void
     setScheme: () => void
     setDash: () => void
     setOutfitList: () => void
     setOutfitter: () => void
     setEditWindow: (by: boolean) => void
}

// Store for the web app's UI states
export const uiStore = create<UIStates>()(
     persist(
          (set) => ({
               menu: false,
               page: 'dash',  // stores the selected window
               colorScheme: true,
               dashState: false,
               outfitList: false,
               outfitterState: false,
               editWindow: false,
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
               setOutfitList: () => {
                    set((state) => ({outfitList: !state.outfitList }))
               },
               setOutfitter: () => {
                    set((state) => ({outfitterState: !state.outfitterState }))
               },
               setEditWindow: (window) => {
                    set(() => ({editWindow: window }))
               },
          }),{ name: 'uistate' }
     )
);