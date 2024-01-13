import React, {useState} from "react";
import Slider from "../Modules/Slider";
import {useTranslation} from "react-i18next";
import building5 from '../../Images/bilding/building5.jpg';
import building2 from '../../Images/bilding/building2.jpeg';
import building3 from '../../Images/bilding/building3.jpg';

import "../../style/Scss/Construction.scss"



const Construction = () => {
    const {t, i18n, ready} = useTranslation();
    if (!ready) return null;

    const constructions = [
        {title: t("constructions.title1"), text: t("constructions.text1"), image: building5},
        {title: t("constructions.title2"), text: t("constructions.text2"), image: building2},
        {title: t("constructions.title3"), text: t("constructions.text3"), image: building3},
    ];

    return (
        <div className="Construction">
            <Slider/>
            <div className="container">
                <section>
                    {constructions &&constructions.map((item, index) => (
                        <div className="card" key={index}>
                            <img src={item.image} alt="oboy"/>
                            <div className="card-content">
                                <p>{item.title}</p>
                                <p>{item.text}</p>
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
}

export default Construction;
