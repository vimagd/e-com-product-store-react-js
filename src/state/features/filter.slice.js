import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filterFlag: false,
    filterArray: []
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        toggleFilter: (state, { payload }) => {
            state.filterFlag = payload;
        },
        addfilterData: (state, { payload }) => {
            if (!state.filterArray.includes(payload))
                state.filterArray.push(payload);
        },
        removefilterData: (state, { payload }) => {
            state.filterArray = state.filterArray.filter(o => o !== payload);
        },
        clearAllfilterData: (state, { payload }) => {
            state.filterArray = [];
        },
    },
});

export const { toggleFilter, addfilterData, removefilterData, clearAllfilterData } = filterSlice.actions;
export default filterSlice.reducer;
export const getFilterFlag = (state) => state.sideBarFilter.filterFlag;
export const getFilterArray = (state) => state.sideBarFilter.filterArray;