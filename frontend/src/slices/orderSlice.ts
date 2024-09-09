import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createOrder, getAllOrders, getOrderById, IOrderData } from "../thunks";

interface orderState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    orders: IOrderData[],
    order: IOrderData | null;
}

const initialState: orderState = {
    status: 'idle',
    error: null,
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
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action: PayloadAction<IOrderData[]>) => {
                state.orders = action.payload;
                state.status = 'succeeded';
            })
            .addCase(createOrder.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            .addCase(getAllOrders.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getAllOrders.fulfilled, (state, action: PayloadAction<IOrderData[]>) => {
                state.orders = action.payload;
                state.status = 'succeeded';
            })
            .addCase(getAllOrders.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            .addCase(getOrderById.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getOrderById.fulfilled, (state, action: PayloadAction<IOrderData>) => {
                state.order = action.payload;
                state.status = 'succeeded';
            })
            .addCase(getOrderById.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export default orderSlice.reducer;