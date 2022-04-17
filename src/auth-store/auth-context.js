import React from "react";
import { useHistory } from "react-router-dom";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export function AuthContextProvider(props) {
  const history = useHistory();
  const initToken = localStorage.getItem("token");

  const [token, setToken] = React.useState(initToken);

  const userLoggedIn = !!token;

  function loginHandler(token) {
    localStorage.setItem("token", token);
    setToken(token);
  }

  function logoutHandler() {
    localStorage.removeItem("token");
    setToken(null);
    history.replace("/");
  }

  const contextValue = {
    token: token,
    isLoggedIn: userLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
