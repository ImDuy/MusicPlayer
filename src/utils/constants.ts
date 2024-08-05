import { Dimensions } from "react-native";

export const colors = {
  primary: "#f34d53",
  light_primary: "#fc3c44",
  background: "#000",
  light_background: "#252525",
  text: "#fff",
  textMuted: "#9ca3af",
  icon: "#fff",
  maximumTrackTintColor: "rgba(255,255,255,0.4)",
  minimumTrackTintColor: "rgba(255,255,255,0.6)",
};

export const images = {
  unknown_artist: require("../../assets/unknown_artist.png"),
  unknown_track: require("../../assets/unknown_track.png"),
};

export const fontSize = {
  xs: 12,
  sm: 16,
  base: 20,
  lg: 24,
  xlg: 26,
};

export const screenPadding = {
  horizontal: 16,
};

export const screenSize = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};

export const tabBarHeight = 54;
