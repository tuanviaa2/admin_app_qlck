import React, { useState } from "react";
import { Alert, Modal, StyleSheet, View } from "react-native";
import { AppThemeColors } from "../../themes";
import { AppHeader } from "../header/AppHeader";
import { useTheme } from "../../hooks";
import { AppTextInput } from "../text_input/AppTextInput";
import { AppButton } from "../button/AppButton";
import { offLoading, showLoading, useAppDispatch } from "../../redux";
import { addPayment } from "../../redux/actions/resident.action";
import { Bill } from "../../global";
import ChangePassModal from "./ChangePassModal";
import AxiosInstance from "../../utils/AxiosInstance";
type AddPaymentModalProps = {
  visible: boolean,
  hide: () => void,
  residentId?: string,
  addPayment: (payment: Bill) => void
}
const AddPaymentModal = ({ visible, hide, residentId,addPayment : addPayment2  }: AddPaymentModalProps) => {
  const [paymentName, setPaymentName] = useState<string>("");
  const [paymentAmount, setPaymentAmount] = useState<string>("");
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  return <Modal
    transparent
    animationType={"fade"}
    visible={visible}
    style={{ flex: 1 }}>
    <AppHeader
      backPress={hide}
      showBackButton
      title={"Thêm khoản thu"} />
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}>
      <AppTextInput
        value={paymentName}
        onTextChange={setPaymentName}
        placeHolder={"Nhập tên khoản thu"}
        label={"Tên khoản thu"} />
      <AppTextInput
        value={paymentAmount}
        onTextChange={setPaymentAmount}
        keyboardType={"numeric"}
        placeHolder={"Nhập số tiền"}
        label={"Số tiền"} />
      <AppButton label={"Lưu"} onPress={() => {
        if(Number(paymentAmount)<10000 || paymentAmount.length ==0 || isNaN(Number(paymentAmount))){
          Alert.alert("Vui lòng nhập khoản thu hợp lệ!")
          return
        }
        if(residentId){
         dispatch(addPayment({ paymentName, amount: paymentAmount, residentId , addPayment2})).then((res: any) => {
           if (!res.error) {
             console.log(res);
             // hide();
           }
         })
      }else {
         dispatch(showLoading())
         AxiosInstance().put('user/addPaymentToAllResidents',{paymentName,amount:paymentAmount}).then(res=>{
           Alert.alert("Thành công","Đã thêm thành công khoản thu cho toàn bộ dân cư");
         }).finally(()=>{
            dispatch(offLoading())
         })
      }
      }} />
    </View>
  </Modal>;
};

const useStyles = (colors: AppThemeColors) => StyleSheet.create({});
export default AddPaymentModal;
