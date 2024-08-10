import { Entypo, Fontisto, FontAwesome6 } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../navigation/TypeCheck";
import { colors } from "../utils/constants";
import { useDispatch } from "react-redux";
import { updateIsOpeningFullPlayer } from "../redux/playerSlice";

export default function FullPlayerHeaderControls() {
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
        <FontAwesome6 name="chevron-down" size={30} color={colors.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btnContainer, styles.btnRight]}>
        <Fontisto name="play-list" size={28} color={colors.icon} />
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
