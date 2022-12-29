import { GoogleDriveResponse } from 'types/index';
export const timeOptions = [{ label : '2 minutes', value : 120}, { label : '5 minutes', value : 300}, { label : '10 minutes', value : 600}, { label : '15 minutes', value : 900}]


export type GameStatus =  'idle' | 'playing' | 'paused' | 'finished'
export interface EditorStateType{
    isLoading : boolean,
    activeCanvas : number,
    timeOptions :   TimeOptions,
    canvasList : CanvasType[],
    gameStatus : GameStatus,
    isActive : boolean,
    timeRemaining : number,
    isCanvasLoading : boolean,
    id : string
}

export interface CanvasType {
    canvasJson : any,
    image : GoogleDriveResponse,
    isPainted : boolean,
    history : HistoryObject
}

export type HistoryObject  = {
  isLocked : boolean,
  undo : any[],
  redo : any[]
}


export type TimeOptions =
  { label : '1 minute', value : 60} 
| { label : '2 minutes', value : 120} 
| { label : '3 minutes', value : 180} 
| { label : '4 minutes', value : 240} 
| { label : '5 minutes', value : 500} 
| { label : '6 minutes', value : 360} 
| { label : '7 minutes', value : 420} 
| { label : '8 minutes', value : 480} 
| { label : '9 minutes', value : 540} 
| { label : '10 minutes', value : 600} 
| { label : '11 minutes', value : 660} 
| { label : '12 minutes', value : 720} 
| { label : '13 minutes', value : 780} 
| { label : '14 minutes', value : 840} 
| { label : '15 minutes', value : 900} 