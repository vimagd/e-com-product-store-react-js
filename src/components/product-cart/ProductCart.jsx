/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../state/products/product.slice";
import AddedProducts from "./added-products/AddedProducts";
import FeaturesCart from "./features-cart/FeaturesCart";
import PricingSummary from "./pricing-summary/PricingSummary";
import { featchProducts } from "../../state/products/product.slice";
import { useNavigate } from "react-router-dom";
import "./ProductCart.scss";

const ProductCart = () => {

    const dispatch = useDispatch();
    let allProducts = useSelector(getAllProducts); 
    let [cartProducts, setCartProducts] = useState(allProducts.filter(o => o.addCart));
    let navigate = useNavigate();

    useEffect(() => {
        if(allProducts.length === 0){        
            navigate("/");
        }
        setCartProducts(allProducts.filter(o => o.addCart));
    }, [allProducts])

    const updateItem = (removedObject, flag, qty) => {
        let updatedAllProducts = JSON.parse(JSON.stringify(allProducts)).map((o) => {
            if (o.id === removedObject.id) {
                o.quantity = qty;
                o.addCart = flag;
                o.totalAmount = o.quantity * o.price;
            }
            return o;
        })

        dispatch(featchProducts(updatedAllProducts)); 
    }

    return (<>
        <main className="main-add-cart">
            <section className="title-add-cart">
                Your Shopping Bag
                <hr className="hr-add-cart" />
            </section>
            
            <section className="product-add-cart" style={{alignSelf:"center"}}>
                {cartProducts.length !== 0 ? <AddedProducts allProds={allProducts} cartLits={cartProducts} updateCart={updateItem} /> : <div className="title-add-cart">No items added to Cart</div>}
            </section>

            <section className="features-add-cart">
                <FeaturesCart />
            </section>
            
            <section className="pricing-summary-add-cart">
                <PricingSummary cartLits={cartProducts} />
            </section>
        </main>
    </>)
}

export default ProductCart