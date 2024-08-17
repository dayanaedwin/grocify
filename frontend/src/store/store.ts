import { configureStore } from "@reduxjs/toolkit";
import { authReducer, userReducer } from "../slices";

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;