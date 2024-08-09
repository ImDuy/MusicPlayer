import React, { useMemo } from "react";
import { Track } from "react-native-track-player";
import { useSelector } from "react-redux";
import TrackList from "../components/TrackList";
import { useNavigationSearch } from "../hooks/useNavigationSearch";
import { RootState } from "../redux/store";

export default function Songs() {
  const search = useNavigationSearch({ placeholder: "Find in songs" });
  const tracks = useSelector((state: RootState) => state.library.tracks);

  const filteredSongs = useMemo(() => {
    if (!search) return tracks;
    return tracks.filter((song: Track) =>
      song.title?.toLowerCase().includes(search.toLowerCase().trim())
    );
  }, [search, tracks]);
  return (
    <TrackList
      contentInsetAdjustmentBehavior="automatic"
      displayedTracks={filteredSongs}
      listQueue={tracks}
      hideQueueControls={search.length !== 0}
    />
  );
}
