import React, { useEffect, useState } from 'react'
import { GrUndo, GrRedo } from 'react-icons/gr'
import { fabric } from 'fabric';
import { gameActions, useAppDispatch, useAppSelector } from '@state/store';
const ctx = new fabric.Canvas('myCanvas');

const MyCanvas = () => {
    const [canvas, setCanvas] = useState(ctx)
    const [isLoaded, setLoaded] = useState(false)
    const { orientation } = useAppSelector(s => s.uiSlice)
    const dispatch = useAppDispatch() 
    const { canvasList, timeOptions, activeCanvas, gameStatus, isCanvasLoading } = useAppSelector(s => s.gameSlice)

    const loadCanvas = () => {
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
    }
    useEffect(() =>{
      if(isLoaded){
        canvas.setDimensions({ 
          width : orientation == 'landscape-primary' ? window.innerWidth/2 : window.innerWidth,
          height : orientation == 'landscape-primary' ? window.innerHeight : window.innerHeight/2
      });
      if(gameStatus === 'playing')
        canvas.isDrawingMode = true
      else 
        canvas.isDrawingMode = false
      }else {
        loadCanvas()
      }
    },[orientation, gameStatus, isLoaded])

    useEffect(() => {
      if(isLoaded){
        try {
          canvas.__eventListeners["object:added"] = [];
        } catch (error) {
          // console.log(error)
          console.log("error -> object:added")
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
      // console.log("canvas json loaded")
    })
  }
},[activeCanvas, isLoaded])

useEffect(() => {console.log("test canvas")},[])

  return (<canvas id='myCanvas'></canvas>)
}

const Canvas = () => {
  const Undo = () => <GrUndo size={40} className='m-1 active:text-blue-400' />
  const Redo  = () => <GrRedo size={40} className='m-1 active:text-blue-400' /> 

  return { Undo, Redo }
}

export { MyCanvas }
export default Canvas