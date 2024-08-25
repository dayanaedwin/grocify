import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIS, cartItems } from "../constants";
import { axiosInstance, getFirebaseImgURL } from "../helpers";
import { IProductDetails } from "../slices";

export interface ICartItem {
    _id: string,
    productDetails: IProductDetails,
    quantity: number,
    createdAt: string,
    updatedAt: string
}

export const fetchCartItems = createAsyncThunk(
    `${APIS.CART}/fetchCartItems`,
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(APIS.CART);
            const cart = response.data;
            const cartWithImageUrls = await Promise.all(
                cart.map(async (item: ICartItem) => {
                    const imageUrls = await Promise.all(item.productDetails.images.map(getFirebaseImgURL));
                    return { ...item, imageUrls };
                })
            );
            return cartWithImageUrls;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Failed to fetch cart items');
        }
    }
);

export const addToCart = createAsyncThunk(
    `${APIS.CART}/addToCart`,
    async (cartItems, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(APIS.CART, cartItems);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Failed to add item to cart');
        }
    }
);

export const updateCart = createAsyncThunk(
    `${APIS.CART}/updateCart`,
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(APIS.CART, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Failed to update cart item');
        }
    }
);

export const deleteCartItem = createAsyncThunk(
    `${APIS.CART}/deleteCartItem`,
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`${APIS.CART}/${id}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Failed to delete cart item');
        }
    }
)