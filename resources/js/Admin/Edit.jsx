import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useAuth} from './AuthContext';
import {Container, Row, Form, Col, Button} from 'react-bootstrap';
import {useDropzone} from 'react-dropzone';
import '../style/Scss/Create.scss';
import LoadingScreen from '../Container/Loading/LoadingScreen.jsx';

const Edit = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {item, updateItem, getItem, deleteImages} = useAuth();

    useEffect(() => {
        getItem(id);
    }, [id]);

    const initialFormData = {
        city: item.city || '',
        street: item.street || '',
        roomCount: item.roomCount || '',
        area: item.area || '',
        building: item.building || '',
        code: item.code || '',
        phone: item.phone || '',
        date: item.date || '',
        price: item.price || '',
        description: item.description || '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [uploadedImages, setUploadedImages] = useState([]);

    const handleChange = (e) => {
        const {name, value, type} = e.target;
        if (type === 'file') {
            setUploadedImages([...uploadedImages, e.target.files[0]]);
        } else {
            setFormData({...formData, [name]: value});
        }
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        const combinedData = {
            ...formData,
            images: [...uploadedImages, ...item.images],
        };
        await updateItem(id, combinedData);
        navigate('/list');
    };


    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles) => {
            setUploadedImages([...uploadedImages, ...acceptedFiles]);
        },
    });

    const handleDeleteImg = (event, index) => {
        event.stopPropagation();
        const imageIdToDelete = item.images[index].id;
        deleteImages(imageIdToDelete);
        const newUploadedImages = [...uploadedImages];
        newUploadedImages.splice(index, 1);
        setUploadedImages(newUploadedImages);
    };

    const handleLink = () => {
        navigate('/list');
    };

    return (
        <>
            {item.length === 0 ? <LoadingScreen/> :
                <Container>
                    <Row>
                        <div className="m-5">
                            <button className="btn btn-primary" onClick={handleLink}>
                                Back
                            </button>
                        </div>
                        <Col xs={{span: 4, offset: 4}}>
                            <h2 className="text-center">Edit Item</h2>
                        </Col>
                    </Row>
                    <Row className="form mt-5 mb-3">
                        {Object.keys(initialFormData).map((key, index) => (
                            <Col xs={{span: 4, offset: 1}} key={index}>
                                <Form.Group className="mb-3" controlId={`exampleForm.ControlInput${index}`}>
                                    <Form.Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Form.Label>
                                    <Form.Control
                                        type={key === 'date' ? 'date' : 'text'}
                                        name={key}
                                        value={formData[key]}
                                        placeholder={key}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        ))}

                        <Row>
                            <Col xs={{span: 9, offset: 1}}>
                                <div className="form-container">
                                    <div className="form w-100">
                                        <div
                                            {...getRootProps()}
                                            className={`photo-block ${isDragActive ? 'active' : ''}`}
                                        >
                                            <input {...getInputProps()} />
                                            <div className="uploaded-images">
                                                {uploadedImages.map((file, index) => (
                                                    <div className="control-images" key={index}>
                                                        <button
                                                            className="delete-img"
                                                            onClick={(e) => handleDeleteImg(e, index)}
                                                        >
                                                            &#9747;
                                                        </button>
                                                        <img src={URL.createObjectURL(file)} alt={index}/>
                                                    </div>
                                                ))}
                                                {item.images &&
                                                    item.images.map((image, index) => (
                                                        <div className="control-images" key={index}>
                                                            <button
                                                                className="delete-img"
                                                                onClick={(e) => handleDeleteImg(e, index)}
                                                            >
                                                                &#9747;
                                                            </button>
                                                            <img
                                                                src={`https://geotop.am/${image.url}`}
                                                                alt={image.index}
                                                            />
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <Col xs={{span: 3, offset: 4}} lg={{span: 3, offset: 4}} className="mt-4">
                            <Button variant="primary" className="w-100" onClick={handleEdit}>
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Container>
            }
        </>

    );
};

export default Edit;
