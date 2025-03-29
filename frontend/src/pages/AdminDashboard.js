import React, { useEffect, useState } from "react";
import { getDashboardStats } from "../api/authApi";
import { Container, Row, Col, Button } from "react-bootstrap";
// import { Card} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import { FaUsers, FaCar, FaClipboardList } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalCars: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getDashboardStats();
        setStats(res);
      } catch (error) {
        toast.error("Failed to load dashboard stats");
      }
    };

    fetchStats();
  }, []);

  // const dashboardCards = [
  //   {
  //     title: "Total Users",
  //     count: stats.totalUsers,
  //     icon: <FaUsers size={30} />,
  //     color: "primary",
  //   },
  //   {
  //     title: "Total Bookings",
  //     count: stats.totalBookings,
  //     icon: <FaClipboardList size={30} />,
  //     color: "success",
  //   },
  //   {
  //     title: "Total Cars",
  //     count: stats.totalCars,
  //     icon: <FaCar size={30} />,
  //     color: "info",
  //   },
  // ];

  const chartData = [
    { name: "Users", count: stats.totalUsers },
    { name: "Bookings", count: stats.totalBookings },
    { name: "Cars", count: stats.totalCars },
  ];

  return (
    <Container className="mt-5 pt-5 mb-5">
      <h2 className="fw-bold mb-4 text-center">Admin Dashboard</h2>
      <h4 className="mb-3">Overview Chart</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      {/* <Row className="mb-4 g-4">
        {dashboardCards.map((card, idx) => (
          <Col key={idx} md={4}>
            <Card border={card.color} className="shadow-sm text-center">
              <Card.Body>
                <div className="text-muted mb-2">{card.icon}</div>
                <Card.Title className="fs-4 fw-bold">{card.title}</Card.Title>
                <Card.Text className="fs-2">{card.count}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row> */}

      <h4 className="mb-3">Quick Actions</h4>
      <Row className="mb-5 g-3">
        <Col md={4}>
          <Button
            variant="outline-dark"
            className="w-100"
            onClick={() => navigate("/admin/manage-users")}
          >
            Manage Users
          </Button>
        </Col>
        <Col md={4}>
          <Button
            variant="outline-dark"
            className="w-100"
            onClick={() => navigate("/admin/manage-bookings")}
          >
            Manage Bookings
          </Button>
        </Col>
        <Col md={4}>
          <Button
            variant="outline-dark"
            className="w-100"
            onClick={() => navigate("/admin/manage-cars")}
          >
            Manage Cars
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
