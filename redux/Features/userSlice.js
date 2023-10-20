"use client";
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => action.payload,
    clearUser: () => null, // clear the user data (e.g., on logout)
  },
});

// Export the action creators
export const { setUser, clearUser } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
