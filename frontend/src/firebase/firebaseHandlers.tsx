import { auth, provider } from "./firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";

import { logIn, logOut } from "../redux/slices/userSlice";
import { Dispatch } from "react";
import { AnyAction } from "@reduxjs/toolkit";

const handleSignIn = (dispatch: Dispatch<AnyAction>) => {
    signInWithPopup(auth, provider).then((result) => {
        dispatch(
            logIn({
                username: result.user.displayName,
                email: result.user.email,
                photoUrl: result.user.photoURL,
            })
        );
    });
};

const handleSignOut = (dispatch: Dispatch<AnyAction>) => {
    signOut(auth).then(() => {
        dispatch(logOut());
    });
};

export { handleSignIn, handleSignOut };
