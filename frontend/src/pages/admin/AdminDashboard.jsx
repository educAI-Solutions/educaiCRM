import React, { useState } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import {
  FaUsers,
  FaBookOpen,
  FaBell,
  FaFileAlt,
  FaUserCheck,
  FaChartLine,
} from "react-icons/fa";
import AdminJustifications from "./AdminJustifications";
import AdminAttendance from "./AdminAttendance";
import AdminInsights from "./AdminInsights";
import Notifications from "../Notifications";
import AdminUsers from "./AdminUsers";
import AdminCourses from "./AdminCourses";

function AdminDashboard() {
  const [selectedItem, setSelectedItem] = useState("");

  return (
    <Container fluid style={{ fontFamily: "Montserrat, sans-serif" }}>
      <Row>
        <Col md={2} className="border-right py-4">
          <Row className="text-center">
            <h3 className="mt-4">Admin Menu</h3>
          </Row>
          <ListGroup className="mt-3">
            <ListGroup.Item action onClick={() => setSelectedItem("users")}>
              <FaUsers className="m-2" />
              Users
            </ListGroup.Item>
            <ListGroup.Item action onClick={() => setSelectedItem("courses")}>
              <FaBookOpen className="m-2" />
              Courses
            </ListGroup.Item>
            <ListGroup.Item
              action
              onClick={() => setSelectedItem("notifications")}
            >
              <FaBell className="m-2" />
              Notifications
            </ListGroup.Item>
            <ListGroup.Item
              action
              onClick={() => setSelectedItem("justifications")}
            >
              <FaFileAlt className="m-2" />
              Justifications
            </ListGroup.Item>
            <ListGroup.Item
              action
              onClick={() => setSelectedItem("attendance")}
            >
              <FaUserCheck className="m-2" />
              Attendance
            </ListGroup.Item>
            <ListGroup.Item action onClick={() => setSelectedItem("insights")}>
              <FaChartLine className="m-2" />
              Insights
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={10}>
          {selectedItem === "notifications" ? (
            <Notifications />
          ) : selectedItem === "justifications" ? (
            <AdminJustifications />
          ) : selectedItem === "attendance" ? (
            <AdminAttendance />
          ) : selectedItem === "insights" ? (
            <AdminInsights />
          ) : selectedItem === "users" ? (
            <AdminUsers />
          ) : selectedItem === "courses" ? (
            <AdminCourses />
          ) : (
            <>
              <h2 className="mt-4">Welcome to the Admin Dashboard</h2>
              <p>Choose an item from the sidebar to view more details.</p>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;
