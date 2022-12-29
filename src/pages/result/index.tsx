import React from 'react'
import { useAppSelector } from '@state/store'
import { mockData } from './mock'
import Canvas from './Canvas'
const Index = () => {
  const { gameSlice } = useAppSelector(s => s)
  const [projects, setProjects] = React.useState([])

  // React.useEffect(() => {
  //   const project = JSON.parse(localStorage.getItem('projects'))??[]
    
  // },[])
const handleSave = () => {
  const history : any[] = JSON.parse(localStorage.getItem('projects')??'[]')
  console.log({history})
  const find = history.find(p => p?.id == gameSlice.id)
  const newHistory = find ? history.map(e => e) : [...history, gameSlice] 
  localStorage.setItem('projects', JSON.stringify(newHistory))
}

  return ( 
     <>
      <div className='fixed top-0 left-0 right-0 z-50  bg-slate-300 w-full flex-r-between p-2'>
        <h1>Result</h1>
        <div>
          <button onClick={()=>window.print()}  className='btn-primary mx-1'>Print</button>
          <button onClick={handleSave}  className='btn-default'>Save</button>
        </div>
      </div>
      {
      gameSlice.canvasList.map((item, index ) => <div key={index} className='h-screen w-screen orientation mb-4'>
        <div className='flex-r-c bg-gray-200 relative side'>
          <img src={item.image.thumbnailLink} referrerPolicy='no-referrer' className='landscape:w-full portrait:h-full object-cover'/>
        </div>
        <div className='border-2 border-black side'>
          <Canvas json={item.canvasJson} id={`myCanvas-${index}`}  />
        </div>
        <div className='pagebreak'></div>
      </div>)
      }
  </>
  )
}


export default Index