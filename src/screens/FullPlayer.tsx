import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-root-toast";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Event, useTrackPlayerEvents } from "react-native-track-player";
import { useDispatch, useSelector } from "react-redux";
import AnimatedHearButton from "../components/AnimatedHearButton";
import FullPlayerHeaderControls from "../components/FullPlayerHeaderControls";
import MovingText from "../components/MovingText";
import PlayerControls from "../components/PlayerControls";
import PlayerProgressBar from "../components/PlayerProgressBar";
import QueueView from "../components/QueueView";
import { useImageColors } from "../hooks/useImageColors";
import { toggleTrackFavorite } from "../redux/librarySlice";
import { updateOnGoingTrack } from "../redux/playerSlice";
import { RootState } from "../redux/store";
import {
  colors,
  fontSize,
  images,
  screenPadding,
  screenSize,
} from "../utils/constants";

let toast: any;
export default function FullPlayer() {
  const { top, bottom } = useSafeAreaInsets();
  const track = useSelector((state: RootState) => state.player.onGoingTrack);
  const queue = useSelector((state: RootState) => state.player.onGoingQueue);
  const dispatch = useDispatch();
  const [viewQueue, setViewQueue] = useState(false);

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], (event) => {
    dispatch(updateOnGoingTrack(event.track ?? null));
  });

  const imageColors = useImageColors(track?.artwork ?? images.unknown_track);
  const backgroundColors = {
    primary: imageColors
      ? imageColors.platform === "android"
        ? imageColors.average
        : imageColors.primary
      : "gray",
    secondary: imageColors
      ? imageColors.platform === "android"
        ? imageColors.darkMuted
        : imageColors.background
      : "black",
  };
  const toggleFavorite = () => {
    if (track) {
      if (toast) Toast.hide(toast);
      toast = Toast.show(
        track.rating === 1 ? "Removed from favorites!" : "Added to favorites!",
        {
          position: -bottom - (screenSize.height * 34) / 100,
          backgroundColor: colors.textMuted,
          textColor: colors.text,
          opacity: 1,
        }
      );
      dispatch(toggleTrackFavorite(track));
      dispatch(
        updateOnGoingTrack({ ...track, rating: track.rating === 1 ? 0 : 1 })
      );
    }
  };
  if (!track) return;
  return (
    <LinearGradient
      style={[styles.container, { paddingTop: top }]}
      colors={[backgroundColors.primary, backgroundColors.secondary]}
    >
      <FullPlayerHeaderControls
        viewQueue={viewQueue}
        handleViewQueue={() => setViewQueue((prevState) => !prevState)}
      />

      <View style={styles.dynamicView}>
        {/* Thumbnail */}
        {viewQueue ? (
          <QueueView playingTrack={track} queue={queue} />
        ) : (
          <View style={styles.imageContainer}>
            <Image
              source={
                track.artwork ? { uri: track.artwork } : images.unknown_track
              }
              style={styles.image}
            />
          </View>
        )}
      </View>

      {/* title, artist */}
      <View style={[styles.contentContainer]}>
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
      <PlayerProgressBar viewQueue={viewQueue} />

      {/* Player controls */}
      <PlayerControls />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  // TrackPlayer
  container: {
    flex: 1,
    paddingHorizontal: screenPadding.horizontal + 12,
    paddingBottom: screenSize.height * 0.04,
  },
  dynamicView: { flex: 1, justifyContent: "center" },
  imageContainer: {
    height: screenSize.width < 380 ? "90%" : "80%",
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
    height: "100%",
    borderRadius: 24,
  },
  contentContainer: {
    marginTop: 14,
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
});
