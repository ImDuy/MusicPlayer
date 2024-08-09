import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import ArtistTrackList from "../../components/ArtistTrackList";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ArtistsStackParamList } from "../../navigation/TypeCheck";

export default function ArtistDetail() {
  const {
    params: { artist },
  } = useRoute<RouteProp<ArtistsStackParamList, "ArtistDetail">>();
  return <ArtistTrackList artist={artist} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
