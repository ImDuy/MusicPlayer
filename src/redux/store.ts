import { configureStore } from "@reduxjs/toolkit";
import libraryReducer from "./librarySlice";
import playerReducer from "./playerSlice";

export const store = configureStore({
  reducer: { library: libraryReducer, player: playerReducer },
});

export type RootState = ReturnType<typeof store.getState>;
