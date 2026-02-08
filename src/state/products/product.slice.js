import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: []
}

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        featchProducts: (state, { payload }) => {
            state.products = payload;
        },
    },
});

export const { featchProducts } = productSlice.actions;
export default productSlice.reducer;
export const getAllProducts = (state) => state.products.products;