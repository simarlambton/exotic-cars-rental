import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

const AdminSidebar = () => {
  return (
    <ListGroup className="shadow-lg">
      <ListGroup.Item as={Link} to="/admin/dashboard">Dashboard</ListGroup.Item>
      <ListGroup.Item as={Link} to="/admin/cars">Manage Cars</ListGroup.Item>
      <ListGroup.Item as={Link} to="/admin/users">Manage Users</ListGroup.Item>
      <ListGroup.Item as={Link} to="/admin/bookings">Manage Bookings</ListGroup.Item>
    </ListGroup>
  );
};

export default AdminSidebar;
