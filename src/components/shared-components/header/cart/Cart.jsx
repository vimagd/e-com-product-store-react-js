import React from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {

    let navigate = useNavigate();

    return (<>
        <svg className="header-cart" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 20 22" onClick={() => navigate("/cart")}>
            <g id="shopping-bag" transform="translate(-2 -1)">
                <path id="Path_38093" dataname="Path 38093" d="M6,2,3,6V20a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2V6L18,2Z" fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <line id="Line_555" dataname="Line 555" x2="18" transform="translate(3 6)" fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <path id="Path_38094" dataname="Path 38094" d="M16,10a4,4,0,0,1-8,0" fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </g>
        </svg>
    </>)

}

export default Cart