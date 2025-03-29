import React, { useEffect, useState } from "react";
import {
  getAllCars,
  addCar,
  deleteCar,
  updateCar,
} from "../api/carApi";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { toast } from "react-toastify";

const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    brand: "",
    model: "",
    year: "",
    color: "",
    pricePerDay: "",
    image: null,
  });
  const [editCarId, setEditCarId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    brand: "",
    model: "",
    year: "",
    color: "",
    pricePerDay: "",
    image: "",
  });

  // Fetch all cars
  const fetchCars = async () => {
    try {
      const data = await getAllCars();
      setCars(data);
    } catch (error) {
      toast.error("Failed to load cars");
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleAddCar = async () => {
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value)
      );

      await addCar(formData);
      toast.success("Car added");
      setShowAddModal(false);
      fetchCars();
    } catch (error) {
      toast.error("Failed to add car");
    }
  };

  const handleDeleteCar = async (id) => {
    try {
      await deleteCar(id);
      toast.success("Car deleted");
      fetchCars();
    } catch (error) {
      toast.error("Failed to delete car");
    }
  };

  const openEditModal = (car) => {
    setEditCarId(car._id);
    setEditForm(car);
    setShowEditModal(true);
  };

  const handleUpdateCar = async () => {
    try {
      const formData = new FormData();
      Object.entries(editForm).forEach(([key, value]) => {
        if (key === "image" && typeof value !== "string") {
          formData.append("image", value);
        } else {
          formData.append(key, value);
        }
      });

      await updateCar(editCarId, formData);
      toast.success("Car updated successfully");
      setShowEditModal(false);

      //  REFRESH the list to reflect updated data
      fetchCars();
    } catch (error) {
      toast.error("Failed to update car");
    }
  };

  return (
    <div className="container my-5 py-5">
      <h2 className="mb-4">Manage Cars</h2>

      <Button variant="outline-dark" className="mb-3" onClick={() => setShowAddModal(true)}>
        Add New Car
      </Button>

      <Table className="my-5" striped bordered hover responsive>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Year</th>
            <th>Color</th>
            <th>Price/Day</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car._id}>
              <td>
                <img
                  src={car.image}
                  alt={car.name}
                  width="80"
                  height="50"
                  style={{ objectFit: "cover" }}
                />
              </td>
              <td>{car.name}</td>
              <td>{car.brand}</td>
              <td>{car.model}</td>
              <td>{car.year}</td>
              <td>{car.color}</td>
              <td>${car.pricePerDay}/day</td>
              <td>
                <Button variant="outline-success" size="sm" onClick={() => openEditModal(car)}>
                  Edit
                </Button>{" "}
                <Button variant="outline-danger" size="sm" onClick={() => handleDeleteCar(car._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Car Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Car</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {["name", "brand", "model", "year", "color", "pricePerDay"].map((field) => (
              <Form.Group key={field} className="mb-3">
                <Form.Label>{field}</Form.Label>
                <Form.Control
                  type={field === "pricePerDay" ? "number" : "text"}
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                />
              </Form.Group>
            ))}
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddCar}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Car Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Car</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {["name", "brand", "model", "year", "color", "pricePerDay"].map((field) => (
              <Form.Group key={field} className="mb-3">
                <Form.Label>{field}</Form.Label>
                <Form.Control
                  type={field === "pricePerDay" ? "number" : "text"}
                  value={editForm[field]}
                  onChange={(e) => setEditForm({ ...editForm, [field]: e.target.value })}
                />
              </Form.Group>
            ))}
            <Form.Group className="mb-3">
              <Form.Label>Image (leave blank to keep current)</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setEditForm({ ...editForm, image: e.target.files[0] })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateCar}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageCars;
