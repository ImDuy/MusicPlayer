import React from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../utils/constants";

export default function ItemDivider() {
  return <View style={styles.lineSeparator} />;
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
