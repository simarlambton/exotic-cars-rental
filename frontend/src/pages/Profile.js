import React, { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api/authApi";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setFormData((prev) => ({
          ...prev,
          name: data.name,
          email: data.email,
          phone: data.phone || "",
        }));
      } catch (error) {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    if (!user?.isAdmin) fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && !/^\d*$/.test(value)) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      toast.success("Profile updated");
    } catch (error) {
      toast.error("Update failed");
    }
  };

  if (user?.isAdmin) return <Container className="my-5"><h4>Admins cannot update profile.</h4></Container>;

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;

  return (
    <Container className="my-5" style={{ maxWidth: "500px" }}>
      <h2>Edit Profile</h2>
      <Form onSubmit={handleUpdate}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" value={formData.name} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" type="email" value={formData.email} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control name="phone" value={formData.phone} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>New Password</Form.Label>
          <Form.Control name="password" type="password" value={formData.password} onChange={handleChange} />
        </Form.Group>
        <Button type="submit" variant="primary">Update</Button>
      </Form>
    </Container>
  );
};

export default Profile;
