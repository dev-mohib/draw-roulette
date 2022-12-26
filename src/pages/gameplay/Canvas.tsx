import React, { useEffect, useState } from 'react'
import { fabric } from 'fabric';
import { CanvasType } from 'types/state';
import { useAppSelector } from '@state/store';
const ctx = new fabric.Canvas('myCanvas');

const Canvas = () => {
    const [canvas, setCanvas] = useState(ctx)
    const [isLoaded, setLoaded] = useState(false)
    const { orientation } = useAppSelector(s => s.uiSlice)


    useEffect(() => {
        const _canvas = new fabric.Canvas('myCanvas', {
            width : orientation == 'landscape-primary' ? window.innerWidth/2 : window.innerWidth,
            height : orientation == 'landscape-primary' ? window.innerHeight : window.innerHeight/2,
            isDrawingMode : true,
        })
        let _pencilBrush =  new fabric.PencilBrush(_canvas)
        _pencilBrush.initialize(_canvas)
        _canvas.freeDrawingBrush = _pencilBrush
        setCanvas(_canvas)
        setLoaded(true)
    },[])

    useEffect(() =>{
      canvas.setDimensions({ 
        width : orientation == 'landscape-primary' ? window.innerWidth/2 : window.innerWidth,
        height : orientation == 'landscape-primary' ? window.innerHeight : window.innerHeight/2
    });
    },[orientation])
  return (
    <div>
        <canvas id='myCanvas'></canvas>
    </div>
  )
}

export default Canvas