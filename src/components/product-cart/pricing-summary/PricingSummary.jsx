import React, { useEffect, useState } from "react";
import "./PricingSummary.scss";
import payPalImg from "../../../assets/PP_BTN@2x.png";
import { useNavigate, useLocation } from "react-router-dom";
import { getShippingMethodDetails } from "../../../state/checkout/shippingMethod.slice";
import { useSelector } from "react-redux";

const PricingSummary = (props) => {

    const { pathname } = useLocation();

    let navigate = useNavigate();

    let sMethodDetails = useSelector(getShippingMethodDetails);

    let [cartLitsPrice, setcartLitsPrice] = useState(JSON.parse(JSON.stringify(props.cartLits)));

    useEffect(() => {
        setcartLitsPrice(JSON.parse(JSON.stringify(props.cartLits)));
    }, [props.cartLits, sMethodDetails])

    const subTotal = () => {
        return cartLitsPrice.length !== 0 ? cartLitsPrice.map((o) => o.totalAmount).reduce((p, c) => { return Number(p) + c }, "") : 0;
    }

    const precentage = (dp) => {
        return cartLitsPrice.length !== 0 ? (subTotal() * dp / 100) : 0;
    }

    const shipping = () => {
        if (sMethodDetails.method === "Standard Shipping (4-8 business days via USPS) FREE")
            return 0;
        else if (sMethodDetails.method === "Express Delivery (2-5 business days via USPS) $17.95")
            return 17.95
        else
            return 53.61
    }

    const navToCheckout = () => {
        if (cartLitsPrice.length) {
            navigate("/checkout");
        }
    }

    return (
        <>
            <main className="main-pricing-summary">
                <p className="title-pricing-summary">Pricing Summary</p>
                <p className="label-pricing-summary">Subtotal<span className="value-pricing-summary">$ {subTotal().toFixed(2)}</span></p>
                <p className="label-pricing-summary">Coupon<span className="value-pricing-summary">- $ {precentage(20).toFixed(2)}</span></p>
                <p className="label-pricing-summary">Gift Card<span className="value-pricing-summary">- $ {precentage(5).toFixed(2)}</span></p>
                <p className="label-pricing-summary">Estimated tax<span className="value-pricing-summary">$ {precentage(12).toFixed(2)}</span></p>
                <p className="label-pricing-summary">Estimated shipping<span className="value-pricing-summary">{shipping() === 0 ? `FREE` : `$ ${shipping()}`}</span></p>
                <p className="label-total-pricing-summary">Estimated Total<span className="value-total-pricing-summary">$ {(subTotal() - precentage(20) - precentage(5) + shipping() + precentage(12)).toFixed(2)}</span></p>
                {pathname === '/cart' ? <>
                    <div className="checkout-pricing-summary">
                        <button type="submit" className="checkout-button-pricing-summary" style={cartLitsPrice.length ? { opacity: 1 } : { opacity: 0.5 }} onClick={() => navToCheckout()}>
                            <span className="span-svg"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22">
                                <g id="lock" transform="translate(-2 -1)">
                                    <rect id="Rectangle_1590" dataname="Rectangle 1590" width="18" height="11" rx="2" transform="translate(3 11)" fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                    <path id="Path_38020" dataname="Path 38020" d="M7,11V7A5,5,0,1,1,17,7v4" fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                </g>
                            </svg></span> <span className="span-button">CHECKOUT</span>
                        </button>
                    </div>
                    <div className="img-pricing-summary"><img  src={payPalImg} style={cartLitsPrice.length ? { opacity: 1 } : { opacity: 0.5 }} className="pay-pal-img-pricing-summary" alt="pay-pal-img" onClick={() => navToCheckout()} /></div>
                </> : ""}
            </main>
        </>
    )
}

export default PricingSummary