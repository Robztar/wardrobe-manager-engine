import html2canvas from 'html2canvas';

export const getThumbnail = async (key: string, setState: any) =>{
     const workspace = document.getElementById('outfit-canvas')
     if(workspace){
          const t = await html2canvas(workspace).then((canvas)=>{
               let thumb = canvas.toDataURL()
               return thumb
          })
          setState(t, key)
     }
}