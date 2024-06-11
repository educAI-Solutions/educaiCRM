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
  ResponsiveContainer,
} from "recharts";
import { Container, Row, Col, Card } from "react-bootstrap";

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

  const userData = [
    { name: t("adminDashboard.insightsManagement.active"), value: 200 },
    { name: t("adminDashboard.insightsManagement.inactive"), value: 50 },
  ];

  const surveyData = [
    { name: t("adminDashboard.insightsManagement.completed"), value: 150 },
    { name: t("adminDashboard.insightsManagement.notCompleted"), value: 50 },
  ];

  const teacherRatingData = [
    { month: t("adminDashboard.insightsManagement.january"), rating: 4.5 },
    { month: t("adminDashboard.insightsManagement.february"), rating: 4.6 },
    { month: t("adminDashboard.insightsManagement.march"), rating: 4.4 },
    { month: t("adminDashboard.insightsManagement.april"), rating: 4.8 },
    { month: t("adminDashboard.insightsManagement.may"), rating: 4.7 },
    { month: t("adminDashboard.insightsManagement.june"), rating: 4.9 },
  ];

  const inPersonData = [
    { name: t("adminDashboard.insightsManagement.inPerson"), value: 70 },
    { name: t("adminDashboard.insightsManagement.online"), value: 30 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <Container fluid>
      <h1 className="text-center mb-4">
        {t("adminDashboard.insightsManagement.insights")}
      </h1>
      <Row className="justify-content-around">
        <Col md={6} lg={4} className="mb-3">
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title className="text-center">
                {t("adminDashboard.insightsManagement.attendanceOverall")}
              </Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={attendanceData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <CartesianGrid stroke="#ccc" />
                  <Line type="monotone" dataKey="attendance" stroke="#8884d8" />
                  <Tooltip />
                  <Legend />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        {/* Add spacing class mb-3 to each column */}
        <Col md={6} lg={4} className="mb-3">
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title className="text-center">
                {t("adminDashboard.insightsManagement.justifications")}
              </Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={justificationData}
                    dataKey="value"
                    label={({ name }) => name}
                  >
                    {justificationData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4} className="mb-3">
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title className="text-center">
                {t("adminDashboard.insightsManagement.users")}
              </Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={userData}
                    dataKey="value"
                    label={({ name }) => name}
                  >
                    {userData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4} className="mb-3">
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title className="text-center">
                {t("adminDashboard.insightsManagement.surveyResults")}
              </Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={surveyData}
                    dataKey="value"
                    label={({ name }) => name}
                  >
                    {surveyData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4} className="mb-3">
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title className="text-center">
                {t("adminDashboard.insightsManagement.averageTeacherRating")}
              </Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={teacherRatingData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <CartesianGrid stroke="#ccc" />
                  <Line type="monotone" dataKey="rating" stroke="#8884d8" />
                  <Tooltip />
                  <Legend />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4} className="mb-3">
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title className="text-center">
                {t("adminDashboard.insightsManagement.studentAttendance")}
              </Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={inPersonData}
                    dataKey="value"
                    label={({ name }) => name}
                  >
                    {inPersonData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminInsights;
