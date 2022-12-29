import React, { useEffect, useState } from 'react'
import { fabric } from 'fabric';
import { useAppSelector } from '@state/store';
const ctx = new fabric.Canvas('myCanvas');

const Canvas = ({json, id}) => {
    const [canvas, setCanvas] = useState(ctx)
    const [isLoaded, setLoaded] = useState(false)
    const { orientation } = useAppSelector(s => s.uiSlice)

    useEffect(() => {
        const _canvas = new fabric.Canvas(id, {
            width : orientation == 'landscape-primary' ? window.innerWidth/2 : window.innerWidth,
            height : orientation == 'landscape-primary' ? window.innerHeight : window.innerHeight/2,
            isDrawingMode : false,
            renderOnAddRemove : true,
        })

        fabric.Object.prototype.selectable = false
        setCanvas(_canvas)
        setLoaded(true)
    },[])

    useEffect(() =>{
      canvas.setDimensions({ 
        width : orientation == 'landscape-primary' ? window.innerWidth/2 : window.innerWidth,
        height : orientation == 'landscape-primary' ? window.innerHeight : window.innerHeight/2
    });
    },[orientation])

    
useEffect(() => {
  if(isLoaded){
    canvas.loadFromJSON(json, () => {
    })
  }
},[isLoaded])
  return (
    <div>
        <canvas id={id}></canvas>
    </div>
  )
}

export default Canvas