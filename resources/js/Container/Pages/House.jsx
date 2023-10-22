import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import viber from "../../Images/viber.png";
import whatsapp from "../../Images/whatsapp.png";
import { useAuth } from '../../Admin/AuthContext';
import '../../style/Scss/House.scss';
import { useParams } from "react-router-dom";

const House = () => {
    const { t, i18n } = useTranslation();
    const { getItem, item } = useAuth();
    const [items, setItems] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        async function fetchMyAPI() {
            const fetchedItem = await getItem(id);
            setItems(item);
        }
        fetchMyAPI();
    }, [id]);

    const [selectedImage, setSelectedImage] = useState("");

    useEffect(() => {
        if (item && item.images && item.images.length > 0) {
            setSelectedImage(item.images[0].url);
        }
    }, [item]);

    const handleImageChange = (imageSrc) => {
        setSelectedImage(imageSrc);
    };

    return (
        item && (
            <div className="house">
                <div className="info__title">
                    <div className="streetInfo">
                        <span><span className="street">{item.street} </span>| {item.city}</span>
                    </div>
                    <div className="mont-block">
                        <span>{t("price")} : <span className="mont">{item.price} ֏</span></span>
                    </div>
                </div>
                <div className="block">
                    <div className="gallery__oboy" id="galleryOboy">
                        <img src={`https://geotop.am/${selectedImage}`} alt="oboy" />
                    </div>
                    <div className="gallery">
                        {item.images && item.images.map((image) => (
                            <div
                                className={`gallery__item ${selectedImage === image.url ? 'selected' : ''}`}
                                key={image.id}
                                onClick={() => handleImageChange(image.url)}
                            >
                                <img src={`https://geotop.am/${image.url}`} alt={image.id} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="information__block">
                    <div className="house__info">
                        <div className="salesData">
                            <span>{t("room")} : <span className="col">{item.roomCount}</span></span>
                            <span>{t("area")} ։ <span className="col">{item.area} m²</span></span>
                            <span>{t("building")} : <span className="col">{item.building}</span></span>
                        </div>
                        <div className="salesData">
                            <span>{t("code")} : <span className="col">{item.code}</span></span>
                            <span>{t("update")} : <span className="col">{item.date}</span></span>
                            <span>{t("tel")} : <a className="col" href={`tel:${item.phone}`}>{item.phone}</a></span>
                        </div>
                        <div className="salesData">
                            <a href={`viber://add?number=${item.phone}`}>
                                <img
                                    className="logo-tel"
                                    alt="Logo"
                                    src={viber}
                                />
                                Viber
                            </a>
                            <a href={`whatsapp://send?phone=${item.phone}`}>
                                <img
                                    className="logo-tel"
                                    alt="Logo"
                                    src={whatsapp}
                                />
                                WhatsApp
                            </a>
                        </div>
                    </div>
                    <div className="description">
                        <span>{item.description}</span>
                    </div>
                </div>
            </div>
        )
    );
};

export default House;
