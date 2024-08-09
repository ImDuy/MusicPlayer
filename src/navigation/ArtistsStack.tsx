import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Artists from "../screens/artists/Artists";
import { StackScreenWithSearchBar } from "../utils/navigation-options";
import ArtistDetail from "../screens/artists/ArtistDetail";
import { ArtistsStackParamList } from "./TypeCheck";
import { colors } from "../utils/constants";

const Stack = createNativeStackNavigator<ArtistsStackParamList>();
export default function ArtistsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Artists"
        component={Artists}
        options={StackScreenWithSearchBar}
      />
      <Stack.Screen
        name="ArtistDetail"
        component={ArtistDetail}
        options={{
          headerTitle: "",
          headerBackVisible: true,
          headerStyle: { backgroundColor: colors.background },
          contentStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}
      />
    </Stack.Navigator>
  );
}
