import { Track } from "react-native-track-player";

export type Playlist = {
  name: string;
  tracks: Track[];
  artworkPreview?: string;
};

export type Artist = {
  name: string;
  tracks: Track[];
};
export interface TrackWithPlaylist extends Track {
  playlist?: string[];
}
