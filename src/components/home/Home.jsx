import React from "react";
import HomeBanner from "./home-banner/HomeBanner";
import HomeCatagoryTiles from "./home-catagory-tiles/HomeCatagoryTiles";
import HomeCollection from "./home-collection/HomeCollection";
import HomeConquer from "./home-conquer/HomeConquer";
import "./Home.scss"
const Home = () => {
    return (<>
        <main className="main-home">
            <section className="main-home-banner">
                <HomeBanner />
            </section>
            <section className="main-home-catagory-tiles">
                <HomeCatagoryTiles />
            </section>
            <section className="main-home-collection">
                <HomeCollection />
            </section>
            <section className="main-home-conquer">
                <HomeConquer />
            </section>
        </main>
    </>)
}

export default Home;