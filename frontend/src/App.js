import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/protected/ProtectedRoute";
import RedirectIfAuth from "./components/protected/RedirectIfAuth";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import Home from "./components/pages/Home";
import LandingPage from "./components/pages/LandingPage";
import CarListing from "./components/car/CarListing";
import AdminDashboard from "./components/pages/AdminDashboard"; // ✅ Import Admin Dashboard
import Profile from "./components/pages/Profile";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Landing Page without Navbar & Footer */}
          <Route path="/" element={<LandingPage />} />

          {/* Public Routes (Only accessible when NOT logged in) */}
          <Route element={<RedirectIfAuth />}>
            <Route
              path="/login"
              element={
                <>
                  <Navbar />
                  <Login />
                  <Footer />
                </>
              }
            />
            <Route
              path="/signup"
              element={
                <>
                  <Navbar />
                  <Signup />
                  <Footer />
                </>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <>
                  <Navbar />
                  <ForgotPassword />
                  <Footer />
                </>
              }
            />
            <Route
              path="/reset-password/:token"
              element={
                <>
                  <Navbar />
                  <ResetPassword />
                  <Footer />
                </>
              }
            />
          </Route>

          {/* ✅ Car Listings Page (Public) */}
          <Route
            path="/cars"
            element={
              <>
                <Navbar />
                <CarListing />
                <Footer />
              </>
            }
          />

          {/* ✅ Protected Routes (Only for Logged-in Users) */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/home"
              element={
                <>
                  <Navbar />
                  <Home />
                  <Footer />
                </>
              }
            />
          </Route>

          {/* ✅ Admin Protected Route (Only for Admins) */}
          <Route element={<ProtectedRoute adminOnly={true} />}>
            <Route
              path="/admin-dashboard"
              element={
                <>
                  <Navbar />
                  <AdminDashboard />
                  <Footer />
                </>
              }
            />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route
              path="/profile"
              element={
                <>
                  <Navbar />
                  <Profile />
                  <Footer />
                </>
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
