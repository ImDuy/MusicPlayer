import { NavigationProp, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ArtistDetail from "../screens/artists/ArtistDetail";
import Artists from "../screens/artists/Artists";
import { colors } from "../utils/constants";
import { StackScreenWithSearchBar } from "../utils/navigation-options";
import { ArtistsStackParamList } from "./TypeCheck";

const Stack = createNativeStackNavigator<ArtistsStackParamList>();
export default function ArtistsStack() {
  const navigation = useNavigation<NavigationProp<ArtistsStackParamList>>();
  const isOpeningFullPlayer = useSelector(
    (state: RootState) => state.player.isOpeningFullPlayer
  );
  useEffect(() => {
    // if opening full player -> not reset the tab stack screens
    if (!isOpeningFullPlayer) {
      const unsubscribe = navigation.addListener("blur", () => {
        navigation.reset({
          routes: [{ name: "Artists" }],
        });
      });
      return unsubscribe;
    }
  }, [navigation, isOpeningFullPlayer]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Artists"
        component={Artists}
        options={StackScreenWithSearchBar}
      />
      <Stack.Screen
        name="ArtistDetail"
        component={ArtistDetail}
        options={{
          headerTitle: "",
          headerBackVisible: true,
          headerStyle: { backgroundColor: colors.background },
          contentStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
