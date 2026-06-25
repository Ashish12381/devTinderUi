/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => action.payload,
    removeUserFromFeed: (state, action) => {
      state.users = state.users.filter((user) => user._id !== action.payload);
    },
  },
});
export const { addFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
