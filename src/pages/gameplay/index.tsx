import React from 'react'
import { gameActions, useAppDispatch, useAppSelector } from '@state/store'
import { mockData } from './mock'
import { GrNext, GrPrevious, GrView, GrUndo, GrRedo } from 'react-icons/gr'
import { HiPlay, HiPause } from 'react-icons/hi'
import { TbReportAnalytics } from 'react-icons/tb'
import Canvas from './Canvas'
import { useNavigate } from 'react-router-dom'
const Index = () => {
  const { canvasList, timeOptions, activeCanvas, timeRemaining, gameStatus} = useAppSelector(s => s.gameSlice)
  const [isReportView, setReportView] = React.useState(false)
  const [time, setTime] = React.useState("00:00") 
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  var interval : any
React.useEffect(() => {
  if(gameStatus == 'playing'){
    interval = setInterval(
      () => {
        if(timeRemaining > 0)
          {
            dispatch(gameActions.decreaseTime())
          }
        else
          {
            dispatch(gameActions.setGameStatus('finished'))
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

const viewReport = () => {

}

const ResultBody = () => {
  return (
  <div className='overflow-y-auto overflow-x-hidden  h-96 w-full' >
    {canvasList.map((item, index) => <div className='orientation m-4 h-64' key={index}>
      <div className='bg-green-400 m-1'>Image {item.image.name} </div>
      <div className='bg-gray-400 m-1'> Canvas {item.image.id} </div>
    </div>)
    }
  </div>
  )
}

const handleUndo = () => {}
const handleRedo = () =>{}
  return ( 
    <>
    <div className='h-screen w-screen orientation'>
        <div className='flex-r-between bg-gray-200 relative side'>
          <GrPrevious onClick={() => dispatch(gameActions.setActiveCanvas(activeCanvas > 0  ? activeCanvas - 1 : 0))} className='p-3 bg-gray-400 active:bg-gray-300' size={40}/>
          <img src={mockData[activeCanvas].image.thumbnailLink} referrerPolicy='no-referrer' className='landscape:w-full portrait:h-full object-cover'/>
          <div className='h-full flex-c-c relative'>
            <div className='bg-black opacity-40 p-1 flex-r-c text-white absolute top-0 right-0  '>
              <GrUndo size={40} className='m-1 active:text-blue-400' />
              <GrRedo size={40} className='m-1 active:text-blue-400' />
            </div>
            <GrNext onClick={() => dispatch(gameActions.setActiveCanvas(activeCanvas < mockData.length -1 ? activeCanvas + 1 : activeCanvas))}  className='p-3 bg-gray-400 active:bg-gray-300' size={40}/>
          </div> 
        </div>
        <div className='border-2 border-black side'>
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
          (gameStatus == 'paused' || gameStatus == 'idle') ? <HiPlay onClick={() => dispatch(gameActions.setGameStatus('playing'))}  size={20} color="green"/> : 
           gameStatus == 'playing' ? <HiPause onClick={() =>dispatch(gameActions.setGameStatus('paused'))}  size={20} color="orange"/> : 
           gameStatus == 'finished' ? <TbReportAnalytics size={20} className='text-blue-400' /> : null
        }
      </div>
      <div className='absolute top-20 left-0 h-7  bg-black px-10 py-3 flex-r-c'>
        <button onClick={() => navigate('/result')}  className='button'>Modal</button>
      </div>
    </div>
      {
        isReportView && <Modal body={<ResultBody />} header={"Result"} isShow={isReportView} setShow={setReportView} actions={<button className='btn btn-primary'>Generate PDF</button>} />
      }
  </>
  )
}


const Modal =({header, body, actions, isShow, setShow } : {header : String, body : JSX.Element, actions? : JSX.Element, isShow: boolean, setShow : any}) =>{
  return(<div  id="defaultModal"  className="fixed top-0 flex justify-center  left-0 right-0 z-50 p-4 w-screen overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
  <div className="relative w-full h-full max-w-2xl md:h-auto">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {header}
              </h3>
              <button onClick={() => setShow(false)}  type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                  <span className="sr-only">Close modal</span>
              </button>
          </div>
          <div className='flex items-center mx-5' style={{minHeight : "300px"}}>
              {body}
          </div>
          <div className='bg-gray-300 w-full my-2' style={{height : 1}}  />
          <div className='mx-4'>
          {actions}
          </div>
      </div>
    </div>
  </div>)
}
export default Index