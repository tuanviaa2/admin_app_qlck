import React, { useEffect, useState } from "react";
import { AppScreenContainer } from "../../layout";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../../hooks";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationProp, AppStackName } from "../../navigations/AppNavigation/config";
import { AppHeader } from "../../components/header/AppHeader";
import { offLoading, showLoading, useAppDispatch } from "../../redux";
import axiosInstance from "../../utils/AxiosInstance";
import { Room } from "../../global";

type Floor = {
  name: number,
  rooms: Room[]
}
const FloorScreen = () => {
  const appDispatch = useAppDispatch();
  const navigation = useNavigation<AppNavigationProp>();
  const dispatch = useAppDispatch();
  const [floors, setFloors] = useState<Floor[]>([]);
  useEffect(() => {
    dispatch(showLoading());
    console.log('dang get')
    axiosInstance().get("room/getFloor").then((res: any) => {
      console.log(res.floor);
      setFloors(res.floor);
      dispatch(offLoading());
    }).catch((err: any) => {
      dispatch(showLoading());
      console.log({ ...err });
    }).finally(()=>{
      dispatch(offLoading());
    });
  }, []);
  return <AppScreenContainer>
    <AppHeader
      showBackButton
      title={"Danh sách tầng"} />
    <ScrollView contentContainerStyle={{ paddingVertical: 25 }}>
      {floors.map((floor) => {
        return <FloorItem
          rooms={floor.rooms}
          name={floor.name}
          key={floor.name} />;
      })}
    </ScrollView>
  </AppScreenContainer>;
};
const FloorItem = ({ name, rooms }: Floor) => {
  const { colors, isHotMode } = useTheme();
  const navigation = useNavigation<AppNavigationProp>();
  const getRoomNumber = () => {
    let number = 0;
    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i].residentId) number++;
    }
    return number;
  };
  return <TouchableOpacity
    onPress={() => {
      navigation.navigate(AppStackName.RoomList, { rooms: rooms });
    }}
    style={{
      padding: 16,
      height: 80,
      backgroundColor: name % 2 == 0
        ? colors.itemBackground
        : colors.background,
      justifyContent: "center"
    }}>
    <Text style={{
      fontWeight: "bold",
      color: colors.primary,
      fontSize: 18
    }}>
      {`Tầng ${name}`}
    </Text>
    <Text style={{
      fontWeight: "bold",
      color: isHotMode ? colors.subText : "white",
      fontSize: 18
    }}>
      {`${getRoomNumber()}/4`}
    </Text>
  </TouchableOpacity>;
};
export default FloorScreen;
