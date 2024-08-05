import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Songs from "../screens/Songs";
import { StackScreenWithSearchBar } from "../utils/navigation-options";

const Stack = createNativeStackNavigator();
export default function SongsStack() {
  return (
    <Stack.Navigator screenOptions={StackScreenWithSearchBar}>
      <Stack.Screen name="Songs" component={Songs} />
    </Stack.Navigator>
  );
}
