import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFooter,
  BottomSheetFooterProps,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, tabBarHeight } from "../utils/constants";
import EmptyListNotification from "./EmptyListNotification";

const AddToPlaylistModal = forwardRef<BottomSheetModal>(
  function AddToPlaylistModal(_, ref) {
    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => ["95%"], []);
    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          pressBehavior="close"
          style={[props.style, { backgroundColor: "gray" }]}
        />
      ),
      []
    );
    const renderFooter = useCallback(
      (props: BottomSheetFooterProps) => (
        <BottomSheetFooter {...props} bottomInset={insets.bottom}>
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Cancel</Text>
          </View>
        </BottomSheetFooter>
      ),
      []
    );

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        backgroundStyle={styles.backgroundStyle}
        handleIndicatorStyle={styles.indicatorStyle}
        handleStyle={styles.backgroundStyle}
        topInset={insets.top}
        backdropComponent={renderBackdrop}
        footerComponent={renderFooter}
      >
        {(props) => {
          if (!props) return <EmptyListNotification listType="track" />;
          const { data } = props;
          return <View></View>;
        }}
      </BottomSheetModal>
    );
  }
);

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  indicatorStyle: {
    backgroundColor: colors.textMuted,
    transform: [{ scaleX: 1.5 }, { scaleY: 1.2 }],
  },
  footerContainer: {
    height: tabBarHeight,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.light_background,
  },
  footerText: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "600",
  },
});

export default AddToPlaylistModal;
