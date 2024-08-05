import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TrackList from "../components/TrackList";
import { tabBarHeight } from "../utils/constants";
import { useNavigationSearch } from "../hooks/useSearchNavigation";
import { tracks } from "../../assets/data/library";
import { Track } from "../@type/Track";

export default function Songs() {
  const search = useNavigationSearch({ placeholder: "Find in songs" });

  const filteredSongs = useMemo(() => {
    if (!search) return tracks;
    return tracks.filter((song: Track) =>
      song.title.toLowerCase().includes(search.toLowerCase().trim())
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
