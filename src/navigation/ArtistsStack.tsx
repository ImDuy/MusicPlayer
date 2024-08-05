import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Artists from "../screens/Artists";
import { StackScreenWithSearchBar } from "../utils/navigation-options";

const Stack = createNativeStackNavigator();
export default function ArtistsStack() {
  return (
    <Stack.Navigator screenOptions={StackScreenWithSearchBar}>
      <Stack.Screen name="Artists" component={Artists} />
    </Stack.Navigator>
  );
}
