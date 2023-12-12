import React from "react";
import { Button, Table } from "react-bootstrap";
const ProductTable = ({ setProduct, setShow, data, setRefresh, refresh }) => {
    const handelDelete = async (id) => {
        let responce = confirm("Are you sure you want to delete" + id);
        if (responce) {
            let res = await fetch(`http://127.0.0.1:8000/api/delete/${id}`, {
                method: "DELETE",
            });
            res = await res.json();

            alert(res);
            setRefresh(!refresh);
        }
    };
    return (
        <div>
            {" "}
            <Table variant="dark" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Sr.No.</th>
                        <th>Product Name</th>
                        <th>Product Image</th>
                        <th>Product Price(in Rs.)</th>
                        <th>Product description</th>
                        <th>Edit Product</th>
                        <th>Delete Product</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <td>{++index}</td>
                                <td>{item.name}</td>
                                <td>
                                    <img
                                        width={"100px"}
                                        height={"100px"}
                                        src={`http://127.0.0.1:8000/${item.file_path}`}
                                        alt="product image"
                                    />
                                </td>
                                <td>{item.price}</td>
                                <td>{item.description}</td>
                                <td>
                                    <Button
                                        variant="danger"
                                        color="danger"
                                        onClick={() => {
                                            setProduct(item);
                                            setShow(true);
                                        }}
                                    >
                                        Edit
                                    </Button>
                                </td>
                                <td>
                                    <Button
                                        variant="success"
                                        onClick={() => handelDelete(item.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
};

export default ProductTable;
