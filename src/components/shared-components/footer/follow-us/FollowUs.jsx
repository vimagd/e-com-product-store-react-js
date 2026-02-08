import React from "react";
import "./FollowUs.scss";
import instImg from "../../../../assets/svg/instagram.svg";
import fbImg from "../../../../assets/svg/facebook.svg";
import twtImg from "../../../../assets/svg/twitter.svg"

const FollowUs = () => {
    return (<>
        <main className="main-follow-us">
            <p className="title-follow-us">Follow Us!</p>
            <p className="content-follow-us">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
            </p>
            <figcaption className="img-follow-us">
                <img  src={instImg} className="insta-img" alt="insta-img" />
                <img  src={fbImg} className="fb-img" alt="fb-img" />
                <img  src={twtImg} className="twt-img" alt="twt-img" />
            </figcaption>
        </main>
    </>)
}

export default FollowUs;