import React, { useState, useEffect } from "react";
import "./PaymentInfo.scss";
import { paymentInfoDetails, getPaymentInfoDetails } from "../../../state/checkout/paymentInfo.slice";
import { getOnEditClickTabStatusDetails, onEditClickTabStatusDetails } from "../../../state/checkout/onEditClickTabStatus.slice";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getOnLoadTabStatusDetails, onLoadTabStatusDetails } from "../../../state/checkout/onLoadTabStatus.slice";


const PaymentInfo = () => {

    const { pathname } = useLocation();

    const dispatch = useDispatch();
    let isEnableEdit = useSelector(getOnEditClickTabStatusDetails);
    let onLoad = useSelector(getOnLoadTabStatusDetails);
    let pInfoDetails = useSelector(getPaymentInfoDetails);
    let [payInfoformData, setPayInfoFormData] = useState(pInfoDetails);
    let [payInfoValidation, setPayInfoValidation] = useState(payInfoformData);
    let years = ["2022", "2023", "2024", "2025", "2026", "2027", "2028"]

    useEffect(() => {
        setPayInfoFormData(pInfoDetails)
    }, [pInfoDetails])

    const isEmptyForm = () => {
        let flag = true;
        for (let key in payInfoformData) {
            if (!payInfoformData[key]) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    const validation = (ev) => {

        let { name, value } = ev.target;

        let onlyStringRegExp = /^[A-Za-z ]+$/;
        let cardRegExp = /^\d{16}$/;
        let cvvRegExp = /^\d{3}$/;

        setPayInfoValidation((p) => {
            if (name === 'numberOnCard' || name === 'cvv') {
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

        setPayInfoFormData((p) => {
            return {
                ...p,
                [name]: ((name === 'nameOnCard' && onlyStringRegExp.test(value)) ||
                    (name === 'numberOnCard' && cardRegExp.test(value)) ||
                    ((name === 'expMonth' || name === 'expYear') && value) ||
                    (name === 'cvv' && cvvRegExp.test(value))) ? value : ""
            }
        });
    }

    const submitFormThree = (ev, isEdit) => {
        ev.preventDefault(ev);

        let editTab = {
            contactInfoEditClick: false,
            shippingMethodEditClick: false,
            paymentInfoEditClick: isEdit
        }

        if (ev.type === 'submit') {
            if (isEmptyForm()) {
                dispatch(paymentInfoDetails(payInfoformData));
                dispatch(onEditClickTabStatusDetails(editTab));
                let tab = {
                    contactInfoTab: true,
                    shippingMethodTab: true,
                    paymentInfoTab: true,
                    cartItemsTab : true
                }
                dispatch(onLoadTabStatusDetails(tab));
            }
        } else {
            dispatch(onEditClickTabStatusDetails(editTab));
        }
    }
    return (<>
        {onLoad.paymentInfoTab ?
            <main className="main-payment-info">
                {
                    isEnableEdit.paymentInfoEditClick && pathname === "/checkout" ? <form className="checkout-sub-section-form" onSubmit={(ev) => submitFormThree(ev, false)} >

                        <section className="payment-info-sub-section">

                            <p className="checkout-sub-section-title">3. Payment Information</p>

                            <label htmlFor="name-card-input-box-id" className="checkout-sub-section-label" >
                                <span className="checkout-sub-section-label-text">Name on Debit / Credit Card*</span>
                                <input type="text" className="checkout-sub-section-input-box" id="name-card-input-box-id" placeholder="" name="nameOnCard" value={payInfoValidation.nameOnCard} onChange={validation} />
                                <span className="checkout-sub-section-validation">{!payInfoformData.nameOnCard ? "Enter Valid Name" : ""}</span>
                            </label>

                            <label htmlFor="number-card-input-box-id" className="checkout-sub-section-label" >
                                <span className="checkout-sub-section-label-text">Debit/Credit Card Number*</span>
                                <input type="text" className="checkout-sub-section-input-box" id="number-card-input-box-id" placeholder="XXXX XXXX XXXX 1234" maxLength="16" name="numberOnCard" value={payInfoValidation.numberOnCard} onChange={validation} />
                                <span className="checkout-sub-section-validation">{!payInfoformData.numberOnCard ? "Enter Valid Number" : ""}</span>
                            </label>

                            <div className="payment-info-inline">

                                <label htmlFor="exp-date-input-box-id" className="checkout-sub-section-label" >
                                    <span className="checkout-sub-section-label-text">Expiration Date*</span>
                                    <span className="exp-date-inline">
                                        <select className="checkout-sub-section-input-box" id="month-select-box-id" name="expMonth" value={payInfoValidation.expMonth} onChange={validation}>
                                            <option value="">MM</option>
                                            {Array(12).fill(0).map((o, i) => {
                                                return (<option key={i} value={i + 1} >{i + 1}</option>)
                                            })}
                                        </select>
                                        <select className="checkout-sub-section-input-box" id="year-select-box-id" name="expYear" value={payInfoValidation.expYear} onChange={validation}>
                                            <option value="">YYYY</option>
                                            {years.map((o, i) => {
                                                return (<option key={i} value={o} >{o}</option>)
                                            })}
                                        </select>
                                    </span>
                                    <span className="checkout-sub-section-validation">{payInfoformData.expMonth && payInfoformData.expYear ? "" : "Select Valid Exp. Date"}</span>
                                </label>

                                <label htmlFor="cvv-input-box-id" className="checkout-sub-section-label" >
                                    <span className="checkout-sub-section-label-text">CVV*</span>
                                    <input type="text" className="checkout-sub-section-input-box" id="cvv-input-box-id" placeholder="" maxLength="3" name="cvv" value={payInfoValidation.cvv} onChange={validation} />
                                    <span className="checkout-sub-section-validation">{!payInfoformData.cvv ? "Enter Valid CVV" : ""}</span>
                                </label>

                                <svg className="payment-info-help" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
                                    <g id="help-circle" transform="translate(-1 -1)">
                                        <circle id="Ellipse_126" dataname="Ellipse 126" cx="10" cy="10" r="10" transform="translate(2 2)" fill="none" stroke="#172026" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                        <path id="Path_38006" dataname="Path 38006" d="M9.09,9a3,3,0,0,1,5.83,1c0,2-3,3-3,3" fill="none" stroke="#172026" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                        <line id="Line_472" dataname="Line 472" x2="0.01" transform="translate(12 17)" fill="none" stroke="#172026" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                    </g>
                                </svg>

                            </div>

                        </section>

                        <section className="payment-info-sub-section">
                            <button type="submit" style={isEmptyForm() ? { opacity: "1" } : { opacity: "0.5" }} className="checkout-sub-section-button" id="payment-info-button">CONTINUE <span className="button-text-for-desk">TO <br /> REVIEW ORDER</span></button>
                        </section>

                    </form> :
                        <section className="payment-info-sub-display-section">

                            <p className="checkout-sub-section-title" id="payment-info-title">Payment Information</p>

                            {pathname === "/checkout" ? <svg className="checkout-sub-display-shipping-info-edit" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" onClick={(ev) => submitFormThree(ev, true)}>
                                <path id="edit-2" d="M14.1,2.84a2.282,2.282,0,0,1,3.228,3.228L6.438,16.961,2,18.172l1.21-4.438Z" transform="translate(-1 -1.172)" fill="none" stroke="#e26a2c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            </svg> : ""}

                            <p className="checkout-sub-display-shipping-info-user-details" id="payment-info-sub-display-shipping-method">
                                {payInfoformData.nameOnCard} <br />
                                Visa Credit Card <br />
                                {`XXXXXXXXXXXX` + payInfoformData.numberOnCard.slice(12, 16)}<br />
                            </p>
                        </section>
                }
            </main> :
            <main>
                <section className="checkout-sub-is-submit-section">
                    <p className="checkout-sub-section-title">Payment Information</p>
                </section>
            </main>}
    </>)
}

export default PaymentInfo