import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../../hooks";
import { AppThemeColors } from "../../../themes";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faBolt, faGlassWaterDroplet, faPersonShelter, faRecycle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { formatCurrencyVietnamese } from "../../../utils/stringFormatter";
import { AppButton } from "../../../components/button/AppButton";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationProp, AppStackName } from "../../../navigations/AppNavigation/config";

type PaymentInfo = {
  name: string,
  totalAmount: number,
  icon: IconProp,
  paymentInfo: Bill[]
}
type PaymentContainerProps = {
  waterPayment: Bill[],
  electricityPayment: Bill[],
  rentPayment: Bill[],
  trashPayment: Bill[]
}
export const PaymentContainer = ({ ...paymentInfo }: PaymentContainerProps) => {
  const { colors } = useTheme();
  const navigation = useNavigation<AppNavigationProp>();
  const styles = useStyles(colors);
  const paymentItems: PaymentInfo[] = [
    {
      name: "Tiền phòng",
      totalAmount: paymentInfo.rentPayment.reduce((value, currentValue) => {
        return value + currentValue.amount;
      }, 0),
      icon: faPersonShelter,
      paymentInfo: paymentInfo.rentPayment
    },
    {
      name: "Tiền điện",
      totalAmount: paymentInfo.electricityPayment.reduce((value, currentValue) => {
        return value + currentValue.amount;
      }, 0),
      icon: faBolt,
      paymentInfo: paymentInfo.electricityPayment
    },
    {
      name: "Tiền nước",
      totalAmount: paymentInfo.waterPayment.reduce((value, currentValue) => {
        return value + currentValue.amount;
      }, 0),
      icon: faGlassWaterDroplet,
      paymentInfo: paymentInfo.waterPayment
    },
    {
      name: "Tiền rác",
      totalAmount: paymentInfo.trashPayment.reduce((value, currentValue) => {
        return value + currentValue.amount;
      }, 0),
      icon: faRecycle,
      paymentInfo: paymentInfo.trashPayment
    }
  ];
  return <View style={styles.container}>
    {
      paymentItems.map((item) => {
        return <TouchableOpacity
          onPress={() => {
            navigation.navigate(
              AppStackName.DetailPayment,
              { paymentInfo: item.paymentInfo, name: item.name }
            );
          }}
          key={item.name}
          style={styles.paymentItemContainer}>
          <FontAwesomeIcon color={colors.itemText} size={45} icon={item.icon} />
          <Text style={styles.paymentText}>
            {item.name}
          </Text>
          <Text style={styles.paymentText}>
            Tiền nợ: {formatCurrencyVietnamese(item.totalAmount)}
          </Text>
        </TouchableOpacity>;
      })
    }
    <AppButton
      label={"Gửi thông báo"}
      onPress={() => {
      }} />
  </View>;
};

const useStyles = (colors: AppThemeColors) => StyleSheet.create({
  container: {
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 16,
    padding: 8,
    justifyContent: "center"
  },
  paymentItemContainer: {
    height: 150,
    width: "45%",
    backgroundColor: colors.itemBackground,
    elevation: 2,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    gap: 8
  },
  paymentText: {
    fontWeight: "bold",
    fontSize: 15,
    color: colors.itemText
  }
});
