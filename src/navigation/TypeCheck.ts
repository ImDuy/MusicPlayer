import { Track } from "react-native-track-player";

export type RootStackParamList = {
  TabNavigator: undefined;
  TrackPlayer: { track: Track };
};

export type TabParamList = {
  FavoritesStack: undefined;
  PlaylistsStack: undefined;
  ArtistsStack: undefined;
  SongsStack: undefined;
};
