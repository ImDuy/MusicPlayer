import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewProps,
} from "react-native";
import { Track, useActiveTrack } from "react-native-track-player";
import { colors, fontSize, images } from "../utils/constants";
import { PlayPauseButton, SkipToNextButton } from "./PlayerControls";

export default function MiniPlayer({ style }: ViewProps) {
  const activeTrack: Track | undefined = useActiveTrack();

  const displayedTrack = activeTrack ?? {
    title: "This is a test ",
    artwork: undefined,
  };
  if (!displayedTrack) return;

  return (
    <TouchableOpacity style={[styles.container, style]}>
      <Image
        source={
          displayedTrack.artwork
            ? { uri: displayedTrack.artwork }
            : images.unknown_track
        }
        style={styles.image}
      />
      <Text style={styles.title} numberOfLines={1}>
        {displayedTrack.title}
      </Text>

      <PlayPauseButton iconSize={22} />
      <SkipToNextButton iconSize={22} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: "center",
    gap: 20,
    backgroundColor: colors.light_background,
    borderRadius: 8,
  },
  image: {
    width: 42,
    height: 42,
    borderRadius: 8,
  },
  title: {
    fontSize: fontSize.base,
    fontWeight: "700",
    color: colors.text,
    flex: 1,
  },
});
