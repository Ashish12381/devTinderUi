/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
const feedSlice=createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addFeed:(state,action)=>action.payload,
        removeFedd:(state,action)=>null
    }
})
export const {addFeed,removeFedd} = feedSlice.actions;
export default feedSlice.reducer;