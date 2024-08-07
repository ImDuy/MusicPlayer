import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { useNavigationSearch } from "../hooks/useNavigationSearch";
import { Track } from "react-native-track-player";
import TrackList from "../components/TrackList";
import { tabBarHeight } from "../utils/constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { tracks } from "../../assets/data/library";

export default function Favorites() {
  const insets = useSafeAreaInsets();
  const search = useNavigationSearch({ placeholder: "Find in songs" });
  const favoriteTracks = useMemo(() => {
    return tracks.filter((track: Track) => track.rating === 1);
  }, []);

  // const filteredTracks = useMemo(() => {
  //   if (!search) return tracks;
  //   return tracks.filter((song: Track) =>
  //     song.title?.toLowerCase().includes(search.toLowerCase().trim())
  //   );
  // }, [search]);
  return (
    <View style={styles.container}>
      <ScrollView
        style={{ marginBottom: tabBarHeight + insets.bottom + 8 }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <TrackList tracks={favoriteTracks} scrollEnabled={false} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
