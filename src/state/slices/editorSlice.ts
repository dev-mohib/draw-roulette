import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CanvasType, EditorStateType, GameStatus, TimeOptions } from "src/types/state";


const initialState : EditorStateType  = {
    activeCanvas : 0,
    canvasList : [],
    isLoading : true,
    timeOptions : {label : "5 minutes", value : 500},
    isActive : false,
    gameStatus : "idle",
    timeRemaining : 10
   }
export const editorSlice = createSlice({
   initialState,
    name : "editorSlice", 
    reducers : {
        setActiveCanvas : (state, action : PayloadAction<number>) =>{
            state.activeCanvas = action.payload
        },
        startGame : (state, action : PayloadAction<{timeOption : TimeOptions, canvasList : CanvasType[]}>) => {
            state.isActive = true
            state.gameStatus = 'paused'
            state.timeOptions = action.payload.timeOption
            state.timeRemaining = action.payload.timeOption.value
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
        setActive : (state) => {
            state.isActive = true
        },
        unsetActive : (state) => {
            state.isActive = false
        },
        decreaseTime : (state) => {
            if(state.timeRemaining > 0){
                state.timeRemaining -= 1
            }
        },
        setGameStatus : (state, action : PayloadAction<GameStatus>)=>{
            state.gameStatus = action.payload
        }
    }
})

const { actions : editorActions} = editorSlice
export { editorActions }