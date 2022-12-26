import React from 'react'
import { editorActions, useAppDispatch, useAppSelector } from '@state/store'
import { mockData } from './mock'
import { GrNext, GrPrevious, GrView } from 'react-icons/gr'
import { HiPlay, HiPause } from 'react-icons/hi'
import { TbReportAnalytics } from 'react-icons/tb'
import Canvas from './Canvas'
const Index = () => {
  const { canvasList, timeOptions, activeCanvas, timeRemaining, gameStatus} = useAppSelector(s => s.editorSlice)
  const [time, setTime] = React.useState("00:00") 
  const dispatch = useAppDispatch()
  var interval : any
React.useEffect(() => {
  if(gameStatus == 'playing'){
    interval = setInterval(
      () => {
        if(timeRemaining > 0)
          {
            dispatch(editorActions.decreaseTime())
          }
        else
          {
            dispatch(editorActions.setGameStatus('finished'))
            clearInterval(interval)
          }
    },
    (1000));
  }else {
    if(interval)
      clearInterval(interval)
  }

  return () => clearInterval(interval)
},[timeRemaining, gameStatus])  

React.useEffect(() => {
  const time = new Date(timeRemaining * 1000).toISOString().substring(14, 19)
  setTime(time)
},[timeRemaining])
  return (
    <>
    <div className='h-screen w-screen orientation'>
        {/* <div className='flex flex-nowrap overflow-x-auto w-1/2' >
          {
            mockData.map(canvas => <div key={canvas.image.thumbnailLink} className='m-1 border'>
              <img src={canvas.image.thumbnailLink} referrerPolicy='no-referrer'  className='bg-cover h-52 w-52'/>
            </div>)
          }

        </div> */}
        <div className='flex-r-between bg-gray-200   relative'>
          <GrPrevious onClick={() => dispatch(editorActions.setActiveCanvas(activeCanvas > 0  ? activeCanvas - 1 : 0))} className='p-3 bg-gray-400 active:bg-gray-300' size={40}/>
          <img src={mockData[activeCanvas].image.thumbnailLink} referrerPolicy='no-referrer' className='landscape:w-full portrait:h-full object-cover'/>
          <GrNext onClick={() => dispatch(editorActions.setActiveCanvas(activeCanvas < mockData.length -1 ? activeCanvas + 1 : activeCanvas))}  className='p-3 bg-gray-400 active:bg-gray-300' size={40}/>
        </div>
        <div className='h-48 border-2 border-black'>
          <Canvas />
        </div>
    </div>
    <div className='flex-r-between absolute top-3 -left-2 py-3 bg-black opacity-40 text-white rounded-lg z-50'>
      <div className='mr-5 ml-3'>
        <h2> Drawing {activeCanvas + 1}</h2>
      </div>
      <div className='flex-r-between pr-6'>
        <b className='mx-4'>{time}</b>
        {
          (gameStatus == 'paused' || gameStatus == 'idle') ? <HiPlay onClick={() => dispatch(editorActions.setGameStatus('playing'))}  size={20} color="green"/> : 
           gameStatus == 'playing' ? <HiPause onClick={() =>dispatch(editorActions.setGameStatus('paused'))}  size={20} color="orange"/> : 
           gameStatus == 'finished' ? <TbReportAnalytics size={20} className='text-blue-400' /> : null
        }
      </div>
    </div>
  </>
  )
}

export default Index