import React from 'react';
import '../../style/Scss/Slider.scss'
import {useTranslation} from "react-i18next";

const Slider = () => {
    const {t, i18n, ready} = useTranslation();

    return (
        <div className="slider">
            <div id="content">
                <h1>{t("construction-Projects")}</h1>
            </div>
            <div id="outerCraneContainer">
                <div className="buildings">
                    <div></div>
                    <div className="1"></div>
                    <div className="2"></div>
                    <div className="3"></div>
                    <div className="4"></div>
                </div>
                <div className="crane craneThree">
                    <div className="line lineOne"></div>
                    <div className="line lineTwo"></div>
                    <div className="line lineThree"></div>
                    <div className="stand"></div>
                    <div className="weight"></div>
                    <div className="cabin"></div>
                    <div className="arm"></div>
                </div>
                <div className="crane craneTwo">
                    <div className="line lineOne"></div>
                    <div className="line lineTwo"></div>
                    <div className="line lineThree"></div>
                    <div className="stand"></div>
                    <div className="weight"></div>
                    <div className="cabin"></div>
                    <div className="arm"></div>
                </div>
                <div className="crane craneOne">
                    <div className="line lineOne"></div>
                    <div className="line lineTwo"></div>
                    <div className="line lineThree"></div>
                    <div className="stand"></div>
                    <div className="weight"></div>
                    <div className="cabin"></div>
                    <div className="arm"></div>
                </div>
            </div>
        </div>
    );
};

export default Slider;
