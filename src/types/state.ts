export const timeOptions = [{ label : '2 minutes', value : 120}, { label : '5 minutes', value : 300}, { label : '10 minutes', value : 600}, { label : '15 minutes', value : 900}]

export interface EditorStateType{
    isLoading : boolean,
    activeCanvas : number,
    timeOptions :   TimeOptions,
    canvasList : CanvasType[],
    isPlaying : boolean,
    isActive : boolean
}

export interface CanvasType {
    canvasJson : any,
    imageUrl : String,
    isPainted : boolean
}

export type TimeOptions = { label : '2 minutes', value : 120} | { label : '5 minutes', value : 300} | { label : '10 minutes', value : 600} | { label : '15 minutes', value : 900} 