import { View, Text, Image, StyleSheet } from "react-native";
import React, { useMemo } from "react";
import { useNavigationSearch } from "../hooks/useNavigationSearch";
import { Artist } from "../utils/types";
import { Track } from "react-native-track-player";
import TrackList from "./TrackList";
import { colors, fontSize, images, screenSize } from "../utils/constants";
import QueueControls from "./QueueControls";

interface Props {
  artist: Artist;
}
export default function ArtistTrackList({ artist }: Props) {
  const search = useNavigationSearch({
    hideWhenScrolling: true,
    placeholder: "Find in songs",
  });

  const filteredArtistSongs = useMemo(() => {
    if (!search) return artist.tracks;
    return artist.tracks.filter((song: Track) =>
      song.title?.toLowerCase().includes(search.toLowerCase().trim())
    );
  }, [search, artist.tracks]);
  return (
    <TrackList
      contentInsetAdjustmentBehavior="automatic"
      displayedTracks={filteredArtistSongs}
      listQueue={artist.tracks}
      hideQueueControls={true}
      ListHeaderComponent={
        search.length === 0 ? (
          <>
            <Image source={images.unknown_artist} style={styles.artistImage} />
            <Text style={styles.artistName} numberOfLines={1}>
              {artist.name}
            </Text>
            <QueueControls
              queue={artist.tracks}
              containerStyle={styles.queueControls}
            />
          </>
        ) : undefined
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  artistImage: {
    alignSelf: "center",
    height: screenSize.width < 380 ? 180 : 200,
    aspectRatio: 1,
    borderRadius: 100,
  },
  artistName: {
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
