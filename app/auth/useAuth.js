import jwtDecode from "jwt-decode";
import { useContext } from "react";
import AuthContext from "./context";
import authStorage from "./storage";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  const logIn = (authToken) => {
    let user = jwtDecode(authToken);
    setUser(user);
    authStorage.setToken(authToken);
  };

  return { user, logIn, logOut };
};
