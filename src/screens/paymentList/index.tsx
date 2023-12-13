import React from "react";
import { AppScreenContainer } from "../../layout";
import { AppHeader } from "../../components/header/AppHeader";
import { StyleSheet, View } from "react-native";
import { AppThemeColors } from "../../themes";
import { useTheme } from "../../hooks";

const PaymentListScreen = () => {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  return <AppScreenContainer>
    <AppHeader
      showBackButton
      title={"Danh sách khoản nợ"} />
    <View style={styles.container}>

    </View>
  </AppScreenContainer>;
};
const useStyles = (colors: AppThemeColors) => StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "center"
  }
});
export default PaymentListScreen;
