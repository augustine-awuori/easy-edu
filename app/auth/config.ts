import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDQTc4T8XE7MzFYDXMe5d0IUBZu3ku4gpQ",
  authDomain: "easy-edu-c801e.firebaseapp.com",
  projectId: "easy-edu-c801e",
  storageBucket: "easy-edu-c801e.appspot.com",
  messagingSenderId: "212927519459",
  appId: "1:212927519459:web:369efb7c85ad93a96c43d6",
  measurementId: "G-0THQTE0S63",
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
