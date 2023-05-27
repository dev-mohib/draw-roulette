import React, { useEffect, useRef, useState } from 'react'
import { IoMdAdd, IoMdRemove} from 'react-icons/io'
import { RiDeleteBinLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { shuffle } from '../../utils/drawingSamples'
import { gameActions, useAppDispatch, useAppSelector } from '@state/store'
import { CanvasType } from 'types/state'
import Loader from '@components/loader'
import { GoogleDriveResponse } from 'types/index'
import { timeDefaults } from 'src/utils/defaults'
import Dropdown from '@components/dropdown'
import Menu from '@components/menu'

const Index = () => {
  // const timeDefaults : timeDefaults[] = [{label : '2 minutes', value : 120},{label : '5 minutes', value : 500},{label : '10 minutes', value : 600},{label : '15 minutes', value : 900}]
  const [timeIndex, setTimeIndex] = useState(0)
  const [imageCount, setImageCount] = useState(3)
  const [projectName, setPtojectName] = useState('')
  const [isFetching, setFetching] = useState(true)
  const [googleImages, setGoogleImages] = useState<GoogleDriveResponse[]>([])
  const dispatch = useAppDispatch()
  const navigate  = useNavigate()
  const { category }  = useAppSelector(s => s.gameSlice)
  const { theme }  = useAppSelector(s => s.uiSlice)
  
  
  useEffect(() => {
      getGoogleDriveFiles()
  },[category])
  const getGoogleDriveFiles = async() => {
    setFetching(true)
    const url = import.meta.env.VITE_API_URL + '/index.php' + '?id=' + category.id
      const response : GoogleDriveResponse[] = await fetch(url).then(res => res.json()).catch(e => {
        console.error("Error : ", e)
        return []
      })
      // dispatch(gameActions.setGoogleImages(shuffle(response)))
      setGoogleImages(shuffle(response))
      setFetching(false)
  }
  
  const startGame = () => {
      const canvasList : CanvasType[] = googleImages.slice(0, imageCount).map((image, index) => (
        {
          canvasJson : {version : '5.2.4', objects : [], canvasIndex : index},
          isPainted : false, 
          image, 
          history : { isLocked : true, redo : [], undo : []}
        })
      )
      dispatch(gameActions.startGame({timeOption : timeDefaults[timeIndex], canvasList, name : projectName}))
      navigate("/gameplay")
  }

    return (
    <div data-theme={theme}>
      <Menu />
      <div className='h-screen w-full flex flex-col justify-between py-3 px-5 items-center pt-20'>
          <div className='w-full flex-c-c'>
            <div className=' text-white w-1/2 flex-r-c'>
              <div className='flex'>
                <button className='p-3 bg-primary text-base-100 text-lg rounded-tl-2xl rounded-bl-2xl click-bounce' onClick={() => {
                    setTimeIndex(timeIndex > 0 ? timeIndex - 1 : 0)
                }}>
                <IoMdRemove />
                </button>
                <div className=' mx-1 py-3 w-28 text-center bg-primary text-base-100 text-lg'>{timeDefaults[timeIndex].label}</div>
                <button className='p-3 bg-primary text-base-100 text-lg rounded-tr-2xl rounded-br-2xl click-bounce' onClick={() => {
                        setTimeIndex(timeIndex < timeDefaults.length - 1 ? timeIndex + 1 : timeDefaults.length - 1)
                    }}>
                    <IoMdAdd />
                </button>
              </div>
            </div>
            <h1 className='text-center my-4 text-2xl font-bold'>Timer</h1>
          {/* <div className='w-1/2'>
            <input onChange={e => setPtojectName(e.target.value)}   type="text" className="input w-full" placeholder="Project Name" required></input>
          </div> */}
          <div className='w-full flex justify-end pr-16'>
            <Dropdown />
          </div>
            </div>
          <div>
            {
              googleImages.length == 0 || isFetching ? 
              <div className='flex-c-c'>
                {/* <Loader />  */}
                <div className='loader loader--circularSquare'></div>
                </div>
              : 
              <div className='flex flex-wrap self-center items-center'>
              {
                googleImages.slice(0, imageCount).map((d, i) =><div key={i}  className='w-52 h-52 m-2 relative'>
                  {i+1 === imageCount && <RiDeleteBinLine
                    onClick={() => setImageCount(imageCount > 1  ? imageCount - 1 : 1)}
                    className='absolute top-1 right-1 active:text-blue-500 cursor-pointer' size={20}  />}
                  <img  src={d.thumbnailLink} alt={d.name} className="w-52 h-52" referrerPolicy="no-referrer"/>
                </div>)
              }
              <div onTouchEnd={() => {
                setImageCount(imageCount < 6  ? imageCount + 1 : 6)
              }} 
              onClick={() => {
                setImageCount(imageCount < 6  ? imageCount + 1 : 6)
              }}
              className='flex-r-c w-52 h-52 bg-gray-400 rounded hover:bg-gray-200 cursor-pointer active:bg-blue-400'>
                <IoMdAdd size={40}  />
              </div>
          </div>
            }
          </div>
          <div className='self-end flex justify-end px-2'>
            <button onClick={() => {
              setFetching(true)
              const newList = shuffle(googleImages)
              setTimeout(() => {
                setGoogleImages([...newList])
                setFetching(false)
              },1350)
              }} data-modal-toggle="defaultModal" type="button" className="btn btn-secondary mr-3">Shuffle</button>
              <div className='mx-2'> 
                <button onClick={startGame}  className='btn btn-primary'>Start Game</button>
              </div>
            <button onClick={() => navigate("/print", {state : 
              {
              googleImages : googleImages.slice(0, imageCount),
              time : timeDefaults[timeIndex].label,
              title : projectName
              }})}  className='btn btn-primary ml-3 mx-0.5'>Print</button>
          </div>
      </div>
    </div>
  )
}


const ImageList = ({googleImages, imageCount} : {googleImages : GoogleDriveResponse[], imageCount : number}) => {

  return (
  <div>
     {
        <div className='flex flex-wrap w-96 justify-between self-center'>
            {googleImages.slice(0, imageCount).map((d, i) =>
            <img key={i}  src={d.thumbnailLink} alt={d.name} className="w-28 h-28 mx-2 my-2" />)
            }
            <div className='flex-r-c w-28 h-28 bg-gray-400 rounded hover:bg-gray-300 cursor-pointer'>
              <IoMdAdd size={40}  />
            </div>
        </div>
      }
  </div>
  )
}
export default Index