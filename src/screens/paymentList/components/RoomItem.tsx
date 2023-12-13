import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useTheme } from "../../../hooks";
import { AppThemeColors } from "../../../themes";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationProp, AppStackName } from "../../../navigations/AppNavigation/config";
import { images } from "../../../assets/images";

type  RoomItemProps = {
  name: number,
  residentInfo?: ResidentInfo
}
export const RoomItem = ({ name, residentInfo }: RoomItemProps) => {
  const navigation = useNavigation<AppNavigationProp>();
  const { colors } = useTheme();
  const styles = useStyles(colors);
  return <TouchableOpacity
    onPress={() => navigation.navigate(AppStackName.DetailRoom, { residentInfo: residentInfo })}
    style={styles.container}>
    <ImageBackground
      borderRadius={12}
      style={{ flex: 1 }}
      source={images.menuItem3}>
      <View style={styles.titleContainer}>
        <Text style={styles.roomName}>
          {`Phòng ` + name}
        </Text>
        <Text style={styles.isEmptyText}>
          {!residentInfo
            ? "Phòng trống"
            : residentInfo.fullName}
        </Text>
      </View>
    </ImageBackground>
  </TouchableOpacity>;
};
const useStyles = (colors: AppThemeColors) => StyleSheet.create({
  container: {
    width: "45%",
    height: 250,
    borderRadius: 12,
    elevation: 2
  },
  titleContainer: {
    width: "100%",
    height: "30%",
    backgroundColor: "rgba(0,0,0,0.6)",
    position: "absolute",
    bottom: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    padding: 16,
    justifyContent: "center",
    alignItems: "center"
  },
  roomName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white"
  },
  isEmptyText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white"
  }
});
