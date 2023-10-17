import React from "react";
import Header from "./../Container/Header";
import Footer from "./../Container/Footer";
import { Outlet } from 'react-router-dom';

import "../style/main.scss"

const MainLayout = ({children}) => {
    return (
        <div className="MainLayout">
            <Header/>
            <Outlet />
            <Footer/>
        </div>
    );
}

export default MainLayout;
