import React, { useEffect, useState } from "react";
import "./AddedProducts.scss";
import removeImg from "../../../assets/svg/trash-2.svg";
import editImg from "../../../assets/svg/edit-2.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { featchProducts } from "../../../state/products/product.slice";

const AddedProducts = (props) => {

    const { pathname } = useLocation();

    const dispatch = useDispatch();
    let navigate = useNavigate()
    let [cartList, setCartList] = useState(JSON.parse(JSON.stringify(props.cartLits)));

    useEffect(() => {
        setCartList(JSON.parse(JSON.stringify(props.cartLits)));
    }, [props.cartLits, pathname])

    const changeQtyFun = (val, i, obj) => {
        if (val >= 1 && val <= 10 && !val.includes(".")) {
            let list = [...cartList];
            list[i].quantity = Number(val);
            setCartList(list);
            props.updateCart(obj, true, list[i].quantity);
        }
    }

    const proFav = (ev, id) => {

        let updatedAllProducts = JSON.parse(JSON.stringify(props.allProds)).map((o) => {
            if (o.id === id) {
                o.favourite = !o.favourite
            }
            return o;
        });

        dispatch(featchProducts(updatedAllProducts));
    }

    return (
        <>
            {
                cartList.map((o, i) => {
                    return (
                        <main key={o.id} className="main-addded-product">
                            <figcaption className="image-addded-product-outter">
                                <img src={o.image} className="image-addded-product-inner" alt="" />
                            </figcaption>
                            <section className="detail-addded-product-outter">
                                <div className="detail-addded-product-title">{o.title.slice(0, 20)}</div>
                                <div className="detail-addded-product-size">Size : Medium</div>
                                <div className="detail-addded-product-color">Color : Storm</div>
                                <div className="detail-addded-product-price">${o.price}</div>
                                {pathname === "/cart" ? "" : <div className="detail-addded-product-price">Quantity : {o.quantity}</div>}

                            </section>
                            {pathname === "/cart" ? <>
                                <figcaption className="delete-addded-product-outter">
                                    <img src={removeImg} className="icon-remove" alt="icon remove" onClick={() => props.updateCart(o, false, 1)} />
                                </figcaption>
                                <section className="add-more-cart-outter">
                                    <figcaption className="remove-product-inner">
                                        <svg className="svg-remove-product-inner" xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 22" onClick={() => o.quantity > 1 ? changeQtyFun(String(o.quantity - 1), i, o) : false} >
                                            <g id="minus-circle" transform="translate(-1 -1)">
                                                <circle id="Ellipse_134" dataname="Ellipse 134" cx="10" cy="10" r="10" transform="translate(2 2)" fill={o.quantity > 1 ? "none" : "#EAEBEB"} stroke="#91959C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                                <line id="Line_520" dataname="Line 520" x2="8" transform="translate(8 12)" fill="none" stroke="#91959C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                            </g>
                                        </svg>
                                    </figcaption>
                                    <div className="input-product-inner">
                                        <input type="number" id="qty" name="quantity" value={o.quantity} onChange={(ev) => changeQtyFun(ev.target.value, i, o)} />
                                    </div>
                                    <figcaption className="add-product-inner">
                                        <svg className="svg-add-product-inner" xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 22" onClick={() => o.quantity < 10 ? changeQtyFun(String(o.quantity + 1), i, o) : false}>
                                            <g id="plus-circle" transform="translate(-1 -1)">
                                                <circle id="Ellipse_148" dataname="Ellipse 148" cx="10" cy="10" r="10" transform="translate(2 2)" fill={o.quantity < 10 ? "none" : "#EAEBEB"} stroke="#91959C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                                <line id="Line_537" dataname="Line 537" y2="8" transform="translate(12 8)" fill="none" stroke="#91959C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                                <line id="Line_538" dataname="Line 538" x2="8" transform="translate(8 12)" fill="none" stroke="#91959C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                            </g>
                                        </svg>
                                    </figcaption>
                                </section>
                                <section className="actions-addded-product-outter">
                                    <figcaption className="edit-action">
                                        <img src={editImg} className="icon-edit" alt="icon edit" onClick={() => navigate(`/productId/${o.id}`)} />
                                        <p className="edit-action-text">Edit Item</p>
                                    </figcaption>
                                    <figcaption className="remove-action">
                                        <img src={removeImg} className="icon-remove" alt="icon remove" onClick={() => props.updateCart(o, false, 1)} />
                                        <p className="remove-action-text">Remove</p>
                                    </figcaption>
                                    <figcaption className="save-for-later-action">
                                        <svg className="icon-save" xmlns="http://www.w3.org/2000/svg" width="18" height="15.955" viewBox="0 0 18 15.955" onClick={(ev) => proFav(ev, o.id)}>
                                            <path id="heart" d="M16.315,4.232a4.21,4.21,0,0,0-5.955,0l-.811.811-.811-.811a4.211,4.211,0,0,0-5.955,5.955L3.593,11l5.955,5.955L15.5,11l.811-.811a4.21,4.21,0,0,0,0-5.955Z" transform="translate(-0.549 -1.998)" fill={o.favourite ? 'rgb(27, 37, 44)' : 'none'} stroke="#172026" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                        </svg>
                                        <p className="save-action-text">Save for later</p>
                                    </figcaption>
                                </section>
                            </> : ""}
                        </main>
                    )
                })
            }
        </>
    )
}

export default AddedProducts