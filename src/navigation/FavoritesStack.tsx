import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import Favorites from "../screens/Favorites";
import { StackScreenWithSearchBar } from "../utils/navigation-options";
import { FavoritesStackParamList } from "./TypeCheck";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();
export default function FavoritesStack() {
  const navigation = useNavigation<NavigationProp<FavoritesStackParamList>>();
  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      navigation.reset({
        routes: [{ name: "Favorites" }],
      });
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <Stack.Navigator screenOptions={StackScreenWithSearchBar}>
      <Stack.Screen name="Favorites" component={Favorites} />
    </Stack.Navigator>
  );
}
