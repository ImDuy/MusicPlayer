import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import TrackPlayer, { useIsPlaying } from "react-native-track-player";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { colors } from "../utils/constants";

interface Props {
  iconSize: number;
}
export const PlayPauseButton = ({ iconSize }: Props) => {
  const { playing } = useIsPlaying();
  return (
    <TouchableOpacity
      onPress={() => {
        playing ? TrackPlayer.pause() : TrackPlayer.play();
      }}
      style={styles.container}
    >
      <FontAwesome
        name={playing ? "pause" : "play"}
        size={iconSize}
        color={colors.icon}
      />
    </TouchableOpacity>
  );
};

export const SkipToNextButton = ({ iconSize }: Props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        TrackPlayer.skipToNext();
      }}
      style={styles.container}
    >
      <FontAwesome6 name="forward" size={iconSize} color={colors.icon} />
    </TouchableOpacity>
  );
};

export const SkipToPrevious = ({ iconSize }: Props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        TrackPlayer.skipToPrevious();
      }}
      style={styles.container}
    >
      <FontAwesome6 name="backward" size={iconSize} color={colors.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
    padding: 10,
    paddingVertical: 12,
    borderRadius: 40,
  },
});
