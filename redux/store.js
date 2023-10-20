// store.js
"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/Features/userSlice";

const rootReducer = combineReducers({
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
