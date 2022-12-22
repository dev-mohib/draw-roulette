import React, { useRef, useState } from 'react'
import Navbar from '../../components/navbar'
import { IoMdAdd, IoMdRemove} from 'react-icons/io'
import { drawingSamples, shuffle } from '../../utils/drawingSamples'
import { editorActions, useAppDispatch, useAppSelector } from '@state/store'
import { CanvasType, TimeOptions } from 'types/state'
const ChildBody = () => {
    const timeOptions : TimeOptions[] = [{label : '2 minutes', value : 120},{label : '5 minutes', value : 300},{label : '10 minutes', value : 600},{label : '15 minutes', value : 900}]
    const [timeIndex, setTimeIndex] = useState(0)
    const [imageCount, setImageCount] = useState(3)
    const [images, setImages] = useState(drawingSamples)
    const dispatch = useAppDispatch()


    const startGame = () => {
        const canvasList : CanvasType[] = images.slice(0, imageCount).map(img => ({canvasJson : null,imageUrl : img, isPainted : false}))
        dispatch(editorActions.startGame({timeOption : timeOptions[timeIndex],canvasList}))
    }
    const Actions = () => {
        return( 
        <div className="flex w-full  items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button onClick={() => {
                const newList = shuffle(drawingSamples)
                setImages([...newList])
                }} data-modal-toggle="defaultModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Shuffle</button>
            <button onClick={startGame}  data-modal-toggle="defaultModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Start</button>
        </div>
    )
}
    return(
    <div>
    <div className='flex flex-row justify-between w-full px-10'>
        <div className='w-96'>
            <div className='flex flex-wrap'>
                {images.slice(0, imageCount).map((_img, i) =><img key={i}  src={_img} alt={_img} className="w-28 h-28 mx-2 my-2" />)}
            </div>
        </div>
        <div className=''>
            <div className='my-5'>
                <h1>Select Time</h1>
                <div className='flex text-white'>
                    <div className='flex-r-c px-3 py-2 cursor-pointer border border-gray-200 bg-blue-600' onClick={() => {
                        setTimeIndex(timeIndex > 0 ? timeIndex - 1 : 0)
                    }}>
                    <IoMdRemove />
                    </div>
                    <div className='flex-r-c px-3 py-2 border border-gray-200 bg-blue-600'>{timeOptions[timeIndex].label}</div>
                    <div className='px-3 py-2 flex-r-c cursor-pointer  border border-gray-200 bg-blue-600' onClick={() => {
                            setTimeIndex(timeIndex < timeOptions.length - 1 ? timeIndex + 1 : timeOptions.length - 1)
                        }}>
                        <IoMdAdd />
                    </div>
                </div>
            </div>

            <div className='my-5'>
                <h1>Select Number of images</h1>
                <div className='flex text-white'>
                    <div className='flex-r-c px-3 py-2 cursor-pointer border border-gray-200 bg-blue-600' onClick={() => {
                        setImageCount(imageCount > 1 ? imageCount - 1 : 1)
                    }}>
                    <IoMdRemove />
                    </div>
                    <div className='flex-r-c px-3 py-2 border border-gray-200 bg-blue-600'>{imageCount}</div>
                    <div className='px-3 py-2 flex-r-c cursor-pointer  border border-gray-200 bg-blue-600' onClick={() => {
                            setImageCount(imageCount < 6  ? imageCount + 1 : 6)
                        }}>
                        <IoMdAdd />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Actions />
    </div>
    )
}
const Index = () => {
    const data : String[] = ['bg-red-500', 'bg-green-300', 'bg-blue-400', 'bg-red-500', 'bg-green-600', 'bg-blue-700', 'bg-red-600', 'bg-green-700', 'bg-blue-700']
  return (
    <div className='h-screen'>
        <div className='flex justify-end my-5'>
            <Modal header={'Start New game'} body={<ChildBody />} btnText="Start New" />
            {/* <button className='px-4 py-2 rounded-3xl bg-blue-600 text-white hover:bg-blue-400'>Create New</button> */}
        </div>
        <div className='flex justify-start flex-wrap w-full'>
            {
                data.map((color,i) => <Card key={i} color={color} />)
            }
        </div>
    </div>
  )
}

const Card = ({color} : any) => {
    const split  = color.split('-')
    const hover = (parseInt(split[2])) - 100
    
    return(
    <div className='m-2'>
        <a href="#" className={`block max-w-sm p-6 ${color} order border-gray-200 rounded-lg shadow-md hover:${split[0]}-${split[1]}-${hover}`}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        </a>
    </div>
)
}


const Modal = ({header, body, actions, btnText="Show Modal"} : {btnText? : string,header : String, body : JSX.Element, actions? : JSX.Element}) => {
    const [showModel, setShowModel] = useState(false)
    return(
    <div>
        <button onClick={() => {
           setShowModel(true)
        }}  className="btn" type="button" data-modal-toggle="defaultModal">
            {btnText}
        </button>
        {showModel&&<div  id="defaultModal"  className="fixed top-0 flex justify-center  left-0 right-0 z-50 p-4 w-screen overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
    <div className="relative w-full h-full max-w-2xl md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {header}
                </h3>
                <button onClick={() => setShowModel(false)}  type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <div className='flex items-center' style={{minHeight : "100px"}}>
                {body}
            </div>
           {actions}
        </div>
    </div>
        </div>}
    </div>
    )
}
export default Index