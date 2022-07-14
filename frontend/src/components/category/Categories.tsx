import React from "react";
import styled from "styled-components";

import Category from "./Category";

import burger from "../../img/burger.png";
import salad from "../../img/salad.png";
import pizza from "../../img/pizza.png";
import cola from "../../img/cola.png";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 3rem;
    padding-top: 1rem;

    flex-wrap: wrap;
`;

const CategoryTypes = [
    { name: "Burgers", img: burger, categoryValue: 0 },
    { name: "Salads", img: salad, categoryValue: 1 },
    { name: "Pizza", img: pizza, categoryValue: 2 },
    { name: "Drinks", img: cola, categoryValue: 3 },
];

function Categories() {
    return (
        <Wrapper>
            {CategoryTypes.map((category) => (
                <Category
                    key={category.categoryValue}
                    name={category.name}
                    img={category.img}
                    categoryValue={category.categoryValue}
                />
            ))}
        </Wrapper>
    );
}

export default Categories;
