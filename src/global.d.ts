import resident from "./screens/resident";

interface ResidentInfo {
  _id: string,
  fullName: string,
  personal_identification_number: string;
  gender: string;
  portrait_url?: string;
  email: string;
  check_in_date?: Date,
  permanent_address: string;
  date_of_birth?: Date;
  nickName: string,
  fbLink: string,
  avatar: string,
  phone_number: string;
  isSharePublicInfo: boolean,
  role: "admin" | "user",
  payments:Bill[],
  intro: string,
  roomInfo: {
    floor: number,
    room: number,
  },
  notifications:Notification[]
}

interface Bill {
  _id: string,
  name: string,
  amount: number,
  isPayment: boolean
}


interface Floor {
  name:string,
  rooms:Room[]
}
interface Room {
  id: string;
  name: string;
  residentId:string
}

type Notification ={
  _id:string,
  content:string,
  time:Date,
  isReading:boolean,
  image:string
}

interface UtilityInfo {
  id: number;
  room_id: number;
  electricity_meter?: number;
  water_meter?: number;
  rent_fee?: number;
  deposit?: number;
}

interface PaymentInfo {
  id: number;
  room_id: number;
  electricity_fee?: number;
  water_fee?: number;
  rent_fee?: number;
  total_fee?: number;
  paid_at?: Date;
}

interface Feedback {
  id: number;
  type: any;
  user_id: string;
  content: string;
  created_at: Date;
}

interface ChatMessage {
  id: number;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: Date;
}
