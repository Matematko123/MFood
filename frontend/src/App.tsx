import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "./components/Navbar";
import Categories from "./components/category/Categories";
import RecommendedDishes from "./components/recommended-dish/RecommendedDishes";
import Cart from "./components/cart/Cart";

import { IInitState } from "./redux/slices/dishSlice";
import { getDishes } from "./redux/slices/dishSlice";
import SearchedDishes from "./components/searchedDishes/SearchedDishes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Main = styled.main`
    display: flex;
`;

const StoreLabel = styled.div`
    margin-top: 2rem;
`;

const MainHeader = styled.h2`
    margin-top: 1.8rem;
`;

function App() {
    const [cartActive, setCartActive] = useState(false);

    const dispatch: any = useDispatch();
    const dish: IInitState = useSelector((state: any) => state.dish);

    useEffect(() => {
        dispatch(getDishes());
    }, []);

    return (
        <Main>
            <div className="App">
                <Navbar setCartActive={setCartActive} />
                <StoreLabel>Store &#8226; MFood</StoreLabel>

                <SearchedDishes dish={dish} />

                <MainHeader>Categories</MainHeader>
                <Categories />

                <MainHeader>Popular Dish</MainHeader>
                <RecommendedDishes dish={dish} />

                <ToastContainer
                    autoClose={1500}
                    position={"top-left"}
                    theme={"colored"}
                />
            </div>
            {cartActive && <Cart />}
        </Main>
    );
}

export default App;
