import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import Songs from "../screens/Songs";
import { StackScreenWithSearchBar } from "../utils/navigation-options";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { SongsStackParamList } from "./TypeCheck";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Stack = createNativeStackNavigator();
export default function SongsStack() {
  const navigation = useNavigation<NavigationProp<SongsStackParamList>>();
  const isOpeningFullPlayer = useSelector(
    (state: RootState) => state.player.isOpeningFullPlayer
  );
  useEffect(() => {
    // if opening full player -> not reset the tab stack screens
    if (!isOpeningFullPlayer) {
      const unsubscribe = navigation.addListener("blur", () => {
        navigation.reset({
          routes: [{ name: "Songs" }],
        });
      });
      return unsubscribe;
    }
  }, [navigation, isOpeningFullPlayer]);

  return (
    <Stack.Navigator screenOptions={StackScreenWithSearchBar}>
      <Stack.Screen name="Songs" component={Songs} />
    </Stack.Navigator>
  );
}
