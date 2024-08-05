import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { tracks } from "../../assets/data/library";
import TrackList from "../components/TrackList";
import { useNavigationSearch } from "../hooks/useNavigationSearch";
import { Track } from "react-native-track-player";

export default function Songs() {
  const search = useNavigationSearch({ placeholder: "Find in songs" });

  const filteredSongs = useMemo(() => {
    if (!search) return tracks;
    return tracks.filter((song: Track) =>
      song.title?.toLowerCase().includes(search.toLowerCase().trim())
    );
  }, [search]);
  return (
    <View style={styles.container}>
      <TrackList tracks={filteredSongs} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
