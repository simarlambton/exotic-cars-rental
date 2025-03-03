import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
// import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <h2 className="navbar-brand" onClick={() => navigate("/home")}>
          Exotic Cars Rental
        </h2>
        <div className="d-flex gap-3">
          {user ? (
            <>
              <button onClick={handleLogout} className="btn btn-danger">
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/login")} className="btn btn-primary">
                Login
              </button>
              <button onClick={() => navigate("/signup")} className="btn btn-success">
                Signup
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
