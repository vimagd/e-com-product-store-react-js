import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    paymentInfo: {
        nameOnCard: "",
        numberOnCard: "",
        expMonth: "",
        expYear: "",
        cvv: ""
    }
}

const paymentInfoSlice = createSlice({
    name: "paymentInfo",
    initialState,
    reducers: {
        paymentInfoDetails: (state, { payload }) => {
            state.paymentInfo = payload;
        },
    },
});

export const { paymentInfoDetails } = paymentInfoSlice.actions;
export default paymentInfoSlice.reducer;
export const getPaymentInfoDetails = (state) => state.paymentInfo.paymentInfo;