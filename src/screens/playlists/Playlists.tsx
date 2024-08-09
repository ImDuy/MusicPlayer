import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useMemo } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import EmptyListNotification from "../../components/EmptyListNotification";
import ItemDivider from "../../components/ItemDivider";
import PlaylistItem from "../../components/PlaylistItem";
import { useNavigationSearch } from "../../hooks/useNavigationSearch";
import { PlaylistsStackParamList } from "../../navigation/TypeCheck";
import { RootState } from "../../redux/store";
import { screenPadding, tabBarHeight } from "../../utils/constants";
import { Playlist } from "../../utils/types";
import { usePlaylists } from "../../hooks/usePlaylists";

export default function Playlists() {
  const insets = useSafeAreaInsets();
  const search = useNavigationSearch({ placeholder: "Find in playlists" });
  const { onGoingTrack } = useSelector((state: RootState) => state.player);
  const navigation = useNavigation<NavigationProp<PlaylistsStackParamList>>();
  const { playlists } = usePlaylists();

  const filteredPlaylists = useMemo(() => {
    if (!search) return playlists;
    return playlists.filter((playlist: Playlist) =>
      playlist.name.toLowerCase().includes(search.toLowerCase().trim())
    );
  }, [search, playlists]);

  return (
    <FlatList
      contentInsetAdjustmentBehavior="automatic"
      data={filteredPlaylists}
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
          onPlaylistItemPress={() =>
            navigation.navigate("PlaylistDetail", { playlist: item })
          }
        />
      )}
      ItemSeparatorComponent={() => <ItemDivider />}
      ListFooterComponent={<ItemDivider />}
      ListEmptyComponent={<EmptyListNotification listType="playlist" />}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: screenPadding.horizontal,
  },
});
