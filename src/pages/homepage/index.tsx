import React, { useEffect, useRef, useState } from 'react'
import { IoMdAdd, IoMdRemove} from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { shuffle } from '../../utils/drawingSamples'
import { editorActions, useAppDispatch, useAppSelector } from '@state/store'
import { CanvasType, TimeOptions } from 'types/state'
import Loader from '@components/loader'
import Modal from './Modal'
import { GoogleDriveResponse } from 'types/index'
const ChildBody = () => {
    const timeOptions : TimeOptions[] = [{label : '2 minutes', value : 120},{label : '5 minutes', value : 300},{label : '10 minutes', value : 600},{label : '15 minutes', value : 900}]
    const [timeIndex, setTimeIndex] = useState(0)
    const [imageCount, setImageCount] = useState(3)
    const [googleImages, setGoogleImages] = useState<GoogleDriveResponse[]>([])
    const dispatch = useAppDispatch()
    const navigate  = useNavigate()


    useEffect(() => {
        getGoogleDriveFiles()
    },[])
    const getGoogleDriveFiles = async() => {
        const response : GoogleDriveResponse[] = await fetch("http://localhost:8000").then(res => res.json());
        setGoogleImages(response)
    }

    const startGame = () => {
        const canvasList : CanvasType[] = googleImages.slice(0, imageCount).map(image => ({canvasJson : null,isPainted : false, image}))
        dispatch(editorActions.startGame({timeOption : timeOptions[timeIndex],canvasList}))
        navigate("/playing")
    }
    const Actions = () => {
        return( 
        <div className="flex w-full  items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button onClick={() => {
                const newList = shuffle(googleImages)
                setGoogleImages([...newList])
                }} data-modal-toggle="defaultModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Shuffle</button>
            <button onClick={startGame}  data-modal-toggle="defaultModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Start</button>
        </div>
    )
}
    return(
    <div>
    <div className='flex flex-row justify-between w-full px-10'>
        <div className='w-96'>
            {
            googleImages.length == 0 ?<div className='flex-c-c'>
             <Loader /> </div>
             :<div className='flex flex-wrap'>
                {googleImages.slice(0, imageCount).map((d, i) =>
                <img key={i}  src={d.thumbnailLink} alt={d.name} className="w-28 h-28 mx-2 my-2" />)}
            </div>
        }
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
    const navigate = useNavigate()
    const data : String[] = ['bg-red-500', 'bg-green-300', 'bg-blue-400', 'bg-red-500', 'bg-green-600', 'bg-blue-700', 'bg-red-600', 'bg-green-700', 'bg-blue-700']
   
    return (
    <div className='h-screen'>
        <div className='w-full flex justify-end my-5'>
            <button onClick={() => navigate('/newgame')}  className='btn-primary '>Create New</button>
        </div>
        <div className='flex justify-start flex-wrap w-full'>
            {
                data.map((color,i) => <Card key={i} color={color} />)
            }
        </div>btn-primary 
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



export default Index