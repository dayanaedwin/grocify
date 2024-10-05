import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Toast {
    id: number;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
}

interface ToastState {
    toast: Toast | null;
}

const initialState: ToastState = {
    toast: null,
};

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        addToast(state, action: PayloadAction<{ message: string; type: 'success' | 'error' | 'warning' | 'info' }>) {
            state.toast = { id: Date.now(), ...action.payload };
        },
        removeToast(state) {
            state.toast = null;
        },
    },
});

export const { addToast, removeToast } = toastSlice.actions;

export default toastSlice.reducer;
