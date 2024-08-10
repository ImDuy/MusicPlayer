import { BottomSheetModal } from "@gorhom/bottom-sheet";
import deepEqual from "deep-equal";
import React, { useRef } from "react";
import { FlatList, FlatListProps, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TrackPlayer, { Track } from "react-native-track-player";
import { useDispatch, useSelector } from "react-redux";
import {
  updateIsLoading,
  updateOnGoingQueue,
  updateOnGoingTrack,
} from "../redux/playerSlice";
import { RootState } from "../redux/store";
import { screenPadding, tabBarHeight } from "../utils/constants";
import AddToPlaylistModal from "./AddToPlaylistModal";
import EmptyListNotification from "./EmptyListNotification";
import ItemDivider from "./ItemDivider";
import QueueControls from "./QueueControls";
import TrackItem from "./TrackItem";
import TrackOptionsModal from "./TrackOptionsModal";

interface Props extends Partial<FlatListProps<Track>> {
  displayedTracks: Track[];
  listQueue: Track[];
  hideQueueControls?: boolean;
}
export default function TrackList({
  displayedTracks: tracks,
  listQueue,
  hideQueueControls = false,
  ...flatListProps
}: Props) {
  const insets = useSafeAreaInsets();
  const { onGoingQueue, onGoingTrack } = useSelector(
    (state: RootState) => state.player
  );
  const dispatch = useDispatch();
  const optionsModalRef = useRef<BottomSheetModal>(null);
  const addToPlaylistModalRef = useRef<BottomSheetModal>(null);

  const handleTrackSelect = async (selectedTrack: Track) => {
    const selectedTrackIdx = listQueue.findIndex(
      (track) => track.url === selectedTrack.url
    );
    const isSameQueue = deepEqual(onGoingQueue, listQueue);
    try {
      dispatch(updateIsLoading(true));
      dispatch(updateOnGoingTrack(selectedTrack)); //update app state first for immediate UI update on MiniPlayer
      if (isSameQueue) {
        await TrackPlayer.skip(selectedTrackIdx);
      } else {
        //track selected in different queue
        await TrackPlayer.reset();
        await TrackPlayer.add(listQueue);
        await TrackPlayer.skip(selectedTrackIdx);
        dispatch(updateOnGoingQueue(listQueue));
      }

      await TrackPlayer.play();
      dispatch(updateIsLoading(false));
    } catch (error) {
      console.log("error when pressing on track list item", error);
    }
  };

  const handleTrackOptionPress = (track: Track) => {
    optionsModalRef.current?.present({
      track: track,
      onTrackPlay: handleTrackSelect,
      addToPlaylistModalRef: addToPlaylistModalRef,
    });
  };
  return (
    <>
      <FlatList
        data={tracks}
        contentContainerStyle={[
          styles.contentContainerStyle,
          {
            paddingBottom: onGoingTrack
              ? tabBarHeight + insets.bottom + 80
              : tabBarHeight + insets.bottom + 8,
          },
        ]}
        keyboardDismissMode="on-drag"
        contentInsetAdjustmentBehavior="automatic"
        ListHeaderComponent={
          !hideQueueControls ? <QueueControls queue={listQueue} /> : undefined
        }
        renderItem={({ item }) => (
          <TrackItem
            trackUrl={item.url}
            thumbnailUrl={item.artwork}
            title={item.title ?? ""}
            artist={item.artist}
            onTrackPress={() => handleTrackSelect(item)}
            onOptionsPress={() => handleTrackOptionPress(item)}
          />
        )}
        ItemSeparatorComponent={() => <ItemDivider />}
        ListFooterComponent={<ItemDivider />}
        ListEmptyComponent={<EmptyListNotification listType="track" />}
        {...flatListProps}
      />

      <TrackOptionsModal ref={optionsModalRef} />
      <AddToPlaylistModal ref={addToPlaylistModalRef} />
    </>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: screenPadding.horizontal,
  },
});
