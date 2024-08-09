import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Playlists from "../screens/playlists/Playlists";
import { StackScreenWithSearchBar } from "../utils/navigation-options";
import PlaylistDetail from "../screens/playlists/PlaylistDetail";
import { colors } from "../utils/constants";
import { PlaylistsStackParamList } from "./TypeCheck";

const Stack = createNativeStackNavigator<PlaylistsStackParamList>();
export default function PlaylistsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Playlists"
        component={Playlists}
        options={StackScreenWithSearchBar}
      />
      <Stack.Screen
        name="PlaylistDetail"
        component={PlaylistDetail}
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
