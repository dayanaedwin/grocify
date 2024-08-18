import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIS } from "../constants";
import { axiosInstance, getFirebaseImgURL } from "../helpers";
import { IProductDetails } from "../slices";

export const fetchProducts = createAsyncThunk(
    APIS.PRODUCTS,
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(APIS.PRODUCTS);
            const products = response.data;
            const productsWithImageUrls = await Promise.all(
                products.map(async (product: IProductDetails) => {
                    const imageUrls = await Promise.all(product.images.map(getFirebaseImgURL));
                    return { ...product, imageUrls };
                })
            );
            return productsWithImageUrls;
        } catch (error: any) {
            return rejectWithValue(error.response.error);
        }
    }
);

export const fetchProductById = createAsyncThunk(
    `${APIS.PRODUCTS}/:productId`,
    async (productId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${APIS.PRODUCTS}/${productId}`);
            const product = response.data;
            console.log(product)
            const imageUrls = await Promise.all(product.images.map(getFirebaseImgURL));
            return { ...product, imageUrls };
        } catch (error: any) {
            return rejectWithValue(error.response.error);
        }
    }
);