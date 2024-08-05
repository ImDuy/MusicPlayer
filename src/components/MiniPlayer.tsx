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
  if (!activeTrack) return;

  return (
    <TouchableOpacity style={[styles.container, style]} activeOpacity={0.9}>
      <Image
        source={
          activeTrack.artwork
            ? { uri: activeTrack.artwork }
            : images.unknown_track
        }
        style={styles.image}
      />
      <Text style={styles.title} numberOfLines={1}>
        {activeTrack.title}
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
    gap: 4,
    backgroundColor: colors.light_background,
    borderRadius: 8,
  },
  image: {
    width: 42,
    height: 42,
    borderRadius: 8,
  },
  title: {
    fontSize: fontSize.base - 1,
    fontWeight: "700",
    color: colors.text,
    flex: 1,
    marginHorizontal: 8,
  },
});
