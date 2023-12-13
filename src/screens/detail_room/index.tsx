import React, { useEffect, useState } from "react";
import { AppScreenContainer } from "../../layout";
import { useTheme } from "../../hooks";
import { AppHeader } from "../../components/header/AppHeader";
import { Appbar } from "react-native-paper";
import { ResidentFormModal } from "../../components/modal/ResidentFormModal";
import { useRoute } from "@react-navigation/native";
import { AppThemeColors } from "../../themes";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { Bill, ResidentInfo } from "../../global";
import { useAppDispatch } from "../../redux";
import { getResident, maskPaymentIsPayment } from "../../redux/actions/resident.action";
import { ListPayment } from "../detail_payment/components/ListPayment";
import { AppButton } from "../../components/button/AppButton";
import AddPaymentModal from "../../components/modal/AddPaymentModal";
import AddNotificationModal from "../../components/modal/NotiModal";

const DetailRoomScreen = () => {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  const [showNotiModal, setShowNotiModal] = useState<boolean>(false);
  const [showAddPaymentForm, setShowAddPaymentForm] = useState<boolean>(false);
  const [showResidentForm, setShowResidentForm] = useState<boolean>(false);
  const route = useRoute();
  const dispatch = useAppDispatch();
  const { residentId, roomName } = route.params as { residentId: string, roomName: string };
  const [residentId2, setResidentId2] = useState<string>(residentId || "");
  const [residentInfo, setResidentInfo] = useState<ResidentInfo>();
  const addPayment = (payment: Bill) => {
    if (residentInfo) {
      setResidentInfo({ ...residentInfo, payments: [...residentInfo?.payments || [], payment] });
    }
  };
  const updatePayment = (payments: Bill[]) => {
    if (residentInfo) {
      setResidentInfo({ ...residentInfo, payments: payments });
    }
  };
  const hideAddPayment = () => {
    setShowAddPaymentForm(false);
  };
  useEffect(() => {
    residentId2 && dispatch(getResident(residentId2)).then((res: any) => {
      if (!res.error) {
        setResidentInfo(res.payload.user);
      }
    });
  }, [residentId2]);

  const rightAction = () => {
    return <Appbar.Action
      onPress={() => {
        setShowResidentForm(true);
      }}
      color={colors.textOnPrimary}
      icon={residentId2 ? "account-edit" : "account-plus"} />;
  };
  return <AppScreenContainer>
    <AppHeader
      showBackButton title={roomName}
      action={rightAction()}
    />
    {residentInfo && <View style={{ padding: 16 }}>
      <Image
        style={styles.avatar}
        source={{ uri: residentInfo.portrait_url ? residentInfo.portrait_url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzhG23F5VXoykW672-NhGsqLrgfnij-Z-ayCUs6Gc&s"  }} />
      <Text style={styles.fullName}>{residentInfo.fullName}</Text>
      <ListPayment
        updatePayment={updatePayment}
        isPayment
        residentId={residentId2}
        paymentInfo={residentInfo.payments.filter(paymentInfo => paymentInfo.isPayment)} />
      <ListPayment
        updatePayment={updatePayment}
        isPayment={false}
        residentId={residentId2}
        paymentInfo={residentInfo.payments.filter(paymentInfo => !paymentInfo.isPayment)} />
      <AppButton label={"Thêm khoản thu"} onPress={() => {
        console.log("123");
        setShowAddPaymentForm(true);
      }} />
      <AppButton label={"Gửi thông báo"} onPress={() => {
        setShowNotiModal(true)
      }} />
    </View>
    }
    <ResidentFormModal
      setResidentInfo={setResidentInfo}
      setRsId={setResidentId2}
      roomName={roomName}
      residentInfo={residentInfo}
      hideModal={() => {
        setShowResidentForm(false);
      }}
      visible={showResidentForm} />
    <AddPaymentModal
      addPayment={addPayment}
      residentId={residentId2}
      visible={showAddPaymentForm}
      hide={hideAddPayment} />
    <AddNotificationModal
      visible={showNotiModal}
      hide={()=>{
        setShowNotiModal(false)
      }}
      residentId={residentId2} />
  </AppScreenContainer>;
};

const useStyles = (colors: AppThemeColors) => StyleSheet.create({
  avatar: {
    width: 150,
    height: 150,
    backgroundColor: "red",
    alignSelf: "center",
    borderRadius: 75,
    marginTop: 20,
    borderWidth: 2,
    borderColor: colors.itemBackground
  },
  fullName: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    color: colors.primary
  }
});
export default DetailRoomScreen;
