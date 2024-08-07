import {
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React, { ComponentProps, useEffect, useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import TrackPlayer, {
  RepeatMode,
  useIsPlaying,
} from "react-native-track-player";
import { colors } from "../utils/constants";

interface Props {
  iconSize?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function PlayerControls({ containerStyle }: Props) {
  return (
    <View style={[styles.playerControlsContainer, containerStyle]}>
      <VolumeButton
        iconSize={28}
        containerStyle={{ flex: 1, alignItems: "center" }}
      />
      <SkipToPreviousButton
        iconSize={32}
        containerStyle={{ flex: 1, alignItems: "center" }}
      />
      <PlayPauseButton
        iconSize={58}
        containerStyle={{ flex: 2, alignItems: "center" }}
      />

      <SkipToNextButton
        iconSize={32}
        containerStyle={{ flex: 1, alignItems: "center" }}
      />
      <RepeatButton
        iconSize={28}
        containerStyle={{ flex: 1, alignItems: "center" }}
      />
    </View>
  );
}
export const PlayPauseButton = ({ iconSize, containerStyle }: Props) => {
  const { playing } = useIsPlaying();
  const rotate = useSharedValue(0);
  const translateX = useSharedValue(playing ? 4 : 0);

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
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btnContainer, containerStyle]}
    >
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

export const SkipToNextButton = ({ iconSize, containerStyle }: Props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        TrackPlayer.skipToNext();
      }}
      style={[styles.btnContainer, containerStyle]}
    >
      <FontAwesome6 name="forward" size={iconSize} color={colors.icon} />
    </TouchableOpacity>
  );
};

export const SkipToPreviousButton = ({ iconSize, containerStyle }: Props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        TrackPlayer.skipToPrevious();
      }}
      style={[styles.btnContainer, containerStyle]}
    >
      <FontAwesome6 name="backward" size={iconSize} color={colors.icon} />
    </TouchableOpacity>
  );
};

const VolumeButton = ({ iconSize, containerStyle }: Props) => {
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    async function getTrackVolume() {
      const volume = await TrackPlayer.getVolume();
      setMuted(volume === 0);
    }
    getTrackVolume();
  }, []);

  return (
    <TouchableOpacity
      onPress={async () => {
        if (muted) await TrackPlayer.setVolume(1);
        else await TrackPlayer.setVolume(0);
        setMuted((prevState) => !prevState);
      }}
      style={[styles.btnContainer, containerStyle]}
    >
      <Ionicons
        name={muted ? "volume-mute" : "volume-medium"}
        size={iconSize}
        color={colors.icon}
      />
    </TouchableOpacity>
  );
};

const RepeatButton = ({ iconSize, containerStyle }: Props) => {
  const [repeatMode, setRepeatMode] = useState<RepeatMode>(RepeatMode.Off);

  useEffect(() => {
    async function getTrackRepeatMode() {
      const mode = await TrackPlayer.getRepeatMode();
      setRepeatMode(mode);
    }
    getTrackRepeatMode();
  }, []);

  const onPress = () => {
    if (repeatMode === RepeatMode.Off) setRepeatMode(RepeatMode.Track);
    else if (repeatMode === RepeatMode.Track) setRepeatMode(RepeatMode.Queue);
    else setRepeatMode(RepeatMode.Off);
  };

  let icon: ComponentProps<typeof MaterialCommunityIcons>["name"] =
    "repeat-off";
  if (repeatMode === RepeatMode.Track) icon = "repeat-once";
  else if (repeatMode === RepeatMode.Queue) icon = "repeat";
  return (
    <TouchableOpacity
      style={[styles.btnContainer, containerStyle]}
      onPress={onPress}
    >
      <MaterialCommunityIcons name={icon} size={iconSize} color={colors.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  playerControlsContainer: {
    flexDirection: "row",
    paddingHorizontal: 4,
    alignItems: "center",
  },

  btnContainer: {
    padding: 10,
    paddingVertical: 12,
    borderRadius: 40,

    // backgroundColor: "red",
  },
});
