import React from "react";
import AboutUs from "./about-us/AboutUs";
import Account from "./account/Account";
import Help from "./help/Help";
import FollowUs from "./follow-us/FollowUs";
import Terms from "./terms/Terms";
import Company from "./company/Company";
import FooterLogo from "./footer-logo/FooterLogo";
import "./Footer.scss";

const Footer = () => {
    return (<>
        <hr className="hr-footer-one" />
        <footer className="main-footer">
            <section className="footer-account">
                <Account />
            </section>
            <section className="footer-about-us">
                <AboutUs />
            </section>
            <section className="footer-help">
                <Help />
            </section>
            <section className="footer-follow-us">
                <FollowUs />
            </section>
            <hr className="hr-footer-two" />
            <section className="footer-terms">
                <Terms />
            </section>
            <section className="footer-company">
                <Company />
            </section>
            <section className="footer-logo">
                <FooterLogo />
            </section>
        </footer>
    </>)
}

export default Footer;