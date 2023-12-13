import { AppTextInput } from "../../../components/text_input/AppTextInput";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationProp, AppStackName } from "../../../navigations/AppNavigation/config";
import { Formik } from "formik";
import { Alert, ScrollView } from "react-native";
import { AppButton } from "../../../components/button/AppButton";
import { object, string } from "yup";
import { useAppDispatch } from "../../../redux";
import { login } from "../../../redux/actions/user.action";

type LoginFormType = {
  userName: string,
  password: string
}
export const FormLogin = () => {
  const appDispatch = useAppDispatch();
  let loginValidateSchema = object({
    userName: string().required("Vui lòng điền tài khoản"),
    password: string().required("Vui lòng điền mật khẩu")
  });
  const initialLoginForm: LoginFormType = {
    password: "",
    userName: ""
  };
  const navigation = useNavigation<AppNavigationProp>();
  return <Formik
    validationSchema={loginValidateSchema}
    initialValues={initialLoginForm}
    onSubmit={(values) => {
      const { userName, password } = values;
      appDispatch(login({ userName, password }))
        .then((res: any) => {
          if (!res.error) {
            navigation.reset({
              index: 0,
              routes: [{ name: AppStackName.Home }]
            });
          }
        });
    }}>
    {({ handleChange, handleSubmit, values }) => (
      <ScrollView
        keyboardShouldPersistTaps={"always"}
        style={{ gap: 30 }}>
        <AppTextInput
          nameValidate={"userName"}
          placeHolder={"Nhập tài khoản của bạn"}
          label={"Tài khoản"}
          value={values.userName}
          onTextChange={handleChange("userName")} />
        <AppTextInput
          nameValidate={"password"}
          password
          placeHolder={"Nhập mật khẩu của bạn"}
          label={"Mật khẩu"}
          value={values.password}
          onTextChange={handleChange("password")} />
        <AppButton label={"Đăng nhập"} onPress={() => {
          if (values.userName !== "admin") {
            Alert.alert("Thông báo", "Vui lòng dùng tài khoản admin để đăng nhập");
          } else {
            handleSubmit();
          }
        }} />
      </ScrollView>)}
  </Formik>;
};
;

