import { createContext } from "react";

//Acá guardamos el contexto del usuario
const AuthContext = createContext({
  auth: undefined,
  login: () => null,
  logout: () => null,
  setReloadUser: () => null,
});

export default AuthContext;
