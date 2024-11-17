import { jwtDecode } from "jwt-decode";
import { Toast } from "toastify-react-native";

import { authTokenKey, processResponse } from "./client";
import { User } from "../hooks/useUser";
import { User as GoogleUser } from "firebase/auth";
import usersApi from "./users";

const tokenKey = "token";

const getJwt = () => localStorage.getItem(tokenKey);

const loginWithJwt = (jwt: string) => localStorage.setItem(tokenKey, jwt);

const logout = () => localStorage.removeItem(tokenKey);

const getCurrentUser = () => {
  try {
    const jwt = getJwt();
    if (jwt) {
      const user: User | null = jwtDecode(jwt);
      return user;
    }
  } catch (error) {
    return null;
  }
};

const decode = (jwt: string) => jwtDecode(jwt);

export async function quickAuth(googleUser: GoogleUser | null | undefined) {
  if (!googleUser) return;
  const { displayName: name, email, photoURL: profileImage } = googleUser;
  if (!email || !name || !profileImage) return;
  const res = await usersApi.quickAuth({ email, name, profileImage });
  if (!res) return Toast.error("Couldn't extend your session");

  const { ok } = processResponse(res);
  if (!ok) return Toast.error("Couldn't extend your session");

  loginWithJwt(res.headers[authTokenKey]);
  const user = getCurrentUser();

  return user;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  decode,
  getCurrentUser,
  getJwt,
  loginWithJwt,
  logout,
};
