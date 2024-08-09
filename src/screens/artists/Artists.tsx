import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useMemo } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import ArtistItem from "../../components/ArtistItem";
import EmptyListNotification from "../../components/EmptyListNotification";
import ItemDivider from "../../components/ItemDivider";
import { useNavigationSearch } from "../../hooks/useNavigationSearch";
import { ArtistsStackParamList } from "../../navigation/TypeCheck";
import { RootState } from "../../redux/store";
import { screenPadding, tabBarHeight } from "../../utils/constants";
import { Artist } from "../../utils/types";

export default function Artists() {
  const insets = useSafeAreaInsets();
  const search = useNavigationSearch({ placeholder: "Find in artists" });
  const tracks = useSelector((state: RootState) => state.library.tracks);
  const { onGoingTrack } = useSelector((state: RootState) => state.player);
  const navigation = useNavigation<NavigationProp<ArtistsStackParamList>>();

  const artists: Artist[] = useMemo(() => {
    return tracks.reduce((acc, track) => {
      const existingArtist = acc.find((artist) => artist.name === track.artist);
      // duplicate artist?
      if (existingArtist) {
        existingArtist.tracks.push(track);
      } else {
        //met the new artist in the tracks list
        acc.push({ name: track.artist ?? "Unknown", tracks: [track] });
      }
      return acc;
    }, [] as Artist[]);
  }, [tracks]);

  const filteredArtists = useMemo(() => {
    if (!search) return artists;
    return artists.filter((artist: Artist) =>
      artist.name.toLowerCase().includes(search.toLowerCase().trim())
    );
  }, [search, artists]);

  return (
    <FlatList
      contentInsetAdjustmentBehavior="automatic"
      data={filteredArtists}
      contentContainerStyle={[
        styles.contentContainer,
        {
          paddingBottom: onGoingTrack
            ? tabBarHeight + insets.bottom + 80
            : tabBarHeight + insets.bottom + 8,
        },
      ]}
      renderItem={({ item }) => (
        <ArtistItem
          name={item.name}
          onArtistPress={() =>
            navigation.navigate("ArtistDetail", { artist: item })
          }
        />
      )}
      ItemSeparatorComponent={() => <ItemDivider />}
      ListFooterComponent={<ItemDivider />}
      ListEmptyComponent={<EmptyListNotification listType="artist" />}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: screenPadding.horizontal,
  },
});
