import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import PlaylistTrackList from "../../components/PlaylistTrackList";
import { PlaylistsStackParamList } from "../../navigation/TypeCheck";

export default function PlaylistDetail() {
  const {
    params: { playlist },
  } = useRoute<RouteProp<PlaylistsStackParamList, "PlaylistDetail">>();

  return <PlaylistTrackList playlist={playlist} />;
}
