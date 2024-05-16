import { AppHeader } from "../../components/header/AppHeader";
import { AppScreenContainer } from "../../layout";
import { Alert, StyleSheet, View } from "react-native";
import { useTheme } from "../../hooks";
import { AppThemeColors } from "../../themes";
import { AppTextInput } from "../../components/text_input/AppTextInput";
import React, { useState } from "react";
import { Appbar } from "react-native-paper";
import { AppButton } from "../../components/button/AppButton";
import ChangePassModal from "../../components/modal/ChangePassModal";
import AxiosInstance from "../../utils/AxiosInstance";
import { offLoading, showLoading, useAppDispatch, useAppSelector } from "../../redux";
import { ResidentInfo } from "../../global";
import { updateUser } from "../../redux/slices/user.slice";

const AdminProfileScreen = () => {
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const { colors } = useTheme();
  const styles = useStyles(colors);
  const [showChangePassModal, setShowChangePassModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.root.user) as { user: ResidentInfo };
  const [fullName, setFullName] = useState<string>(user.fullName);
  const [phoneNumber, setPhoneNumber] = useState<string>(user.phone_number);
  const [email, setEmail] = useState<string>(user.email);
  const [address, setAddress] = useState<string>(user.permanent_address);
  
//Hàm kiểm tra tính hợp lệ của các trường thông tin và hiển thị cảnh báo nếu cần.//
  const validateForm = () => {
    if(email.length==0){
      Alert.alert("Vui lòng nhập email")
      return false;
    }
    if (fullName.length == 0) {
      Alert.alert("Vui lòng nhập tên");
      return false;
    }
    if (phoneNumber.length == 0) {
      Alert.alert("Vui lòng nhập số điện thoại");
      return false;
    }
    if (address.length == 0) {
      Alert.alert("Vui lòng nhập địa chỉ");
      return false;
    }
    return  true
  }
  const updateProfile = () => {
    if(!validateForm()){
      return;
    }
    dispatch(showLoading());
    AxiosInstance().put("user/update/" + "admin", {
      ...user,
      fullName,
      email,
      permanent_address: address,
      phone_number: phoneNumber
    })
      .then((res: any) => {
        Alert.alert("Cập nhật thành công");
        console.log(res.user);
        dispatch(updateUser(res.user));
      }).catch(err => {
      Alert.alert("Có lỗi xảy ra khi cập nhật");
      console.log(err);
    }).finally(() => {
      dispatch(offLoading());
    });
  };
  return <AppScreenContainer>
    <AppHeader
      showBackButton
      action={<Appbar.Action
        onPress={() => {
          if (isEditMode) {
            updateProfile();4
            setEditMode(false);
          } else {
            setEditMode(true);
          }
        }}
        color={colors.textOnPrimary}
        icon={isEditMode ? "check" : "account-edit"} />}
      title={"Thông tin cá nhân"} />
    <View style={styles.container}>
      <AppTextInput
        modalTextInput={!isEditMode}
        value={fullName}
        onTextChange={setFullName}
        placeHolder={"Nhập tên của bạn..."}
        label={"Tên"} />
      <AppTextInput
        modalTextInput={!isEditMode}
        value={phoneNumber}
        onTextChange={setPhoneNumber}
        placeHolder={"Nhập số điện thoại của bạn..."}
        label={"Sô điện thoại"} />
      <AppTextInput
        modalTextInput={!isEditMode}
        value={email}
        onTextChange={setEmail}
        placeHolder={"Nhập email của bạn..."}
        label={"Email"} />
      <AppTextInput
        modalTextInput={!isEditMode}
        value={address}
        onTextChange={setAddress}
        placeHolder={"Nhập địa chỉ"}
        label={"Địa chỉ"} />
      <AppButton label={"Đổi mật khẩu"} onPress={() => {
        setShowChangePassModal(true);
      }} />
      <ChangePassModal
        visible={showChangePassModal} hide={() => {
        setShowChangePassModal(false);
      }} />
    </View>
  </AppScreenContainer>;
};
const useStyles = (colors: AppThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  }
});
export default AdminProfileScreen;
