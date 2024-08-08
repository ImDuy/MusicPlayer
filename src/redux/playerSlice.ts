import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Track } from "react-native-track-player";

type PlayerState = {
  onGoingQueue: Track[];
  onGoingTrack: Track | null;
  isLoading: boolean;
};

const initialState: PlayerState = {
  onGoingQueue: [],
  onGoingTrack: null,
  isLoading: false,
};

const slice = createSlice({
  name: "player",
  initialState,
  reducers: {
    updateOnGoingQueue(state, { payload }: PayloadAction<Track[]>) {
      state.onGoingQueue = payload;
    },
    updateOnGoingTrack(state, { payload }: PayloadAction<Track | null>) {
      state.onGoingTrack = payload;
    },
    updateIsLoading(state, { payload }: PayloadAction<boolean>) {
      state.isLoading = payload;
    },
  },
});

const playerReducer = slice.reducer;
export default playerReducer;

export const { updateOnGoingQueue, updateOnGoingTrack, updateIsLoading } =
  slice.actions;
