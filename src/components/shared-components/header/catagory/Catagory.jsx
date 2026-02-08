import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getAllCatagory } from "../../../../state/products/catagory.slice";
import { addfilterData, clearAllfilterData } from "../../../../state/features/filter.slice";
import { Link } from "react-router-dom";

const Catagory = () => {

    const dispatch = useDispatch();
    const cat = useSelector(getAllCatagory);
    const { pathname } = useLocation();

    const onClickCata = (cata) => {
        let x = cata === "All" ? ["Electronics", "Jewelery", "Men", "Women"] : [cata];
        dispatch(clearAllfilterData());
        x.forEach((o) => {
            dispatch(addfilterData(o));
        });
    }

    return (<>
        <div className="catagory-main">
            <nav className={pathname.split("/").includes('home') ? "catagory-items active" : "catagory-items"}><Link to={`/home`} style={{ textDecoration: 'none' }}>Home</Link></nav>
            {
                cat.map((o, i) => {
                    return <nav className={pathname.split("/").includes(o) ? "catagory-items active" : "catagory-items"} key={i}><Link to={`/products/${o}`} style={{ textDecoration: 'none' }} onClick={() => onClickCata(o)}>{o}</Link></nav>
                })
            }
        </div>
    </>)
}

export default Catagory;