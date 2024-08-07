import { configureStore } from "@reduxjs/toolkit";
import libraryReducer from "./librarySlice";

export const store = configureStore({
  reducer: { library: libraryReducer },
});

export type RootState = ReturnType<typeof store.getState>;
