import { useAppSelector } from '@state/store'
import React from 'react'
import { useLocation } from 'react-router-dom'

const PrintView = () => {
  const { googleImages } = useAppSelector(s => s.gameSlice)
  const location = useLocation()

  const time = '2 minutes'
  const title = ''

  const images = [1,2,3,4,5,6]

  
  const ImageView = ({image} : any) => {
    return (<div className=' border border-black m-0.5'>
        <img src={image} 
        // className='w-24 h-24'
        style={{
          maxWidth: '10vw',
          maxHeight: '10vw',
          // width: '2vh'
          minWidth : '73px',
          minHeight : '73px'
        }}
         />
    </div>)
  }
  if(!location.state){
    return (
      <div className='min-h-screen'>
        <h1>No images are selected</h1>
      </div>
    )
  }else
  return (
    <div className='h-screen w-full'>
      <div className='h-1/4 border border-black w-full flex flex-col justify-center items-center sm:px-0 md:px-0 lg:px-10 xl:px-16'>
        <div className='w-full  lg:w-2/3 xl:w-2/3'>
          {/* <h1 className='font-bold text-lg'>{location.state.title}</h1> */}
          <h1 className='text-left'>Time : {location.state.time}</h1>
        </div>
        <div className=' border-black flex w-full  lg:w-2/3 xl:w-2/3 justify-start flex-wrap p-0.5'>
          { 
            location.state.googleImages.map((image : any) => <ImageView key={image?.id} image={image.thumbnailLink} />)
          }
        </div>
      </div>
      <div className='h-3/4  w-full flex flex-col justify-between  border-black px-10'>
        <div className='w-full flex justify-center h-full'>
          <div className='bg-white w-1/2 portrait:w-full h-4/5 border-black mt-10'>
           
          </div>
        </div>
        <div className='w-full flex justify-end'>
          <button className='button no-print-view m-4' onClick={() => window.print()}>Print</button>
        </div>
      </div>
    </div>
  )
}

export default PrintView