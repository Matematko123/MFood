import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";

import cartReducer from "./slices/cartSlice";
import dishSlice from "./slices/dishSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        dish: dishSlice,
        user: userSlice,
    },
    middleware: [thunkMiddleware],
});
