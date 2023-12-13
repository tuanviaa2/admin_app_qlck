import { AppScreenContainer } from "../../layout";
import { ScrollView, View } from "react-native";
import React from "react";
import { MenuItem, MenuItemProps } from "./components/MenuItem";
import { useTheme } from "../../hooks";
import { images } from "../../assets/images";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationProp, AppStackName } from "../../navigations/AppNavigation/config";
import { AppHeader } from "../../components/header/AppHeader";
import { AppButton } from "../../components/button/AppButton";
import { Appbar } from "react-native-paper";
import { localStorage } from "../../utils/storage";
import { ChangeThemeModeSwitch } from "../login/components/ChangeThemeModeSwitch";

function greeting() {
  const currentHour = new Date().getHours();
  if (currentHour >= 5 && currentHour < 11) {
    return "Chào buổi sáng!";
  } else if (currentHour >= 11 && currentHour < 13) {
    return "Chào buổi trưa!";
  } else if (currentHour >= 13 && currentHour < 18) {
    return "Chào buổi chiều!";
  } else {
    return "Chào buổi tối!";
  }
}

const HomeScreen = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const menuItems: MenuItemProps [] = [
    {
      label: "Danh sách phòng",
      onPress: () => {
        navigation.navigate(AppStackName.ListFloor);
      },
      image: images.menuItem1
    },
    {
      label: "Khoản nợ",
      onPress: () => {
        navigation.navigate(AppStackName.PaymentScreen);
      },
      image: images.menuItem2
    },
    {
      label: "Thông tin cư dân",
      onPress: () => {
        navigation.navigate(AppStackName.ResidentScreen);
      },
      image: images.menuItem3
    },
    {
      label: "Thông tin liên hệ",
      onPress: () => {
        navigation.navigate(AppStackName.AdminProfile);
      },
      image: images.menuItem4
    }
  ];
  const { colors } = useTheme();
  return <AppScreenContainer>
    <AppHeader
      title={greeting()}
      action={
        <Appbar.Action
          onPress={() => {
            navigation.navigate(AppStackName.NotiScreen);
          }}
          color={colors.textOnPrimary}
          icon={"bell"} />} />
    <ScrollView style={{ padding: 16 }}>
      <View style={{
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12
      }}>{menuItems.map((item, index) => {
        return <MenuItem
          key={index}
          label={item.label}
          onPress={item.onPress}
          image={item.image} />;
      })}
      </View>
      <AppButton
        label={"Đăng xuất"}
        onPress={() => {
          localStorage.clearAll()
          navigation.reset({
            index: 0,
            routes: [{ name: AppStackName.Login }]
          });
        }} />

    </ScrollView>
    <ChangeThemeModeSwitch />
  </AppScreenContainer>;
};
export default HomeScreen;
