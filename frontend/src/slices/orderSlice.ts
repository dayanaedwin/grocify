import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createOrder, getAllOrders, getOrderById, IOrderData } from "../thunks";
import { addToast } from "./toastSlice";

interface OrderState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string;
    orders: IOrderData[],
    order: IOrderData | null;
}

const initialState: OrderState = {
    status: 'idle',
    error: '',
    orders: [],
    order: null
}

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.status = 'loading';
                state.error = '';
            })
            .addCase(createOrder.fulfilled, (state, action: PayloadAction<IOrderData[]>) => {
                state.orders = action.payload;
                state.status = 'succeeded';
            })
            .addCase(createOrder.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'failed';
                state.error = action.payload.error || 'An error occured while creating the order. Please try again later';
                addToast({ message: state.error, type: "error" });
            })

            .addCase(getAllOrders.pending, (state) => {
                state.status = 'loading';
                state.error = '';
            })
            .addCase(getAllOrders.fulfilled, (state, action: PayloadAction<IOrderData[]>) => {
                state.orders = action.payload;
                state.status = 'succeeded';
            })
            .addCase(getAllOrders.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'failed';
                state.error = action.payload.error || 'Failed to get the orders';
                addToast({ message: state.error, type: "error" });
            })

            .addCase(getOrderById.pending, (state) => {
                state.status = 'loading';
                state.error = '';
            })
            .addCase(getOrderById.fulfilled, (state, action: PayloadAction<IOrderData>) => {
                state.order = action.payload;
                state.status = 'succeeded';
            })
            .addCase(getOrderById.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'failed';
                state.error = action.payload.error || 'Failed to get the order details';
                addToast({ message: state.error, type: "error" });
            });
    }
});

export default orderSlice.reducer;