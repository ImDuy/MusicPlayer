import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import { StyleSheet } from "react-native";
import { useSetupTrackPlayer } from "./src/hooks/useSetupTrackPlayer";
import RootStack from "./src/navigation/RootStack";

SplashScreen.preventAutoHideAsync();
export default function App() {
  const onFinishedSetupTrackPlayer = useCallback(() => {
    // useCallback as this func is used as dependency in useEffect in useSetupTrackPlayer
    SplashScreen.hideAsync();
  }, []);
  useSetupTrackPlayer(onFinishedSetupTrackPlayer);

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
