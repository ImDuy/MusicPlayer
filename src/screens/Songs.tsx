import React, { useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { tracks } from "../../assets/data/library";
import TrackList from "../components/TrackList";
import { useNavigationSearch } from "../hooks/useNavigationSearch";
import { Track } from "react-native-track-player";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { tabBarHeight } from "../utils/constants";

export default function Songs() {
  const insets = useSafeAreaInsets();
  const search = useNavigationSearch({ placeholder: "Find in songs" });

  const filteredSongs = useMemo(() => {
    if (!search) return tracks;
    return tracks.filter((song: Track) =>
      song.title?.toLowerCase().includes(search.toLowerCase().trim())
    );
  }, [search]);
  return (
    <View style={styles.container}>
      <ScrollView
        style={{ marginBottom: tabBarHeight + insets.bottom + 8 }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <TrackList tracks={filteredSongs} scrollEnabled={false} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
