import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import TrackPlayer, { Track } from "react-native-track-player";
import { useDispatch } from "react-redux";
import {
  updateIsLoading,
  updateOnGoingQueue,
  updateOnGoingTrack,
} from "../redux/playerSlice";
import { colors } from "../utils/constants";

interface Props {
  queue: Track[];
  containerStyle?: StyleProp<ViewStyle>;
}
export default function QueueControls({ containerStyle, queue }: Props) {
  const dispatch = useDispatch();
  const handleQueuePlay = async () => {
    dispatch(updateIsLoading(true));
    dispatch(updateOnGoingTrack(queue[0]));
    dispatch(updateOnGoingQueue(queue));
    await TrackPlayer.setQueue(queue);
    await TrackPlayer.play();
    dispatch(updateIsLoading(false));
  };
  const handleQueueShuffle = async () => {
    const shuffledQueue = [...queue].sort(() => Math.random() - 0.5);
    dispatch(updateIsLoading(true));
    dispatch(updateOnGoingTrack(shuffledQueue[0]));
    dispatch(updateOnGoingQueue(shuffledQueue));
    await TrackPlayer.setQueue(shuffledQueue);
    await TrackPlayer.play();
    dispatch(updateIsLoading(false));
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Play Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.btnContainer}
        onPress={handleQueuePlay}
      >
        <Ionicons name="play" size={22} color={colors.primary} />
        <Text style={styles.btnText}>Play</Text>
      </TouchableOpacity>
      {/* Shuffle Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.btnContainer}
        onPress={handleQueueShuffle}
      >
        <Ionicons name="shuffle-sharp" size={24} color={colors.primary} />
        <Text style={styles.btnText}>Shuffle</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    columnGap: 16,
    paddingHorizontal: 2,
    marginBottom: 8,
  },
  btnContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.btn_background,
    flexDirection: "row",
    columnGap: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  btnText: {
    color: colors.primary,
    fontWeight: "600",
    fontSize: 18,
  },
});
