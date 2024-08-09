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

export default function Playlists() {
  const insets = useSafeAreaInsets();
  const search = useNavigationSearch({ placeholder: "Find in playlists" });
  const tracks = useSelector((state: RootState) => state.library.tracks);
  const { onGoingTrack } = useSelector((state: RootState) => state.player);
  const navigation = useNavigation<NavigationProp<PlaylistsStackParamList>>();

  const playlists: Playlist[] = useMemo(() => {
    return tracks.reduce((acc, track) => {
      track.playlist?.forEach((trackPlaylistName) => {
        const existingPlaylist = acc.find(
          (playlist) => playlist.name === trackPlaylistName
        );
        // duplicate playlist?
        if (existingPlaylist) {
          existingPlaylist.tracks.push(track);
        } else {
          //met the new playlist in the tracks list
          acc.push({
            name: trackPlaylistName,
            tracks: [track],
            artworkPreview: track.artwork,
          });
        }
      });
      return acc;
    }, [] as Playlist[]);
  }, [tracks]);

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
