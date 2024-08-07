import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { colors } from "../utils/constants";

interface Props {
  iconSize: number;
  isFavorite: boolean;
  onPress: () => void;
}

const AnimatedHeart = Animated.createAnimatedComponent(FontAwesome);
export default function AnimatedHearButton({
  iconSize,
  isFavorite,
  onPress,
}: Props) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handleOnPressWithAnimted = () => {
    scale.value = withSpring(
      1.4,
      {
        duration: 50,
        dampingRatio: 0.2,
        stiffness: 150,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 2,
      },
      () => (scale.value = withTiming(1, { duration: 100 }))
    );
    onPress();
  };
  return (
    <TouchableOpacity
      onPress={handleOnPressWithAnimted}
      style={styles.container}
    >
      <AnimatedHeart
        name={isFavorite ? "heart" : "heart-o"}
        size={iconSize}
        color={isFavorite ? colors.primary : colors.icon}
        style={animatedStyle}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingVertical: 12,
    borderRadius: 40,
  },
});
