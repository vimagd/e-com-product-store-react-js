import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shippingMethod: {
        method: "Standard Shipping (4-8 business days via USPS) FREE"
    }
}

const shippingMethodSlice = createSlice({
    name: "shippingMethod",
    initialState,
    reducers: {
        shippingMethodDetails: (state, { payload }) => {
            state.shippingMethod = payload;
        },
    },
});

export const { shippingMethodDetails } = shippingMethodSlice.actions;
export default shippingMethodSlice.reducer;
export const getShippingMethodDetails = (state) => state.shippingMethod.shippingMethod;