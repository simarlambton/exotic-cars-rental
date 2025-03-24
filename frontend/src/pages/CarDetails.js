import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCarById, getAllCars } from "../api/carApi";
import { Tabs, Tab, Button, Spinner } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [car, setCar] = useState(null);
  const [otherCars, setOtherCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const carData = await getCarById(id);
        setCar(carData);
        const cars = await getAllCars();
        const filtered = cars.filter((c) => c._id !== id);
        setOtherCars(filtered.slice(0, 6)); // display 6 other cars
      } catch (error) {
        toast.error("Failed to load car details");
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  }

  if (!car) return <p>Car not found</p>;

  return (
    <div className="container my-5">
      <h2>{car.name}</h2>
      <h4 className="text-primary">${car.pricePerDay} / day</h4>

      <div className="d-flex flex-wrap my-4">
        <img src={car.image} alt={car.name} className="img-fluid car-image mb-3 me-3" />
        <div className="flex-grow-1">
          <Tabs defaultActiveKey="info" className="mb-3">
            <Tab eventKey="info" title="General Info">
              <p><strong>Brand:</strong> {car.brand}</p>
              <p><strong>Model:</strong> {car.model}</p>
              <p><strong>Color:</strong> {car.color}</p>
            </Tab>
            <Tab eventKey="equipment" title="Car Equipment">
              <ul className="list-unstyled">
                <li><FaCheckCircle className="text-success me-2" /> Air Conditioner</li>
                <li><FaCheckCircle className="text-success me-2" /> ABS</li>
                <li><FaCheckCircle className="text-success me-2" /> Cruise Control</li>
              </ul>
            </Tab>
            <Tab eventKey="reviews" title="Reviews">
              <p>This car is very reliable and offers a comfortable ride. ⭐⭐⭐⭐⭐</p>
            </Tab>
          </Tabs>
          {!user?.isAdmin && (
            <Button
            variant="primary"
            className="mt-2"
            onClick={() => navigate(`/booking/${car._id}`)}
          >
            Book This Car
          </Button>
          )}
        </div>
      </div>

      {/* Other Cars Section */}
      <div className="mt-5">
        <h3>Other Cars</h3>
        <div className="row">
          {otherCars.map((carItem) => (
            <div className="col-md-4 mb-4" key={carItem._id}>
              <div className="card h-100 shadow-sm">
                <img src={carItem.image} alt={carItem.name} className="card-img-top" style={{ height: "200px", objectFit: "cover" }} />
                <div className="card-body">
                  <h5 className="card-title">{carItem.name}</h5>
                  <p className="card-text text-primary">${carItem.pricePerDay} / day</p>
                  <Button variant="outline-primary" size="sm" onClick={() => navigate(`/car/${carItem._id}`)}>
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
