import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Table,
  Image,
} from "react-bootstrap";
import { addCar, deleteCar, getAllCars } from "../api/carApi";
import { toast } from "react-toastify";

const ManageCars = () => {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    model: "",
    color: "",
    pricePerDay: "",
  });
  const [image, setImage] = useState(null);
  const [cars, setCars] = useState([]);

  const fetchCars = async () => {
    try {
      const data = await getAllCars();
      setCars(data);
    } catch (err) {
      toast.error("Failed to load cars");
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.brand ||
      !form.model ||
      !form.color ||
      !form.pricePerDay ||
      !image
    ) {
      return toast.error("Please fill all fields and upload an image");
    }

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value)
      );
      formData.append("image", image);

      await addCar(formData);
      toast.success("Car added successfully!");
      setForm({ name: "", brand: "", model: "", color: "", pricePerDay: "" });
      setImage(null);
      fetchCars();
    } catch (err) {
      console.error(err);
      toast.error("Error adding car");
    }
  };

  const handleDeleteCar = async (id) => {
    try {
      await deleteCar(id);
      toast.success("Car deleted");
      fetchCars();
    } catch (err) {
      toast.error("Error deleting car");
    }
  };

  return (
    <Container className="my-5">
      <h2>Manage Cars</h2>

      <Form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="mb-5"
      >
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Car Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                value={form.brand}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                name="model"
                value={form.model}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="text"
                name="color"
                value={form.color}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price Per Day ($)</Form.Label>
              <Form.Control
                type="number"
                name="pricePerDay"
                value={form.pricePerDay}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" variant="dark">
          Add Car
        </Button>
      </Form>

      <h4>Existing Cars</h4>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Color</th>
            <th>$/Day</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car._id}>
              <td>
                <Image
                  src={car.image}
                  width={80}
                  height={50}
                  style={{ objectFit: "cover" }}
                  rounded
                />
              </td>
              <td>{car.name}</td>
              <td>{car.brand}</td>
              <td>{car.model}</td>
              <td>{car.color}</td>
              <td>{car.pricePerDay}</td>
              <td>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDeleteCar(car._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ManageCars;
