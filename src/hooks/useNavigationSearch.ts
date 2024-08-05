import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { SearchBarProps } from "react-native-screens";
import { colors } from "../utils/constants";

export const useNavigationSearch = (searchBarOptions?: SearchBarProps) => {
  const [search, setSearch] = useState("");

  const handleOnChangeText: SearchBarProps["onChangeText"] = ({
    nativeEvent: { text },
  }) => {
    setSearch(text);
  };

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        // android
        headerIconColor: "white",
        textColor: colors.text,
        hintTextColor: colors.textMuted,
        // ios
        tintColor: colors.primary,
        hideWhenScrolling: false,
        ...searchBarOptions,
        onChangeText: handleOnChangeText,
      },
    });
  }, [navigation, searchBarOptions]);
  return search;
};
