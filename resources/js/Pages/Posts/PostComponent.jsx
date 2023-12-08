import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from "axios";
const PostComponent = ({ auth }) => {
    const [productData, setProductData] = useState({
        name: "",
        price: "",
        description: "",
        file_path: "",
    });
    const handelChange = (e) => {
        let { name, value } = e.target;
        if (name == "price") {
            value = +value;
        }
        if (name == "file_path") {
            setProductData({ ...productData, [name]: e.target.files[0] });
        } else {
            setProductData({ ...productData, [name]: value });
        }
    };
    const handelSubmit = async (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append("file_path", productData.file_path);
        formData.append("price", productData.price);
        formData.append("name", productData.name);
        formData.append("description", productData.description);

        try {
            const response = await axios({
                method: "POST",
                url: "http://127.0.0.1:8000/api/addproduct",
                data: formData,
            });

            console.log("Response:", response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Post Data Here...
                </h2>
            }
        >
            <div>
                <form onSubmit={handelSubmit} className="col-sm-6 offset-sm-3">
                    <h2 className="col-sm-6 offset-sm-3">Add Product</h2>
                    <Form.Label>Product name</Form.Label>
                    <Form.Control
                        onChange={handelChange}
                        name="name"
                        value={productData.name}
                        type="text"
                        placeholder="Enter name"
                        required
                    />

                    <Form.Label>Product price</Form.Label>
                    <Form.Control
                        onChange={handelChange}
                        required
                        name="price"
                        value={productData.price}
                        type="number"
                        placeholder="Enter price"
                    />
                    <Form.Label>Product Image</Form.Label>
                    <Form.Control
                        onChange={handelChange}
                        required
                        name="file_path"
                        type="file"
                    />
                    <Form.Label>Product Description</Form.Label>
                    <Form.Control
                        onChange={handelChange}
                        required
                        name="description"
                        value={productData.description}
                        type="Text"
                        placeholder="Enter description"
                    />
                    <Button className="mt-3" variant="primary" type="submit">
                        Submit
                    </Button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default PostComponent;
