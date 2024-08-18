import { configureStore } from "@reduxjs/toolkit";
import { authReducer, productReducer, userReducer } from "../slices";

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        product: productReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;