import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ProductModal from "@/Components/ProductModal";
import ProductTable from "@/Components/ProductTable";
import { Head } from "@inertiajs/react";
import { InputGroup, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import ProductSearchBar from "@/Components/ProductSearchBar";

export default function Dashboard({ auth }) {
    const [data, setData] = useState([]);
    const [product, setProduct] = useState({});
    const [show, setShow] = useState(false);
    const [refresh, setRefresh] = useState(false);

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
                        <ProductSearchBar
                            setData={setData}
                            setRefresh={setRefresh}
                            refresh={refresh}
                        />
                        <ProductTable
                            data={data}
                            setRefresh={setRefresh}
                            refresh={refresh}
                            setProduct={setProduct}
                            setShow={setShow}
                        />
                        {show && (
                            <ProductModal
                                singleProduct={product}
                                refresh={refresh}
                                setRefresh={setRefresh}
                                show={show}
                                setShow={setShow}
                            />
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
