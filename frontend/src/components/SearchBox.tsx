import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { clearSearchProducts, searchProducts } from "../redux/slices/dishSlice";

const Wrapper = styled.form`
    position: relative;
    display: flex;
    height: 3.5rem;
    width: 100%;
`;

const Input = styled.input`
    width: 100%;
    border-radius: 0.6rem;
    background-color: #f2f2f2;
    border: none;
    border: 0px;

    padding-left: 1.6rem;

    font-size: 1.2rem;
`;

const ClearButton = styled.button`
    position: absolute;
    right: 0;
    height: 100%;
    padding: 0 20px;
    border: 0;
    background-color: #fbbc2f;
    color: white;
    font-weight: 500;
    font-size: 1.4rem;

    :hover {
        cursor: pointer;
    }
`;

const SearchBox = () => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        if (searchKeyword.length > 0) {
            const delaySubmit = setTimeout(() => {
                dispatch(searchProducts(searchKeyword));
            }, 500);

            return () => clearTimeout(delaySubmit);
        } else {
            dispatch(clearSearchProducts());
        }
    }, [searchKeyword]);

    const clearInput = () => {
        setSearchKeyword("");
    };

    return (
        <Wrapper>
            <Input
                type="text"
                onChange={(e) => {
                    setSearchKeyword(e.target.value);
                }}
                value={searchKeyword}
                placeholder="Search "
            />
            {searchKeyword.length > 0 && (
                <ClearButton type="button" onClick={clearInput}>
                    X
                </ClearButton>
            )}
        </Wrapper>
    );
};

export default SearchBox;
