import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";
import LoaderKit from "react-native-loader-kit";
import { Event, useTrackPlayerEvents } from "react-native-track-player";
import { useDispatch, useSelector } from "react-redux";
import { RootStackParamList } from "../navigation/TypeCheck";
import { updateOnGoingTrack } from "../redux/playerSlice";
import { RootState } from "../redux/store";
import { colors, fontSize, images } from "../utils/constants";
import MovingText from "./MovingText";
import { PlayPauseButton, SkipToNextButton } from "./PlayerControls";

export default function MiniPlayer({ style }: ViewProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { onGoingTrack, isLoading } = useSelector(
    (state: RootState) => state.player
  );
  const dispatch = useDispatch();

  // listener to active track changed event for update app state when active track auto change when ended
  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], (event) => {
    if (isLoading) return;
    dispatch(updateOnGoingTrack(event.track ?? null));
  });

  if (!onGoingTrack) return;
  const onPress = () => {
    navigation.navigate("TrackPlayer");
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <Image
        source={
          onGoingTrack.artwork
            ? { uri: onGoingTrack.artwork }
            : images.unknown_track
        }
        style={styles.image}
      />
      <View style={styles.titleContainer}>
        <MovingText
          text={onGoingTrack.title ?? ""}
          style={styles.title}
          animationThreshold={25}
        />
      </View>

      {/* player controls */}
      {isLoading ? (
        <LoaderKit
          name="BallClipRotateMultiple"
          color={colors.icon}
          style={styles.iconLoading}
        />
      ) : (
        <PlayPauseButton iconSize={23} />
      )}
      {isLoading ? (
        <LoaderKit
          name="BallClipRotateMultiple"
          color={colors.icon}
          style={styles.iconLoading}
        />
      ) : (
        <SkipToNextButton iconSize={23} />
      )}
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
  titleContainer: {
    flex: 1,
    overflow: "hidden",
    marginHorizontal: 8,
  },
  title: {
    fontSize: fontSize.base - 1,
    fontWeight: "700",
    color: colors.text,
  },
  iconLoading: { width: 23, height: 23, marginRight: 12, marginVertical: 12 },
});
