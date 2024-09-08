import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProductById, fetchProducts } from "../thunks";

export interface IProductDetails {
    _id: string,
    name: string,
    description: string,
    images: string[],
    price: number,
    uom: string,
    currency: string,
    rating: number,
    category: string,
    stock: number,
    seller: string,
    createdAt: string,
    updatedAt: string,
    __v: number,
    imageUrls?: string[]
}

interface ProductsState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    products: IProductDetails[],
    product: IProductDetails | null;
}

export const initialState: ProductsState = {
    status: 'idle',
    error: null,
    products: [],
    product: null
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<IProductDetails[]>) => {
                state.products = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchProducts.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            
            .addCase(fetchProductById.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<IProductDetails>) => {
                state.product = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchProductById.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export default productSlice.reducer;