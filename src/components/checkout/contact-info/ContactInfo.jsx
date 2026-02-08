/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from "react";
import "./ContactInfo.scss";
import { contactInfoDetails, getContactInfoDetails } from "../../../state/checkout/contactInfo.slice";
import { getOnLoadTabStatusDetails, onLoadTabStatusDetails } from "../../../state/checkout/onLoadTabStatus.slice";
import { getOnEditClickTabStatusDetails, onEditClickTabStatusDetails } from "../../../state/checkout/onEditClickTabStatus.slice";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const ContactInfo = () => {

    const { pathname } = useLocation();

    const dispatch = useDispatch();
    let isEnableEdit = useSelector(getOnEditClickTabStatusDetails);
    let onLoad = useSelector(getOnLoadTabStatusDetails);
    let cInfoDetails = useSelector(getContactInfoDetails);
    let [formData, setFormData] = useState(cInfoDetails);
    let [fieldValidation, setFieldValidation] = useState(formData);

    useEffect(() => {
        setFormData(cInfoDetails)
    }, [cInfoDetails])

    const isEmptyForm = () => {
        let flag = true;
        for (let key in formData) {
            if (key !== "streetAddress2" && !formData[key]) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    let region = [{
        country: "India",
        state: ["Maharashtra", "Gujarat", "Karnataka"]
    },
    {
        country: "United States of America",
        state: ["Washington", "Texas", "California"]
    },
    {
        country: "United Arab Emirates",
        state: ["Abu Dhabi", "Dubai", "Sharjah"]
    }]

    let [regionStates, setRegionStates] = useState(["Maharashtra", "Gujarat", "Karnataka"]);

    const validation = (ev) => {
        let { name, value } = ev.target;
        let emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let phoneNumberRegExp = /^[6-9]\d{9}$/;
        let onlyStringRegExp = /^[A-Za-z ]+$/;
        let zipRegExp = /[1-9]{1}[0-9]{5}|[1-9]{1}[0-9]{3}\\s[0-9]{3}/

        setFieldValidation((p) => {

            if (name === 'phoneNumber' || name === 'zip') {
                let v = Number(value)
                return {
                    ...p,
                    [name]: typeof (v) === 'number' && !isNaN(v) ? value : ""
                }

            } else {
                return {
                    ...p,
                    [name]: value
                }
            }


        });

        if ((name === "email" && emailRegExp.test(value)) ||
            (name === "phoneNumber" && phoneNumberRegExp.test(value)) ||
            (name === "zip" && zipRegExp.test(value)) ||
            ((name === "firstName" || name === "lastName" || name === "city") && onlyStringRegExp.test(value))) {
            changeFun(ev);
        }
        else {
            ev.target.value = "";
            changeFun(ev);
        }

    }

    const changeFun = (ev) => {
        const { name, value } = ev.target;

        setFormData((p) => {
            if (name === 'country') {
                region.forEach((o) => {
                    if (value === o.country) {
                        let state = [...o.state];
                        setRegionStates(state);
                    }
                });
                let x = { ...p }
                x['state'] = "";
                p = x;
            }
            return {
                ...p,
                [name]: value
            }
        });
    }

    const submitFormOne = (ev, isEdit) => {

        ev.preventDefault(ev);

        if (isEmptyForm()) {

            dispatch(contactInfoDetails(formData));

            if (ev.type === 'submit') {
                let tab = {
                    contactInfoTab: true,
                    shippingMethodTab: true,
                    paymentInfoTab: onLoad.paymentInfoTab,
                    cartItemsTab : onLoad.cartItemsTab
                }
                dispatch(onLoadTabStatusDetails(tab));
            }

            let editTab = {
                contactInfoEditClick: isEdit,
                shippingMethodEditClick: !isEdit,
                paymentInfoEditClick: false
            }
            dispatch(onEditClickTabStatusDetails(editTab));
        }
    }


    return (<>
        {onLoad.contactInfoTab ? <main className="main-contact-info">
            {isEnableEdit.contactInfoEditClick && pathname === "/checkout" ?
                <form className="checkout-sub-section-form" onSubmit={(ev) => submitFormOne(ev, false)} >

                    <section className="contact-info-sub-section">

                        <p className="checkout-sub-section-title" id="contact-info-sub-section-title">Contact Information</p>

                        <p className="checkout-sub-section-disclamer" id="contact-info-sub-section-disclamer">We’ll use these details to keep you informed on your delivery.</p>

                        <label htmlFor="email-input-box-id" className="checkout-sub-section-label" id="contact-info-sub-section-email" >
                            <span className="checkout-sub-section-label-text">Email*</span>
                            <input type="text" className="checkout-sub-section-input-box" id="email-input-box-id" placeholder="abc@xyz.com" name="email" value={fieldValidation.email} onChange={validation} />
                            <span className="checkout-sub-section-validation">{formData.email ? "" : "Enter Valid Email"}</span>
                        </label>

                        <label htmlFor="phone-number-input-box-id" className="checkout-sub-section-label" id="contact-info-sub-section-phone-number" >
                            <span className="checkout-sub-section-label-text">Phone Number*</span>
                            <input type="text" className="checkout-sub-section-input-box" id="phone-number-input-box-id" placeholder="9890123458" name="phoneNumber" maxLength="10" value={fieldValidation.phoneNumber} onChange={validation} />
                            <span className="checkout-sub-section-validation">{formData.phoneNumber ? "" : "Enter Valid Phone Number"}</span>
                        </label>

                    </section>

                    <section className="contact-info-sub-section">

                        <p className="checkout-sub-section-title" id="contact-info-shipping-section-title">1. Shipping Information</p>

                        <label htmlFor="country-select-box-id" className="checkout-sub-section-label" id="contact-info-shipping-section-country" >
                            <span className="checkout-sub-section-label-text">Country*</span>
                            <select className="checkout-sub-section-input-box" id="country-select-box-id" name="country" value={formData.country} onChange={changeFun} >
                                <option value="" >Select</option>
                                {region.map((o, i) => {
                                    return (<option key={i} value={o.country} >{o.country}</option>)
                                })}
                            </select>
                            <span className="checkout-sub-section-validation">{formData.country ? "" : "Select Country"}</span>
                        </label>

                        <label htmlFor="first-name-input-box-id" className="checkout-sub-section-label" id="contact-info-shipping-first-name" >
                            <span className="checkout-sub-section-label-text">First Name*</span>
                            <input type="text" className="checkout-sub-section-input-box" id="first-name-input-box-id" placeholder="" name="firstName" value={fieldValidation.firstName} onChange={validation} />
                            <span className="checkout-sub-section-validation">{formData.firstName ? "" : "Enter Valid First Name"} </span>
                        </label>

                        <label htmlFor="last-name-input-box-id" className="checkout-sub-section-label" id="contact-info-shipping-last-name" >
                            <span className="checkout-sub-section-label-text">Last Name*</span>
                            <input type="text" className="checkout-sub-section-input-box" id="last-name-input-box-id" placeholder="" name="lastName" value={fieldValidation.lastName} onChange={validation} />
                            <span className="checkout-sub-section-validation">{formData.lastName ? "" : "Enter Valid Last Name"}</span>
                        </label>

                        <label htmlFor="street-address-input-box-id" className="checkout-sub-section-label" id="contact-info-shipping-street-address" >
                            <span className="checkout-sub-section-label-text">Street Address*</span>
                            <input type="text" className="checkout-sub-section-input-box" id="street-address-input-box-id" placeholder="" name="streetAddress" value={formData.streetAddress} onChange={changeFun} />
                            <span className="checkout-sub-section-validation">{formData.streetAddress ? "" : "Enter Valid Street Address"}</span>
                        </label>

                        <label htmlFor="street-address-two-input-box-id" className="checkout-sub-section-label" id="contact-info-shipping-street-address-two" >
                            <span className="checkout-sub-section-label-text">Street Address 2<span className="checkout-sub-section-label-optional-text">optional</span></span>
                            <input type="text" className="checkout-sub-section-input-box" id="street-address-two-input-box-id" placeholder="" name="streetAddress2" value={formData.streetAddress2} onChange={changeFun} />
                            <span className="checkout-sub-section-validation"></span>
                        </label>

                        <label htmlFor="city-input-box-id" className="checkout-sub-section-label" id="contact-info-shipping-city" >
                            <span className="checkout-sub-section-label-text">City*</span>
                            <input type="text" className="checkout-sub-section-input-box" id="city-input-box-id" placeholder="" name="city" value={fieldValidation.city} onChange={validation} />
                            <span className="checkout-sub-section-validation">{formData.city ? "" : "Enter Valid City"}</span>
                        </label>

                        <label htmlFor="state-select-box-id" className="checkout-sub-section-label" id="contact-info-shipping-state" >
                            <span className="checkout-sub-section-label-text">State*</span>
                            <select className="checkout-sub-section-input-box" id="state-select-box-id" name="state" value={formData.state} onChange={changeFun}>
                                <option value="">Select</option>
                                {regionStates.map((o, i) => {
                                    return (<option key={i} value={o} >{o}</option>)
                                })}
                            </select>
                            <span className="checkout-sub-section-validation">{formData.state ? "" : "Enter State"}</span>
                        </label>

                        <label htmlFor="zip-input-box-id" className="checkout-sub-section-label" id="contact-info-shipping-zip" >
                            <span className="checkout-sub-section-label-text">ZIP*</span>
                            <input type="text" className="checkout-sub-section-input-box" id="zip-input-box-id" placeholder="" maxLength="6" name="zip" value={fieldValidation.zip} onChange={validation} />
                            <span className="checkout-sub-section-validation">{formData.zip ? "" : "Enter Valid Zip"}</span>
                        </label>
                    </section>

                    <section className="contact-info-sub-section-button">
                        <button type="submit" style={isEmptyForm() ? { opacity: "1" } : { opacity: "0.5" }} className="checkout-sub-section-button" id="contact-info-button">CONTINUE <span className="button-text-for-desk">TO <br /> SHIPPING METHOD</span></button>
                    </section>

                </form> :
                <section className="contact-info-sub-display-section">

                    <p className="checkout-sub-section-title" id="contact-info-title">Contact Information</p>

                    {pathname === "/checkout" ? <svg className="checkout-sub-display-shipping-info-edit" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" onClick={(ev) => submitFormOne(ev, true)}>
                        <path id="edit-2" d="M14.1,2.84a2.282,2.282,0,0,1,3.228,3.228L6.438,16.961,2,18.172l1.21-4.438Z" transform="translate(-1 -1.172)" fill="none" stroke="#e26a2c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg> : ""}

                    <p className="checkout-sub-display-shipping-info-user-details" id="checkout-sub-display-contact-info-user-address-details">
                        {formData.email}<br />
                        {formData.phoneNumber}<br /><br />
                        {formData.firstName + " " + formData.lastName}<br />
                        {formData.streetAddress + ", " + formData.streetAddress2}<br />
                        {formData.city + ", " + formData.state}<br />
                        {formData.country + " - " + formData.zip}
                    </p>
                </section>}
        </main> :
            <main>
                <section className="checkout-sub-is-submit-section">
                    <p className="checkout-sub-section-title">Contact Information</p>
                </section>
            </main>
        }
    </>)

}

export default ContactInfo