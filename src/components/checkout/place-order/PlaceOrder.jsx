import React, { useEffect, useState } from "react";
import "./PlaceOrder.scss";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getContactInfoDetails } from "../../../state/checkout/contactInfo.slice";
import { getShippingMethodDetails } from "../../../state/checkout/shippingMethod.slice";
import { getPaymentInfoDetails } from "../../../state/checkout/paymentInfo.slice";

const PlaceOrder = () => {

    let navigate = useNavigate();

    let cInfoDetails = useSelector(getContactInfoDetails);
    let sMethodDetails = useSelector(getShippingMethodDetails);
    let pInfoDetails = useSelector(getPaymentInfoDetails);

    let [mergeData, setMergeData] = useState({ ...cInfoDetails, ...sMethodDetails, ...pInfoDetails });

    useEffect(() => {
        setMergeData({ ...cInfoDetails, ...sMethodDetails, ...pInfoDetails });
    }, [cInfoDetails, sMethodDetails, pInfoDetails])

    const isEmptyForm = () => {
        let flag = true;
        for (let key in mergeData) {
            if (typeof (mergeData[key]) == 'string' && key !== "streetAddress2" && !mergeData[key]) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    const navToOrderSummary = () => {
        if (isEmptyForm()) {
            navigate("/orderSummary");
        }
    }

    return (<>
        <main className="main-place-order">
            <section className="place-order-button-section">
                <button type="submit" style={isEmptyForm() ? { opacity: "1" } : { opacity: "0.5" }}
                    className="checkout-sub-section-button" id="place-order-button" onClick={navToOrderSummary}>PLACE ORDER</button>
            </section>
            <section className="place-order-disclamer">
                By clicking confirm order you agree to our <br />
                <Link to="">Terms and Conditions</Link>
            </section>
        </main>
    </>)

}

export default PlaceOrder