import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Header.scss";
import Menu from "./menu/Menu";
import Cart from "./cart/Cart";
import Catagory from "./catagory/Catagory";
import headerLogo from "../../../assets/header-logo.png";
import { useSelector } from "react-redux";
import { getAllProducts } from "../../../state/products/product.slice";
import Fav from "./fav/Fav";

const Header = () => {

    const { pathname } = useLocation();
    let navigate = useNavigate();

    const getAllPro = useSelector(getAllProducts);
    let cartCount = 0;

    let cartLen = Number(getAllPro.filter(x => x.addCart).reduce((p, c) => {
        cartCount = cartCount + c.quantity;
        return cartCount;
    }, 0));

    let favLen = getAllPro.filter(x => x.favourite).length;

    useEffect(() => {
        document.querySelector("#btnControl").checked = false;
        document.querySelector(".cart-logo-header-section").setAttribute('data-cart-value', cartLen);
        document.querySelector(".fav-logo-header-section").setAttribute('data-fav-value', favLen);
    }, [pathname, cartLen, favLen]);

    return (<>
        <input type="checkbox" id="btnControl" />

        <header className="main-header-section">
            <label htmlFor="btnControl" className="menu-header-section"><Menu /></label>
            <div className="logo-header-section"><img  src={headerLogo} className="logo-header" alt="logo-header" onClick={() => navigate("/home")} /></div>
            <div className="menu-items-header-section"><Catagory /></div>
            <div className="fav-logo-header-section"><Fav /></div>
            <div className="cart-logo-header-section"><Cart /></div>
        </header>

        <aside className="aside-header-section">
            <div className="aside-top">
                <span className="aside-title">Shop Categories</span>
                <label htmlFor="btnControl" className="aside-close">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14.828" height="14.828" viewBox="0 0 14.828 14.828">
                        <g id="x" transform="translate(-4.586 -4.586)">
                            <line id="Line_624" dataname="Line 624" x1="12" y2="12" transform="translate(6 6)" fill="none" stroke="#172026" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            <line id="Line_625" dataname="Line 625" x2="12" y2="12" transform="translate(6 6)" fill="none" stroke="#172026" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </g>
                    </svg>
                </label>
            </div>
            <label htmlFor="btnControl"><Catagory /></label>
        </aside>

    </>)
}
export default Header