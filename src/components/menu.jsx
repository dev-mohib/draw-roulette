import React, { useState } from 'react'
import { uiActions, useAppDispatch, useAppSelector } from '@state/store'

const Menu = () => {
  return (
    <div className="bg-neutral sm:px-0  flex-r-b rounded-bl-3xl rounded-br-3xl h-16 fixed w-full z-50">
        <div className="w-full px-5 sm:px-2">
            <button className="btn btn-ghost btn-lg normal-case px-20 text-accent">DrawRoulette</button>
        </div>
        <div className="">
            <CustomDropdown />
        </div>
    </div>
  )
}

const CustomDropdown = () => {
  const [visible, setVisible] = React.useState(false)
  const { theme } = useAppSelector(s => s.uiSlice)
  const themes = [
    "light", "dark", "cupcake", "bumblebee", "emerald", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "aqua", "lofi", "fantasy", "dracula", "cmyk", "autumn", "lemonade", "coffee"
  ]
  const dispatch = useAppDispatch()
return (
  <div className='flex justify-end px-5 sm:px-2'>
      <button onClick={() => setVisible(!visible)}  data-dropdown-toggle="dropdown" className="click-bounce text-white bg-primary focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center" type="button">
          {theme} 
          <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
      </button>
      <div id="dropdown" className={`z-10 ${!visible ?'hidden' : 'block'} -ml-2  absolute bg-neutral divide-y divide-gray-100 rounded-lg shadow w-36 dark:bg-gray-700`}>
          <ul 
          className="py-2 text-sm  text-white font-bold font-sans  dark:text-gray-200 max-h-96 overflow-auto myoverflow">
            {
              themes.map(name => 
              <li onClick={() => {
                dispatch(uiActions.setTheme(name))
                localStorage.setItem('theme', name)
                setVisible(false)
              }}>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white m-1 rounded-md hover:text-black">{name}</a>
              </li>)
            }
          </ul>
      </div>
  </div>
)
}

export default Menu