import { configureStore } from "@reduxjs/toolkit";
import { authReducer, cartReducer, productReducer, userReducer } from "../slices";

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        product: productReducer,
        cart: cartReducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;