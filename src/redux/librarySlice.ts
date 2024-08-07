import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TrackWithPlaylist } from "../utils/types";
import { Track } from "react-native-track-player";
import { tracks } from "../../assets/data/library";

type LibraryState = {
  tracks: TrackWithPlaylist[];
};

const initialState: LibraryState = {
  tracks: tracks,
};

const slice = createSlice({
  name: "library",
  initialState,
  reducers: {
    toggleTrackFavorite(state, { payload }: PayloadAction<Track>) {
      // state.ids.push(payload);
    },
    addToPlaylist(
      state,
      { payload }: PayloadAction<{ track: Track; playlistName: string }>
    ) {
      // state.ids.splice(state.ids.indexOf(payload), 1);
    },
  },
});

const libraryReducer = slice.reducer;
export default libraryReducer;

export const { toggleTrackFavorite, addToPlaylist } = slice.actions;
