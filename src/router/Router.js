import React from "react";
import App from "../App";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../state/store.state';
import Loader from "../components/shared-components/loader/Loader";

const LazyHome = React.lazy(() => import("../components/home/Home"));
const LazyProductLists = React.lazy(() => import("../components/product-lists/ProductList"));
const LazyProductDetails = React.lazy(() => import("../components/product-details/ProductDetails"));
const LazyProductCart = React.lazy(() => import("../components/product-cart/ProductCart"));
const LazyCheckout = React.lazy(() => import("../components/checkout/Checkout"));
const LazyOrderSummary = React.lazy(() => import("../components/order-summary/OrderSummary"));
const LazyPageNotFound = React.lazy(() => import("../components/shared-components/page-not-found/PageNotFound"));

const Router = () => {
    return (<>
        <Provider store={store}>
            <BrowserRouter>
                <App>
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/home" exact element={<React.Suspense fallback=""><LazyHome /></React.Suspense>} />
                        <Route path="/products/:ele" exact element={<React.Suspense fallback=""><LazyProductLists /></React.Suspense>} />
                        <Route path="/productId/:id" element={<React.Suspense fallback={<Loader open={true} />}><LazyProductDetails /></React.Suspense>} />
                        <Route path="/cart" exact element={<React.Suspense fallback={<Loader open={true} />}><LazyProductCart /></React.Suspense>} />
                        <Route path="/checkout" exact element={<React.Suspense fallback={<Loader open={true} />}><LazyCheckout /></React.Suspense>} />
                        <Route path="/orderSummary" exact element={<React.Suspense fallback={<Loader open={true} />}><LazyOrderSummary /></React.Suspense>} />
                        <Route path="*" element={<React.Suspense fallback={<Loader open={true} />}><LazyPageNotFound /></React.Suspense>} />
                    </Routes>
                </App>
            </BrowserRouter>
        </Provider>
    </>)
}

export default Router;