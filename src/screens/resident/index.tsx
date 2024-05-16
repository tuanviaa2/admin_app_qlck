import { AppScreenContainer } from "../../layout";
import React, { useEffect, useState } from "react";
import { useTheme } from "../../hooks";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppHeader } from "../../components/header/AppHeader";
import { AppThemeColors } from "../../themes";
import { useNavigation } from "@react-navigation/native";
import { Searchbar } from "react-native-paper";
import { useAppDispatch } from "../../redux";
import { getAllResident } from "../../redux/actions/resident.action";
import { ResidentInfo } from "../../global";
import { AppNavigationProp, AppStackName } from "../../navigations/AppNavigation/config";

const ResidentScreen = () => {
  const [searchQ, setSearchQ] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [searchResident, setSearchResident] = useState<ResidentInfo[]>([]);
  const { colors } = useTheme();
  const navigation = useNavigation<AppNavigationProp>();
  const dispatch = useAppDispatch();
  const [residents, setResident] = useState<ResidentInfo[]>([]);
  // lay danh sach cu dan tu sever do vao danh sach
  useEffect(() => {
    dispatch(getAllResident((resident: ResidentInfo[]) => {
      setResident(resident)
      setSearchResident(resident);
    })).then((res: any) => {
      if (!res.error) {
        console.log(res);
      }
    });
  }, []);
//

// tim kiem cu dan 
  useEffect(() => {
    if (searchQ === "") {
      setSearchResident(residents);
    } else {
      setSearchResident(residents.filter((item) => {
        return item.fullName.toLowerCase().includes(searchQ.toLowerCase());
      }));
    }
  }, [searchQ]);
  
  const styles = useStyles(colors);
  return <AppScreenContainer>
    <AppHeader
      showBackButton
      title={"Cư dân"}
    />
    <Searchbar
      value={searchQ}
      onChangeText={setSearchQ}
      style={{ margin: 16 }}
      placeholder="Search"
    />
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {
        searchResident.map((item, index) => {
          return <TouchableOpacity
            key={item._id}
            onPress={() => {
              navigation.navigate(AppStackName.DetailRoom, {
                residentId: item.personal_identification_number,
                roomName: ""
              });
            }}
            style={styles.notiContainer}>
            <Image style={{ width: 50, height: 50, borderRadius: 25 }}
                   source={{ uri: item.portrait_url
                       ? item.portrait_url
                       : "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg" }} />
            <View style={{ flex: 1 }}>
              {
                <View style={{
                  width: 8,
                  height: 8,
                  backgroundColor: "green",
                  borderRadius: 4,
                  alignSelf: "flex-end"
                }} />
              }
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.text, { color: colors.primary }]}>
                  {item.fullName}
                </Text>
              </View>
              <Text style={styles.text}>
                {item.phone_number}
              </Text>
            </View>
          </TouchableOpacity>;
        })
      }
    </ScrollView>
  </AppScreenContainer>;
};
const useStyles = (colors: AppThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  notiContainer: {
    borderRadius: 8,
    elevation: 2,
    backgroundColor: colors.itemBackground,
    marginTop: 8,
    padding: 16,
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    minHeight: 80
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.text
  }
});
export default ResidentScreen;
