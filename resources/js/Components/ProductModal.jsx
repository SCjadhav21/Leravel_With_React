import axios from "axios";
import React from "react";

import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
const ProductModal = ({
    singleProduct,
    show,
    setShow,
    refresh,
    setRefresh,
}) => {
    const [product, setProduct] = useState({});
    function handelChange(e) {
        if (e.target.name === "file_path") {
            setProduct({ ...product, [e.target.name]: e.target.files[0] });
        } else {
            setProduct({ ...product, [e.target.name]: e.target.value });
        }
    }
    const handelUpdate = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        for (let key in product) {
            formData.append(key, product[key]);
        }

        try {
            const response = await axios({
                method: "POST",
                url: "http://127.0.0.1:8000/api/update/14?_method=patch",
                data: formData,
            });
            if (response.data === "Product updated successfully") {
                alert("Product updated successfully");
                setRefresh(!refresh);
                setShow(false);
            } else {
                alert("Error while updating product");
                setShow(false);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title># {singleProduct.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form action="" onSubmit={handelUpdate}>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                name="name"
                                onChange={handelChange}
                                defaultValue={singleProduct.name}
                                placeholder="Enter name"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Product Price</Form.Label>
                            <Form.Control
                                type="number"
                                required
                                name="price"
                                onChange={handelChange}
                                defaultValue={singleProduct.price}
                                placeholder="Product Price"
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>Product Description</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                name="description"
                                onChange={handelChange}
                                defaultValue={singleProduct.description}
                                placeholder="Product Description"
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>Default Image</Form.Label>

                            <img
                                width={"100px"}
                                height={"100px"}
                                src={`http://localhost:8000/${singleProduct.file_path}`}
                                alt="default image"
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>
                                Product Image (choose if want to change)
                            </Form.Label>
                            <Form.Control
                                name="file_path"
                                onChange={handelChange}
                                type="file"
                            />
                        </Form.Group>

                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                onClick={() => setShow(false)}
                            >
                                Close
                            </Button>
                            <Button type="submit" variant="primary">
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ProductModal;
