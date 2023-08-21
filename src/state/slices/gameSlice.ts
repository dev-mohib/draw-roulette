import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CanvasType, GameStateType, GameStatus, TimeOptions } from "src/types/state";
import { mockData } from './mockData'
import { GoogleDriveResponse } from "types/index";

const initialState : GameStateType  = {
    activeCanvas : 0,
    canvasList  : mockData,
    isLoading : true,
    timeOptions : {label : "5 minutes", value : 500},
    isActive : false,
    gameStatus : "idle",
    name : 'Untitled Project', 
    timeRemaining : 10,
    isCanvasLoading : false,
    id : Date.now().toString(),
    googleImages : [],
    category : {
        title : 'All',
        id : ''
    }
   }
export const gameSlice = createSlice({
   initialState,
    name : "gameSlice", 
    reducers : {
        setActiveCanvas : (state, action : PayloadAction<number>) =>{
            state.activeCanvas = action.payload
        },
        setProjectName : (state, action : PayloadAction<string>) => {
            state.name = action.payload
        },
        startGame : (state, action : PayloadAction<{timeOption : TimeOptions, canvasList : CanvasType[], name : string}>) => {
            state.isActive = true
            state.gameStatus = 'paused'
            state.id = Date.now().toString()
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
        },
        setCanvasLoading : (state) => {
            state.isCanvasLoading = true
        },
        unsetCanvasLoading : (state) => {
            state.isCanvasLoading = false
        },
        setCanvasJson : (state, action : PayloadAction<any>) => {
            state.canvasList[state.activeCanvas].canvasJson = action.payload
        },
        setIsLockedHistory : (state) => {
            state.canvasList[state.activeCanvas].history.isLocked = true
        },
        unsetIsLockedHistory : (state) => {
            state.canvasList[state.activeCanvas].history.isLocked = false
        },
        pushUndo : (state, action : PayloadAction<any>) => {
            if(!state.canvasList[state.activeCanvas].history.isLocked){
                state.canvasList[state.activeCanvas].history.undo.push(action.payload)
            }
        },
        popUndo : (state) => {
            if(!state.canvasList[state.activeCanvas].history.isLocked){
                state.canvasList[state.activeCanvas].history.undo.pop()
            }
        },
        pushRedo : (state, action : PayloadAction<any>) => {
            if(!state.canvasList[state.activeCanvas].history.isLocked){
                state.canvasList[state.activeCanvas].history.redo.push(action.payload)
            }
        },
        popRedo : (state) => {
            if(!state.canvasList[state.activeCanvas].history.isLocked){
                state.canvasList[state.activeCanvas].history.redo.pop()
            }
        },
        setState : (state, action : PayloadAction<GameStateType>) => {
            state = action.payload
            state.name = 'Name changed'
        },
        setGoogleImages : (state, action : PayloadAction<GoogleDriveResponse[]>) => {
            state.googleImages = action.payload
        },
        setCategory : (state, action : PayloadAction<any>) => {
            state.category.title = action.payload.title??''
            state.category.id = action.payload.id??''
        }
    }
})

const { actions : gameActions} = gameSlice
export { gameActions }