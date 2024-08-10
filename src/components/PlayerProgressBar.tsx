import React, { useEffect } from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { Slider } from "react-native-awesome-slider";
import { useSharedValue } from "react-native-reanimated";
import TrackPlayer, { useProgress } from "react-native-track-player";
import { colors } from "../utils/constants";
import { formatSecondToMinute } from "../utils/helper";

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
}
export default function PlayerProgressBar({ containerStyle }: Props) {
  const { duration, position } = useProgress(250);
  const isSliding = useSharedValue(false);
  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(1);

  const trackElaspedTime = formatSecondToMinute(position);
  const trackRemainingTime = formatSecondToMinute(duration - position);

  useEffect(() => {
    if (!isSliding.value) {
      progress.value = duration > 0 ? position / duration : 0;
    }
  }, [isSliding, position, progress, duration]);

  return (
    <View style={containerStyle}>
      <Slider
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        theme={{
          minimumTrackTintColor: colors.minimumTrackTintColor,
          maximumTrackTintColor: colors.maximumTrackTintColor,
          bubbleBackgroundColor: colors.icon,
        }}
        containerStyle={styles.progressBarContainer}
        onSlidingStart={() => (isSliding.value = true)}
        onSlidingComplete={async (value) => {
          await TrackPlayer.seekTo(value * duration);
          isSliding.value = false;
        }}
      />

      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{trackElaspedTime}</Text>
        <Text style={styles.timeText}>- {trackRemainingTime}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressBarContainer: {
    height: 8,
    borderRadius: 20,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 2,
    marginTop: 10,
  },
  timeText: {
    color: colors.text,
    opacity: 0.75,
  },
});
