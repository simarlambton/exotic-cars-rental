import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const RedirectIfAuth = () => {
  const { user } = useContext(AuthContext);
  return user ? <Navigate to="/home" /> : <Outlet />;
};

export default RedirectIfAuth;
