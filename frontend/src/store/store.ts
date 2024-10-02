import { configureStore } from "@reduxjs/toolkit";
import { authReducer, cartReducer, orderReducer, productReducer, userReducer } from "../slices";
import { errorMiddleware } from "../helpers";

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        order: orderReducer,
        product: productReducer,
        cart: cartReducer,
    },
    middleware: (middleware) =>
        middleware().concat(errorMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;