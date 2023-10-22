import React from "react";
import "../../style/Scss/Footer.scss"
import facebookLogo from "../../Images/Facebook.png";
import instagramLogo from "../../Images/Instagram.png";

import {useTranslation} from "react-i18next";

const Footer = () => {

    const {t, i18n, ready} = useTranslation();


    return (
        <div className="footer">

            <div className="footer-content">
                <div className="footer-links">
                    <a href="tel:+374-99-013080">&#9743; +374-99-013080</a>
                    <a href="tel:+374-93-005199">&#9743; +374-93-005199</a>
                </div>
                <div className="footer-info-block">
                    <a>&#9993; info@geotop.am</a>
                    <a href="mailto:info@geotop.am">info@geotop.am</a>
                    <a>&#9906; {t("map")}</a>
                </div>
                <div className="facebookBlock">
                    <a href="https://www.facebook.com/profile.php?id=61551433529180">
                        <img
                            className="logo-facebook"
                            alt="Logo"
                            src={facebookLogo}
                        />
                    </a>
                    <a href="https://www.instagram.com/geotopllc/">
                        <img
                            className="logo-facebook"
                            alt="Logo"
                            src={instagramLogo}
                        />
                    </a>
                </div>
            </div>

            <div className="licenseBlock">
                <span>© 2023 {t("after")} «Geotop»: |</span>
            </div>
        </div>);
}

export default Footer;
