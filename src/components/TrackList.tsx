import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, screenPadding, tabBarHeight } from "../utils/constants";
import TrackItem from "./TrackItem";
import { Track } from "react-native-track-player";

interface Props {
  tracks: Track[];
}
export default function TrackList({ tracks }: Props) {
  const insets = useSafeAreaInsets();

  const onTrackSelect = (track: Track) => {
    console.log(track);
  };
  return (
    <FlatList
      data={tracks}
      contentContainerStyle={[
        styles.contentContainerStyle,
        { paddingBottom: tabBarHeight + insets.bottom + 8 },
      ]}
      contentInsetAdjustmentBehavior="automatic"
      renderItem={({ item }) => (
        <TrackItem
          thumbnailUrl={item.artwork}
          title={item.title ?? ""}
          artist={item.artist}
          onTrackPress={() => onTrackSelect(item)}
        />
      )}
      ItemSeparatorComponent={() => <View style={styles.lineSeparator} />}
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
});
