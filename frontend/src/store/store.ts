import { configureStore } from "@reduxjs/toolkit";
import { authReducer, cartReducer, orderReducer, productReducer, toastReducer, userReducer } from "../slices";
import { errorMiddleware } from "../helpers";

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        order: orderReducer,
        product: productReducer,
        cart: cartReducer,
        toast: toastReducer,
    },
    middleware: (middleware) =>
        middleware().concat(errorMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;