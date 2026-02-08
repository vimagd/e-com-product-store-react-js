import React from "react";
import { useSelector } from "react-redux";
import { getRecentView } from "../../../state/features/recent.slice";
import { Link, useLocation } from "react-router-dom";
import "./RecentView.scss";

const RecentView = () => {
    const { pathname } = useLocation();
    let viewArr = useSelector(getRecentView);
    return (<>{viewArr.length !== 0 && !["/checkout", "/orderSummary"].includes(pathname) ?
        <main className="main-recent-view">
            <p className="title-recent-view">Recently Viewed</p>
            <section className="section-recent-view">
                {
                    viewArr.map((o, i) => {
                        return (
                            <figcaption key={i} className="content-recent-view-outter">
                                <Link style={{ textDecoration: 'none' }} to={`/productId/${o.id}`}>
                                    <figure className="content-recent-view-inner-image">
                                        <img  src={o.image} className="image-recent-view" alt="recent-view" />
                                    </figure>
                                </Link>

                                <Link style={{ textDecoration: 'none', color: "#1B252C" }} to={`/productId/${o.id}`} >
                                    <figure className="content-recent-view-inner-title">
                                        {o.title}
                                    </figure>
                                </Link>
                                <figure className="content-recent-view-inner-title">
                                    $ {o.price}
                                </figure>
                            </figcaption>)
                    })
                }

            </section>

        </main> : ""}
    </>)

}

export default RecentView