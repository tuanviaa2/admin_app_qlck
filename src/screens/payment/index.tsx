import { AppScreenContainer } from "../../layout";
import React, { useEffect, useState } from "react";
import { useTheme } from "../../hooks";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppHeader } from "../../components/header/AppHeader";
import { AppThemeColors } from "../../themes";
import { Appbar, FAB } from "react-native-paper";
import { getAllResident } from "../../redux/actions/resident.action";
import { Bill, ResidentInfo } from "../../global";
import { useAppDispatch } from "../../redux";
import { formatCurrencyVietnamese } from "../../utils/stringFormatter";
import { AppStackName } from "../../navigations/AppNavigation/config";
import AddPaymentModal from "../../components/modal/AddPaymentModal";

const PaymentScreen = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { colors } = useTheme();
  const styles = useStyles(colors);
  const dispatch = useAppDispatch();
  const [residents, setResident] = useState<ResidentInfo[]>([]);
  useEffect(() => {
    dispatch(getAllResident((resident: ResidentInfo[]) => {
      setResident(resident);
    })).then((res: any) => {
      if (!res.error) {
        console.log(res);
      }
    });
  }, []);
  const getPayment = (payment: Bill[]) => {
    return payment.reduce((a, b) => {
      if (!b.isPayment) {
        return a + Number(b.amount);
      }
      return a;
    }, 0);
  };
  return <AppScreenContainer>
    <AppHeader
      showBackButton
      title={"Khoản thu "}
      action={<Appbar.Action
        onPress={() => {
        setShowModal(true)
        }}
        color={colors.textOnPrimary}
        icon={"plus"} />} />
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {
        residents.map(item => {
          if (getPayment(item.payments) == 0) {
            return <View key={item._id} />;
          }
          return <TouchableOpacity key={item._id} style={styles.notiContainer}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.text, { color: colors.primary }]}>
                  {item.fullName}
                </Text>
              </View>
              <Text style={styles.text}>
               Tổng nợ: {formatCurrencyVietnamese(getPayment(item.payments))}
              </Text>
            </View>
          </TouchableOpacity>;
        })
      }
    </ScrollView>
    <FAB
      icon="send"
      color={colors.textOnPrimary}
      style={{ right: 16, position: "absolute", bottom: 16, backgroundColor: colors.primary }}
      onPress={() => console.log("Pressed")}
    />
    <AddPaymentModal
      addPayment={()=>{
        setShowModal(false)
      }}
      visible={showModal}
      hide={()=>{
        setShowModal(false)
      }} />
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
export default PaymentScreen;
