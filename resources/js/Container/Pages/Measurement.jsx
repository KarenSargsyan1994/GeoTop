import React, {useState, useEffect} from "react";
import ymaps from "ymaps";
import {useTranslation} from "react-i18next";
import logoFront from '../../Images/logoFront.jpg';

import "../../style/Scss/Measurement.scss";


const Measurement = () => {
    const [accordionStates, setAccordionStates] = useState([false, false, false]);
    const {t, i18n, ready} = useTranslation();

    useEffect(() => {
        ymaps
            .load("https://api-maps.yandex.ru/2.1/?apikey=YOUR_API_KEY&lang=ru_RU")
            .then((ymaps) => {
                const map = new ymaps.Map("map", {
                    center: [40.2080556, 44.5402778],
                    zoom: 15,
                });

                const placemark = new ymaps.Placemark(
                    [40.2080556, 44.5402778],
                    {
                        hintContent:
                            "Armenia, Yerevan, Karapet Ulnetsu St., 59/5 Building, Structure 14",
                    },
                    {
                        preset: "islands#redDotIcon",
                    }
                );

                map.geoObjects.add(placemark);
            });
    }, []);

    const measurements = [
        {title: t("measurements.title1"), text: t("measurements.text1")},
        {title: t("measurements.title2"), text: t("measurements.text2")},
        {title: t("measurements.title3"), text: t("measurements.text3")},
        {title: t("measurements.title4"), text: t("measurements.text4")},
        {title: t("measurements.title5"), text: t("measurements.text5")},
    ];


    const toggleAccordion = (index) => {
        const newAccordionStates = [...accordionStates];
        newAccordionStates[index] = !newAccordionStates[index];
        setAccordionStates(newAccordionStates);
    };

    return (
        <div className="Measurement">

            <div className="photo-block">
                <img className="logo" alt="Logo" src={logoFront}/>
            </div>

            <div className="accordion-container">
                {measurements && measurements.map((item, index) => (
                    <div className="accordion-item" key={index}>
                        <div className="accordion-header" onClick={() => toggleAccordion(index)}>
                            {item.title}
                            <span>{accordionStates[index] ? "▲" : "▼"}</span>
                        </div>
                        <div className={`accordion-content ${accordionStates[index] ? "open" : ""}`}>
                            {item.text}
                        </div>
                    </div>
                ))}
            </div>

            <div className="map-information">
                <div className="title">
                    <span>
                          {t("title")}
                    </span>
                </div>
                <div id="map" className="map-container"/>
            </div>
        </div>
    );
}

export default Measurement;
