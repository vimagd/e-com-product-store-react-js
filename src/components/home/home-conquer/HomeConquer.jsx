import React from "react";
import "./HomeConquer.scss";
import conqImg from "../../../assets/conquer.jpg";
import { useNavigate } from "react-router-dom";
import { clearAllfilterData, addfilterData } from "../../../state/features/filter.slice";
import { useDispatch } from "react-redux";

const HomeConquer = () => {

    let navigate = useNavigate();
    const dispatch = useDispatch();

    const onClickCata = (cata) => {
        let x = cata === "All" ? ["Electronics", "Jewelery", "Men", "Women"] : [cata];
        dispatch(clearAllfilterData());
        x.forEach((o) => {
            dispatch(addfilterData(o));
        });

        navigate("/products/Electronics");
    }

    return (<>
        <main className="home-conquer">
            <img  src={conqImg} className="conquer-image-section" alt="conquer-section" />
            <div className="conquer-background-section">
                <p>Conquer your next adventure</p>
                <p>Lorem Ipsum Dolor Tempor</p>
                <button onClick={() => onClickCata("Electronics")} >SHOP DEVICES</button>
            </div>
            <svg className="conquer-map-section" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 20 24">
                <g id="map-pin" transform="translate(-2)">
                    <path id="Path_38027" dataname="Path 38027" d="M21,10c0,7-9,13-9,13S3,17,3,10a9,9,0,1,1,18,0Z" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                    <circle id="Ellipse_132" dataname="Ellipse 132" cx="3" cy="3" r="3" transform="translate(9 7)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                </g>
            </svg>
            <hr className="conquer-divider-section" />
        </main>
    </>)
}

export default HomeConquer;