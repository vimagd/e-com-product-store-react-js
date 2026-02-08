import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    catagory: []
}

const catagorySlice = createSlice({
    name: "catagory",
    initialState,
    reducers: {
        featchCatagory: (state, { payload }) => {
            state.catagory = payload;
        },
    },
});

export const { featchCatagory } = catagorySlice.actions;
export default catagorySlice.reducer;
export const getAllCatagory = (state) => state.catagory.catagory;