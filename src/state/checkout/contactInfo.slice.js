import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    contactInfo: {
        email: "",
        phoneNumber: "",
        country: "",
        firstName: "",
        lastName: "",
        streetAddress: "",
        streetAddress2: "",
        city: "",
        state: "",
        zip: ""
    }
}

const contactInfoSlice = createSlice({
    name: "contactInfo",
    initialState,
    reducers: {
        contactInfoDetails: (state, { payload }) => {
            state.contactInfo = payload;
        },
    },
});

export const { contactInfoDetails } = contactInfoSlice.actions;
export default contactInfoSlice.reducer;
export const getContactInfoDetails = (state) => state.contactInfo.contactInfo;