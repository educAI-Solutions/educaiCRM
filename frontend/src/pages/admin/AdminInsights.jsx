import React from "react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Container, Row, Card, Col } from "react-bootstrap";

function AdminInsights() {
  const attendanceData = [
    { month: "January", attendance: 65 },
    { month: "February", attendance: 59 },
    { month: "March", attendance: 80 },
    { month: "April", attendance: 81 },
    { month: "May", attendance: 56 },
    { month: "June", attendance: 55 },
  ];

  const justificationData = [
    { name: "Approved", value: 300 },
    { name: "Pending", value: 50 },
    { name: "Rejected", value: 100 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const userData = [
    { name: "Active", value: 200 },
    { name: "Inactive", value: 50 },
  ];

  return (
    <Container>
      <Row className="mb-3 text-center">
        <h2>Insights</h2>
      </Row>
      <Row>
        <Col>
          <Card style={{ width: "36rem" }}>
            <Card.Body>
              <Card.Title>Attendance Overall</Card.Title>
              <LineChart width={500} height={300} data={attendanceData}>
                <XAxis dataKey="month" />
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="attendance" stroke="#8884d8" />
                <Tooltip />
                <Legend />
              </LineChart>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: "36rem" }}>
            <Card.Body>
              <Card.Title>Justifications</Card.Title>
              <PieChart width={400} height={400}>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={justificationData}
                  cx={200}
                  cy={200}
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {justificationData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Card style={{ width: "36rem" }}>
          <Card.Body>
            <Card.Title>Users</Card.Title>
            <PieChart width={400} height={400}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={userData}
                cx={200}
                cy={200}
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {userData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
}

export default AdminInsights;
