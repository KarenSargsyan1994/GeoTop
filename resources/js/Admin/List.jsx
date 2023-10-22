import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Modal from 'react-modal';
import {useAuth} from './AuthContext';
import '../style/Scss/ResponsiveTable.scss'

const List = () => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [itemOffset, setItemOffset] = useState(0);
    const [data, setData] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [searchInput, setSearchInput] = useState('');
    const itemsPerPage = 5;
    const {getItems, deleteItem, items, user, logout} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        getItems();
    }, []);

    useEffect(() => {
        if (items) {
            const filteredItems = items.filter((item) =>
                item.code.toLowerCase().includes(searchInput.toLowerCase())
            );
            setPageCount(Math.ceil(filteredItems.length / itemsPerPage));
            setData(filteredItems.slice(itemOffset, itemOffset + itemsPerPage));
        }
    }, [items, itemOffset, searchInput]);

    const handlePageClick = (e) => {
        const newOffset = e.selected * itemsPerPage;
        setItemOffset(newOffset);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const openDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const handleDelete = (itemId) => {
        setItemToDelete(itemId);
        openDeleteModal();
    };

    const confirmDelete = () => {
        deleteItem(itemToDelete);
        closeDeleteModal();
    };

    const handleEdit = (itemId) => {
        navigate(`/edit/${itemId}`);
    };

    const handleSearch = (event) => {
        setSearchInput(event.target.value);
    };
    return (
        <div className="container-list">
            <div className="page_title_box">
                <h1>HOUSES</h1>
            </div>

            <div className="btn-header">
                <div className="create_link">
                    <Link to="/create">
                        <button>Create</button>
                    </Link>
                    <input
                        className="input"
                        type="text"
                        value={searchInput}
                        placeholder="Search by Code"
                        onChange={handleSearch}
                    /></div>


                <button className="logout" onClick={handleLogout}>
                    Logout
                </button>
            </div>

            <div className="table">
                <div className="title">
                    <div>id</div>
                    <div>photo</div>
                    <div>city</div>
                    <div>street</div>
                    <div>area</div>
                    <div>building</div>
                    <div>code</div>
                    <div>date</div>
                    <div>phone</div>
                    <div>price</div>
                    <div>room</div>
                    <div>description</div>
                    <div></div>
                </div>
                <div className="employees_block">
                    {data &&
                        data.map((item) => (
                            <div key={item.id} className="employees_info">
                                <div>{item.id}</div>
                                <div className="images">
                                    {item.images.map((image, index) => (
                                        <img key={index} src={image.url} alt={item.id}/>
                                    ))}
                                </div>
                                <div>{item.city}</div>
                                <div>{item.street}</div>
                                <div>{item.area}</div>
                                <div>{item.building.slice(0, 7)}</div>
                                <div>{item.code}</div>
                                <div>{item.date.slice(0, 7)}</div>
                                <div>{item.phone}</div>
                                <div>{item.price}</div>
                                <div>{item.roomCount}</div>
                                <div>{item.description.slice(0, 7)}</div>
                                <div className="Btn">
                                    <button onClick={() => handleEdit(item.id)} className="EditButton">
                                        &#9998;
                                    </button>
                                    <button onClick={() => handleDelete(item.id)} className="DeleteButton">
                                        &#128465;
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName="pagination"
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                activeClassName={"active"}
                previousClassName="page-item"
                nextClassName="page-item"
                previousLinkClassName="page-link"
                nextLinkClassName="page-link"
                initialPage={0}
            />

            <Modal
                isOpen={isDeleteModalOpen}
                onRequestClose={closeDeleteModal}
                contentLabel="Delete Confirmation"
                ariaHideApp={false}
                className="delete-modal"
            >
                <h2 className="modal-title">Confirm Delete</h2>
                <p className="modal-text">Are you sure you want to delete this item?</p>
                <div className="modal-buttons">
                    <button className="cancel-button" onClick={closeDeleteModal}>
                        Cancel
                    </button>
                    <button className="delete-button" onClick={confirmDelete}>
                        Delete
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default List;

