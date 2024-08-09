import { Artist, Playlist } from "../utils/types";

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

export type PlaylistsStackParamList = {
  Playlists: undefined;
  PlaylistDetail: { playlist: Playlist };
};
