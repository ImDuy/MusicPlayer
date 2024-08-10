import React from "react";
import { FlatList, FlatListProps, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { screenPadding, tabBarHeight } from "../utils/constants";
import { Playlist } from "../utils/types";
import EmptyListNotification from "./EmptyListNotification";
import ItemDivider from "./ItemDivider";
import PlaylistItem from "./PlaylistItem";

interface Props extends Partial<FlatListProps<Playlist>> {
  displayedPlaylists: Playlist[];
  onItemPress: (playlist: Playlist) => void;
}
export default function PlaylistsList({
  displayedPlaylists,
  onItemPress,
  ...flatListProps
}: Props) {
  const insets = useSafeAreaInsets();
  const { onGoingTrack } = useSelector((state: RootState) => state.player);
  return (
    <FlatList
      contentInsetAdjustmentBehavior="automatic"
      data={displayedPlaylists}
      contentContainerStyle={[
        styles.contentContainer,
        {
          paddingBottom: onGoingTrack
            ? tabBarHeight + insets.bottom + 80
            : tabBarHeight + insets.bottom + 8,
        },
      ]}
      renderItem={({ item }) => (
        <PlaylistItem
          thumbnailUrl={item.artworkPreview}
          playlistName={item.name}
          onPlaylistItemPress={() => onItemPress(item)}
        />
      )}
      ItemSeparatorComponent={() => <ItemDivider />}
      ListFooterComponent={<ItemDivider />}
      ListEmptyComponent={<EmptyListNotification listType="playlist" />}
      {...flatListProps}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: screenPadding.horizontal,
  },
});
