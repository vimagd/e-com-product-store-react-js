import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    onEditClickTabStatus: {
        contactInfoEditClick: true,
        shippingMethodEditClick: true,
        paymentInfoEditClick: true,
    }
}

const onEditClickTabStatusSlice = createSlice({
    name: "onEditClickTabStatus",
    initialState,
    reducers: {
        onEditClickTabStatusDetails: (state, { payload }) => {
            state.onEditClickTabStatus = payload;
        },
    },
});

export const { onEditClickTabStatusDetails } = onEditClickTabStatusSlice.actions;
export default onEditClickTabStatusSlice.reducer;
export const getOnEditClickTabStatusDetails = (state) => state.onEditClickTabStatus.onEditClickTabStatus;