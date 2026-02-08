import React from "react";
import "./ProductDescription.scss";

const ProductDescription = (props) => {
    return (
        <>
            <main className="main-product-desc">
                <p className="title-product-desc">{props.proDesc.title}</p>
                <p className="text-product-desc">Description</p>
                <p className="description-product-desc">{props.proDesc.description}</p>
            </main>
        </>
    )
}

export default ProductDescription
