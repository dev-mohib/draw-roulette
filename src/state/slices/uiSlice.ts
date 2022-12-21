import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";

interface UiInterface{
    msg : string,
    token : string,
}

const initialState : UiInterface  = {
   msg : "Hello World",
   token : "ya29.a0AX9GBdXVsNDCDlaMneBWzpj07GjPF3igWCULBf_9_q_VLmsna1eYCBJLys6R-0BqjC_LsgIzItynm4WpFKntBwTZyQLKqvMNcdc69eguIQk_LhdlHArH4cK8S9yy76SgwUcrv7QWMVJly03xDKpR1Z0oO83uaCgYKAaoSARASFQHUCsbCFcRGWWmORV6srUno9QXu7w0163",
}
export const uiSlice = createSlice({
   initialState,
    name : "ui_slice", 
    reducers : {
        setHello : (state) => {
            state.msg = "HI"
        }
    }
})

const { actions : uiActions} = uiSlice
export { uiActions }