import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setNewChats: (state, action) => {
      const { payload } = action;
      state.push(payload);
    },
  },
});

export const { setNewChats } = chatSlice.actions;

export default chatSlice.reducer;
