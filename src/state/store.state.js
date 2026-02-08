import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./products/product.slice";
import catagoryReducer from "./products/catagory.slice";
import filterReducer from "./features/filter.slice";
import recentReducer from "./features/recent.slice";
import contactInfoReducer from "./checkout/contactInfo.slice";
import shippingMethodReducer from "./checkout/shippingMethod.slice";
import paymentInfoReducer from "./checkout/paymentInfo.slice";
import onLoadTabStatusReducer from "./checkout/onLoadTabStatus.slice";
import onEditClickTabStatusReducer from "./checkout/onEditClickTabStatus.slice";


//created and configure store with assigning reducer value
export const store = configureStore({
    reducer: {
        products: productReducer,
        catagory: catagoryReducer,
        sideBarFilter: filterReducer,
        recentView: recentReducer,
        contactInfo: contactInfoReducer,
        shippingMethod: shippingMethodReducer,
        paymentInfo: paymentInfoReducer,
        onLoadTabStatus: onLoadTabStatusReducer,
        onEditClickTabStatus: onEditClickTabStatusReducer
    }
})