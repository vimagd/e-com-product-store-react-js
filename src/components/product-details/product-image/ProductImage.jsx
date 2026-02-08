import React from "react";
import "./ProductImage.scss";

const ProductImage = (props) => {

    const selectedImg = (ev) => {

        let mulImg = document.querySelectorAll(`.multi-product-image`);

        mulImg.forEach((o, i) => {
            document.querySelector(`#product-img-${i}`).classList.remove('border-bottom-active');
            document.querySelector(`#product-img-${i}`).style.opacity = 0.5;
        })

        document.querySelector(`#${ev.target.id}`).classList.add('border-bottom-active');
        document.querySelector(`#${ev.target.id}`).style.opacity = 1;

    }

    const bulletClick = (ev) => {

        let bulImg = document.querySelectorAll(`.pro-img-bullets`);

        bulImg.forEach((o, i) => {
            document.querySelector(`#pro-bullet-id-${i}`).style.opacity = 0.4;
        });

        document.querySelector(`#${ev.target.id}`).style.opacity = 1;
    }

    return (<>
        <main className="pro-img-main">
            <figcaption className="pro-img-multiple">
                {
                    Array(5).fill(0).map((o, i) => {
                        return (
                            <img key={i} src={props.proImg} style={i === 0 ? { opacity: 1 } : { opacity: 0.5 }} className={i === 0 ? `multi-product-image border-bottom-active` : `multi-product-image`} id={`product-img-${i}`} alt={props.proImg} onClick={(ev) => selectedImg(ev)} />
                        )
                    })
                }
            </figcaption>
            <figcaption className="pro-img-single">
                <img  src={props.proImg} className="desk-single-product-image" alt={props.proImg} />
            </figcaption>
        </main>

        <img  src={props.proImg} className="mob-single-product-image" alt={props.proImg} />
        <section className="bullet-section">
            {
                Array(5).fill(0).map((o, i) => {
                    return (
                        <div key={i} style={i === 0 ? { opacity: 1 } : { opacity: 0.4 }} className="pro-img-bullets" id={`pro-bullet-id-${i}`} onClick={(ev) => bulletClick(ev)}></div>
                    )
                })
            }
        </section>

    </>)
}

export default ProductImage