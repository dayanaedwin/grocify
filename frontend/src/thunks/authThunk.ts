import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIS } from "../constants";
import { axiosInstance } from "../helpers";

export interface LoginForm {
    email: string;
    password: string;
}

export interface RegisterForm {
    name: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
}

export const login = createAsyncThunk<any, LoginForm>(
    APIS.LOGIN,
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(APIS.LOGIN, userData);
            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const signUp = createAsyncThunk<any, RegisterForm>( //<return type, argument type>
    APIS.REGISTER,
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(APIS.REGISTER, userData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.error);
        }
    }
);