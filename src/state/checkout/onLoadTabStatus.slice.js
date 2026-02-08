import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    onLoadTabStatus: {
        contactInfoTab: true,
        shippingMethodTab: false,
        paymentInfoTab: false,
        cartItemsTab : false
    }
}

const onLoadTabStatusSlice = createSlice({
    name: "onLoadTabStatus",
    initialState,
    reducers: {
        onLoadTabStatusDetails: (state, { payload }) => {
            state.onLoadTabStatus = payload;
        },
    },
});

export const { onLoadTabStatusDetails } = onLoadTabStatusSlice.actions;
export default onLoadTabStatusSlice.reducer;
export const getOnLoadTabStatusDetails = (state) => state.onLoadTabStatus.onLoadTabStatus;