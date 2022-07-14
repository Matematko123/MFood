//@ts-nocheck

import styled from "styled-components";
import CartItem from "./CartItem";

import { useDispatch, useSelector } from "react-redux";
import { IInitStateCart } from "../../redux/slices/cartSlice";
import { IInitStateUser } from "../../redux/slices/userSlice";

import { handleSignIn } from "../../firebase/firebaseHandlers";
import StripeCheckout, { Token } from "react-stripe-checkout";
import { useState } from "react";

const Wrapper = styled.div`
    min-height: 100vh;
    width: 25%;
    padding: 40px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 30px;
    border-radius: 35px 0px 0px 0px;

    h1 {
        margin-bottom: 2rem;
    }
`;

const CartItems = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Checkout = styled.div`
    border-radius: 15px;

    margin-top: 5rem;
    border: solid #fbbc2f 2px;

    padding: 25px;

    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    font-weight: 500;
    font-size: 1.2rem;
    align-items: center;
`;

const CheckoutButton = styled.button`
    background-color: #08b52f;
    border: none;
    padding: 1rem;
    color: white;
    font-weight: 500;
    font-size: 1.2rem;
    border-radius: 15px;

    :hover {
        cursor: pointer;
        filter: brightness(105%);
        span {
            color: white;
        }
    }
`;

const Cart = () => {
    const cart: IInitStateCart = useSelector((state: any) => state.cart);
    const user: IInitStateUser = useSelector((state: any) => state.user);

    const [stripeToken, setStripeToken] = useState<Token>();

    const key: any = process.env.REACT_APP_STRIPE;

    const dispatch = useDispatch();

    function onToken(token: Token) {
        setStripeToken(token);
    }

    return (
        <Wrapper>
            <h1>My Cart</h1>
            {cart.products.length ? (
                <>
                    <CartItems>
                        {cart.products.map((cartItem) => (
                            <CartItem
                                key={cartItem.id}
                                id={cartItem.id}
                                img={cartItem.img}
                                quantity={cartItem.quantity}
                                name={cartItem.name}
                                price={cartItem.price}
                            />
                        ))}
                    </CartItems>

                    <Checkout>
                        <Row>
                            <span>Total</span>
                            <span>${cart.total}</span>
                        </Row>
                        <Row>
                            <span>Discount</span>
                            <span>0%</span>
                        </Row>
                        <hr />
                        <Row>
                            <h2>Final</h2>
                            <h3>${cart.total}</h3>
                        </Row>
                        {user.loggedIn && (
                            <StripeCheckout
                                name="MFood"
                                description={`Your total is $${
                                    cart.total + 50
                                }`}
                                amount={cart.total * 100}
                                token={onToken}
                                key={
                                    "sk_test_51KlAWXLzCvmGvllApHS7gyc2J47mtgTuFABvpXFzwrKSfN5kbZ46cWWlMjeOlgTe2idznMHia3cT07CNQZLJR5ei00sPRkGdDB"
                                }
                                stripeKey={process.env.REACT_APP_STRIPE}
                            >
                                <CheckoutButton>Checkout</CheckoutButton>
                            </StripeCheckout>
                        )}
                        {!user.loggedIn && (
                            <CheckoutButton
                                style={{ backgroundColor: "#cf4236" }}
                                onClick={() => handleSignIn(dispatch)}
                            >
                                Please sign in to continue
                            </CheckoutButton>
                        )}
                    </Checkout>
                </>
            ) : (
                <h2>There is nothing inside cart</h2>
            )}
        </Wrapper>
    );
};

export default Cart;
