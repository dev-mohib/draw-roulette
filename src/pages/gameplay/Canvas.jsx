import React, { useEffect, useState } from 'react'
import { fabric } from 'fabric';
import { gameActions, useAppDispatch, useAppSelector } from '@state/store';
const ctx = new fabric.Canvas('myCanvas');

const Canvas = () => {
    const [canvas, setCanvas] = useState(ctx)
    const [isLoaded, setLoaded] = useState(false)
    const { orientation } = useAppSelector(s => s.uiSlice)
    const dispatch = useAppDispatch() 
    const { canvasList, timeOptions, activeCanvas, timeRemaining, gameStatus, isCanvasLoading } = useAppSelector(s => s.gameSlice)

    useEffect(() => {
        const _canvas = new fabric.Canvas('myCanvas', {
            width : orientation == 'landscape-primary' ? window.innerWidth/2 : window.innerWidth,
            height : orientation == 'landscape-primary' ? window.innerHeight : window.innerHeight/2,
            isDrawingMode :gameStatus === 'playing' ?  true : false,
            renderOnAddRemove : true,
        })
        let _pencilBrush =  new fabric.PencilBrush(_canvas)
        _pencilBrush.initialize(_canvas)
        _canvas.freeDrawingBrush = _pencilBrush
        fabric.Object.prototype.selectable = false
        setCanvas(_canvas)
        setLoaded(true)
    },[])

    useEffect(() =>{
      canvas.setDimensions({ 
        width : orientation == 'landscape-primary' ? window.innerWidth/2 : window.innerWidth,
        height : orientation == 'landscape-primary' ? window.innerHeight : window.innerHeight/2
    });
    if(gameStatus === 'playing')
      canvas.isDrawingMode = true
    else 
      canvas.isDrawingMode = false
    },[orientation, gameStatus])

    useEffect(() => {
      if(isLoaded){
        try {
          canvas.__eventListeners["object:added"] = [];
        } catch (error) {
          console.log(error)
        }
        canvas.on('object:added', (e) => {
          
          if(!isCanvasLoading){
            dispatch(gameActions.setCanvasJson(canvas.toJSON()))
          }
        })
      }
    },[isLoaded, isCanvasLoading, activeCanvas])

    
useEffect(() => {
  if(isLoaded){
    const json = canvasList[activeCanvas].canvasJson
    canvas.loadFromJSON(json, () => {
    })
  }
},[activeCanvas, isLoaded])
  return (
    <div>
        <canvas id='myCanvas'></canvas>
    </div>
  )
}

export default Canvas