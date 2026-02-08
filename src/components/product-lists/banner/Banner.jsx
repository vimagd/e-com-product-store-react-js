import React from "react";
import "./Banner.scss";
import { useParams } from "react-router-dom";
import electronicsImg from "../../../assets/electronics.jpg";
import jeweleryImg from "../../../assets/jewelery.jpg";
import menImg from "../../../assets/men.jpg";
import womenImg from "../../../assets/women.jpg";
import AllImg from "../../../assets/all.jpg";

const Banner = () => {

    let { ele } = useParams(); //fetch current ele from path
    const caseCond = (catEle) => {

        //switch case for change of banner image and title on base of catagory select
        switch (catEle) {
            case 'All':
                return <section className="rear-image">
                    <img  src={AllImg} className='banner-rear-img' alt="img-women" />
                    <figcaption className="front-image">
                        <p className="front-image-text">Shop<br /> Collection</p>
                        <div className="front-image-section-ender"></div>
                    </figcaption>
                </section>;

            case 'Women':
                return <section className="rear-image">
                    <img  src={womenImg} className='banner-rear-img' alt="img-women" />
                    <figcaption className="front-image">
                        <p className="front-image-text">Women’s <br /> Outerwear</p>
                        <div className="front-image-section-ender"></div>
                    </figcaption>
                </section>;

            case 'Men':
                return <section className="rear-image">
                    <img  src={menImg} className='banner-rear-img' alt="img-women" />
                    <figcaption className="front-image">
                        <p className="front-image-text">Men’s <br /> Outerwear</p>
                        <div className="front-image-section-ender"></div>
                    </figcaption>
                </section>;

            case 'Jewelery':
                return <section className="rear-image">
                    <img  src={jeweleryImg} className='banner-rear-img' alt="img-women" />
                    <figcaption className="front-image">
                        <p className="front-image-text">Jewelery<br /> Ornaments</p>
                        <div className="front-image-section-ender"></div>
                    </figcaption>
                </section>;

            case 'Electronics':
                return <section className="rear-image">
                    <img  src={electronicsImg} className='banner-rear-img' alt="img-women" />
                    <figcaption className="front-image">
                        <p className="front-image-text">Electronic<br /> Gadgets</p>
                        <div className="front-image-section-ender"></div>
                    </figcaption>
                </section>;

            default:
                return null;

        }
    }

    return (<>
        <main className="banner-section">
            {caseCond(ele)}
        </main>
    </>)

}

export default Banner