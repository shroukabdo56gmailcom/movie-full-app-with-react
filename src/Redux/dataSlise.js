import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let initialState = { myItems: [], myItem:{} };

export const getData = createAsyncThunk("dataSclice/getData", async (type) => {
  let { data } = await axios.get(
    `https://api.themoviedb.org/3/trending/${type}/day?api_key=6af4e1eecab52d591c592e8ee13e9e2b`
  );
  return data;
});
export const getItem = createAsyncThunk('x', async ({mt,id})=>{
  console.log(id);
  let {data}= await axios.get(`https://api.themoviedb.org/3/${mt}/${id}?api_key=6af4e1eecab52d591c592e8ee13e9e2b`)
  return data
})
let dataSlice = createSlice({
  name: "dataSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled,(state,action)=>{
        state.myItems=action.payload.results
        console.log(action.payload.results);
    })

    builder.addCase(getItem.fulfilled,(state,action)=>{
      state.myItem=action.payload
      console.log(action.type);
    })
    builder.addCase(getItem.rejected,(state,action)=>{
      // state.myItem=action.payload
      console.log(action.type);
    })
  },
});

export let dataReducer=dataSlice.reducer;
