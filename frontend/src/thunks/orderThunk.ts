import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIS } from "../constants";
import { axiosInstance, getFirebaseImgURL } from "../helpers";
import { IProductDetails } from "../slices";

export interface IOrderData {
    _id: string;
    userId: string;
    products: {
        productDetails: IProductDetails;
        quantity: number;
        price: number,
        currency: string;
    }[];
    totalPrice: number;
    orderStatus: string;
    deliveryAddress?: {
        name: string;
        phone: number;
        building: string;
        street: string;
        city: string;
        state: string;
        pincode: number;
        country: string;
    },
    paymentMode: string;
    paymentStatus: string;
    createdAt: string;
}

export const createOrder = createAsyncThunk<any, IOrderData>(
    `${APIS.MY_ORDER}/create`,
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(APIS.MY_ORDER, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Failed to create order');
        }
    }
);

export const getAllOrders = createAsyncThunk(
    `${APIS.MY_ORDER}/get`,
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(APIS.MY_ORDER);
            const orders = response.data;
            const ordersWithImageUrls = await Promise.all(
                orders.map(async (orderGroup: any) => {
                    const order = { ...orderGroup };
                    if (order.products[0].productId.images.length > 0) {
                        const firstImage = order.products[0].productId.images[0];
                        const imageUrls = await getFirebaseImgURL(firstImage);
                        order.products[0].productId = { ...order.products[0].productId, imageUrls: [imageUrls] };
                    }
                    return order;
                })
            );
            return ordersWithImageUrls;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Failed to fetch order');
        }
    }
);

export const getOrderById = createAsyncThunk<any, string>(
    `${APIS.MY_ORDER}/getById`,
    async (orderId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${APIS.MY_ORDER}/${orderId}`);
            const order = response.data;
            const productsWithImageUrls = await Promise.all(order.products.map(async (product: any) => {
                const imageUrls = [await getFirebaseImgURL(product.productDetails.images[0])];
                return { ...product, imageUrls };
            }));
            return {...order, products: productsWithImageUrls};
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Failed to get order');
        }
    }
)