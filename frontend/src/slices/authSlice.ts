import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, signUp } from "../thunks";
import { addToast } from "./toastSlice";

interface AuthState {
    token: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string;
}

const initialState: AuthState = {
    token: localStorage.getItem('token') || null,
    status: 'idle',
    error: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: state => {
            state.token = null;
            localStorage.removeItem('token');
            state.status = 'idle';
            state.error = '';
        }
    },
    extraReducers: builder => {
        builder
            .addCase(login.pending, state => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'failed';
                state.error = action.payload.error || 'Login failed';
                addToast({ message: state.error, type: "error" });
            })
            .addCase(signUp.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signUp.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(signUp.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'failed';
                state.error = action.payload.error || 'Registration failed';
                addToast({ message: state.error, type: "error" });
            })
    }
});

export const { logout } = authSlice.actions;
export const logoutActionType = `${authSlice.name}/logout`;

export default authSlice.reducer;