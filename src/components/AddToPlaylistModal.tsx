import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFlatList,
  BottomSheetFooter,
  BottomSheetFooterProps,
  BottomSheetModal,
  useBottomSheetTimingConfigs,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React, {
  forwardRef,
  RefObject,
  useCallback,
  useMemo,
  useState,
} from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Easing } from "react-native-reanimated";
import Toast from "react-native-root-toast";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { usePlaylists } from "../hooks/usePlaylists";
import { addTrackToPlaylist } from "../redux/librarySlice";
import { colors, screenPadding, tabBarHeight } from "../utils/constants";
import AnimatedHeaderSearchBar from "./AnimatedHeaderSearchBar";
import EmptyListNotification from "./EmptyListNotification";
import ItemDivider from "./ItemDivider";
import PlaylistItem from "./PlaylistItem";

const AddToPlaylistModal = forwardRef<BottomSheetModal>(
  function AddToPlaylistModal(_, ref) {
    const insets = useSafeAreaInsets();
    const { playlists } = usePlaylists();
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState("");
    const snapPoints = useMemo(() => ["95%"], []);

    const animationConfigs = useBottomSheetTimingConfigs({
      duration: 200,
      easing: Easing.linear,
    });

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          pressBehavior="close"
          style={[props.style, { backgroundColor: "gray" }]}
        />
      ),
      []
    );
    const renderFooter = useCallback(
      (props: BottomSheetFooterProps) => (
        <BottomSheetFooter {...props} bottomInset={insets.bottom}>
          <TouchableOpacity
            style={styles.footerContainer}
            onPress={() => {
              (ref as RefObject<BottomSheetModalMethods>).current?.dismiss();
            }}
          >
            <Text style={styles.footerText}>Cancel</Text>
          </TouchableOpacity>
        </BottomSheetFooter>
      ),
      [insets.bottom, ref]
    );

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        backgroundStyle={styles.backgroundStyle}
        handleIndicatorStyle={styles.indicatorStyle}
        handleStyle={styles.backgroundStyle}
        topInset={insets.top}
        backdropComponent={renderBackdrop}
        footerComponent={renderFooter}
        onDismiss={() => setSearchText("")}
        animationConfigs={animationConfigs}
      >
        {(props) => {
          if (!props) return <EmptyListNotification listType="playlist" />;
          const { data } = props;
          // find playlists that not contain the track for add in
          const filteredPlaylists = playlists.filter((playlist) => {
            return (
              !playlist.tracks.some((track) => track.url === data.track.url) &&
              playlist.name
                .toLowerCase()
                .includes(searchText.toLowerCase().trim())
            );
          });

          return (
            <BottomSheetFlatList
              data={filteredPlaylists}
              keyboardShouldPersistTaps="always"
              contentContainerStyle={styles.flatListContentContainer}
              renderItem={({ item }) => (
                <PlaylistItem
                  thumbnailUrl={item.artworkPreview}
                  playlistName={item.name}
                  onPlaylistItemPress={() => {
                    dispatch(
                      addTrackToPlaylist({
                        playlistName: item.name,
                        track: data.track,
                      })
                    );
                    (
                      ref as RefObject<BottomSheetModalMethods>
                    ).current?.dismiss();
                    Toast.show(
                      `Track successfully added to \`${item.name}\` playlist`,
                      {
                        duration: Toast.durations.LONG,
                        position: -tabBarHeight - insets.bottom - 18,
                        backgroundColor: colors.textMuted,
                        textColor: colors.text,
                        opacity: 1,
                      }
                    );
                  }}
                />
              )}
              ItemSeparatorComponent={() => <ItemDivider />}
              ListFooterComponent={<ItemDivider />}
              ListEmptyComponent={
                <EmptyListNotification
                  listType="playlist"
                  notiText={
                    searchText
                      ? undefined
                      : "The track is already in all playlists"
                  }
                />
              }
              ListHeaderComponent={
                <AnimatedHeaderSearchBar
                  handleTextChanged={(text: string) => setSearchText(text)}
                  searchText={searchText}
                />
              }
            />
          );
        }}
      </BottomSheetModal>
    );
  }
);

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  indicatorStyle: {
    backgroundColor: colors.textMuted,
    transform: [{ scaleX: 1.5 }, { scaleY: 1.2 }],
  },

  footerContainer: {
    height: tabBarHeight,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.light_background,
  },
  footerText: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "600",
  },
  flatListContentContainer: {
    paddingHorizontal: screenPadding.horizontal,
  },
});

export default AddToPlaylistModal;
