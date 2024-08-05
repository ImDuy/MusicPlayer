import { useEffect } from "react";
import TrackPlayer, { Capability, RepeatMode } from "react-native-track-player";

let isReady = false;
export const useSetupTrackPlayer = (onFinishedLoading?: () => void) => {
  useEffect(() => {
    const setupPlayer = async () => {
      if (isReady) return;
      try {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.updateOptions({
          capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
            Capability.Stop,
          ],
        });
        await TrackPlayer.setRepeatMode(RepeatMode.Queue);
        isReady = true;
        if (onFinishedLoading) onFinishedLoading();
      } catch (error) {
        isReady = false;
        console.log(error);
      }
    };
    setupPlayer();
  }, [onFinishedLoading]);
};
