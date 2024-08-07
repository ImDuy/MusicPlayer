import React from "react";
import { getColors } from "react-native-image-colors";
import {
  AndroidImageColors,
  ImageColorsResult,
  IOSImageColors,
} from "react-native-image-colors/build/types";
import { colors } from "../utils/constants";

export const useImageColors = (imageUrl: string) => {
  const [imageColors, setImageColors] = React.useState<
    AndroidImageColors | IOSImageColors | null
  >(null);

  React.useEffect(() => {
    getColors(imageUrl, {
      fallback: colors.background,
      cache: true,
      key: imageUrl,
    }).then((result) =>
      setImageColors(result as AndroidImageColors | IOSImageColors)
    );
  }, [imageUrl]);

  return imageColors;
};
