import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  GoogleAuthProvider,
  signOut as googleSignOut,
  signInWithPopup,
  User as GoogleUser,
} from "firebase/auth";

import { auth } from "../auth/config";
import { UserContext } from "../contexts";

export interface User extends GoogleUser {}

const useUser = () => {
  const context = useContext(UserContext);
  const [googleUser] = useAuthState(auth);

  const loginWithGoogle = async () =>
    await signInWithPopup(auth, new GoogleAuthProvider());

  const logout = () => googleSignOut(auth);

  return { ...context, user: googleUser, loginWithGoogle, logout };
};

export default useUser;
