import React from "react";
import {
  FlatList,
  FlatListProps,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TrackPlayer, { Track } from "react-native-track-player";
import {
  colors,
  fontSize,
  images,
  screenPadding,
  tabBarHeight,
} from "../utils/constants";
import TrackItem from "./TrackItem";

interface Props extends Partial<FlatListProps<Track>> {
  tracks: Track[];
}
export default function TrackList({ tracks, ...flatListProps }: Props) {
  const insets = useSafeAreaInsets();

  const onTrackSelect = async (track: Track) => {
    await TrackPlayer.load(track);
    await TrackPlayer.play();
  };
  return (
    <FlatList
      {...flatListProps}
      data={tracks}
      contentContainerStyle={[
        styles.contentContainerStyle,
        { paddingBottom: tabBarHeight + insets.bottom + 8 },
      ]}
      contentInsetAdjustmentBehavior="automatic"
      renderItem={({ item }) => (
        <TrackItem
          trackUrl={item.url}
          thumbnailUrl={item.artwork}
          title={item.title ?? ""}
          artist={item.artist}
          onTrackPress={() => onTrackSelect(item)}
        />
      )}
      ItemSeparatorComponent={() => <View style={styles.lineSeparator} />}
      ListEmptyComponent={() => (
        <View>
          <Text style={styles.emptyListInfomedText}>No songs found</Text>
          <Image
            source={images.unknown_track}
            style={styles.emptyListInformedImage}
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: screenPadding.horizontal,
  },
  lineSeparator: {
    borderColor: colors.textMuted,
    borderWidth: StyleSheet.hairlineWidth,
    opacity: 0.3,
    marginVertical: 4,
    marginHorizontal: 6,
  },
  emptyListInfomedText: {
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
