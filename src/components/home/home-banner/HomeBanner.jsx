import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomeBanner.scss";
import banOne from "../../../assets/carosal/carosal-1.jpg";
import banTwo from "../../../assets/carosal/carosal-2.jpg";
import banThree from "../../../assets/carosal/carosal-3.jpg";
import banFour from "../../../assets/carosal/carosal-4.jpg";
import banFive from "../../../assets/carosal/carosal-5.jpg";
import banSix from "../../../assets/carosal/carosal-6.jpg";
import banSeven from "../../../assets/carosal/carosal-7.jpg";
import banEight from "../../../assets/carosal/carosal-8.jpg";
import banNine from "../../../assets/carosal/carosal-9.jpg";
import banTen from "../../../assets/carosal/carosal-10.jpg";
import { useDispatch } from "react-redux";
import { clearAllfilterData, addfilterData } from "../../../state/features/filter.slice";

const HomeBanner = () => {

    let navigate = useNavigate();
    let [dispNum, setDispNum] = useState(1);
    const dispatch = useDispatch();

    const onClickCata = (cata) => {
        let x = cata === "All" ? ["Electronics", "Jewelery", "Men", "Women"] : [cata];
        dispatch(clearAllfilterData());
        x.forEach((o) => {
            dispatch(addfilterData(o));
        });

        navigate("/products/All");
    }

    const changeImage = (act) => {

        let imgTags = document.querySelectorAll("li img");

        for (let i = 0; i < imgTags.length; i++) {
            let j = act === 'forword' ? i + 1 : i - 1;
            let bolFlag = act === 'forword' ? Boolean(j < imgTags.length) : Boolean(j >= 0);
            if (imgTags[i].className.includes("show") && bolFlag) {
                imgTags[i].classList.replace("active-show", "active-hide");
                imgTags[j].classList.replace("active-hide", "active-show");
                setDispNum(j);
                break;
            }
        }
    }

    const directImage = (i) => {
        let imgTags = document.querySelectorAll("li img");
        let bul = document.querySelectorAll("li .slider-bullets div");

        imgTags.forEach((o) => {
            o.classList.replace("active-show", "active-hide")
        });

        bul.forEach((o) => {
            o.classList.replace("radio-bullets-show", "radio-bullets-hide");
        });

        imgTags[i].classList.replace("active-hide", "active-show");
        bul[i].classList.replace("radio-bullets-hide", "radio-bullets-show");
        setDispNum(i);
    }

    return (<>
        <main className="home-banner">
            <ul className="banner-ul">
                <li className="banner-li">
                    {
                        dispNum > 0 ?
                            <span className="banner-backword border-background">
                                <svg className="banner-backword-svg" xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 16 18" onClick={() => changeImage("backword")}>
                                    <g id="skip-back" transform="translate(-4 -3)">
                                        <path id="Path_38098" dataname="Path 38098" d="M19,20,9,12,19,4Z" fill="none" stroke="#172026" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                        <line id="Line_560" dataname="Line 560" y1="14" transform="translate(5 5)" fill="none" stroke="#172026" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                    </g>
                                </svg>
                            </span> : ""
                    }

                    <img  src={banOne} className="banner-img active-hide" alt="banner-img" />
                    <img  src={banTwo} className="banner-img active-show" alt="banner-img" />
                    <img  src={banThree} className="banner-img active-hide" alt="banner-img" />
                    <img  src={banFour} className="banner-img active-hide" alt="banner-img" />
                    <img  src={banFive} className="banner-img active-hide" id="ban-five" alt="banner-img" />
                    <img  src={banSix} className="banner-img active-hide" id="ban-six" alt="banner-img" />
                    <img  src={banSeven} className="banner-img active-hide" alt="banner-img" />
                    <img  src={banEight} className="banner-img active-hide" id="ban-eight" alt="banner-img" />
                    <img  src={banNine} className="banner-img active-hide" alt="banner-img" />
                    <img  src={banTen} className="banner-img active-hide" alt="banner-img" />
                    <p className="banner-title">Shop the new Signature Collection</p>
                    <p className="banner-discription">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                    <button className="banner-button" onClick={() => onClickCata('All')}>SHOP NOW</button>
                    <div className="slider-bullets">
                        {
                            Array(10).fill(0).map((o, i) => {
                                return (
                                    <div key={i} className={dispNum !== i ? "radio-bullets radio-bullets-hide" : "radio-bullets radio-bullets-show"} onClick={() => directImage(i)}></div>
                                )
                            })
                        }
                    </div>
                    {
                        dispNum < 9 ?
                            <span className="banner-forword border-background">
                                <svg className="banner-forword-svg" xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 16 18" onClick={() => changeImage("forword")}>
                                    <g id="skip-forward" transform="translate(-4 -3)">
                                        <path id="Path_38099" data-name="Path 38099" d="M5,4l10,8L5,20Z" fill="none" stroke="#172026" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                        <line id="Line_561" data-name="Line 561" y2="14" transform="translate(19 5)" fill="none" stroke="#172026" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                    </g>
                                </svg>
                            </span>
                            : ""
                    }
                </li>
            </ul>
        </main>
    </>)
}

export default HomeBanner;