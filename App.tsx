import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import { StyleSheet } from "react-native";
import { useTrackPlayerSetup } from "./src/hooks/useTrackPlayerSetup";
import RootStack from "./src/navigation/RootStack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

SplashScreen.preventAutoHideAsync();
export default function App() {
  const onFinishedSetupTrackPlayer = useCallback(() => {
    // useCallback as this func is used as dependency in useEffect in useSetupTrackPlayer
    SplashScreen.hideAsync();
  }, []);
  useTrackPlayerSetup(onFinishedSetupTrackPlayer);

  return (
    <>
      <StatusBar style="auto" />
      <Provider store={store}>
        <NavigationContainer>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
              <RootStack />
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </NavigationContainer>
      </Provider>
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
