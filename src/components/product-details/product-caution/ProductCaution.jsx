import React from "react";
import "./ProductCaution.scss";
import sweatWickImg from "../../../assets/sweatWick.png";
import featherImg from "../../../assets/feather.png";
import breathableImg from "../../../assets/breathable.png";
import materialsImg from "../../../assets/materials.png";

const ProductCaution = () => {
    return (<>
        <main className="caution-main">
            <p className="caution-title">
                Details
            </p>
            <figcaption className="caution-sweat-wick">
                <img  src={sweatWickImg} className="caution-sweat-wick-icon" alt="caution-sweat-wick-icon" />
                <p className="caution-sweat-wick-text">Sweat-wicking</p>
            </figcaption>
            <figcaption className="caution-feather">
                <img  src={featherImg} className="caution-feather-icon" alt="caution-feather-icon" />
                <p className="caution-feather-text">Lightweight fabric</p>
            </figcaption>
            <figcaption className="caution-breathable">
                <img  src={breathableImg} className="caution-breathable-icon" alt="caution-breathable-icon" />
                <p className="caution-breathable-text">Breathable</p>
            </figcaption>
            <figcaption className="caution-material">
                <img  src={materialsImg} className="caution-material-icon" alt="caution-material-icon" />
                <p className="caution-material-text">69% nylon, 31% lycra</p>
            </figcaption>
        </main>
    </>)
}

export default ProductCaution