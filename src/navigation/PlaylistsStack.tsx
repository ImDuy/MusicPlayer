import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Playlists from "../screens/Playlists";
import { StackScreenWithSearchBar } from "../utils/navigation-options";

const Stack = createNativeStackNavigator();
export default function PlaylistsStack() {
  return (
    <Stack.Navigator screenOptions={StackScreenWithSearchBar}>
      <Stack.Screen name="Playlists" component={Playlists} />
    </Stack.Navigator>
  );
}
