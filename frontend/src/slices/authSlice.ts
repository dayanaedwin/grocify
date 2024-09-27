import { createSlice } from "@reduxjs/toolkit";
import { login, signUp } from "../thunks";

interface AuthState {
    token: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: AuthState = {
    token: localStorage.getItem('token') || null,
    status: 'idle',
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: state => {
            state.token = null;
            localStorage.removeItem('token');
            state.status = 'idle';
            state.error = null;
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
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Login failed';
            })
            .addCase(signUp.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signUp.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(signUp.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Registration failed';
            })
    }
});

export const { logout } = authSlice.actions;
export const logoutActionType = `${authSlice.name}/logout`;

export default authSlice.reducer;