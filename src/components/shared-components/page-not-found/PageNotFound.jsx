import React from "react";
import "./PageNotFound.scss"
import { Link } from 'react-router-dom';
const PageNotFound = () => {
    return (
        <main className="not-found-image">
            <p className="not-found-status-code">404</p>
            <p className="not-found-text">Page not found...!</p>
            <Link to="/"><button className="return-button">Main Page</button></Link>
        </main>
    );
};

export default PageNotFound