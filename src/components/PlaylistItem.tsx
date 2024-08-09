import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import React from "react";
import { colors, images, screenSize } from "../utils/constants";
import { AntDesign } from "@expo/vector-icons";
interface Props {
  thumbnailUrl?: string;
  playlistName: string;
  onPlaylistItemPress?: () => void;
}
export default function PlaylistItem({
  thumbnailUrl,
  playlistName,
  onPlaylistItemPress,
}: Props) {
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#171616"
      style={styles.wrapper}
      onPress={onPlaylistItemPress}
    >
      <View style={styles.container}>
        <Image
          source={thumbnailUrl ? { uri: thumbnailUrl } : images.unknown_track}
          style={styles.thumbnail}
        />
        <Text style={styles.name} numberOfLines={1}>
          {playlistName}
        </Text>
        <AntDesign
          name="right"
          size={16}
          color={colors.text}
          style={{ opacity: 0.5 }}
        />
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 8,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
    padding: 8,
    paddingHorizontal: 16,
  },
  thumbnail: {
    borderRadius: 8,
    width: screenSize.width < 380 ? 60 : 70,
    aspectRatio: 1,
  },
  name: {
    flex: 1,
    color: colors.text,
    fontSize: 17,
    fontWeight: "600",
  },
});
