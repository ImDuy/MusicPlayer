import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Favorites from "../screens/Favorites";
import { StackScreenWithSearchBar } from "../utils/navigation-options";

const Stack = createNativeStackNavigator();
export default function FavoritesStack() {
  return (
    <Stack.Navigator screenOptions={StackScreenWithSearchBar}>
      <Stack.Screen name="Favorites" component={Favorites} />
    </Stack.Navigator>
  );
}
