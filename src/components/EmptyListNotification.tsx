import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors, fontSize, images } from "../utils/constants";

interface Props {
  listType: string;
}
export default function EmptyListNotification({ listType }: Props) {
  return (
    <View>
      <Text style={styles.emptyListInformedText}>No {listType} found</Text>
      <Image
        source={
          listType === "artist" ? images.unknown_artist : images.unknown_track
        }
        style={styles.emptyListInformedImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  emptyListInformedText: {
    fontSize: fontSize.base,
    color: colors.textMuted,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 20,
  },
  emptyListInformedImage: {
    width: 200,
    height: 200,
    marginVertical: 40,
    alignSelf: "center",
    opacity: 0.3,
  },
});
