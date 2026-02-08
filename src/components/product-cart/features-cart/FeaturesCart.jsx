import React from "react";
import "./FeaturesCart.scss";
import arrowDown from "../../../assets/svg/chevron-down.svg"

const FeaturesCart = () => {

    let featuresData = [{
        title: "Estimate your Shipping",
        tag: "Shipping to 91001"
    },
    {
        title: "Enter a Coupon Code",
        tag: "20% discount applied"
    },
    {
        title: "Apply Gift Card",
        tag: "5% discount applied"
    }]

    return (
        <>
            <main className="main-features-cart">
                {
                    featuresData.map((o, i) => {
                        return (
                            <section key={i} className="features-cart">
                                <figcaption className="features-cart-title">{o.title}<img  src={arrowDown} className="icon-arrow-down-fea-cart" alt="arrow-down" /></figcaption>
                                <p className="features-cart-tag">{o.tag}</p>
                            </section>
                        )
                    })
                }
                {
                    featuresData.map((o, i) => {
                        return (
                            <section key={i} className="desk-features-cart">
                                <p className="desk-features-cart-title">{o.title}</p>
                                <p className="desk-features-cart-tag">{o.tag}</p>
                                <img  src={arrowDown} className="desk-icon-arrow-down-fea-cart" alt="arrow-down" />
                            </section>
                        )
                    })
                }
            </main>
        </>
    )
}

export default FeaturesCart