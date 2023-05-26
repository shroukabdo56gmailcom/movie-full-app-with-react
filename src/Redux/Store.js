import { configureStore } from "@reduxjs/toolkit";
import { dataReducer } from "./dataSlise";
let Store =configureStore({
    reducer:{
        dataReducer: dataReducer,
    }
})
export default Store