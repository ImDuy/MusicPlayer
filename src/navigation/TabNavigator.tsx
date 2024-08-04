import {
  FontAwesome,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Artists from "../screens/Artists";
import Favorites from "../screens/Favorites";
import Playlists from "../screens/Playlists";
import Songs from "../screens/Songs";
import { colors, fontSize } from "../utils/constants";
import { TabParamList } from "./TypeCheck";

const Tab = createBottomTabNavigator<TabParamList>();
export default function TabNavigator() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      initialRouteName="Songs"
      screenOptions={{
        // tab headers
        headerTransparent: true,
        headerTintColor: colors.text,
        headerTitleAlign: "left",
        headerShadowVisible: false,
        headerStyle: {
          height: 90 + insets.top,
        },
        headerTitleStyle: {
          fontSize: 30,
          marginLeft: 4,
        },

        // bottom tab bar
        tabBarActiveTintColor: colors.primary,
        tabBarLabelStyle: {
          fontSize: fontSize.xs,
          fontWeight: "500",
          marginBottom: 2,
        },
        tabBarBackground: () => (
          <BlurView
            // experimentalBlurMethod="dimezisBlurView"
            intensity={Platform.OS === "android" ? 15 : 95}
            style={{
              ...StyleSheet.absoluteFillObject,
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              overflow: "hidden",
            }}
          />
        ),
        tabBarStyle: {
          position: "absolute",
          borderTopWidth: 0,
          height: 54 + insets.bottom,
          paddingTop: 2,
        },
      }}
      sceneContainerStyle={{ backgroundColor: colors.background }}
    >
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="heart" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Playlists"
        component={Playlists}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="playlist-play"
              size={26}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Songs"
        component={Songs}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="musical-note-sharp" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Artists"
        component={Artists}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="users-line" size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
