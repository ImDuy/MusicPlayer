import { NavigationProp, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import PlaylistDetail from "../screens/playlists/PlaylistDetail";
import Playlists from "../screens/playlists/Playlists";
import { colors } from "../utils/constants";
import { StackScreenWithSearchBar } from "../utils/navigation-options";
import { PlaylistsStackParamList } from "./TypeCheck";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Stack = createNativeStackNavigator<PlaylistsStackParamList>();
export default function PlaylistsStack() {
  const navigation = useNavigation<NavigationProp<PlaylistsStackParamList>>();
  const isOpeningFullPlayer = useSelector(
    (state: RootState) => state.player.isOpeningFullPlayer
  );
  useEffect(() => {
    // if opening full player -> not reset the tab stack screens
    if (!isOpeningFullPlayer) {
      const unsubscribe = navigation.addListener("blur", () => {
        navigation.reset({
          routes: [{ name: "Playlists" }],
        });
      });
      return unsubscribe;
    }
  }, [navigation, isOpeningFullPlayer]);

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
