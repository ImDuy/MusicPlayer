import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import LoaderKit from "react-native-loader-kit";
import TrackPlayer, { Track } from "react-native-track-player";
import { colors, fontSize, images } from "../utils/constants";

interface Props {
  playingTrack: Track;
  queue: Track[];
}
export default function QueueView({ playingTrack, queue }: Props) {
  const playingTrackIdx = queue.findIndex(
    (track) => track.url === playingTrack.url
  );
  if (playingTrackIdx === -1) return;
  const upNextQueue = queue.slice(playingTrackIdx + 1);
  return (
    <View style={styles.container}>
      <Text style={styles.bigHeader}>Now Playing</Text>
      <QueueItem item={playingTrack} isPlayingTrack queue={queue} />
      <Text style={styles.smallHeader}>Up Next</Text>
      <FlatList
        data={upNextQueue}
        renderItem={({ item }) => <QueueItem item={item} queue={queue} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const QueueItem = ({
  item,
  queue,
  isPlayingTrack = false,
}: {
  item: Track;
  queue: Track[];
  isPlayingTrack?: boolean;
}) => {
  const itemIdx = queue.findIndex((track) => track.url === item.url);
  if (itemIdx === -1) return;

  const handleItemPress = async () => {
    await TrackPlayer.skip(itemIdx);
    await TrackPlayer.play();
  };

  return (
    <TouchableHighlight
      style={[
        styles.itemWrapper,
        isPlayingTrack && { backgroundColor: "#342934" },
      ]}
      activeOpacity={0.6}
      underlayColor="#342934"
      onPress={handleItemPress}
    >
      <View style={styles.itemContainer}>
        <Image
          source={item.artwork ? { uri: item.artwork } : images.unknown_track}
          style={styles.itemImage}
        />
        <View style={styles.itemInfoContainer}>
          <Text style={styles.itemTitle} numberOfLines={1}>
            {item.title}
          </Text>
          {item.artist && (
            <Text style={styles.itemArtist} numberOfLines={1}>
              {item.artist}
            </Text>
          )}
        </View>

        {isPlayingTrack ? (
          <LoaderKit
            name="LineScale"
            color={colors.icon}
            style={{ width: 18, height: 18, transform: [{ translateX: -6 }] }}
          />
        ) : (
          <Ionicons name="menu-outline" size={28} color={colors.icon} />
        )}
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bigHeader: {
    fontSize: fontSize.base,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 4,
  },
  smallHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginTop: 4,
  },
  itemWrapper: {
    borderRadius: 12,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 12,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  itemImage: {
    width: 46,
    height: 46,
    borderRadius: 8,
  },
  itemInfoContainer: {
    flex: 1,
    columnGap: 2,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: colors.text,
  },
  itemArtist: {
    color: colors.textMuted,
  },
});
