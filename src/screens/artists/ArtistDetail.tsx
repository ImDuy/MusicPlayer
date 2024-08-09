import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import ArtistTrackList from "../../components/ArtistTrackList";
import { ArtistsStackParamList } from "../../navigation/TypeCheck";

export default function ArtistDetail() {
  const {
    params: { artist },
  } = useRoute<RouteProp<ArtistsStackParamList, "ArtistDetail">>();
  return <ArtistTrackList artist={artist} />;
}
