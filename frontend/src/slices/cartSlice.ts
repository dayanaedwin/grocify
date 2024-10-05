import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductDetails } from "./productSlice";
import { addToCart, deleteAllCartItems, deleteCartItemById, fetchCartItems, updateCart } from "../thunks";
import { addToast } from "./toastSlice";

export interface ICartItem {
    _id: string,
    productDetails: IProductDetails,
    quantity: number,
    createdAt: string,
    updatedAt: string
}

interface CartState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string;
    cart: ICartItem[];
}

const initialState: CartState = {
    status: 'idle',
    error: '',
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
                state.error = action.payload.error || 'Failed to get the cart items.';
                addToast({ message: state.error, type: "error" });
            })

            .addCase(addToCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addToCart.fulfilled, (state, action: PayloadAction<ICartItem>) => {
                // state.cart.push(action.payload);
            })
            .addCase(addToCart.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload.error || 'Failed to add the product to the cart. Please try again.';
                addToast({ message: state.error, type: "error" });
            })

            .addCase(updateCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateCart.fulfilled, (state, action: PayloadAction<ICartItem>) => {
                const index = state.cart.findIndex(item => item._id === action.payload._id);
                if (index !== -1) {
                    state.cart[index] = action.payload;
                }
            })
            .addCase(updateCart.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload.error || 'Failed to update the cart items.';
                addToast({ message: state.error, type: "error" });
            })

            .addCase(deleteCartItemById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteCartItemById.fulfilled, (state, action: PayloadAction<{ id: string }>) => {
                state.cart = state.cart.filter(item => item._id !== action.payload.id);
            })
            .addCase(deleteCartItemById.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload.error || 'Failed to remove the cart items.';
                addToast({ message: state.error, type: "error" });
            })

            .addCase(deleteAllCartItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteAllCartItems.fulfilled, (state, action: PayloadAction<{ id: string }>) => {
                state.cart = state.cart.filter(item => item._id !== action.payload.id);
            })
            .addCase(deleteAllCartItems.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload.error || 'Failed to remove the cart items.';
                addToast({ message: state.error, type: "error" });
            });
    },
});

export default cartSlice.reducer;