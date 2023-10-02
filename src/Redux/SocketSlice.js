"use client";
import { createSlice } from "@reduxjs/toolkit";
 const socketSlice = createSlice({
  name: "Socket",
  initialState: {
    ws: null,
    clientId: null,
  },
  reducers: {
    addWs(state, action) {
      return { ...state, ws: action.payload };
    },
    addClientId(state, action) {
      return { ...state, clientId: action.payload };
    },
  },
});

export const { addWs, addClientId } = socketSlice.actions;

export default socketSlice.reducer;
