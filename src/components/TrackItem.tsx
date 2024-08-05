import {} from "@expo/vector-icons";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { useActiveTrack } from "react-native-track-player";
import { colors, fontSize, images } from "../utils/constants";
import { Entypo } from "@expo/vector-icons";
interface Props {
  trackUrl: string;
  thumbnailUrl?: string;
  title: string;
  artist?: string;
  onTrackPress?: () => void;
}
export default function TrackItem({
  trackUrl,
  thumbnailUrl,
  title,
  artist,
  onTrackPress,
}: Props) {
  const isActiveTrack = useActiveTrack()?.url === trackUrl;
  return (
    <TouchableHighlight
      onPress={onTrackPress}
      activeOpacity={0.6}
      underlayColor="#171616"
      style={styles.wrapper}
    >
      <View style={styles.container}>
        <Image
          source={thumbnailUrl ? { uri: thumbnailUrl } : images.unknown_track}
          style={{ ...styles.image, opacity: isActiveTrack ? 0.6 : 1 }}
        />

        <View style={styles.infoContainer}>
          <Text
            style={{
              ...styles.title,
              color: isActiveTrack ? colors.primary : colors.text,
            }}
          >
            {title}
          </Text>
          {artist && (
            <Text
              style={{
                ...styles.artist,
                color: isActiveTrack ? colors.light_primary : colors.textMuted,
              }}
              numberOfLines={1}
            >
              {artist}
            </Text>
          )}
        </View>

        <Entypo name="dots-three-horizontal" size={18} color={colors.icon} />
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
    gap: 20,
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: fontSize.sm,
    fontWeight: "600",
  },
  artist: {
    fontSize: fontSize.xs,
    marginTop: 4,
  },
});
