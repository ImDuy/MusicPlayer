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
      state.tracks = state.tracks.map((track) => {
        if (track.url === payload.url) {
          return { ...track, rating: track.rating === 1 ? 0 : 1 };
        }
        return track;
      });
    },
    addTrackToPlaylist(
      state,
      { payload }: PayloadAction<{ track: Track; playlistName: string }>
    ) {
      state.tracks = state.tracks.map((track) => {
        if (track.url === payload.track.url) {
          return {
            ...track,
            playlist: [...(track.playlist ?? []), payload.playlistName],
          };
        }
        return track;
      });
    },
  },
});

const libraryReducer = slice.reducer;
export default libraryReducer;

export const { toggleTrackFavorite, addTrackToPlaylist } = slice.actions;
