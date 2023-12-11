import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
export default function Dashboard({ auth }) {
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);
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

    useEffect(() => {
        async function fetchData() {
            let res = await fetch("http://127.0.0.1:8000/api/getproducts");
            res = await res.json();
            setData(res);
        }
        fetchData();
    }, [refresh]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <Table variant="dark" striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Sr.No.</th>
                                    <th>Product Name</th>
                                    <th>Product Image</th>
                                    <th>Product Price(in Rs.)</th>
                                    <th>Product description</th>
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
                                                    variant="success"
                                                    onClick={() =>
                                                        handelDelete(item.id)
                                                    }
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
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
