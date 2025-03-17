import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const Profile = () => {
  const { token } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userResponse = await axios.get("http://localhost:3030/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserInfo(userResponse.data);

        const bookingsResponse = await axios.get("http://localhost:3030/api/bookings/my-bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(bookingsResponse.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [token]);

  return (
    <div className="container mt-4">
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {userInfo.name}</p>
      <p><strong>Email:</strong> {userInfo.email}</p>

      <h3 className="mt-4">Booking History</h3>
      {bookings.length > 0 ? (
        <ul className="list-group">
          {bookings.map((booking) => (
            <li key={booking._id} className="list-group-item">
              <strong>{booking.car.name}</strong> - {new Date(booking.startDate).toLocaleDateString()} to {new Date(booking.endDate).toLocaleDateString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings yet.</p>
      )}
    </div>
  );
};

export default Profile;
