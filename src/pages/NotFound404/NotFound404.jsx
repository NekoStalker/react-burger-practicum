import React from "react";
import {Link } from "react-router-dom";
import nfStyles from './not-found.module.css';
import pageNotFound from  "../../images/404.png";
import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/AppHeader/AppHeader';
function NotFound404() {
    const navigate = useNavigate();
    return ( 
        <>
        <AppHeader />
        <main className={nfStyles.main}>
            <img alt="page not found" src={pageNotFound} />
        </main>
        </>
    );
}

export default NotFound404;