import React from "react";
import "./FooterLogo.scss";
import logo from "../../../../assets/logo.png";
import { Link } from "react-router-dom";

const FooterLogo = () => {
    return (<>
        <figure className="main-footer-logo">
            <Link style={{ textDecoration: 'none' }} className="header-link-logo" to={`/`}>
                <img  src={logo} className="img-footer-logo" alt="footer-logo" />
            </Link>
        </figure>
    </>)
}

export default FooterLogo;