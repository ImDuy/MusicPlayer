import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Track } from "react-native-track-player";

type PlayerState = {
  onGoingQueue: Track[];
  onGoingTrack: Track | null;
  isOpeningFullPlayer: boolean;
  isLoading: boolean;
};

const initialState: PlayerState = {
  onGoingQueue: [],
  onGoingTrack: null,
  isLoading: false,
  isOpeningFullPlayer: false,
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
    updateIsOpeningFullPlayer(state, { payload }: PayloadAction<boolean>) {
      state.isOpeningFullPlayer = payload;
    },
  },
});

const playerReducer = slice.reducer;
export default playerReducer;

export const {
  updateOnGoingQueue,
  updateOnGoingTrack,
  updateIsLoading,
  updateIsOpeningFullPlayer,
} = slice.actions;
