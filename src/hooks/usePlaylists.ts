import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Playlist } from "../utils/types";
import { useMemo } from "react";

export const usePlaylists = () => {
  const tracks = useSelector((state: RootState) => state.library.tracks);
  const playlists: Playlist[] = tracks.reduce((acc, track) => {
    track.playlist?.forEach((trackPlaylistName) => {
      const existingPlaylist = acc.find(
        (playlist) => playlist.name === trackPlaylistName
      );
      // duplicate playlist?
      if (existingPlaylist) {
        existingPlaylist.tracks.push(track);
      } else {
        //met the new playlist in the tracks list
        acc.push({
          name: trackPlaylistName,
          tracks: [track],
          artworkPreview: track.artwork,
        });
      }
    });
    return acc;
  }, [] as Playlist[]);

  return { playlists };
};
