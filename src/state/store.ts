import { configureStore  } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { uiActions,uiSlice } from './slices/uiSlice'
import { editorActions, editorSlice} from './slices/editorSlice'
export const store = configureStore({
  reducer : {
      uiSlice : uiSlice.reducer,
      editorSlice : editorSlice.reducer
    },
  })
  // Dispatch Hook
  export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
  // useSelector Hook, similar to useSelector with typescript
  export const useAppSelector : TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector 
  
  export default store

  export {
    uiActions,
    editorActions,
  }