import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import React from "react";
import { colors, images } from "../utils/constants";

interface Props {
  imageUrl?: string;
  name: string;
  onArtistPress?: () => void;
}
export default function ArtistItem({ imageUrl, name, onArtistPress }: Props) {
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#171616"
      style={styles.wrapper}
      onPress={onArtistPress}
    >
      <View style={styles.container}>
        <Image
          source={imageUrl ? { uri: imageUrl } : images.unknown_artist}
          style={styles.image}
        />
        <Text style={styles.text} numberOfLines={1}>
          {name}
        </Text>
      </View>
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
    columnGap: 20,
    padding: 8,
    paddingHorizontal: 16,
  },
  image: {
    borderRadius: 32,
    width: 40,
    height: 40,
  },
  text: {
    color: colors.text,
    fontSize: 17,
    flex: 1,
  },
});
