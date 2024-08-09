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
import { colors, fontSize, tabBarHeight } from "../utils/constants";
import ArtistsStack from "./ArtistsStack";
import FavoritesStack from "./FavoritesStack";
import PlaylistsStack from "./PlaylistsStack";
import SongsStack from "./SongsStack";
import { TabParamList } from "./TypeCheck";
import MiniPlayer from "../components/MiniPlayer";

const Tab = createBottomTabNavigator<TabParamList>();
export default function TabNavigator() {
  const insets = useSafeAreaInsets();
  return (
    <>
      <Tab.Navigator
        initialRouteName="SongsStack"
        screenOptions={{
          lazy: false,
          headerShown: false,
          // bottom tab bar
          tabBarActiveTintColor: colors.primary,
          tabBarLabelStyle: {
            fontSize: fontSize.xs,
            fontWeight: "500",
            marginBottom: 2,
          },
          tabBarBackground: () => (
            <BlurView
              experimentalBlurMethod="dimezisBlurView"
              intensity={Platform.OS === "android" ? 30 : 90}
              style={{
                ...StyleSheet.absoluteFillObject,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                overflow: "hidden",
              }}
            />
          ),
          tabBarStyle: {
            position: "absolute",
            borderTopWidth: 0,
            height: tabBarHeight + insets.bottom,
            paddingTop: 2,
          },
          tabBarInactiveTintColor: colors.textMuted,
        }}
      >
        <Tab.Screen
          name="FavoritesStack"
          component={FavoritesStack}
          options={{
            tabBarLabel: "Favorites",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="heart" size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="PlaylistsStack"
          component={PlaylistsStack}
          options={{
            tabBarLabel: "Playlists",
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
          name="SongsStack"
          component={SongsStack}
          options={{
            tabBarLabel: "Songs",
            tabBarIcon: ({ color }) => (
              <Ionicons name="musical-note-sharp" size={22} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="ArtistsStack"
          component={ArtistsStack}
          options={{
            tabBarLabel: "Artists",
            tabBarIcon: ({ color }) => (
              <FontAwesome6 name="users-line" size={20} color={color} />
            ),
          }}
        />
      </Tab.Navigator>

      <MiniPlayer
        style={{
          position: "absolute",
          left: 8,
          right: 8,
          bottom: insets.bottom + tabBarHeight + 4,
        }}
      />
    </>
  );
}
