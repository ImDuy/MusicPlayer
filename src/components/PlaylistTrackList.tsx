import React, { useMemo } from "react";
import { Image, StyleSheet, Text } from "react-native";
import { Track } from "react-native-track-player";
import { useNavigationSearch } from "../hooks/useNavigationSearch";
import { colors, fontSize, images, screenSize } from "../utils/constants";
import { Playlist } from "../utils/types";
import QueueControls from "./QueueControls";
import TrackList from "./TrackList";

interface Props {
  playlist: Playlist;
}
export default function PlaylistTrackList({ playlist }: Props) {
  const search = useNavigationSearch({
    hideWhenScrolling: true,
    placeholder: "Find in songs",
  });

  const filteredPlaylistTracks = useMemo(() => {
    if (!search) return playlist.tracks;
    return playlist.tracks.filter((track: Track) =>
      track.title?.toLowerCase().includes(search.toLowerCase().trim())
    );
  }, [search, playlist.tracks]);

  return (
    <TrackList
      contentInsetAdjustmentBehavior="automatic"
      displayedTracks={filteredPlaylistTracks}
      listQueue={playlist.tracks}
      hideQueueControls={true}
      ListHeaderComponent={
        search.length === 0 ? (
          <>
            <Image
              source={
                playlist.artworkPreview
                  ? { uri: playlist.artworkPreview }
                  : images.unknown_track
              }
              style={styles.playlistImage}
            />
            <Text style={styles.playlistName} numberOfLines={1}>
              {playlist.name}
            </Text>
            <QueueControls
              queue={playlist.tracks}
              containerStyle={styles.queueControls}
            />
          </>
        ) : undefined
      }
    />
  );
}

const styles = StyleSheet.create({
  playlistImage: {
    alignSelf: "center",
    width: "80%",
    height: screenSize.height * 0.4,
    borderRadius: 12,
    marginVertical: 4,
  },
  playlistName: {
    alignSelf: "center",
    color: colors.text,
    fontSize: fontSize.lg,
    fontWeight: "800",
    marginTop: 12,
  },
  queueControls: {
    marginTop: 4,
    paddingVertical: 12,
  },
});
