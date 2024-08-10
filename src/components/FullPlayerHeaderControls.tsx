import { AntDesign, Entypo, SimpleLineIcons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { RootStackParamList } from "../navigation/TypeCheck";
import { updateIsOpeningFullPlayer } from "../redux/playerSlice";
import { colors } from "../utils/constants";

interface Props {
  viewQueue: boolean;
  handleViewQueue: () => void;
}
export default function FullPlayerHeaderControls({
  viewQueue,
  handleViewQueue,
}: Props) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.btnContainer, styles.btnLeft]}
        onPress={() => {
          navigation.goBack();
          dispatch(updateIsOpeningFullPlayer(false));
        }}
      >
        <Entypo name="chevron-thin-down" size={26} color={colors.icon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btnContainer, styles.btnRight]}
        onPress={handleViewQueue}
      >
        {viewQueue ? (
          <AntDesign name="close" size={26} color={colors.icon} />
        ) : (
          <SimpleLineIcons name="playlist" size={24} color={colors.icon} />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btnContainer: {
    paddingTop: 12,
    paddingBottom: 8,
  },
  btnLeft: {
    paddingRight: 8,
  },
  btnRight: {
    paddingLeft: 8,
  },
});
