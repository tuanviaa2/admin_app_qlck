import LoginScreen from "../../screens/login";
import { defaultScreenOption, Screen } from "../type";
import HomeScreen from "../../screens/home";
import { StackNavigationProp } from "@react-navigation/stack";
import FloorScreen from "../../screens/floor_list";
import RoomListScreen from "../../screens/room_list";
import DetailRoomScreen from "../../screens/detail_room";
import DetailPaymentScreen from "../../screens/detail_payment";
import AdminProfileScreen from "../../screens/admin_profle";
import PaymentListScreen from "../../screens/paymentList";
import NotiScreen from "../../screens/noti";
import PaymentScreen from "../../screens/payment";
import ResidentScreen from "../../screens/resident";
import { Bill, ResidentInfo, Room } from "../../global";

export enum AppStackName {
  Login = "Login",
  Home = "Home",
  ListFloor = "ListFloor",
  RoomList = "RoomList",
  DetailRoom = "DetailRoom",
  DetailPayment = "DetailPayment",
  AdminProfile = "AdminProfile",
  PaymentList = "PaymentList",
  NotiScreen = "NotificationScreen",
  PaymentScreen = "PaymentScreen",
  ResidentScreen = "ResidentScreen"
}

export type AppNavigationParamList = {
  [AppStackName.Login]: undefined,
  [AppStackName.Home]: undefined,
  [AppStackName.ListFloor]: undefined,
  [AppStackName.RoomList]: { rooms: Room[] },
  [AppStackName.DetailRoom]: { residentId: string | undefined,roomName:string },
  [AppStackName.DetailPayment]: { paymentInfo: Bill[], name: string },
  [AppStackName.AdminProfile]: undefined,
  [AppStackName.PaymentList]: undefined,
  [AppStackName.NotiScreen]: undefined,
  [AppStackName.PaymentScreen]: undefined,
  [AppStackName.ResidentScreen]: undefined
}

export const appScreens: Screen[] = [
  {
    name: AppStackName.Login,
    component: LoginScreen,
    options: defaultScreenOption
  },
  {
    name: AppStackName.Home,
    component: HomeScreen,
    options: defaultScreenOption
  },
  {
    name: AppStackName.ListFloor,
    component: FloorScreen,
    options: defaultScreenOption
  },
  {
    name: AppStackName.RoomList,
    component: RoomListScreen,
    options: defaultScreenOption
  },
  {
    name: AppStackName.DetailRoom,
    component: DetailRoomScreen,
    options: defaultScreenOption
  },
  {
    name: AppStackName.DetailPayment,
    component: DetailPaymentScreen,
    options: defaultScreenOption
  },
  {
    name: AppStackName.AdminProfile,
    component: AdminProfileScreen,
    options: defaultScreenOption
  }
  ,
  {
    name: AppStackName.PaymentList,
    component: PaymentListScreen,
    options: defaultScreenOption
  }
  ,
  {
    name: AppStackName.NotiScreen,
    component: NotiScreen,
    options: defaultScreenOption
  },
  {
    name: AppStackName.PaymentScreen,
    component: PaymentScreen,
    options: defaultScreenOption
  },
  {
    name: AppStackName.ResidentScreen,
    component: ResidentScreen,
    options: defaultScreenOption
  }
];
export  type  AppNavigationProp = StackNavigationProp<AppNavigationParamList>
