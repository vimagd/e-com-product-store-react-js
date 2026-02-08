import React from "react";
import "./HomeCatagoryTiles.scss";
import ele from "../../../assets/electronics.jpg";
import jew from "../../../assets/jewelery.jpg";
import men from "../../../assets/men.jpg";
import women from "../../../assets/women.jpg";
import { Link } from "react-router-dom";
import { clearAllfilterData, addfilterData } from "../../../state/features/filter.slice";
import { useDispatch } from "react-redux";

const HomeCatagoryTiles = () => {
    const dispatch = useDispatch();

    const onClickCata = (cata) => {
        let x = cata === "All" ? ["Electronics", "Jewelery", "Men", "Women"] : [cata];
        dispatch(clearAllfilterData());
        x.forEach((o) => {
            dispatch(addfilterData(o));
        });
    }
    return (<>
        <main className="home-catagory-tiles">

            <Link to={`/products/Electronics`} className="prod-link" onClick={() => onClickCata('Electronics')} >
                <div className="home-catagory-tiles-division">
                    <div className="tiles-image-section">
                        <img  src={ele} className="tiles-image" alt="tiles-ele" />
                    </div>
                    <div className="tiles-title-section">
                        <span>Electronics</span>
                        <span>Gadgets for many activities</span>
                    </div>
                    <div className="tiles-divider"></div>
                </div>
            </Link>

            <Link to={`/products/Jewelery`} className="prod-link" onClick={() => onClickCata('Jewelery')}>
                <div className="home-catagory-tiles-division">
                    <div className="tiles-image-section">
                        <img  src={jew} className="tiles-image" alt="tiles-jew" />
                    </div>
                    <div className="tiles-title-section">
                        <span>Jewelery</span>
                        <span>For your visual appearance</span>
                    </div>
                    <div className="tiles-divider"></div>
                </div>
            </Link>

            <Link to={`/products/Men`} className="prod-link" onClick={() => onClickCata('Men')}>
                <div className="home-catagory-tiles-division">
                    <div className="tiles-image-section">
                        <img  src={men} className="tiles-image" alt="tiles-men" />
                    </div>
                    <div className="tiles-title-section">
                        <span>Shop Men</span>
                        <span>Clothing, shoes & more</span>
                    </div>
                    <div className="tiles-divider"></div>
                </div>
            </Link>

            <Link to={`/products/Women`} className="prod-link" onClick={() => onClickCata('Women')}>
                <div className="home-catagory-tiles-division">
                    <div className="tiles-image-section">
                        <img  src={women} className="tiles-image" alt="tiles-women" />
                    </div>
                    <div className="tiles-title-section">
                        <span>Shop Women</span>
                        <span>Clothing, ladies bags & more</span>
                    </div>
                    <div className="tiles-divider"></div>
                </div>
            </Link>
        </main>
    </>)
}

export default HomeCatagoryTiles;