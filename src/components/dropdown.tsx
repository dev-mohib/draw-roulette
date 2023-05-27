import { gameActions, useAppDispatch, useAppSelector } from '@state/store'
import React from 'react'

const Dropdown = () => {
    const [visible, setVisible] = React.useState(false)
    const { category } = useAppSelector(s => s.gameSlice)
    const dispatch = useAppDispatch()
  return (
    <div>
        <button onClick={() => setVisible(!visible)}  data-dropdown-toggle="dropdown" className="click-bounce text-white bg-primary focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center" type="button">
            {category.title} 
            <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
        <div id="dropdown" className={`z-10 ${!visible ?'hidden' : 'block'} absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-28 dark:bg-gray-700`}>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li onClick={() => {
                    dispatch(gameActions.setCategory({
                    title : 'Halloween',
                    id : "1m8cwRZCvVgc_5L32ES8Xee3KxUx0vtxe"
                    }))
                setVisible(false)
                }}>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Halloween</a>
                </li>
                <li
                    onClick={() => {
                        dispatch(gameActions.setCategory({
                        title : 'Christmas',
                        id : "1gqUhK5ODeB7maSvOnD8Dy45XvRcvHgtV"
                        }))
                        setVisible(false)
                }}
                    >
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Christmas</a>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Dropdown