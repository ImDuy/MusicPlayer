import { Track } from "react-native-track-player";
import { Artist } from "../utils/types";

export type RootStackParamList = {
  TabNavigator: undefined;
  TrackPlayer: undefined;
};

export type TabParamList = {
  FavoritesStack: undefined;
  PlaylistsStack: undefined;
  ArtistsStack: undefined;
  SongsStack: undefined;
};

export type ArtistsStackParamList = {
  Artists: undefined;
  ArtistDetail: { artist: Artist };
};
