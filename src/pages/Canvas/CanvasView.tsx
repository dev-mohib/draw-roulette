import React, { useEffect, useState } from 'react'
import { fabric } from 'fabric';
import { CanvasType } from 'types/state';
const ctx = new fabric.Canvas('myCanvas');

const CanvasView = () => {
    const [canvas, setCanvas] = useState(ctx)
    const [isLoaded, setLoaded] = useState(false)


    useEffect(() => {
        const _canvas = new fabric.Canvas('myCanvas')
        setCanvas(_canvas)
        setLoaded(true)
    },[])
  return (
    <div>
        <canvas id='myCanvas'></canvas>
    </div>
  )
}

export default CanvasView