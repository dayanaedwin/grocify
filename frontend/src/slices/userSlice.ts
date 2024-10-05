import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLoggedUser, updatePassword, updateUserInfo } from "../thunks";
import { logoutActionType } from "./authSlice";
import { addToast } from "./toastSlice";

export interface User {
    _id: string,
    name: string,
    email: string,
    phone: number,
    roles: string[],
    addresses?: {
        name: string,
        phone: string,
        building: string,
        street: string,
        city: string,
        state: string,
        pincode: string,
        country: string,
        isDefault: boolean
    }[]
}

interface UserState {
    user: User | null,
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string;
}

const initialState: UserState = {
    user: null,
    status: 'idle',
    error: '',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: state => {
            state.user = null;
            state.status = 'idle';
            localStorage.removeItem('token');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getLoggedUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getLoggedUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(getLoggedUser.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'failed';
                state.error = action.payload.error || 'Failed to get the user data';
                addToast({ message: state.error, type: "error" });
            })

            .addCase(updateUserInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUserInfo.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(updateUserInfo.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'failed';
                state.error = action.payload.error || 'An error occured while updating the user info. Please try again later.';
                addToast({ message: state.error, type: "error" });
            })

            .addCase(updatePassword.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.status = 'succeeded';
                localStorage.removeItem('token');
            })
            .addCase(updatePassword.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'failed';
                state.error = action.payload.error || 'An error occured while updating the password. Please try again later.';
                addToast({ message: state.error, type: "error" });
            })

            .addCase(logoutActionType, (state) => {
                state.user = null;
                state.status = 'idle';
                state.error = '';
            });
    },
});

export default userSlice.reducer;