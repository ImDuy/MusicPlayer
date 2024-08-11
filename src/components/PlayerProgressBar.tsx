import React, { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { Slider } from "react-native-awesome-slider";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import TrackPlayer, { useProgress } from "react-native-track-player";
import { colors } from "../utils/constants";
import { formatSecondToMinute } from "../utils/helper";

interface Props {
  viewQueue: boolean;
}
export default function PlayerProgressBar({ viewQueue }: Props) {
  // slider variables
  const { duration, position } = useProgress(250);
  const isSliding = useSharedValue(false);
  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(1);
  const trackElaspedTime = formatSecondToMinute(position);
  const trackRemainingTime = formatSecondToMinute(duration - position);
  // animation variables
  const marginTopAnimated = useSharedValue(22);
  const timeContainerAnimated = useSharedValue({ height: 16, marginTop: 10 });
  const marginTopAnimatedStyle = useAnimatedStyle(() => {
    return {
      marginTop: marginTopAnimated.value,
    };
  });
  const timeContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: timeContainerAnimated.value.height,
      marginTop: timeContainerAnimated.value.marginTop,
    };
  });

  useEffect(() => {
    if (!isSliding.value) {
      progress.value = duration > 0 ? position / duration : 0;
    }
  }, [isSliding, position, progress, duration]);

  useEffect(() => {
    if (viewQueue) {
      marginTopAnimated.value = withTiming(12, { duration: 100 });
      timeContainerAnimated.value = withTiming(
        { height: 0, marginTop: 4 },
        { duration: 100 }
      );
    } else {
      marginTopAnimated.value = withTiming(22, { duration: 100 });
      timeContainerAnimated.value = withTiming(
        { height: 16, marginTop: 10 },
        { duration: 100 }
      );
    }
  }, [viewQueue, marginTopAnimated, timeContainerAnimated]);

  return (
    <Animated.View style={marginTopAnimatedStyle}>
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

      <Animated.View style={[styles.timeContainer, timeContainerAnimatedStyle]}>
        <Text style={styles.timeText}>{trackElaspedTime}</Text>
        <Text style={styles.timeText}>- {trackRemainingTime}</Text>
      </Animated.View>
    </Animated.View>
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
  },
  timeText: {
    color: colors.text,
    opacity: 0.75,
  },
});
