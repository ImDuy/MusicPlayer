import { NavigationProp, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import Songs from "../screens/Songs";
import { StackScreenWithSearchBar } from "../utils/navigation-options";
import { SongsStackParamList } from "./TypeCheck";

const Stack = createNativeStackNavigator();
export default function SongsStack() {
  const navigation = useNavigation<NavigationProp<SongsStackParamList>>();
  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      navigation.reset({
        routes: [{ name: "Songs" }],
      });
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <Stack.Navigator screenOptions={StackScreenWithSearchBar}>
      <Stack.Screen name="Songs" component={Songs} />
    </Stack.Navigator>
  );
}
