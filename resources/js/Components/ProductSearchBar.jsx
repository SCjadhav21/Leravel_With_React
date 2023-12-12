import axios from "axios";
import React, { useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
const ProductSearchBar = ({ refresh, setRefresh, setData }) => {
    const [inputSearch, setInputSearch] = useState("");
    const handelSearch = async () => {
        try {
            let res = await axios(
                `http://127.0.0.1:8000/api/search/${inputSearch}`
            );
            if (res.status === 200) {
                setData(res.data);
            } else {
                alert("Error while searching");
            }
        } catch (e) {
            console.error("Error", e);
        }
    };
    return (
        <div>
            {" "}
            <InputGroup style={{ margin: "10px 0px" }}>
                <Form.Control
                    onChange={(e) => setInputSearch(e.target.value)}
                    type="text"
                    value={inputSearch}
                    placeholder="Serach by product name"
                    aria-describedby="btnGroupAddon"
                />
                <Button
                    onClick={handelSearch}
                    disabled={!inputSearch}
                    id="btnGroupAddon"
                >
                    search
                </Button>
            </InputGroup>
            {inputSearch && (
                <Button
                    style={{ margin: "10px 0px" }}
                    variant="warning"
                    disabled={!inputSearch}
                    onClick={() => {
                        setInputSearch("");
                        setRefresh(!refresh);
                    }}
                >
                    Remove filter
                </Button>
            )}
        </div>
    );
};

export default ProductSearchBar;
