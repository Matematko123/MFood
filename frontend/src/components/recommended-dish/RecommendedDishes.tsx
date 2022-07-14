import React from "react";
import styled from "styled-components";

import Dish from "./Dish";

import burger from "../../img/burger.png";
import salad from "../../img/salad.png";
import { IInitState } from "../../redux/slices/dishSlice";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 2rem;
    padding-top: 1rem;

    flex-wrap: wrap;
`;

interface Props {
    dish: IInitState;
}

const RecommendedDishes: React.FC<Props> = ({ dish }) => {
    return (
        <Wrapper>
            {dish.products.length ? (
                dish.filteredProducts.map((item) => {
                    return (
                        <Dish
                            key={item.id}
                            id={item.id}
                            img={item.img}
                            name={item.name}
                            calories={item.calories}
                            price={item.price}
                            numberOfServings={item.numberOfServings}
                            category={item.category}
                        />
                    );
                })
            ) : (
                <h2>No current products to show</h2>
            )}
        </Wrapper>
    );
};

export default RecommendedDishes;
