import React, {useState} from 'react';
import {Container, Row, Form, Col, Button} from 'react-bootstrap';
import {useNavigate, useParams} from 'react-router-dom';
import {useAuth} from './AuthContext';
import {useDropzone} from 'react-dropzone';
import '../style/Scss/Create.scss'

const Create = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const auth = useAuth();

    const initialFormData = {
        city: '',
        street: '',
        roomCount: '',
        area: '',
        building: '',
        code: '',
        phone: '',
        date: '',
        price: '',
        description: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [type, useType] = useState('')

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };


    const onDrop = (acceptedFiles) => {
        setUploadedImages(acceptedFiles);
    };

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: 'image/*',
        onDrop,
    });

    const handleCheck = (e) => {
        const value = e.target.id === 'exampleForm.rent' ? 'Rent' : 'Sale';
        useType(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const combinedData = {
            ...formData,
            images: uploadedImages,
            type: type,
        };
        await auth.addItem(combinedData);
    };

    const handleDeleteImg = (event, index) => {
        event.stopPropagation();
        const newUploadedImages = [...uploadedImages];
        newUploadedImages.splice(index, 1);
        setUploadedImages(newUploadedImages);
    };

    const handleLink = () => {
        navigate('/list');
    }

    return (
        <Container>
            <Row>
                <div className="m-5">
                    <button className="btn btn-primary" onClick={handleLink}>Back</button>
                </div>
                <Col xs={{span: 4, offset: 4}}>
                    <h2 className="text-center">Add New Item</h2>
                </Col>
            </Row>
            <Row className="form mt-5 mb-3">
                {Object.keys(initialFormData).map((key) => (
                    <Col xs={{span: 4, offset: 1}} key={key}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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

                <Col xs={{span: 4, offset: 1}}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Check
                            type="checkbox"
                            id="exampleForm.rent"
                            label="Rent"
                            onChange={handleCheck}
                        />
                        <Form.Check
                            type="checkbox"
                            id="exampleForm.sale"
                            label="Sale"
                            onChange={handleCheck}
                        />
                    </Form.Group>
                </Col>


                <Row>
                    <Col xs={{span: 9, offset: 1}}>
                        <div className='form-container'>
                            <div className="form w-100">
                                <div {...getRootProps()} className={`photo-block ${isDragActive ? 'active' : ''}`}>
                                    <input {...getInputProps()} />
                                    {isDragActive ? (
                                        <p>Drop the photos here...</p>
                                    ) : (
                                        <div className="uploaded-images">
                                            {uploadedImages.map((file, index) => (
                                                <div className="control-images" key={index}>
                                                    <button className="delete-img"
                                                            onClick={(e) => handleDeleteImg(e, index)}>
                                                        &#9747;
                                                    </button>
                                                    <img key={index} src={URL.createObjectURL(file)}
                                                         alt={`Uploaded Image ${index}`}/>
                                                </div>
                                            ))}
                                        </div>)}
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Col xs={{span: 3, offset: 4}} lg={{span: 3, offset: 4}} className="mt-4">
                    <Button variant="primary"
                            className="w-100"
                            onClick={handleSubmit}>
                        Submit
                    </Button>
                </Col>

            </Row>
        </Container>
    );
};

export default Create;
