import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootSiblingParent } from "react-native-root-siblings";
import TrackPlayer from "react-native-track-player";
import { Provider } from "react-redux";
import { useTrackPlayerSetup } from "./src/hooks/useTrackPlayerSetup";
import RootStack from "./src/navigation/RootStack";
import { store } from "./src/redux/store";
import playbackService from "./src/utils/playbackService";

SplashScreen.preventAutoHideAsync();
TrackPlayer.registerPlaybackService(() => playbackService);
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
            <RootSiblingParent>
              <BottomSheetModalProvider>
                <RootStack />
              </BottomSheetModalProvider>
            </RootSiblingParent>
          </GestureHandlerRootView>
        </NavigationContainer>
      </Provider>
    </>
  );
}
