// import React from "react";
// import * as THREE from 'three';
import { Suspense } from "react";
import { Group, SkinnedMesh } from "three";
import { useGLTF } from '@react-three/drei'

import { outfitStore } from "../hooks/outfitStore"

// Blender/CharMorph 
     // - https://www.youtube.com/watch?v=VDkcBaihavQ
     // - https://github.com/Upliner/CharMorph?tab=readme-ov-file

export const Model = ({ unique }: { unique: string }) =>{
     const {outfits} = outfitStore()
     let modelInstance = outfits.find((o:any) => o.key === unique)
     
     // let color = modelInstance.color
     // let texture = modelInstance.texture
     // texture.repeat.set(dimensions[1],dimensions[2]);

     const { nodes, materials } = useGLTF("/src/3d-models/new-male-3d-model.glb")
     const bodyMesh1 = (nodes.mb_male_1 as SkinnedMesh)
     const bodyMesh2 = (nodes.mb_male_2 as SkinnedMesh)
     const bodyMesh3 = (nodes.mb_male_3 as SkinnedMesh)
     const bodyMesh4 = (nodes.mb_male_4 as SkinnedMesh)
     const bodyMesh5 = (nodes.mb_male_5 as SkinnedMesh)
     const bodyMesh6 = (nodes.mb_male_6 as SkinnedMesh)
     const bodyMesh7 = (nodes.mb_male_7 as SkinnedMesh)
     const bodyMesh8 = (nodes.mb_male_8 as SkinnedMesh)
     const bodyMesh9 = (nodes.mb_male_9 as SkinnedMesh)
     // console.log("Male Model File:")
     // console.log(nodes)
     // console.log("Male Model Material:")
     // console.log(materials)

     
     return(
          <Suspense fallback={null}>
               <group 
                    dispose={null}
                    position={[0, -2, 0]} 
                    // rotation={[Math.PI, 0, 0]} 
                    scale={2}
               >
                    <primitive object={nodes.root} />
                    <primitive object={nodes['MCH-torsoparent']} />
                    <primitive object={nodes['MCH-hand_ikparentL']} />
                    <primitive object={nodes['MCH-upper_arm_ik_targetparentL']} />
                    <primitive object={nodes['MCH-f_index01_ikparentL']} />
                    <primitive object={nodes['MCH-thumb01_ikparentL']} />
                    <primitive object={nodes['MCH-f_middle01_ikparentL']} />
                    <primitive object={nodes['MCH-f_ring01_ikparentL']} />
                    <primitive object={nodes['MCH-f_pinky01_ikparentL']} />
                    <primitive object={nodes['MCH-hand_ikparentR']} />
                    <primitive object={nodes['MCH-upper_arm_ik_targetparentR']} />
                    <primitive object={nodes['MCH-f_index01_ikparentR']} />
                    <primitive object={nodes['MCH-thumb01_ikparentR']} />
                    <primitive object={nodes['MCH-f_middle01_ikparentR']} />
                    <primitive object={nodes['MCH-f_ring01_ikparentR']} />
                    <primitive object={nodes['MCH-f_pinky01_ikparentR']} />
                    <primitive object={nodes['MCH-foot_ikparentL']} />
                    <primitive object={nodes['MCH-thigh_ik_targetparentL']} />
                    <primitive object={nodes['MCH-foot_ikparentR']} />
                    <primitive object={nodes['MCH-thigh_ik_targetparentR']} />
                    {/* 
                         Skin Tones:
                         https://louisem.com/466136/skin-tone-hex-codes
                         #E8BEAC, #BA988A, #8B7267
                     */}
                    <skinnedMesh 
                         geometry={bodyMesh1.geometry} 
                         material={materials.charmorph_skin_v2} 
                         skeleton={bodyMesh1.skeleton} 
                         material-color={'#BA988A'}
                    />
                    <skinnedMesh 
                         geometry={bodyMesh2.geometry} 
                         material={materials.MBlab_eyelash} 
                         skeleton={bodyMesh2.skeleton} 
                    />
                    <skinnedMesh 
                         geometry={bodyMesh3.geometry} 
                         material={materials.MBlab_pupil} 
                         skeleton={bodyMesh3.skeleton} 
                    />
                    <skinnedMesh 
                         geometry={bodyMesh4.geometry} 
                         material={materials.MBlab_human_eyes} 
                         skeleton={bodyMesh4.skeleton} 
                    />
                    <skinnedMesh 
                         geometry={bodyMesh5.geometry} 
                         material={materials.charmorph_cornea} 
                         skeleton={bodyMesh5.skeleton} 
                    />
                    <skinnedMesh 
                         geometry={bodyMesh6.geometry} 
                         material={materials.charmorph_iris} 
                         skeleton={bodyMesh6.skeleton} 
                    />
                    <skinnedMesh 
                         geometry={bodyMesh7.geometry} 
                         material={materials.MBLab_tongue} 
                         skeleton={bodyMesh7.skeleton} 
                    />
                    <skinnedMesh 
                         geometry={bodyMesh8.geometry} 
                         material={materials.MBlab_human_teeth} 
                         skeleton={bodyMesh8.skeleton} 
                    />
                    <skinnedMesh 
                         geometry={bodyMesh9.geometry} 
                         material={materials.charmorph_nails_v2} 
                         skeleton={bodyMesh9.skeleton} 
                    />
               </group>
          </Suspense>
     )
}

useGLTF.preload('/src/3d-models/new-male-3d-model.glb')