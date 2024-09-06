import { createSlice } from "@reduxjs/toolkit";
import { getLoggedUser } from "../thunks";

export interface User {
    _id: string,
    name: string,
    email: string,
    roles: string[],
    address?: {
        street: string,
        city: string,
        state: string,
        pincode: number,
        country: string,
    }
}

interface UserState {
    user: User | null,
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: UserState = {
    user: null,
    status: 'idle',
    error: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLoggedUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getLoggedUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(getLoggedUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to get the data';
            });
    },
});

export default userSlice.reducer;