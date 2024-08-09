import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Artist } from "../../utils/types";
import { useNavigationSearch } from "../../hooks/useNavigationSearch";
import {
  colors,
  fontSize,
  images,
  screenPadding,
  tabBarHeight,
} from "../../utils/constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ArtistItem from "../../components/ArtistItem";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ArtistsStackParamList } from "../../navigation/TypeCheck";

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
    <View style={styles.container}>
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
        ItemSeparatorComponent={() => <View style={styles.lineSeparator} />}
        ListFooterComponent={<View style={styles.lineSeparator} />}
        ListEmptyComponent={
          <View>
            <Text style={styles.emptyListInformedText}>No artists found</Text>
            <Image
              source={images.unknown_artist}
              style={styles.emptyListInformedImage}
            />
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: {
    paddingHorizontal: screenPadding.horizontal,
  },
  lineSeparator: {
    borderColor: colors.textMuted,
    borderWidth: StyleSheet.hairlineWidth,
    opacity: 0.3,
    marginVertical: 4,
    marginHorizontal: 6,
  },
  emptyListInformedText: {
    fontSize: fontSize.base,
    color: colors.textMuted,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 20,
  },
  emptyListInformedImage: {
    width: 200,
    height: 200,
    marginVertical: 40,
    alignSelf: "center",
    opacity: 0.3,
  },
});
