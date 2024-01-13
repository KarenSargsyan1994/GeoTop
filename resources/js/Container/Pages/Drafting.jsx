import React from "react";
import { useTranslation } from "react-i18next";
import building1 from '../../Images/bilding/building5.jpg';
import building4 from '../../Images/bilding/building4.jpg';
import building6 from '../../Images/bilding/building6.jpg';
import building7 from '../../Images/bilding/building7.jpg';

import "../../style/Scss/Drafting.scss";

const Drafting = () => {
    const { t, i18n, ready } = useTranslation();

    const draftings = [
        { title: t("draftings.title1"), text: t("draftings.text1"), image: building6 },
        { title: t("draftings.title2"), text: t("draftings.text2"), image: building4 },
        { title: t("draftings.title3"), text: t("draftings.text3"), image: building1 },
        { title: t("draftings.title4"), text: t("draftings.text4"), image: building7 },
    ];
    return (
        <div className="Drafting">
            <article>
                {draftings && draftings.map((item, index) => (
                    <section className="card" key={index}>
                        <div className="text-content">
                            <h3>{item.title}</h3>
                            <p>{item.text}</p>
                        </div>
                        <div className="visual">
                            <img className="" alt="Logo" src={item.image} />
                        </div>
                    </section>
                ))}
            </article>
        </div>
    );
}

export default Drafting;
