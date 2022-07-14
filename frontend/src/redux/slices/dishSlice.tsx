import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { publicRequest } from "../requestMethods";

import { IDish } from "../../components/recommended-dish/Dish";

export interface IInitState {
    products: IDish[];
    filteredProducts: IDish[];
    searchedProducts: IDish[];
    isLoading: boolean;
}

const initialState: IInitState = {
    products: [],
    filteredProducts: [],
    searchedProducts: [],
    isLoading: false,
};

export const getDishes = createAsyncThunk("dishes/getDishes", async () => {
    const response = await publicRequest.get("/Recipe");
    return response.data;
});

const dishSlice = createSlice({
    name: "dishSlice",
    initialState,
    reducers: {
        filterProducts(state, action: PayloadAction<number>) {
            const filteredArray = state.products.filter((product) => {
                return product.category === action.payload;
            });

            if (state.filteredProducts.length < state.products.length) {
                state.filteredProducts.push(...filteredArray);
            } else {
                state.filteredProducts = filteredArray;
            }
        },
        clearFilters(state, action: PayloadAction<number>) {
            const filteredArray = state.filteredProducts.filter((product) => {
                return product.category !== action.payload;
            });

            filteredArray.length
                ? (state.filteredProducts = filteredArray)
                : (state.filteredProducts = state.products);
        },
        searchProducts(state, action: PayloadAction<string>) {
            state.searchedProducts = state.products.filter((product) => {
                return product.name
                    .toLowerCase()
                    .includes(action.payload.toLowerCase());
            });
        },
        clearSearchProducts(state) {
            state.searchedProducts = [];
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getDishes.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getDishes.fulfilled, (state, action) => {
                state.products = action.payload;
                state.filteredProducts = action.payload;
                state.isLoading = false;
            })
            .addCase(getDishes.rejected, (state, action) => {
                state.isLoading = false;
            });
    },
});

export const {
    filterProducts,
    clearFilters,
    searchProducts,
    clearSearchProducts,
} = dishSlice.actions;
export default dishSlice.reducer;
