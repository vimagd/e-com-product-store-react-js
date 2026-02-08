import React from "react";
import "./HomeCollection.scss";
import { useNavigate } from "react-router-dom";
import { clearAllfilterData, addfilterData } from "../../../state/features/filter.slice";
import { useDispatch } from "react-redux";

const HomeCollection = () => {

    let navigate = useNavigate();
    const dispatch = useDispatch();

    const onClickCata = (cata) => {
        let x = cata === "All" ? ["Electronics", "Jewelery", "Men", "Women"] : [cata];
        dispatch(clearAllfilterData());
        x.forEach((o) => {
            dispatch(addfilterData(o));
        });

        navigate("/products/All");
    }

    return (<>
        <main className="home-collection">
            <div className="collection-image"></div>
            <p className="collection-title">Take off in the new Signature Legging</p>
            <p className="collection-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor labore dolore magna lorem ipsum dolor sit dolore magna lorem ipsum dolor sit amet.</p>
            <span className="col-button-span"><button className="collection-shop-collection-button" onClick={() => onClickCata("All")}>SHOP COLLECTION</button></span>
            <span className="col-hr-span"><hr className="collection-divider" /></span>
        </main>
    </>)
}

export default HomeCollection;