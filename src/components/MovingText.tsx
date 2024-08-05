import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  StyleProps,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface Props {
  text: string;
  animationThreshold: number;
  style?: StyleProps;
}
export default function MovingText({ text, animationThreshold, style }: Props) {
  const translateX = useSharedValue(0);
  const shouldAnimate = text.length >= animationThreshold;
  const textTransitionValue = text.length * 5;

  useEffect(() => {
    if (!shouldAnimate) return;
    translateX.value = withDelay(
      1000,
      withRepeat(
        withTiming(-textTransitionValue, {
          duration: 5000,
          easing: Easing.linear,
        }),
        -1,
        true
      )
    );
    return () => {
      cancelAnimation(translateX);
      translateX.value = 0;
    };
  }, [translateX, shouldAnimate, textTransitionValue]);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });
  return (
    <Animated.Text
      numberOfLines={1}
      style={[
        style,
        animatedStyle,
        shouldAnimate && {
          width: 99999, // preventing the ellipsis (...) tail from appearing
        },
      ]}
    >
      {text}
    </Animated.Text>
  );
}

const styles = StyleSheet.create({});
