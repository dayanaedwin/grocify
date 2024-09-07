import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIS } from "../constants";
import { axiosInstance } from "../helpers";

export const getLoggedUser = createAsyncThunk(
    APIS.GET_USER,
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(APIS.GET_USER);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response.error);
        }
    }
);

export const updateUserInfo = createAsyncThunk(
    `${APIS.GET_USER}/update`,
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(APIS.GET_USER, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.error);
        }
    }
);