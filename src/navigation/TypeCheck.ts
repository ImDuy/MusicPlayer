import { NavigatorScreenParams } from "@react-navigation/native";
import { Artist, Playlist } from "../utils/types";

export type RootStackParamList = {
  TabNavigator: undefined;
  TrackPlayer: undefined;
};

export type TabParamList = {
  FavoritesStack: NavigatorScreenParams<FavoritesStackParamList>;
  PlaylistsStack: NavigatorScreenParams<PlaylistsStackParamList>;
  ArtistsStack: NavigatorScreenParams<ArtistsStackParamList>;
  SongsStack: NavigatorScreenParams<SongsStackParamList>;
};

export type SongsStackParamList = {
  Songs: undefined;
};

export type ArtistsStackParamList = {
  Artists: undefined;
  ArtistDetail: { artist: Artist };
};

export type FavoritesStackParamList = {
  Favorites: undefined;
};

export type PlaylistsStackParamList = {
  Playlists: undefined;
  PlaylistDetail: { playlist: Playlist };
};
