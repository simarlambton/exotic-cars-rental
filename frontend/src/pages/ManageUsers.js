import React, { useEffect, useState } from "react";
import { getAllUsers } from "../api/authApi";
import { Container, Table, Button, Badge } from "react-bootstrap";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res);
    } catch (error) {
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const exportCSV = () => {
    const headers = ["Name", "Email", "Role"];
    const rows = users.map((u) => [
      u.name,
      u.email,
      u.isAdmin ? "Admin" : "User",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "users.csv";
    link.click();
  };

  return (
    <Container className="mt-5 pt-5 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Manage Users</h2>
        <Button variant="success" onClick={exportCSV}>
          Export to CSV
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Badge bg={user.isAdmin ? "primary" : "secondary"}>
                  {user.isAdmin ? "Admin" : "User"}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ManageUsers;
