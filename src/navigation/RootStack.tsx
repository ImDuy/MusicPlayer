import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import FullPlayer from "../screens/FullPlayer";
import { colors } from "../utils/constants";
import TabNavigator from "./TabNavigator";
import { RootStackParamList } from "./TypeCheck";

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen
        name="TrackPlayer"
        component={FullPlayer}
        options={{
          // presentation: "fullScreenModal",
          contentStyle: {
            backgroundColor: colors.background,
          },
          animation: "slide_from_bottom",
        }}
      />
    </Stack.Navigator>
  );
}
