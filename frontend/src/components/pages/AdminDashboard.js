import React, { useState } from "react";
import carsData from "../../data/carsData"; // ✅ Import carsData.js for now

const AdminDashboard = () => {
  const [cars, setCars] = useState(carsData);

  // ✅ Function to delete a car from the array
  const handleDeleteCar = (id) => {
    const updatedCars = cars.filter((car) => car.id !== id);
    setCars(updatedCars);
  };

  

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Dashboard</h2>

      {/* ✅ Add New Car Button */}
      <button className="btn btn-primary mb-3">Add New Car</button>

      {/* ✅ Car Table */}
      <table className="table table-striped">
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
            <tr key={car.id}>
              <td>{car.name}</td>
              <td>{car.brand}</td>
              <td>${car.rentalPrice.toFixed(2)}</td>
              <td>
                <img
                  src={car.images[0]} 
                  alt={car.name}
                  style={{ width: "100px", height: "auto" }}
                />
              </td>
              <td>
                <button 
                  className="btn btn-danger btn-sm" 
                  onClick={() => handleDeleteCar(car.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
