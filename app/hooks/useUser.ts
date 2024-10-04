import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  GoogleAuthProvider,
  signOut as googleSignOut,
  signInWithPopup,
  User as GoogleUser,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../auth/config";
import { UserContext } from "../contexts";

export interface User extends GoogleUser {}

const useUser = () => {
  const context = useContext(UserContext);
  const [googleUser] = useAuthState(auth);

  const loginWithGoogle = async () =>
    await signInWithPopup(auth, new GoogleAuthProvider());

  const loginWithEmailAndPassword = async (email: string, password: string) =>
    await signInWithEmailAndPassword(auth, email, password);

  const logout = () => googleSignOut(auth);

  return {
    ...context,
    user: googleUser,
    loginWithEmailAndPassword,
    loginWithGoogle,
    logout,
  };
};

export default useUser;
