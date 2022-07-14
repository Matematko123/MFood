import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { filterProducts, clearFilters } from "../../redux/slices/dishSlice";

export interface ICategory {
    name: string;
    img: string;
    categoryValue: number;
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    padding: 20px;
    padding-bottom: 25px;
    text-align: center;
    border-radius: 25px;
    border: solid #fbbc2f 2px;
    width: 10rem;
    background-color: #fef8ea;

    box-shadow: rgba(100, 100, 111, 0.1) 0px 7px 29px 0px;

    img {
        height: 10rem;
    }

    span {
        font-weight: 500;
    }

    :hover {
        background-color: #fbbc2f;
        cursor: pointer;

        box-shadow: rgba(100, 100, 111, 0.5) 0px 7px 29px 0px;
    }
`;

const Category: React.FC<ICategory> = ({ name, img, categoryValue }) => {
    const [selected, setSelected] = useState(false);

    const dispatch: any = useDispatch();

    useEffect(() => {
        selected && dispatch(filterProducts(categoryValue));
        !selected && dispatch(clearFilters(categoryValue));
    }, [selected]);

    return (
        <Wrapper
            onClick={() => {
                setSelected(!selected);
            }}
            style={{ backgroundColor: `${selected ? "#f8c03e" : "#fef8ea"}` }}
        >
            <img src={img} alt={name} />
            <span>{name}</span>
        </Wrapper>
    );
};

export default Category;
