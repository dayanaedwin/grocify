import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProductDetails } from './productSlice';

interface SearchState {
    searchTerm: string;
    filteredProducts: IProductDetails[];
}

const initialState: SearchState = {
    searchTerm: '',
    filteredProducts: [],
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        },
        setFilteredProducts: (state, action: PayloadAction<IProductDetails[]>) => {
            state.filteredProducts = action.payload;
        },
        clearSearch: (state) => {
            state.searchTerm = '';
            state.filteredProducts = [];
        },
    },
});

export const { setSearchTerm, setFilteredProducts, clearSearch } = searchSlice.actions;

export default searchSlice.reducer;
