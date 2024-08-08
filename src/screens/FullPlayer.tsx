import { NavigationProp, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Event, useTrackPlayerEvents } from "react-native-track-player";
import { useDispatch, useSelector } from "react-redux";
import AnimatedHearButton from "../components/AnimatedHearButton";
import MovingText from "../components/MovingText";
import PlayerControls from "../components/PlayerControls";
import PlayerProgressBar from "../components/PlayerProgressBar";
import { useImageColors } from "../hooks/useImageColors";
import { RootStackParamList } from "../navigation/TypeCheck";
import { updateOnGoingTrack } from "../redux/playerSlice";
import { RootState } from "../redux/store";
import {
  colors,
  fontSize,
  images,
  screenPadding,
  screenSize,
} from "../utils/constants";

export default function FullPlayer() {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const track = useSelector((state: RootState) => state.player.onGoingTrack);

  const dispatch = useDispatch();

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], (event) => {
    dispatch(updateOnGoingTrack(event.track ?? null));
  });

  const imageColors = useImageColors(track?.artwork ?? images.unknown_track);
  const backgroundColors = {
    primary: imageColors
      ? imageColors.platform === "android"
        ? imageColors.average
        : imageColors.detail
      : "gray",
    secondary: imageColors
      ? imageColors.platform === "android"
        ? imageColors.darkMuted
        : imageColors.primary
      : "black",
  };
  const toggleFavorite = () => {
    // if (rating) navigation.setParams({ track: { ...params.track, rating: 0 } });
    // else navigation.setParams({ track: { ...params.track, rating: 0 } });
  };
  if (!track) return;
  return (
    <LinearGradient
      style={[styles.container, { paddingTop: top }]}
      colors={[backgroundColors.primary, backgroundColors.secondary]}
    >
      <DismissPlayerIcon />

      {/* Thumbnail */}
      <View style={styles.imageContainer}>
        <Image
          source={track.artwork ? { uri: track.artwork } : images.unknown_track}
          style={styles.image}
        />
      </View>

      {/* title, artist */}
      <View style={styles.contentContainer}>
        <View style={styles.infoContainer}>
          <MovingText
            text={track.title ?? ""}
            style={styles.title}
            animationThreshold={30}
          />
          {track.artist && (
            <Text style={styles.artist} numberOfLines={1}>
              {track.artist}
            </Text>
          )}
        </View>
        <AnimatedHearButton
          iconSize={28}
          isFavorite={track.rating === 1}
          onPress={toggleFavorite}
        />
      </View>

      {/* Progress bar */}
      <PlayerProgressBar
        containerStyle={{
          marginTop:
            screenSize.width < 380
              ? screenSize.height * 0.04
              : screenSize.height * 0.03,
        }}
      />

      {/* Player controls */}
      <PlayerControls
        containerStyle={{ marginTop: screenSize.height * 0.01 }}
      />
    </LinearGradient>
  );
}

const DismissPlayerIcon = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity
      style={styles.dismissIconContainer}
      onPress={() => navigation.goBack()}
    >
      <View style={styles.dismissIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // TrackPlayer
  container: {
    flex: 1,
    paddingHorizontal: screenPadding.horizontal + 12,
  },
  imageContainer: {
    marginTop:
      screenSize.width < 380
        ? screenSize.height * 0.02
        : screenSize.height * 0.04,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 11,
    elevation: 32,
    borderRadius: 24,
  },
  image: {
    width: "100%",
    height: screenSize.height * 0.5,
    borderRadius: 24,
  },
  contentContainer: {
    marginTop:
      screenSize.width < 380
        ? screenSize.height * 0.06
        : screenSize.height * 0.08,
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
  },
  infoContainer: {
    flex: 1,
    overflow: "hidden",
  },
  title: {
    fontSize: screenSize.width < 380 ? fontSize.base + 2 : fontSize.lg,
    fontWeight: "bold",
    color: colors.text,
  },
  artist: {
    fontSize: screenSize.width < 380 ? fontSize.sm : fontSize.base - 2,
    color: colors.text,
    opacity: 0.5,
    maxWidth: "90%",
  },
  //   dismissIcon
  dismissIconContainer: {
    paddingTop: 8,
    paddingBottom: 12,
  },
  dismissIcon: {
    alignSelf: "center",
    width: screenSize.width < 380 ? 90 : 100,
    height: 6,
    borderRadius: 8,
    backgroundColor: colors.icon,
  },
});
