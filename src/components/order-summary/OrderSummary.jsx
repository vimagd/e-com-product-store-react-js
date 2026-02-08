/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./OrderSummary.scss";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ContactInfo from "../checkout/contact-info/ContactInfo";
import ShippingMethod from "../checkout/shipping-method/ShippingMethod";
import PaymentInfo from "../checkout/payment-info/PaymentInfo";
import AddedProducts from "../product-cart/added-products/AddedProducts";
import { getAllProducts, featchProducts } from "../../state/products/product.slice";


const OrderSummary = () => {

    let navigate = useNavigate();
    const dispatch = useDispatch();

    let allProducts = useSelector(getAllProducts);
    let [allData,setAllData] = useState(allProducts);
    let [cartProducts, setCartProducts] = useState(allData.filter(o => o.addCart));

    let count = 0;
    let len = Number(allData.filter(x => x.addCart).reduce((p, c) => {
        count = count + c.quantity;
        return count;
    }, 0));

    useEffect(() => {
        if (allProducts.length === 0) {
            navigate("/");
        }
    }, [allProducts])

    useEffect(() => {
        let updatedAllProducts = JSON.parse(JSON.stringify(allProducts)).map((o) => {
            o.quantity = 1;
            o.addCart = false;
            o.totalAmount = o.price;
            return o;
        })
    
        dispatch(featchProducts(updatedAllProducts));
    }, [])

    return (<>
        <main className="main-order-summary">

            <section className="checkout-title">
                <p className="checkout-heading">Checkout</p>
                <hr className="checkout-heading-divider" />
            </section>

            <section className="order-summery-heading">
                <p className="checkout-user-heading">Order Number {Math.floor(100000 + Math.random() * 900000)}</p>
            </section>

            <section className="order-summary-contact-info">
                <ContactInfo />
            </section>

            <section className="order-summary-shipping-method">
                <ShippingMethod />
            </section>

            <section className="order-summary-payment-info">
                <PaymentInfo />
            </section>

            <section className="order-summary-add-cart-products-summary">
                <div className="order-summary-add-cart-products-title" >
                    <p className="order-summary-sub-section-title">{len} items in your order</p>
                </div>
                <div className="order-summary-add-cart-products-items">
                    <AddedProducts cartLits={cartProducts} />
                </div>
            </section>

            <section className="order-summary-disclamer" id="dis-one">
                <p>
                    You will also receive an email with the details and we will let you know when your order has shipped.
                </p>
            </section>

            <section className="order-summary-disclamer" id="dis-two">
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. For assistance call Support at 1-800-867-5309, M - F, 9am - 8pm EST.                </p>
            </section>

            <section className="order-summary-adds-discount">
                <p className="order-summary-add-title">Give us a follow <br /> to SAVE 20% <br /> on your next <br /> order</p>

                <svg className="order-summary-insta-img" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 22 22">
                    <g id="instagram" transform="translate(-1 -1)">
                        <rect id="Rectangle_1587" dataname="Rectangle 1587" width="20" height="20" rx="2" transform="translate(2 2)" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                        <path id="Path_38012" dataname="Path 38012" d="M16,11.37A4,4,0,1,1,12.63,8,4,4,0,0,1,16,11.37Z" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                        <line id="Line_475" dataname="Line 475" x2="0.01" transform="translate(17.5 6.5)" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                    </g>
                </svg>

                <svg className="order-summary-fb-img" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 13 22">
                    <path id="facebook" d="M18,2H15a5,5,0,0,0-5,5v3H7v4h3v8h4V14h3l1-4H14V7a1,1,0,0,1,1-1h3Z" transform="translate(-6 -1)" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                </svg>

                <svg className="order-summary-twt-img" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 20.142">
                    <path id="twitter" d="M23,3a10.9,10.9,0,0,1-3.14,1.53,4.48,4.48,0,0,0-7.86,3v1A10.66,10.66,0,0,1,3,4s-4,9,5,13a11.64,11.64,0,0,1-7,2c9,5,20,0,20-11.5a4.5,4.5,0,0,0-.08-.83A7.72,7.72,0,0,0,23,3Z" transform="translate(0 -1.912)" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                </svg>
            </section>

        </main>
    </>)
}
export default OrderSummary