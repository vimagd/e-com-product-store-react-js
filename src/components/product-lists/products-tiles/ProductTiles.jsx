import React, { useState } from "react";
import "./ProductTiles.scss";
import slidersSVG from "../../../assets/svg/sliders.svg";
import arrowDownSVG from "../../../assets/svg/arrow-down.svg";
import arrowUpSVG from "../../../assets/svg/arrow-up.svg";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFilter } from "../../../state/features/filter.slice";
import { recentAction } from "../../../state/features/recent.slice";
import { featchProducts } from "../../../state/products/product.slice";
import { getAllProducts } from "../../../state/products/product.slice";


//used Material tooltip for display of product title
const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[5],
        fontSize: 15,
    },
}));


const ProductTiles = (props) => {

    const dispatch = useDispatch();
    let [sortFlagMob, setSortFlagMob] = useState(false);
    let allProducts = useSelector(getAllProducts);

    const renderProductData = (pData) => {
        return pData.map(o => {
            return (
                <section className="tiles" key={o.id}>
                    <Link style={{ textDecoration: 'none' }} to={`/productId/${o.id}`} onClick={() => dispatchRecentView(o)}>
                        <section className="main-product-image-div">
                            <img  src={o.image} className="product-image" alt={o.image} />
                        </section>
                    </Link>
                    <section>
                        <LightTooltip title={o.title}>
                            <Link style={{ textDecoration: 'none', color: "#1B252C" }} to={`/productId/${o.id}`} onClick={() => dispatchRecentView(o)}><p className="product-title">{o.title.slice(0, 20)}...</p></Link>
                        </LightTooltip>
                        <p className="product-price">$ {o.price}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22.903" height="20.232" viewBox="0 0 22.903 20.232" className="product-fav-icon" onClick={(ev) => proFav(ev, o.id)} >
                            <path className="product-fav-icon-path" id={`heart-${o.id}`} d="M20.84,4.61a5.5,5.5,0,0,0-7.78,0L12,5.67,10.94,4.61a5.5,5.5,0,0,0-7.78,7.78l1.06,1.06L12,21.23l7.78-7.78,1.06-1.06a5.5,5.5,0,0,0,0-7.78Z" transform="translate(-0.549 -1.998)" fill={o.favourite ? 'rgb(27, 37, 44)' : 'none'} stroke="#172026" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                    </section>
                </section>
            )
        })
    }

    const toggleFilterMethod = () => {
        dispatch(toggleFilter(true));
    }

    const dispatchRecentView = (singleProduct) => {
        dispatch(recentAction(singleProduct));
    }

    const proFav = (ev, id) => {

        let updatedAllProducts = JSON.parse(JSON.stringify(allProducts)).map((o) => {
            if (o.id === id) {
                o.favourite = !o.favourite
            }
            return o;
        });

        dispatch(featchProducts(updatedAllProducts));
    }

    const sortCallParent = () => {
        props.sortProduct(JSON.stringify({ key: "title", val: sortFlagMob ? "name-a-z" : "name-z-a" }), 1);
        setSortFlagMob(!sortFlagMob)
    }

    return (<>
        <main className="action-button">
            <section className="filter-result" onClick={toggleFilterMethod}><img  src={slidersSVG} className='icon-sliders' alt="Icon sliders" /> Filter Results</section>
            <section className="sort-products" onClick={() => sortCallParent()}>
                <img  src={arrowDownSVG} className='icon-arrow-down' alt="Icon arrow down" />
                <img  src={arrowUpSVG} className='icon-arrow-up' alt="Icon arrow up" />
                Sort Products
            </section>
            <p className="count-result">{props.productDataLength} Results</p>

            <select className="sort-dropdown" onChange={(ev) => { props.sortProduct(ev.target.value, 1) }}>
                <option value={JSON.stringify({ key: "id", val: "latest" })}>Sort by Latest</option>
                <option value={JSON.stringify({ key: "price", val: "price-high-low" })}>Sort by Price High-Low</option>
                <option value={JSON.stringify({ key: "price", val: "price-low-high" })}>Sort by Price Low-High</option>
                <option value={JSON.stringify({ key: "title", val: "name-a-z" })}>Sort by Name A-Z</option>
                <option value={JSON.stringify({ key: "title", val: "name-z-a" })} defaultValue>Sort by Name Z-A</option>
            </select>
        </main>
        {props.productData.length ? <main className="main-tiles">{renderProductData(props.productData)}</main> : <p className="no-data-found-class">No Data Found</p>}
    </>)

}

export default ProductTiles