import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import Favorites from "../screens/Favorites";
import { StackScreenWithSearchBar } from "../utils/navigation-options";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FavoritesStackParamList } from "./TypeCheck";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Stack = createNativeStackNavigator();
export default function FavoritesStack() {
  const navigation = useNavigation<NavigationProp<FavoritesStackParamList>>();
  const isOpeningFullPlayer = useSelector(
    (state: RootState) => state.player.isOpeningFullPlayer
  );
  useEffect(() => {
    // if opening full player -> not reset the tab stack screens
    if (!isOpeningFullPlayer) {
      const unsubscribe = navigation.addListener("blur", () => {
        navigation.reset({
          routes: [{ name: "Favorites" }],
        });
      });
      return unsubscribe;
    }
  }, [navigation, isOpeningFullPlayer]);

  return (
    <Stack.Navigator screenOptions={StackScreenWithSearchBar}>
      <Stack.Screen name="Favorites" component={Favorites} />
    </Stack.Navigator>
  );
}
