import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  KeyboardTypeOptions,
  Modal,
  Platform,
  ScrollView,
  StyleSheet
} from "react-native";
import { useTheme } from "../../hooks";
import { AppThemeColors } from "../../themes";
import { Formik } from "formik";
import { AvatarContainer } from "../form_components/AvatarContainer";
import SexRadioButton from "../form_components/SexRadioButton";
import { AppTextInput } from "../text_input/AppTextInput";
import { AppButton } from "../button/AppButton";
import DatePicker from "react-native-date-picker";
import { object, string } from "yup";
import { formatDDMMYY } from "../../utils/stringFormatter";
import { AppHeader } from "../header/AppHeader";
import { ResidentInfo } from "../../global";
import { offLoading, showLoading, useAppDispatch } from "../../redux";
import { addResident, deleteResident, maskPaymentIsPayment } from "../../redux/actions/resident.action";
import { Appbar } from "react-native-paper";
import { AppStackName } from "../../navigations/AppNavigation/config";
import { useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from "react-native-image-picker";
import AxiosInstance from "../../utils/AxiosInstance";

type ResidentFormModalProps = {
  visible: boolean,
  hideModal: () => void,
  residentInfo?: ResidentInfo | null,
  roomName: string,
  setRsId: (id: string) => void,
  setResidentInfo?: (residentInfo: ResidentInfo) => void
}
type FormTextInput = {
  name: keyof ResidentInfo,
  label: string,
  placeHolder: string,
  onPress?: () => void,
  modalTextInput?: boolean
  type?: "textInput" | "radio",
  date?: boolean,
  typeDate?: string,
  keyboardType?: KeyboardTypeOptions
}

export const ResidentFormModal = ({
                                    setResidentInfo,
                                    visible,
                                    hideModal,
                                    residentInfo,
                                    roomName,
                                    setRsId
                                  }: ResidentFormModalProps) => {
  const { colors } = useTheme();
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [dateOfBirth, setDateOfBirth] = useState(residentInfo?.date_of_birth || new Date());
  const [showDatePicker1, setShowDatePicker1] = useState<boolean>(false);
  const [checkInDate, setCheckInDate] = useState(residentInfo?.check_in_date || new Date());
  const [image, setImage] = useState<string>(residentInfo?.portrait_url || "");
  const dispatch = useAppDispatch();

  const initialFormValue: any = {
    fullName: residentInfo?.fullName || "",
    email: residentInfo?.email || "",
    gender: residentInfo?.gender || "",
    date_of_birth: residentInfo?.date_of_birth,
    permanent_address: residentInfo?.permanent_address || "",
    personal_identification_number: residentInfo?.personal_identification_number || "",
    phone_number: residentInfo?.phone_number || "",
    portrait_url: residentInfo?.portrait_url || "",
    check_in_date: residentInfo?.check_in_date
  };
  const onSubmit = (values: any) => {
    values.portrait_url = image;
    console.log(values.portrait_url);
    //updateResident
    if (residentInfo?._id) {
      dispatch(showLoading());
      AxiosInstance().put("user/update/" + residentInfo.personal_identification_number, values)
        .then((res: any) => {
          setRsId(res.user.personal_identification_number);
          Alert.alert("Cập nhật thành công");
          if (setResidentInfo) {
            res.user && setResidentInfo(res.user);
          }
          console.log(res.user);
          hideModal();
        }).catch(err => {
        Alert.alert("Có lỗi xảy ra khi cập nhật");
        console.log(err);
      }).finally(() => {
        dispatch(offLoading());
      });
    } else {
      // addResident
      dispatch(addResident({
        residentId: values.personal_identification_number,
        roomName: roomName,
        residentInfo: values
      }))
        .then((res: any) => {
          if (!res.error) {
            hideModal();
            setRsId(res.meta.arg.residentId);
          }
        });
    }

  };
  const formTextInputs: FormTextInput[] = [
    {
      name: "fullName",
      label: "Họ và tên",
      placeHolder: "Nhập họ và tên..."
    },
    {
      name: "phone_number",
      label: "Số điện thoại",
      placeHolder: "Nhập số điện thoại...",
      keyboardType: "phone-pad"
    },
    {
      name: "personal_identification_number",
      label: "Số chứng minh nhân dân",
      placeHolder: "Nhập số chứng minh nhân dân...",
      keyboardType: "numeric",
      modalTextInput: !!residentInfo,
    }
    ,
    {
      name: "permanent_address",
      label: "Địa chỉ thường trú",
      placeHolder: "Nhập địa chỉ thường trú...",
      keyboardType: "numeric"
    },
    {
      name: "check_in_date",
      label: "Ngày nhận phòng",
      placeHolder: "Ngày nhận phòng..",
      modalTextInput: true,
      onPress: () => {
        setShowDatePicker1(true);
      },
      date: true,
      typeDate: "cid"
    },
    {
      name: "gender",
      label: "Giới tính",
      placeHolder: "",
      type: "radio"
    },
    {
      name: "date_of_birth",
      label: "Ngày sinh",
      placeHolder: "Ngày sinh của bạn",
      modalTextInput: true,
      onPress: () => {
        setShowDatePicker(true);
      },
      typeDate: "dob",
      date: true
    },
    {
      name: "email",
      label: "Email",
      placeHolder: "Nhập email...",
      keyboardType: "email-address"
    }

  ];
  let residentInfoValidateSchema = object({
    personal_identification_number: string()
      .required("Vui lòng điền số chứng minh nhân dân")
      .length(11, "Số chứng minh nhân dân phải có đúng 11 ký tự"),
    fullName: string().required("Vui lòng điền họ và tên"),
    email: string().email("Vui lòng điền đúng định dạng email"),
    phone_number: string()
      .required("Vui lòng nhập số điện thoại")
      .matches(/^[0-9]{10}$/, "Số điện thoại phải có đúng 10 chữ số")
  });
  const navigation = useNavigation();
  const getDateValue = (typeDate: string) => formatDDMMYY(typeDate == "cid" ? checkInDate : dateOfBirth);
  const rightAction = () => {
    return <Appbar.Action
      onPress={() => {
        Alert.alert(
          "Xác nhận",
          "Bạn có chắc chắn muốn xóa tài khoản này?",
          [
            {
              text: "Hủy",
              style: "cancel"
            },
            {
              text: "Xác nhận",
              onPress: () => {
                dispatch(deleteResident(residentInfo?.personal_identification_number || "")).then((res: any) => {
                  if (!res.error) {
                    navigation.reset({
                      index: 0,
                      routes: [{ name: AppStackName.Home } as never]
                    });
                    hideModal();
                  }
                });
              }
            }
          ],
          { cancelable: false }
        );
      }}
      color={colors.textOnPrimary}
      icon={"trash-can"} />;
  };
  return <Modal
    animationType={"slide"}
    visible={visible} style={{ flex: 1 }}>
    <KeyboardAvoidingView
      style={{ backgroundColor: colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <AppHeader
        action={residentInfo?._id && rightAction()}
        backPress={hideModal}
        showBackButton
        title={"Thêm thông tin cư dân"} />
      <Formik
        validationSchema={residentInfoValidateSchema}
        initialValues={initialFormValue}
        onSubmit={onSubmit}>
        {({ handleChange, handleSubmit, values }) => (
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 100
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={"always"}
            style={{ padding: 16 }}>
            <AvatarContainer setUrl={setImage} image={image} />
            {formTextInputs.map((formInput) => {
              return formInput.type == "radio"
                ? <SexRadioButton key={formInput.name} />
                : <AppTextInput
                  keyboardType={formInput.keyboardType && formInput.keyboardType}
                  modalTextInput={formInput.modalTextInput}
                  onPress={formInput.onPress}
                  onTextChange={handleChange(formInput.name)}
                  key={formInput.name}
                  nameValidate={formInput.name}
                  placeHolder={formInput.placeHolder}
                  label={formInput.label}
                  value={
                    formInput.typeDate
                      ? getDateValue(formInput.typeDate)
                      : values[formInput.name] as string
                  } />;
            })}
            <AppButton
              label={"Lưu"}
              onPress={() => {
                handleSubmit();
              }} />
            <DatePicker
              modal
              mode="date"
              open={showDatePicker}
              date={dateOfBirth}
              onConfirm={(date) => {
                setShowDatePicker(false);
                setDateOfBirth(date);
              }}
              onCancel={() => {
                setShowDatePicker(false);
              }}
            />
            <DatePicker
              modal
              mode="date"
              open={showDatePicker1}
              date={checkInDate}
              onConfirm={(date) => {
                setShowDatePicker1(false);
                setCheckInDate(date);
              }}
              onCancel={() => {
                setShowDatePicker1(false);
              }}
            />
          </ScrollView>
        )}
      </Formik>
    </KeyboardAvoidingView>
  </Modal>;
};
const useStyles = (colors: AppThemeColors) => StyleSheet.create({});
