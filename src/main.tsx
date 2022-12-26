import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store, { uiActions, useAppDispatch } from '@state/store'
import './index.css'
import './App.css'
import AppRoutes from './Routes'


const Wrapper =  () => {
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    let portrait = window.matchMedia("(orientation: portrait)");
    
    portrait.addEventListener("change", function(e) {
      if(e.matches) 
        dispatch(uiActions.setPortrait('portrait-primary'))
      else 
        dispatch(uiActions.setPortrait('landscape-primary'))
    })
  },[])
  return <AppRoutes />
}
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <Provider store={store}>
      <Wrapper />
    </Provider>
  </>,
)

