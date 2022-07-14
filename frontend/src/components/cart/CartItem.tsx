import React from "react";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/slices/cartSlice";

export interface ICartItem {
    id: number;
    img: string;
    quantity: number;
    name: string;
    price: number;
}

const Wrapper = styled.div`
    display: flex;
    border: solid #fbbc2f 2px;
    border-radius: 15px;
    gap: 1rem;

    justify-content: space-around;
    align-items: center;
    height: 5rem;
    padding: 15px 20px;

    img {
        width: 5rem;
    }

    :hover {
        background-color: #fbbc2f;
        box-shadow: rgba(100, 100, 111, 0.5) 0px 7px 29px 0px;

        span {
            color: white;
        }
    }
`;

const Price = styled.span`
    font-weight: 500;
    font-size: 1rem;
`;

const RemoveButton = styled.button`
    border: none;
    padding: 10px;
    border-radius: 5px;

    :hover {
        cursor: pointer;
    }
`;

const CartItem: React.FC<ICartItem> = ({ id, img, quantity, name, price }) => {
    const dispatch = useDispatch();

    const onCartItemRemoveHandler = () => {
        dispatch(removeFromCart({ id, price, quantity }));
    };

    return (
        <Wrapper>
            <img src={img} alt={name} />
            <span>
                {quantity} X {name}{" "}
            </span>
            <Price>${price * quantity}</Price>
            <RemoveButton onClick={onCartItemRemoveHandler}>X</RemoveButton>
        </Wrapper>
    );
};

export default CartItem;
