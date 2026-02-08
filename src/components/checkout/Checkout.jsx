import React, { useEffect, useState } from "react"; import "./Checkout.scss";
import { useSelector } from "react-redux";
import { getAllProducts } from "../../state/products/product.slice";
import ContactInfo from "./contact-info/ContactInfo";
import PaymentInfo from "./payment-info/PaymentInfo";
import ShippingMethod from "./shipping-method/ShippingMethod";
import AddedProducts from "../product-cart/added-products/AddedProducts";
import PricingSummary from "../product-cart/pricing-summary/PricingSummary";
import PlaceOrder from "./place-order/PlaceOrder";
import { useNavigate } from "react-router-dom";
import { getOnLoadTabStatusDetails } from "../../state/checkout/onLoadTabStatus.slice";

const Checkout = () => {

    let navigate = useNavigate();
    let onLoad = useSelector(getOnLoadTabStatusDetails);
    let allProducts = useSelector(getAllProducts);
    let [cartProducts, setCartProducts] = useState(allProducts.filter(o => o.addCart));

    let count = 0;
    let len = Number(allProducts.filter(x => x.addCart).reduce((p, c) => {
        count = count + c.quantity;
        return count;
    }, 0));

    useEffect(() => {
        if (allProducts.length === 0) {
            navigate("/");
        }
    }, [allProducts, onLoad])

    return (<>
        <main className="main-checkout">

            <section className="checkout-title">
                <p className="checkout-heading">Checkout</p>
                <hr className="checkout-heading-divider" />
            </section>

            <section className="checkout-user">
                <p className="checkout-user-heading">Guest Checkout</p>
            </section>

            <section className="checkout-contact-Info">
                <ContactInfo />
            </section>

            <section className="checkout-shipping-method">
                <ShippingMethod />
            </section>

            <section className="checkout-payment-info">
                <PaymentInfo />
            </section>

            {onLoad.cartItemsTab ? <section className="checkout-add-cart-products-summary">
                <div className="checkout-add-cart-products-title" >
                    <p className="checkout-sub-section-title">{len} items in your order</p>
                </div>
                <div className="checkout-add-cart-products-items">
                    <AddedProducts cartLits={cartProducts} />
                </div>
            </section> : ""}

            <section className="checkout-pricing-summary">
                <PricingSummary cartLits={cartProducts} />
            </section>

            <section className="checkout-place-order-button">
                <PlaceOrder />
            </section>

            {onLoad.shippingMethodTab ? "" : <section className="express-checkout-section">
                <span className="express-checkout-title">Sign in for Express Checkout</span>
                <button className="express-checkout-button">SIGN IN</button>
            </section>}


        </main>
    </>)

}

export default Checkout;