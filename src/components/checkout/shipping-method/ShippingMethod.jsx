import React, { useEffect, useState } from "react";
import "./ShippingMethod.scss";
import { shippingMethodDetails, getShippingMethodDetails } from "../../../state/checkout/shippingMethod.slice";
import { getOnLoadTabStatusDetails, onLoadTabStatusDetails } from "../../../state/checkout/onLoadTabStatus.slice";
import { getOnEditClickTabStatusDetails, onEditClickTabStatusDetails } from "../../../state/checkout/onEditClickTabStatus.slice";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const ShippingMethod = () => {

    const { pathname } = useLocation();

    const dispatch = useDispatch();
    let isEnableEdit = useSelector(getOnEditClickTabStatusDetails);
    let onLoad = useSelector(getOnLoadTabStatusDetails);
    let sMethodDetails = useSelector(getShippingMethodDetails);
    let [shippingFormData, setShippingFormData] = useState(sMethodDetails);

    useEffect(() => {
        setShippingFormData(sMethodDetails)
    }, [sMethodDetails])

    const changeFun = (ev) => {
        const { name, value } = ev.target;
        setShippingFormData((p) => {
            return {
                ...p,
                [name]: value.trim()
            }
        });
    }

    const submitFormTwo = (ev, isEdit) => {

        ev.preventDefault(ev);

        dispatch(shippingMethodDetails(shippingFormData));

        if (ev.type === 'submit') {
            let tab = {
                contactInfoTab: true,
                shippingMethodTab: true,
                paymentInfoTab: true,
                cartItemsTab : onLoad.cartItemsTab
            }
            dispatch(onLoadTabStatusDetails(tab));
        }

        let editTab = {
            contactInfoEditClick: false,
            shippingMethodEditClick: isEdit,
            paymentInfoEditClick: !isEdit
        }
        dispatch(onEditClickTabStatusDetails(editTab));

    }

    return (<>
        {onLoad.shippingMethodTab ?
            <main className="main-shipping-method">
                {isEnableEdit.shippingMethodEditClick && pathname === "/checkout" ? <form className="checkout-sub-section-form" onSubmit={(ev) => submitFormTwo(ev, false)}>

                    <section className="shipping-method-sub-section">
                        <p className="checkout-sub-section-title">2. Shipping Method</p>

                        <label htmlFor="standard-shipping-radio-button-id" className="checkout-sub-section-label shipping-radio-label" >
                            <span className="checkout-sub-section-label-text shipping-radio-title" >Standard Shipping (4-8 business days via USPS) FREE</span>
                            <input type="radio" className="shipping-radio-button" id="standard-shipping-radio-button-id"
                                name="method"
                                value="Standard Shipping (4-8 business days via USPS) FREE"
                                checked={shippingFormData.method === "Standard Shipping (4-8 business days via USPS) FREE"}
                                onChange={changeFun} />
                        </label>

                        <label htmlFor="express-delivery-radio-button-id" className="checkout-sub-section-label shipping-radio-label" >
                            <span className="checkout-sub-section-label-text shipping-radio-title" >Express Delivery (2-5 business days via USPS) $17.95</span>
                            <input type="radio" className="shipping-radio-button" id="express-delivery-radio-button-id"
                                name="method"
                                value="Express Delivery (2-5 business days via USPS) $17.95"
                                checked={shippingFormData.method === "Express Delivery (2-5 business days via USPS) $17.95"}
                                onChange={changeFun} />
                        </label>

                        <label htmlFor="next-day-delivery-radio-button-id" className="checkout-sub-section-label shipping-radio-label" >
                            <span className="checkout-sub-section-label-text shipping-radio-title" >Next Day Delivery (Next business days via FedEx) $53.61</span>
                            <input type="radio" className="shipping-radio-button" id="next-day-delivery-radio-button-id"
                                name="method"
                                value="Next Day Delivery (Next business days via FedEx) $53.61"
                                checked={shippingFormData.method === "Next Day Delivery (Next business days via FedEx) $53.61"}
                                onChange={changeFun} />
                        </label>
                    </section>

                    <section className="shipping-method-sub-section">
                        <button type="submit" className="checkout-sub-section-button" id="shipping-method-button">CONTINUE <span className="button-text-for-desk">TO <br /> PAYMENT METHOD</span></button>
                    </section>

                </form> :
                    <section className="shipping-method-sub-display-section">
                        <p className="checkout-sub-section-title" id="shipping-method-title">Shipping Method</p>

                        {pathname === "/checkout" ? <svg className="checkout-sub-display-shipping-info-edit" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" onClick={(ev) => submitFormTwo(ev, true)}>
                            <path id="edit-2" d="M14.1,2.84a2.282,2.282,0,0,1,3.228,3.228L6.438,16.961,2,18.172l1.21-4.438Z" transform="translate(-1 -1.172)" fill="none" stroke="#e26a2c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg> : ""}

                        <p className="checkout-sub-display-shipping-info-user-details" id="shipping-sub-display-shipping-method">
                            {shippingFormData.method}
                        </p>

                    </section>
                }
            </main> :
            <main>
                <section className="checkout-sub-is-submit-section">
                    <p className="checkout-sub-section-title">Shipping Method</p>
                </section>
            </main>
        }
    </>)
}

export default ShippingMethod;