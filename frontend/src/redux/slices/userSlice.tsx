import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export interface IInitStateUser {
    username: string;
    email: string;
    photoUrl: string;
    loggedIn: boolean;
}

const initialState: IInitStateUser = {
    username: "",
    email: "",
    photoUrl: "",
    loggedIn: false,
};

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        logIn(state, action) {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.photoUrl = action.payload.photoUrl;
            state.loggedIn = true;
            toast.success("LOGGED IN");
        },
        logOut(state) {
            state.username = "";
            state.email = "";
            state.photoUrl = "";
            state.loggedIn = false;
            toast.error("LOGGED OUT");
        },
    },
});

export const { logIn, logOut } = userSlice.actions;

export default userSlice.reducer;
