import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";

interface UiInterface{
    isBgColorConrols : boolean,
    drawTool : 'brush' | 'lasso' | 'select' | 'eraser',
    isThreadShow : boolean,
    threadLayersView : 'Next' | 'Current' | 'Previous',
    orientation : 'Landscape' | 'Portrait'
    isResized : boolean,
    currentControl : 'Paint Brush' | 'Center Menu' | 'Wieve Edit' | null,
    isRecording : boolean,
    isCanvasLoaded : boolean,
    isUndoAble : boolean,
    isRedoAble : boolean,
    isMouseDown : boolean
}

const initialState : UiInterface  = {
   isBgColorConrols : false,
   drawTool : 'brush', //lasso, shape
   isThreadShow : false,
   threadLayersView : 'Current',
   orientation : 'Landscape',
   isResized : false,
   currentControl : null,
   isRecording : false,
   isCanvasLoaded : false,
   isUndoAble : false,
   isRedoAble : false,
   isMouseDown : false
}
export const uiSlice = createSlice({
   initialState,
    name : "ui_slice", 
    reducers : {
        changeBgColorControl : (state) =>{
            state.isBgColorConrols = !state.isBgColorConrols
        },
        setDrawTool : (state, action : PayloadAction<'brush' | 'lasso' | 'select' | 'eraser'>) => {
            state.drawTool = action.payload
        },
        showThreadWheel : (state) => {
            state.isThreadShow = true
        },
        hideThreadWheel : (state) => {
            state.isThreadShow = false
        },
        setThreadLayersView : (state, action : PayloadAction<'Next' | 'Current' | 'Previous'>)=>{
            state.threadLayersView = action.payload
        },
        setOrientation : (state, action : PayloadAction<'Landscape' | 'Portrait'>)=>{
            state.orientation = action.payload
        },
        setWindowResized : (state) => {
            state.isResized = !state.isResized
        },
        setCanvasLoaded : (state) => {
            state.isCanvasLoaded = true
        },
        setCurrentControl : (state, action : PayloadAction<'Paint Brush' | 'Center Menu' | 'Wieve Edit' | null>) => {
            state.currentControl = action.payload
        },
        startRecording : (state) => {
            state.isRecording = true
        },
        stopRecording : (state) => {
            state.isRecording = false
        },
        enableUndo : (state) => {state.isUndoAble = true},
        enableRedo : (state) => {state.isRedoAble = true},
        disableUndo : (state) => {state.isUndoAble = false},
        disableRedo : (state) => {state.isRedoAble = false},
        setMouseDown : (state) => {state.isMouseDown = true},
        setMouseUp : (state) => {state.isMouseDown = false}
   }
})

const { actions : uiActions} = uiSlice
export { uiActions }