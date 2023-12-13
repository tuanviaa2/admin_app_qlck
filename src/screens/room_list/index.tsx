import React from "react";
import { AppScreenContainer } from "../../layout";
import { AppHeader } from "../../components/header/AppHeader";
import { StyleSheet, View } from "react-native";
import { AppThemeColors } from "../../themes";
import { useTheme } from "../../hooks";
import { RoomItem } from "./components/RoomItem";
import { number } from "yup";
import { useRoute } from "@react-navigation/native";
import { Room } from "../../global";

const RoomListScreen = () => {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  const { rooms } = useRoute().params as { rooms: Room [] };
  return <AppScreenContainer>
    <AppHeader
      showBackButton
      title={"Danh sách phòng"} />
    <View style={styles.container}>
      {rooms.map((room) => {
        return <RoomItem
          key={room.name}
          name={room.name}
          residentId={room.residentId}
        />;
      })}
    </View>
  </AppScreenContainer>;
};
const useStyles = (colors: AppThemeColors) => StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "center"
  }
});
export default RoomListScreen;
