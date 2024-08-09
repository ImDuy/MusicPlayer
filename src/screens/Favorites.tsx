import React, { useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Track } from "react-native-track-player";
import { useSelector } from "react-redux";
import TrackList from "../components/TrackList";
import { useNavigationSearch } from "../hooks/useNavigationSearch";
import { RootState } from "../redux/store";

export default function Favorites() {
  const search = useNavigationSearch({ placeholder: "Find in songs" });
  const tracks = useSelector((state: RootState) => state.library.tracks);
  const favoriteTracks = useMemo(() => {
    console.log("filtering favorite tracks");
    return tracks.filter((track: Track) => track.rating === 1);
  }, [tracks]);

  const filteredTracks = useMemo(() => {
    if (!search) return favoriteTracks;
    return favoriteTracks.filter((song: Track) =>
      song.title?.toLowerCase().includes(search.toLowerCase().trim())
    );
  }, [search, favoriteTracks]);
  return (
    <TrackList
      contentInsetAdjustmentBehavior="automatic"
      displayedTracks={filteredTracks}
      listQueue={favoriteTracks}
      scrollEnabled={false}
      hideQueueControls={search.length !== 0}
    />
  );
}
