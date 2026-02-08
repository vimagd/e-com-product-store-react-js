/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./ProductDetails.scss";
import { useParams } from "react-router-dom";
import BreadCrumb from "../shared-components/bread-crumb/BreadCrumb"
import { useSelector } from "react-redux";
import { getAllProducts } from "../../state/products/product.slice";
import ProductImage from "./product-image/ProductImage";
import ProductTitle from "./product-title/ProductTitle";
import ProductFormat from "./product-format/ProductFormat";
import ProductCaution from "./product-caution/ProductCaution";
import ProductDescription from "./product-description/ProductDescription";
import ProductQuantity from "./product-quantity/ProductQuantity";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {

    const id = Number(useParams().id);
    let allProducts = useSelector(getAllProducts);
    let singleProduct = allProducts.filter(o => o.id === id)[0];
    let navigate = useNavigate();
    useEffect(() => {
        if (allProducts.length === 0) {
            navigate("/");
        } else if (!singleProduct) {
            navigate("*");
        }
    }, [])

    return (
        <>
            {
                singleProduct ?
                    <main className="main-product-details">
                        <section className="breadcrumb-product-details">
                            <BreadCrumb breadcrumbData={`Products / ${singleProduct.category} / ${singleProduct.title.slice(0, 4)}...`} />
                        </section>
                        <section className="image-section-product-details">
                            <ProductImage proImg={singleProduct.image} />
                        </section>
                        <section className="title-section-product-details">
                            <ProductTitle proTitle={singleProduct} />
                        </section>
                        <section className="format-section-product-details">
                            <ProductFormat />
                        </section>
                        <section className="quantity-section-product-details">
                            <ProductQuantity proQuantity={singleProduct} allPro={allProducts} />
                        </section>
                        <section className="description-section-product-details">
                            <ProductDescription proDesc={singleProduct} />
                        </section>
                        <section className="caution-section-product-details">
                            <ProductCaution />
                        </section>
                    </main>
                    : ""
            }
            <hr className="hr-primary-brand" />
        </>
    )




}

export default ProductDetails