import React from "react";
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  ViewProps,
} from "react-native";
import { Track, useActiveTrack } from "react-native-track-player";
import { colors, fontSize, images } from "../utils/constants";
import { PlayPauseButton, SkipToNextButton } from "./PlayerControls";
import MovingText from "./MovingText";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/TypeCheck";
export default function MiniPlayer({ style }: ViewProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const activeTrack: Track | undefined = useActiveTrack();
  if (!activeTrack) return;

  const onPress = () => {
    navigation.navigate("TrackPlayer", { track: activeTrack });
  };
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <Image
        source={
          activeTrack.artwork
            ? { uri: activeTrack.artwork }
            : images.unknown_track
        }
        style={styles.image}
      />
      <View style={styles.titleContainer}>
        <MovingText
          text={activeTrack.title ?? ""}
          style={styles.title}
          animationThreshold={25}
        />
      </View>

      <PlayPauseButton iconSize={23} />
      <SkipToNextButton iconSize={23} />
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
});
