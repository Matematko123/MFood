import React from "react";
import styled from "styled-components";

import Dish from "../recommended-dish/Dish";

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

const SearchedDishes: React.FC<Props> = ({ dish }) => {
    return (
        <>
            {dish.searchedProducts.length > 0 && <h2>Searched Results</h2>}
            <Wrapper>
                {dish.products.length ? (
                    dish.searchedProducts.map((item) => {
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
                    <h2>No search Results</h2>
                )}
            </Wrapper>
        </>
    );
};

export default SearchedDishes;
