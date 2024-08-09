import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React, { forwardRef, RefObject, useCallback, useMemo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { toggleTrackFavorite } from "../redux/librarySlice";
import { colors, fontSize, images, screenSize } from "../utils/constants";
import EmptyListNotification from "./EmptyListNotification";
import ItemDivider from "./ItemDivider";
import OptionButton from "./OptionButton";

interface Props {}
const TrackOptionsModal = forwardRef<BottomSheetModal>(
  function TrackOptionsModal(_, ref) {
    const dispatch = useDispatch();
    const snapPoints = useMemo(
      () => [screenSize.width < 380 ? "60%" : "50%"],
      []
    );

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          pressBehavior="close"
          style={[props.style, { backgroundColor: "gray" }]}
        />
      ),
      []
    );

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        backgroundStyle={styles.backgroundStyle}
        handleIndicatorStyle={styles.indicatorStyle}
        handleStyle={styles.backgroundStyle}
      >
        {(props) => {
          if (!props) return <EmptyListNotification listType="track" />;
          const { data } = props;
          return (
            <View style={styles.container}>
              {/* Track info */}
              <View style={styles.trackInfoContainer}>
                <Image
                  source={
                    data.track.artwork
                      ? { uri: data.track.artwork }
                      : images.unknown_track
                  }
                  style={styles.thumbnail}
                />
                <View style={styles.titleContainer}>
                  <Text style={styles.title} numberOfLines={2}>
                    {data.track.title}
                  </Text>
                  <Text style={styles.artist} numberOfLines={2}>
                    {data.track.artist}
                  </Text>
                </View>
              </View>

              <ItemDivider
                containerStyle={{
                  marginVertical: 8,
                  marginHorizontal: 0,
                  borderWidth: 1,
                }}
              />

              {/* Control buttons */}
              {/* Play track */}
              <OptionButton
                onPress={() => {
                  data.onTrackPlay(data.track);
                  (ref as RefObject<BottomSheetModalMethods>).current?.close();
                }}
              >
                <Ionicons
                  name="play-circle-outline"
                  size={38}
                  color={colors.icon}
                  style={{ flex: 1 }}
                />
                <Text style={[styles.optionText]}>Play this track</Text>
              </OptionButton>
              {/* Add to playlist */}
              <OptionButton
                onPress={() => {
                  (
                    ref as RefObject<BottomSheetModalMethods>
                  ).current?.dismiss();
                  data.addToPlaylistModalRef.current?.present();
                }}
              >
                <MaterialIcons
                  name="playlist-add"
                  size={38}
                  color={colors.icon}
                  style={{ transform: [{ translateX: 5 }], flex: 1 }}
                />
                <Text style={styles.optionText}>Add to playlist</Text>
              </OptionButton>
              {/* Add to favorites */}
              <OptionButton
                onPress={() => {
                  dispatch(toggleTrackFavorite(data.track));
                  (ref as RefObject<BottomSheetModalMethods>).current?.close();
                }}
              >
                <FontAwesome
                  name={data.rating === 1 ? "heart" : "heart-o"}
                  size={30}
                  color={colors.icon}
                  style={{ transform: [{ translateX: 5 }], flex: 1 }}
                />
                <Text style={styles.optionText}>
                  {data.rating === 1 ? "Remove from" : "Add to"} favorites
                </Text>
              </OptionButton>
            </View>
          );
        }}
      </BottomSheetModal>
    );
  }
);

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  indicatorStyle: {
    backgroundColor: colors.textMuted,
    transform: [{ scaleX: 1.5 }, { scaleY: 1.2 }],
  },

  container: {
    paddingHorizontal: 24,
    backgroundColor: colors.background,
  },
  trackInfoContainer: {
    flexDirection: "row",
    columnGap: 20,
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    color: colors.text,
    fontWeight: "700",
  },
  artist: {
    fontSize: fontSize.xs,
    color: colors.text,
  },
  optionText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "500",
    flex: 4,
  },
});

export default TrackOptionsModal;
