import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminDashboard = () => {
  const { auth } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCar, setNewCar] = useState({
    name: "",
    brand: "",
    price: "",
    availability: true,
  });
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAdmin) {
      navigate("/home"); // Redirect non-admins
    }

    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:3030/api/cars", {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, [auth, navigate]);

  // ✅ Handle Car Input Change
  const handleInputChange = (e) => {
    setNewCar({ ...newCar, [e.target.name]: e.target.value });
  };

  const handleDeleteCar = async (id) => {
    try {
      await axios.delete(`http://localhost:3030/api/cars/delete/${id}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      setCars(cars.filter((car) => car._id !== id)); // ✅ Remove car from UI
    } catch (error) {
      console.error(
        "❌ Error deleting car:",
        error.response?.data || error.message
      );
    }
  };

  // ✅ Handle Image File Selection
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // Store selected image file
  };

  // ✅ Handle Car Addition with Image Upload
  const handleAddCar = async () => {
  const formData = new FormData();
  formData.append("name", newCar.name);
  formData.append("brand", newCar.brand);
  formData.append("description", newCar.description);
  formData.append("rentalPrice", parseFloat(newCar.rentalPrice)); // ✅ Convert to number
  formData.append("availability", newCar.availability);

  if (imageFile) {
    formData.append("image", imageFile); // ✅ Ensure field name matches backend
  }

  try {
    const response = await axios.post("http://localhost:3030/api/cars/addCar", formData, {
      headers: { 
        Authorization: `Bearer ${auth.token}`, 
        "Content-Type": "multipart/form-data"
      },
    });

    console.log("🔍 Car added:", response.data); // ✅ Log response
    setCars([...cars, response.data]); 
    setShowModal(false);
  } catch (error) {
    console.error("❌ Error adding car:", error.response?.data || error.message);
  }
};

  

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Admin Dashboard</h2>

      {/* ✅ Add Car Button */}
      <button
        className="btn btn-primary mb-3"
        onClick={() => setShowModal(true)}
      >
        Add New Car
      </button>

      {/* ✅ Add Car Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Car</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  name="name"
                  placeholder="Car Name"
                  value={newCar.name}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  name="brand"
                  placeholder="Brand"
                  value={newCar.brand}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="number"
                  className="form-control mb-2"
                  name="price"
                  placeholder="Price"
                  value={newCar.price}
                  onChange={handleInputChange}
                  required
                />
                {/* ✅ Image Upload */}
                <input
                  type="file"
                  className="form-control mb-2"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <select
                  className="form-select"
                  name="availability"
                  value={newCar.availability}
                  onChange={handleInputChange}
                >
                  <option value={true}>Available</option>
                  <option value={false}>Unavailable</option>
                </select>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-success" onClick={handleAddCar}>
                  Add Car
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Cars List */}
      <h3>Cars</h3>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car._id}>
                <td>{car.name}</td>
                <td>{car.brand}</td>
                <td>
                  ${car.rentalPrice ? `$${car.rentalPrice.toFixed(2)}` : "N/A"}
                </td>

                <td>
                  {car.images && car.images.length > 0 ? (
                    <img
                      src={car.images[0]} // Show the first image
                      alt={car.name}
                      style={{ width: "100px", height: "auto" }}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>

                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      axios
                        .delete(
                          `http://localhost:3030/api/cars/delete/${car._id}`,
                          {
                            headers: { Authorization: `Bearer ${auth.token}` },
                          }
                        )
                        .then(() =>
                          setCars(cars.filter((c) => c._id !== car._id))
                        )
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
