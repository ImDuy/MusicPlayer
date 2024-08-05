import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Track } from "../@type/Track";
import { colors, screenPadding, tabBarHeight } from "../utils/constants";
import TrackItem from "./TrackItem";

interface Props {
  tracks: Track[];
}
export default function TrackList({ tracks }: Props) {
  const insets = useSafeAreaInsets();
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
          title={item.title}
          artist={item.artist}
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
    marginVertical: 12,
    marginHorizontal: 6,
  },
});
