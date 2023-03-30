import React, { useState, useMemo } from "react";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import AuthContext from "../context/AuthContext";
import "../scss/global.scss";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";

export default function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(undefined);
  console.log(auth);

  const login = (token) => {
    setAuth({
      token,
      idUser: jwtDecode(token).id,
    });
  };
  const authData = useMemo(
    () => ({
      auth: { name: "Gustavo", email: "gusaranciba@gmail.com" },
      login,
      logout: () => null,
      setReloadUser: () => null,
    }),
    []
  );

  return (
    <AuthContext.Provider value={authData}>
      <Component {...pageProps} />
      <ToastContainer
        position=" top-right "
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </AuthContext.Provider>
  );
}
