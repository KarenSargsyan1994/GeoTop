import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import house from '../../Images/house.png';
import {useAuth} from '../../Admin/AuthContext';
import '../../style/Scss/Apartments.scss';
import ReactPaginate from 'react-paginate';

const Apartments = () => {
    const {t} = useTranslation();
    const {getItems, items} = useAuth();
    const [data, setData] = useState(null);
    const itemsPerPage = 5;
    const [itemOffset, setItemOffset] = useState(0);
    const [selectedType, setSelectedType] = useState('Sale');
    const navigate = useNavigate();

    useEffect(() => {
        getItems();
    }, []);

    useEffect(() => {
        if (items) {
            setData(items);
        }
    }, [items]);

    useEffect(() => {
        if (data) {
            const filteredData = data.filter((house) => house.type === selectedType);
            const newPageCount = Math.ceil(filteredData.length / itemsPerPage);
            setItemOffset(0);
            setPageCount(newPageCount);
        }
    }, [data, selectedType]);

    const handleRent = () => {
        setSelectedType('Rent');
    };

    const handleSale = () => {
        setSelectedType('Sale');
    };

    const handlePageClick = (e) => {
        const newOffset = e.selected * itemsPerPage;
        setItemOffset(newOffset);
    };

    const handleHouse = (itemId) => {
        navigate(`/house/${itemId}`);
    };

    const displayedApartments =
        data && data.filter((house) => house.type === selectedType).slice(itemOffset, itemOffset + itemsPerPage);

    const [pageCount, setPageCount] = useState(0);

    return (
        <div className="Apartments">
            <div className="apartmentBlock">
                <button  onClick={handleRent}>{t('rent')}</button>
                <button  onClick={handleSale}>{t('sale')}</button>
            </div>
            <div className="lineBlock">
                <div className="line"></div>
                <img className="house" alt="house" src={house}/>
                <div className="line"></div>
            </div>
            {displayedApartments &&
                displayedApartments.map((house, index) => (
                    <div className="card" key={index}>
                        <div className="card_smol">
                            <div className="photoSlider">
                                <div>
                                    <img className="photo" alt="Photo" src={house.images[0].url}/>
                                </div>
                            </div>
                            <div>
                                <div className="streetInfo">
                                    <span><span className="street">{house.street} </span>{house.city}</span>
                                </div>
                                <div className="infoBlock">
                                    <div className="salesData">
                                        <span>{t("tel")} : {house.phone}</span>
                                        <span>{t("room")} : {house.roomCount}</span>
                                        <span>{t("area")} ։ {house.area} m²</span>
                                    </div>
                                    <div className="salesData">
                                        <span>{t("code")} : <span className="rentCode">{house.code}</span></span>
                                        <span>{t("update")} : {house.date}</span>
                                        <span>{t("building")} : {house.building}</span>
                                    </div>
                                    <div className="salesData">
                                        <span>{t("price")} : <span className="mont">{house.price}֏</span></span>
                                        <button onClick={() => handleHouse(house.id)} className='link'>
                                            {t("details")} &#10095;
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                breakLabel={'...'}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName="pagination"
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                activeClassName={'active'}
                previousClassName="page-item"
                nextClassName="page-item"
                previousLinkClassName="page-link"
                nextLinkClassName="page-link"
                initialPage={0}
            />
        </div>
    );
};

export default Apartments;
