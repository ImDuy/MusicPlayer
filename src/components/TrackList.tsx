import deepEqual from "deep-equal";
import React from "react";
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
import EmptyListNotification from "./EmptyListNotification";
import ItemDivider from "./ItemDivider";
import QueueControls from "./QueueControls";
import TrackItem from "./TrackItem";

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

  const onTrackSelect = async (selectedTrack: Track) => {
    const selectedTrackIdx = listQueue.findIndex(
      (track) => track.url === selectedTrack.url
    );
    const isSameQueue = deepEqual(onGoingQueue, listQueue);
    dispatch(updateOnGoingTrack(selectedTrack)); //update app state first for immediate UI update on MiniPlayer
    dispatch(updateIsLoading(true));
    try {
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
  return (
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
          onTrackPress={() => onTrackSelect(item)}
        />
      )}
      ItemSeparatorComponent={() => <ItemDivider />}
      ListFooterComponent={<ItemDivider />}
      ListEmptyComponent={<EmptyListNotification listType="track" />}
      {...flatListProps}
    />
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: screenPadding.horizontal,
  },
});
