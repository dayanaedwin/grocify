import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductDetails } from "./productSlice";
import { addToCart, deleteCartItem, fetchCartItems, updateCart } from "../thunks";

export interface ICartItem {
    _id: string,
    productDetails: IProductDetails,
    quantity: number,
    createdAt: string,
    updatedAt: string
}

interface CartState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    cart: ICartItem[];
}

const initialState: CartState = {
    status: 'idle',
    error: null,
    cart: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(fetchCartItems.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchCartItems.fulfilled, (state, action: PayloadAction<ICartItem[]>) => {
            state.status = 'succeeded';
            state.cart = action.payload;
        })
        .addCase(fetchCartItems.rejected, (state, action: PayloadAction<any>) => {
            state.status = 'failed';
            state.error = action.payload;
        })
        .addCase(addToCart.fulfilled, (state, action: PayloadAction<ICartItem>) => {
            // state.cart.push(action.payload);
        })
        .addCase(addToCart.rejected, (state, action: PayloadAction<any>) => {
            state.error = action.payload;
        })
        .addCase(updateCart.fulfilled, (state, action: PayloadAction<ICartItem>) => {
            const index = state.cart.findIndex(item => item._id === action.payload._id);
            if (index !== -1) {
                state.cart[index] = action.payload;
            }
        })
        .addCase(updateCart.rejected, (state, action: PayloadAction<any>) => {
            state.error = action.payload;
        })
        .addCase(deleteCartItem.fulfilled, (state, action: PayloadAction<{ id: string }>) => {
            state.cart = state.cart.filter(item => item._id !== action.payload.id);
        })
        .addCase(deleteCartItem.rejected, (state, action: PayloadAction<any>) => {
            state.error = action.payload;
        });
    },
});

export default cartSlice.reducer;