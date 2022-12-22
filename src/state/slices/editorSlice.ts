import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CanvasType, EditorStateType, TimeOptions } from "src/types/state";


const initialState : EditorStateType  = {
    activeCanvas : 0,
    canvasList : [],
    isLoading : true,
    timeOptions : {label : "10 minutes", value : 600},
    isPlaying : false,
    isActive : false
   }
export const editorSlice = createSlice({
   initialState,
    name : "editorSlice", 
    reducers : {
        setActiveCanvas : (state, action : PayloadAction<number>) =>{
            state.activeCanvas = action.payload
        },
        startGame : (state, action : PayloadAction<{timeOption : TimeOptions, canvasList : CanvasType[]}>) => {
            state.isPlaying = true
            state.isActive = true
            state.timeOptions = action.payload.timeOption
            state.canvasList = action.payload.canvasList
        },
        pushCanvas : (state, action : PayloadAction<CanvasType>) => {
            if(state.canvasList.length < 8)
            state.canvasList.push(action.payload)
        },
        popCanvas : (state) => {
            if(state.canvasList.length > 1)
            state.canvasList.pop()
        },
        setTimeOptions : (state, action : PayloadAction<TimeOptions>) => {
            state.timeOptions = action.payload
        },
        startPlaying : (state) => {
            state.isPlaying = true
        },
        stopPlaying : (state) => {
            state.isPlaying = false
        },
        setActive : (state) => {
            state.isActive = true
        },
        unsetActive : (state) => {
            state.isActive = false
        }
    }
})

const { actions : editorActions} = editorSlice
export { editorActions }