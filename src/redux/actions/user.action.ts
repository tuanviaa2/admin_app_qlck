import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/AxiosInstance";

interface LoginPayload {
  userName: string;
  password: string;
}

export const login = createAsyncThunk("user/login", async (payload: LoginPayload, { rejectWithValue }) => {
  try {
    console.log(payload)
    const response = await axiosInstance().post("/auth/login", {
      personal_identification_number: payload.userName,
      password: payload.password
    });
    console.log(response.data)
    return response.data;
  } catch (error: any) {
    console.log(error);
    return rejectWithValue(error);
  }
});



