import React from "react";
import styled from "styled-components";

import NavButton from "../components/reusable/NavButton";
import SearchBox from "./SearchBox";

import { FaShoppingCart, FaUser, FaAlignJustify } from "react-icons/fa";
import { Badge } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { IInitStateCart } from "../redux/slices/cartSlice";
import { IInitStateUser } from "../redux/slices/userSlice";

import { handleSignIn, handleSignOut } from "../firebase/firebaseHandlers";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
`;

const Right = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const UserImg = styled.img`
    display: block;
    height: 100%;
    width: 50px;
    border-radius: 10px;

    :hover {
        cursor: pointer;
    }
`;

interface Props {
    setCartActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<Props> = ({ setCartActive }) => {
    const dispatch = useDispatch();

    const cart: IInitStateCart = useSelector((state: any) => state.cart);
    const user: IInitStateUser = useSelector((state: any) => state.user);

    return (
        <Wrapper>
            <NavButton onClick={() => {}} color={"#FBBC2F"}>
                <FaAlignJustify />
            </NavButton>
            <SearchBox></SearchBox>
            <Right>
                {user.loggedIn ? (
                    <UserImg
                        onClick={() => handleSignOut(dispatch)}
                        src={user.photoUrl}
                        title="Sign Out"
                    />
                ) : (
                    <NavButton
                        onClick={() => handleSignIn(dispatch)}
                        color={"#333333"}
                    >
                        <FaUser title="Sign In" />
                    </NavButton>
                )}

                <Badge badgeContent={cart.products.length} color="info">
                    <NavButton
                        onClick={() => {
                            setCartActive((prevState) => {
                                return !prevState;
                            });
                        }}
                        color={"#FBBC2F"}
                    >
                        <FaShoppingCart />
                    </NavButton>
                </Badge>
            </Right>
        </Wrapper>
    );
};

export default Navbar;
