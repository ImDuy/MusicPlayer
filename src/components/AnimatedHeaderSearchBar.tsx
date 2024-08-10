import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { colors, fontSize } from "../utils/constants";

interface Props {
  handleTextChanged: (text: string) => void;
  searchText: string;
}

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
export default function AnimatedHeaderSearchBar({
  handleTextChanged,
  searchText,
}: Props) {
  const textAnimated = useSharedValue({ height: 22, marginTop: 8 });
  const buttonWidthAnimated = useSharedValue(0);

  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: textAnimated.value.height,
      marginTop: textAnimated.value.marginTop,
    };
  });
  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: buttonWidthAnimated.value,
    };
  });

  const handleInputOnBlur = () => {
    buttonWidthAnimated.value = withTiming(0, { duration: 200 });
    textAnimated.value = withTiming(
      { height: 22, marginTop: 8 },
      { duration: 200 }
    );
  };

  const handleCancelPress = () => {
    handleTextChanged("");
    Keyboard.dismiss();
  };

  return (
    <View style={styles.headerContainer}>
      <Animated.Text style={[styles.headerText, textAnimatedStyle]}>
        Add to Playlist
      </Animated.Text>
      <View style={styles.searchBarContainer}>
        <View style={styles.searchInputContainer}>
          <AntDesign name="search1" size={22} color={colors.icon} />
          <TextInput
            placeholder="Find in playlists"
            placeholderTextColor={colors.textMuted}
            style={styles.searchInput}
            value={searchText}
            onChangeText={(text: string) => handleTextChanged(text)}
            onFocus={() => {
              buttonWidthAnimated.value = withTiming(60, { duration: 200 });
              textAnimated.value = withTiming(
                { height: 0, marginTop: 0 },
                { duration: 200 }
              );
            }}
            onBlur={handleInputOnBlur}
          />
        </View>
        <AnimatedTouchableOpacity
          style={[styles.cancelBtn, buttonAnimatedStyle]}
          onPress={handleCancelPress}
        >
          <Text style={styles.cancelText} numberOfLines={1}>
            Cancel
          </Text>
        </AnimatedTouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
  },
  headerText: {
    color: colors.text,
    fontWeight: "600",
    fontSize: 20,
  },
  searchBarContainer: {
    marginVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.light_background,
    borderRadius: 8,
    columnGap: 12,
  },
  searchInput: {
    fontSize: fontSize.sm,
    color: colors.text,
    flex: 1,
  },
  cancelBtn: {
    overflow: "hidden",
  },
  cancelText: {
    color: colors.primary,
    fontSize: fontSize.sm,
    fontWeight: "500",
    marginLeft: "auto",
  },
});
