import { NavigationProp, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import PlaylistDetail from "../screens/playlists/PlaylistDetail";
import Playlists from "../screens/playlists/Playlists";
import { colors } from "../utils/constants";
import { StackScreenWithSearchBar } from "../utils/navigation-options";
import { PlaylistsStackParamList } from "./TypeCheck";

const Stack = createNativeStackNavigator<PlaylistsStackParamList>();
export default function PlaylistsStack() {
  const navigation = useNavigation<NavigationProp<PlaylistsStackParamList>>();
  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      navigation.reset({
        routes: [{ name: "Playlists" }],
      });
    });
    return unsubscribe;
  }, [navigation]);

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
