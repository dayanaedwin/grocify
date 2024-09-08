import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIS } from "../constants";
import { axiosInstance } from "../helpers";

export interface IOrderData {
    _id: string;
    userId: string;
    products: {
        productId: string;
        quantity: number;
        price: number,
        currency: string;
    }[];
    totalPrice: number;
    orderStatus: string;
    deliveryAddress: {
        name: String;
        phone: Number;
        street: String;
        city: String;
        state: String;
        pincode: Number;
        country: String;
    },
    paymentMode: string;
    paymentStatus: string;
}

export const createOrder = createAsyncThunk(
    `${APIS.MY_ORDER}/create`,
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(APIS.MY_ORDER, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);

export const getOrder = createAsyncThunk(
    `${APIS.MY_ORDER}/get`,
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(APIS.MY_ORDER);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getOrderById = createAsyncThunk(
    `${APIS.MY_ORDER}/getById`,
    async (orderId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${APIS.MY_ORDER}/${orderId}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
)