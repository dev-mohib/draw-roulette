import React, { useEffect, useState } from 'react'
import { fabric } from 'fabric';
const ctx = new fabric.Canvas('myCanvas');

const Index = () => {
    const [canvas, setCanvas] = useState(ctx)
    const [isLoaded, setLoaded] = useState(false)

    useEffect(() => {
        const _canvas = new fabric.Canvas('myCanvas')
        setCanvas(_canvas)
        setLoaded(true)
    },[])
  return (
    <div>
        <h1>Canvas</h1>
        <canvas id='myCanvas'></canvas>
    </div>
  )
}

export default Index