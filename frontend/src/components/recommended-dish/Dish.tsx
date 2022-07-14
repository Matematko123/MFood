import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { addToCart } from "../../redux/slices/cartSlice";
import { ICartItem } from "../cart/CartItem";

import burger from "../../img/burger.png";

export interface IDish {
    id: number;
    name: string;
    img: string;
    category: number;
    calories: number;
    price: number;
    numberOfServings: number;
}

const Wrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: column;
    background-color: white;
    padding: 15px;
    border-radius: 25px;
    gap: 1rem;
    width: 12rem;
    height: 15rem;
    margin-top: 5rem;
    text-align: center;

    box-shadow: rgba(100, 100, 111, 0.1) 0px 7px 29px 0px;

    img {
        position: absolute;
        height: 12rem;
        top: -5rem;
    }

    :hover {
        background-color: #fbbc2f;
        cursor: pointer;

        box-shadow: rgba(100, 100, 111, 0.5) 0px 7px 29px 0px;

        span {
            color: white;
        }
    }
`;

const NameLabel = styled.span`
    font-weight: 700;
    font-size: 1.4rem;
`;

const PriceButton = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;

    span {
        font-size: 1.4rem;
        font-weight: 500;
    }

    button {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 0;
        padding: 0.18rem 0.8rem;
        border-radius: 2rem;
        font-size: 2rem;

        :hover {
            cursor: pointer;

            filter: brightness(90%);
        }
    }
`;

const Dish: React.FC<IDish> = ({
    id,
    name,
    img,
    calories,
    category,
    price,
    numberOfServings,
}) => {
    const dispatch = useDispatch();

    const addToCartHandler = () => {
        const dishToAdd: ICartItem = {
            id,
            name,
            price,
            img,
            quantity: 1,
        };

        dispatch(addToCart(dishToAdd));
    };

    return (
        <Wrapper>
            <img
                src={`${img}`}
                alt={name}
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = burger;
                }}
            />
            <NameLabel>{name}</NameLabel>
            <span>
                {calories} calories &#8226; {numberOfServings} person
            </span>
            <PriceButton>
                <span>${price}</span>
                <button onClick={addToCartHandler}>+</button>
            </PriceButton>
        </Wrapper>
    );
};

export default Dish;
