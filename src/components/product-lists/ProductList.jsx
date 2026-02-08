/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./ProductList.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllProducts } from "../../state/products/product.slice";
import Banner from "./banner/Banner";
import BreadCrumb from "../shared-components/bread-crumb/BreadCrumb";
import SideBarOption from "./side-bar-option/SideBarOption";
import ProductTiles from "./products-tiles/ProductTiles";
import { getFilterArray, getFilterFlag } from "../../state/features/filter.slice";
import leftArrow from "../../assets/svg/chevron-left.svg";
import rightArrow from "../../assets/svg/chevron-right.svg";

const ProductList = () => {

    let [pageData, setPageData] = useState([]);
    let [pageNumber, setPageNumber] = useState(1);
    let [sortByObject, setSortByObject] = useState(JSON.stringify({ key: "id", val: "latest" }));
    let { ele } = useParams();
    let allProducts = useSelector(getAllProducts);
    let sidebarData = useSelector(getFilterArray);
    let proCata = allProducts.filter(o => sidebarData.includes(o.category));
    if (sidebarData.includes('Favourite')) {
        proCata = proCata.filter(o => o.favourite);
    }
    if (proCata.length === 0 && !sidebarData.includes('Favourite') && ele === 'All') {
        proCata = [...allProducts];
    }
    let filFlag = useSelector(getFilterFlag);

    let catagoryData = []
    catagoryData = allProducts.map(o => o.category).filter((v, i, a) => a.indexOf(v) === i)
    catagoryData.push('All');
    let navigate = useNavigate();

    //Pagination break down with 6 items per page
    const pageLimitData = (pn) => {
        setPageNumber(pn);
        let a = [];
        proCata.map((o, i) => {
            return {
                pageNumber: Math.ceil((i + 1) / 6),
                data: o
            }
        }).reduce((p, c) => {
            if (c.pageNumber === pn)
                a.push(c.data)
            return a
        }, []);

        setPageData(a)
    }

    const sortBy = (o, v) => {
        setSortByObject(o)
        let obj = JSON.parse(o);
        proCata = proCata.sort((a, b) => {
            let p = ["rating-low-high", "rating-high-low"].includes(obj.val) ? a[obj.key]["rate"] : a[obj.key];
            let q = ["rating-low-high", "rating-high-low"].includes(obj.val) ? b[obj.key]["rate"] : b[obj.key];
            return ['latest', 'price-low-high', 'rating-low-high', 'name-a-z'].includes(obj.val)
                ? (p < q) ? -1 : (p > q) ? 1 : 0
                : (p > q) ? -1 : (p < q) ? 1 : 0;
        });
        pageLimitData(v);
    }


    useEffect(() => {
        sortBy(sortByObject, 1);
        if (!["Women", "Electronics", "Jewelery", "Men", "All"].includes(ele)) {
            navigate("*");
        }

    }, [ele, allProducts, sidebarData]);

    return (<>
        <main className="product-list-section">
            <Banner />
            {
                allProducts.length !== 0 ? <div className="main-product-listing">
                    <section className="product-listing-breadcrumb">
                        <BreadCrumb />
                    </section>
                    {
                        filFlag ? <aside className="mob-product-listing-sidebar"><SideBarOption /></aside> : ""
                    }
                    <section className="desk-product-listing-sidebar">
                        <SideBarOption />
                    </section>
                    <section className="product-listing-tiles">
                        <ProductTiles productData={pageData} productDataLength={proCata.length} sortProduct={sortBy} />
                        {pageData.length ? <div className="pageNavigation-outer">
                            <div className="pageNavigation-inner">
                                <span className="page-numbers" onClick={() => sortBy(sortByObject, 1)}>
                                    <img src={leftArrow} className="icon-left-arrow" alt="Icon Left" />
                                </span>
                                {
                                    Array(Math.ceil(proCata.length / 6)).fill(0).map((o, i) => {
                                        return (<span className="page-numbers" key={i} onClick={() => sortBy(sortByObject, i + 1)}>{pageNumber === i + 1 ? <b className="page-numbers-underline">{i + 1}</b> : i + 1}</span>)
                                    })
                                }
                                <span className="page-numbers" onClick={() => sortBy(sortByObject, Math.ceil(proCata.length / 6))} >
                                    <img src={rightArrow} className="icon-right-arrow" alt="Icon Right" />
                                </span>
                            </div>
                        </div> : ""}
                    </section>
                </div> : ""

            }

        </main >

    </>)

}

export default ProductList