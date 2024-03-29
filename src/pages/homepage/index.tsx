import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@state/store'
import { gameActions } from '@state/slices/gameSlice'
import { GameStateType } from 'types/state'


const Index = () => {
    const navigate = useNavigate()
    const [projects, setProjects] = useState<GameStateType[]>([])
    const data : String[] = ['bg-red-500', 'bg-green-300', 'bg-blue-400', 'bg-red-500', 'bg-green-600', 'bg-blue-700', 'bg-red-600', 'bg-green-700', 'bg-blue-700']
   useEffect(() => {
    const history : GameStateType[] = JSON.parse(localStorage.getItem('projects')??'[]')
   setProjects(history)
   },[])
    return (
    <div className='h-screen px-14'>
        <div className='w-full flex justify-end my-5'>
            <button onClick={() => navigate('/newgame')}  className='btn-primary '>Create New</button>
        </div>
        <div className='flex justify-start flex-wrap w-full'>
            {
                projects.length > 0 ? projects.map((project, i) => <Project key={i} project={project} />) : <div className='h1 h-screen w-full flex-r-c'><h1>Empty Project History</h1> </div>
            }
        </div>
    </div>
  )
}
const Project = ({project} : {project : GameStateType}) => {
    // const split  = color.split('-')
    // const hover = (parseInt(split[2])) - 100 //hover:${split[0]}-${split[1]}-${hover}
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const openResultPage = () => {
        dispatch(gameActions.setState(project));
        navigate('/result')
    }
    return(
    <div className='m-2' onClick={() => openResultPage()}>
        <a className={`block max-w-sm p-6 bg-blue-400 order border-gray-200 rounded-lg shadow-md`}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{project.name}</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        </a>
    </div>
)
}



export default Index