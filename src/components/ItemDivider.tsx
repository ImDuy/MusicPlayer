import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { colors } from "../utils/constants";

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
}
export default function ItemDivider({ containerStyle }: Props) {
  return <View style={[styles.lineSeparator, containerStyle]} />;
}

const styles = StyleSheet.create({
  lineSeparator: {
    borderColor: colors.textMuted,
    borderWidth: StyleSheet.hairlineWidth,
    opacity: 0.3,
    marginVertical: 4,
    marginHorizontal: 6,
  },
});
