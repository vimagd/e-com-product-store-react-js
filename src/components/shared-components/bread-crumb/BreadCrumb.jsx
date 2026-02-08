import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./BreadCrumb.scss";
import { useDispatch } from "react-redux";
import { addfilterData, clearAllfilterData } from '../../../state/features/filter.slice'

const BreadCrumb = (props) => {

    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const [path, setPath] = useState('/home');

    useEffect(() => {
        setPath(pathname);
        // console.log(path);
    }, [pathname]);

    const onClickCata = (cata) => {
        let x = cata === "All" ? ["Electronics", "Jewelery", "Men", "Women"] : [cata];
        dispatch(clearAllfilterData());
        x.forEach((o) => {
            dispatch(addfilterData(o));
        });
    }

    const findPathFunction = () => {
        if (path.split('/').includes('products')) {
            return (<><Link className="a-tag" to={`/home`} >Dashboard</Link> / Product Lists</>);
        }
        else if (path.split('/').includes('productId')) {
            return (<><Link className="a-tag" to={`/home`} >Dashboard</Link> / <Link className="a-tag" to={`/products/All`} onClick={() => onClickCata('All')} >Product Lists</Link> / Product Details</>);
        }
    }

    return (<>
        <div className="main-crumb">{findPathFunction()}</div>
    </>)

}

export default BreadCrumb