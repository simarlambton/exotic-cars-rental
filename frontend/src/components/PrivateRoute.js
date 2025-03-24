import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children, admin = false }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (admin && !user.isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
