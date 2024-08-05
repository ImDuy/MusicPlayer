import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { colors, fontSize, screenSize } from "./constants";
import { Platform } from "react-native";

export const StackScreenWithSearchBar: NativeStackNavigationOptions = {
  // content background
  contentStyle: {
    backgroundColor: colors.background,
  },
  // tab headers
  headerTintColor: colors.text,
  headerTitleAlign: Platform.OS === "ios" ? "left" : "center",
  headerTransparent: Platform.OS === "ios" ? true : false,
  // ios specific
  headerLargeTitle: true,
  headerLargeTitleShadowVisible: false,
  headerBlurEffect: "prominent",
  headerLargeStyle: {
    backgroundColor: colors.background,
  },
  headerLargeTitleStyle: {
    fontSize: screenSize.width < 380 ? fontSize.lg : fontSize.xlg,
    fontWeight: "800",
  },
  //   android specific
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: colors.background,
  },
  headerTitleStyle: {
    fontSize: screenSize.width < 380 ? fontSize.lg : fontSize.xlg,
    fontWeight: "800",
  },
};
