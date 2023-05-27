import React from 'react'
import { useAppSelector } from '@state/store'
import { mockData } from './mock'
import { BsPrinter } from 'react-icons/bs'
import Canvas from './Canvas'
const Index = () => {
  const { canvasList } = useAppSelector(s => s.gameSlice)

  React.useEffect(() => {
    console.log(canvasList)
  },[])

  return ( 
     <>
      <div className='fixed top-0 left-0 right-0 z-50  bg-slate-300 w-full flex-r-b p-2'>
        <h1>Result</h1>
        <div>
          {/* <button onClick={()=>window.print()}  className='btn-primary mx-1'>Print</button> */}
          <BsPrinter onClick={() => window.print()} className='mx-5 cursor-pointer' size={20} />
        </div>
      </div>
      {
      canvasList.map((item, index ) => <div key={index} className='h-screen w-screen orientation mb-4'>
        <div className='flex-r-c bg-gray-200 relative side'>
          <img src={item.image.thumbnailLink} referrerPolicy='no-referrer' className='landscape:w-full portrait:h-full object-cover'/>
        </div>
        <div className=' border-black side'>
          <Canvas json={item.canvasJson} id={`myCanvas-${index}`}  />
        </div>
        <div className='pagebreak'></div>
      </div>)
      }
  </>
  )
}


export default Index