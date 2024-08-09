import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onPress?: () => void;
}
export default function OptionButton({ children, onPress }: Props) {
  return (
    <TouchableHighlight
      onPress={onPress}
      activeOpacity={0.6}
      underlayColor="#171616"
      style={styles.wrapper}
    >
      <View style={styles.container}>{children}</View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 8,
  },
  container: {
    flexDirection: "row",

    alignItems: "center",
    padding: 12,
    paddingHorizontal: 16,
  },
});
