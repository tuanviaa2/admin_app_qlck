import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../../hooks";
import { AppThemeColors } from "../../../themes";
import React, { useState } from "react";
import { formatCurrencyVietnamese } from "../../../utils/stringFormatter";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { Bill } from "../../../global";
import { maskPaymentIsPayment } from "../../../redux/actions/resident.action";
import { useAppDispatch } from "../../../redux";

type ListPaymentProps = {
  paymentInfo: Bill [],
  isPayment: boolean,
  residentId: string,
  updatePayment: (payments: Bill[]) => void
}
export const ListPayment = ({ paymentInfo, isPayment, residentId, updatePayment }: ListPaymentProps) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const styles = useStyles(colors);
  const [isHide, setHide] = useState<boolean>(isPayment || false);
  const reducePayment = () => {
    const total = paymentInfo.reduce((total, payment) => {
      return total + Number(payment.amount);
    }, 0);
    return total;
  };
  return <View style={styles.container}>
    <TouchableOpacity
      style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
      onPress={() => setHide(!isHide)}>
      <Text style={styles.title}>
        {isPayment
          ? "Đã thanh toán"
          : "Chưa thanh toán"
        }</Text>
      <FontAwesomeIcon
        color={colors.text}
        icon={isHide ? faCaretDown : faCaretUp} />
    </TouchableOpacity>

    {
      !isHide && <ScrollView>
        {
          !paymentInfo.length && <Text style={{ color: colors.text }}>Không có khoản thu</Text>
        }
        {
          paymentInfo.map((payment) => {
            return <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }}
              key={payment._id}>
              <View>
                <Text style={styles.billTitle}>{payment.name}</Text>
                <Text style={styles.moneyText}>{formatCurrencyVietnamese(payment.amount)}</Text>
              </View>
              {
                !isPayment &&
                <TouchableOpacity onPress={() => {
                  Alert.alert(
                    "Xác nhận",
                    "Bạn có chắc chắn muốn đánh dấu khoản thu là đã thanh toán?",
                    [
                      {
                        text: "Hủy",
                        style: "cancel"
                      },
                      {
                        text: "Xác nhận",
                        onPress: () => {
                          dispatch(maskPaymentIsPayment({ paymentId: payment._id, residentId, updatePayment }));
                        }
                      }
                    ],
                    { cancelable: false }
                  );
                }}>
                  <Text style={{ color: colors.text }}> Đánh dấu là đã thanh toán</Text>
                </TouchableOpacity>
              }
            </View>;
          })
        }
      </ScrollView>
    }
    {
      !isPayment && <Text style={{
        fontWeight: "bold",
        fontSize: 16,
        color: colors.text
      }}>{`Tổng nợ: ${formatCurrencyVietnamese(reducePayment())}`}</Text>
    }
  </View>;
};
const useStyles = (colors: AppThemeColors) => StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 17,
    color: colors.text
  },
  container: {
    maxHeight: 150,
    gap: 8
  },
  billTitle: {
    fontWeight: "bold",
    fontSize: 15,
    color: colors.primary
  },
  moneyText: {
    fontWeight: "bold",
    fontSize: 14,
    color: colors.text
  }
});
