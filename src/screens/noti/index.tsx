import { AppScreenContainer } from "../../layout";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../hooks";
import { AppThemeColors } from "../../themes";
import React, { useEffect, useState } from "react";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import axiosInstance from "../../utils/AxiosInstance";
import { useAppDispatch, useAppSelector } from "../../redux";
import { updateNoti } from "../../redux/slices/user.slice";
import { AppHeader } from "../../components/header/AppHeader";
import { formatDDMMYY } from "../../utils/stringFormatter";

const NotiScreen = () => {
  const { user } = useAppSelector(state => state.root.user);

  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const readNoti = (id: string) => {
    dispatch(updateNoti(id));
    axiosInstance().put("user/readNoti" + user.personal_identification_number, { notiId: id }).catch((err) => {
      console.log("loi")
    });
  };
  console.log(user.notifications)
  const styles = useStyles(colors);
  return <AppScreenContainer>
    <AppHeader
      showBackButton
      title={"Thông báo "}
      />
    <ScrollView contentContainerStyle={{ padding: 16, flex: 1 }}>
      {
        user.notifications.map((item:any)=>{
          console.log(item);
          return <TouchableOpacity key={item._id} onPress={() => {
            readNoti(item._id);
          }} style={styles.notiContainer}>
            <FontAwesomeIcon
              color={colors.primary}
              size={24}
              icon={faBell} />
            <View style={{ flex: 1 }}>
              {
                !item.isReading && <View style={{
                  width: 8,
                  height: 8,
                  backgroundColor: "green",
                  borderRadius: 4,
                  alignSelf: "flex-end"
                }} />
              }
              <Text style={styles.text}>
                {item.sender}
              </Text>
              <Text style={{...styles.text,fontWeight:'400'}}>
                {item.content}
              </Text>
              <Image style={{
                width:200,
                maxHeight:100,
                height:200
              }} source={{uri:item.image}}/>
              <Text style={{
                ...styles.text,
                width: "100%",
                textAlign: "right",
                fontWeight: "normal",
                fontSize: 14
              }}>
                {formatDDMMYY(item.time)}
              </Text>
            </View>
          </TouchableOpacity>;
        })
      }
      {
        !user.notifications.length &&
        <Text style={{ color: colors.text, fontSize: 18 }}>Bạn không có thông báo mới </Text>
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
export default NotiScreen;

