import React, { useMemo } from "react";
import PlaylistsList from "../../components/PlaylistsList";
import { useNavigationSearch } from "../../hooks/useNavigationSearch";
import { usePlaylists } from "../../hooks/usePlaylists";
import { Playlist } from "../../utils/types";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { PlaylistsStackParamList } from "../../navigation/TypeCheck";

export default function Playlists() {
  const search = useNavigationSearch({ placeholder: "Find in playlists" });
  const { playlists } = usePlaylists();
  const navigation = useNavigation<NavigationProp<PlaylistsStackParamList>>();

  const filteredPlaylists = useMemo(() => {
    if (!search) return playlists;
    return playlists.filter((playlist: Playlist) =>
      playlist.name.toLowerCase().includes(search.toLowerCase().trim())
    );
  }, [search, playlists]);

  const handlePlaylistItemPress = (playlist: Playlist) => {
    navigation.navigate("PlaylistDetail", { playlist });
  };

  return (
    <PlaylistsList
      displayedPlaylists={filteredPlaylists}
      onItemPress={handlePlaylistItemPress}
    />
  );
}
