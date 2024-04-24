import React from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  const attendanceData = [
    { month: t("adminDashboard.insightsManagement.january"), attendance: 65 },
    { month: t("adminDashboard.insightsManagement.february"), attendance: 59 },
    { month: t("adminDashboard.insightsManagement.march"), attendance: 80 },
    { month: t("adminDashboard.insightsManagement.april"), attendance: 81 },
    { month: t("adminDashboard.insightsManagement.may"), attendance: 56 },
    { month: t("adminDashboard.insightsManagement.june"), attendance: 55 },
  ];

  const justificationData = [
    { name: t("adminDashboard.insightsManagement.approved"), value: 300 },
    { name: t("adminDashboard.insightsManagement.pending"), value: 50 },
    { name: t("adminDashboard.insightsManagement.rejected"), value: 100 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const userData = [
    { name: t("adminDashboard.insightsManagement.active"), value: 200 },
    { name: t("adminDashboard.insightsManagement.inactive"), value: 50 },
  ];

  return (
    <Container>
      <Row className="mb-3 text-center">
        <h1>{t("adminDashboard.insightsManagement.insights")}</h1>
      </Row>
      <Row>
        <Col>
          <Card style={{ width: "36rem" }}>
            <Card.Body>
              <Card.Title>
                {t("adminDashboard.insightsManagement.attendanceOverall")}
              </Card.Title>
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
              <Card.Title>
                {t("adminDashboard.insightsManagement.justifications")}
              </Card.Title>
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
            <Card.Title>
              {t("adminDashboard.insightsManagement.users")}
            </Card.Title>
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
