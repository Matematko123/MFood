import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartItem } from "../../components/cart/CartItem";

import { toast } from "react-toastify";

export interface IInitStateCart {
    products: ICartItem[];
    total: number;
}

const initialState: IInitStateCart = {
    products: [],
    total: 0,
};

const getItemIndex = (state: ICartItem[], idToFind: number): number => {
    const ids = state.map((item) => item.id);
    return ids.indexOf(idToFind);
};

const cartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<ICartItem>) {
            const itemIndex = getItemIndex(state.products, action.payload.id);

            if (itemIndex && itemIndex < 0) state.products.push(action.payload);
            else state.products[itemIndex].quantity += action.payload.quantity;

            state.total += action.payload.price;

            toast.info("Added to cart");
        },
        removeFromCart(
            state,
            action: PayloadAction<{
                id: number;
                price: number;
                quantity: number;
            }>
        ) {
            state.products = state.products.filter(
                (item) => item.id !== action.payload.id
            );

            state.total -= action.payload.price * action.payload.quantity;
        },
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
