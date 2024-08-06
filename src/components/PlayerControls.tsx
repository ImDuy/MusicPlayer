import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import TrackPlayer, { useIsPlaying } from "react-native-track-player";
import { colors } from "../utils/constants";

interface Props {
  iconSize: number;
}
export const PlayPauseButton = ({ iconSize }: Props) => {
  const { playing } = useIsPlaying();
  const rotate = useSharedValue(0);
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotate.value}deg` },
        { translateX: translateX.value },
      ],
    };
  });

  const onPress = () => {
    rotate.value = -70;
    rotate.value = withTiming(0, { duration: 300 });
    if (playing) {
      translateX.value = withTiming(4, { duration: 300 });
      TrackPlayer.pause();
    } else {
      translateX.value = withTiming(0, { duration: 300 });
      TrackPlayer.play();
    }
  };
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Animated.View style={animatedStyle}>
        <FontAwesome6
          name={playing ? "pause" : "play"}
          size={iconSize}
          color={colors.icon}
        />
      </Animated.View>
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
    padding: 10,
    paddingVertical: 12,
    borderRadius: 40,
  },
});
