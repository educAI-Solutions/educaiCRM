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

  // Simulated data for insightsManagement metrics
  const conversationData = [
    { month: t("adminDashboard.insightsManagement.january"), conversations: 150 },
    { month: t("adminDashboard.insightsManagement.february"), conversations: 200 },
    { month: t("adminDashboard.insightsManagement.march"), conversations: 180 },
    { month: t("adminDashboard.insightsManagement.april"), conversations: 220 },
    { month: t("adminDashboard.insightsManagement.may"), conversations: 170 },
    { month: t("adminDashboard.insightsManagement.june"), conversations: 210 },
  ];

  const responseTimeData = [
    { month: t("adminDashboard.insightsManagement.january"), responseTime: 2.3 },
    { month: t("adminDashboard.insightsManagement.february"), responseTime: 2.1 },
    { month: t("adminDashboard.insightsManagement.march"), responseTime: 1.9 },
    { month: t("adminDashboard.insightsManagement.april"), responseTime: 2.5 },
    { month: t("adminDashboard.insightsManagement.may"), responseTime: 2.0 },
    { month: t("adminDashboard.insightsManagement.june"), responseTime: 2.2 },
  ];

  const satisfactionData = [
    { name: t("adminDashboard.insightsManagement.satisfied"), value: 300 },
    { name: t("adminDashboard.insightsManagement.neutral"), value: 100 },
    { name: t("adminDashboard.insightsManagement.dissatisfied"), value: 50 },
  ];

  const conversationOutcomeData = [
    { name: t("adminDashboard.insightsManagement.resolved"), value: 400 },
    { name: t("adminDashboard.insightsManagement.unresolved"), value: 100 },
    { name: t("adminDashboard.insightsManagement.transferredToHuman"), value: 50 },
  ];

  const conversationTypeData = [
    { name: t("adminDashboard.insightsManagement.faq"), value: 250 },
    { name: t("adminDashboard.insightsManagement.support"), value: 150 },
    { name: t("adminDashboard.insightsManagement.other"), value: 50 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <Container fluid>
      <h1 className="text-center mb-4">
        {t("adminDashboard.insightsManagement.insights")}
      </h1>
      <Row className="justify-content-around">
        {/* Total Conversations Over Time */}
        <Col md={6} lg={4} className="mb-3">
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title className="text-center">
                {t("adminDashboard.insightsManagement.totalConversations")}
              </Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={conversationData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <CartesianGrid stroke="#ccc" />
                  <Line
                    type="monotone"
                    dataKey="conversations"
                    stroke="#8884d8"
                  />
                  <Tooltip />
                  <Legend />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        {/* Response Time Over Time */}
        <Col md={6} lg={4} className="mb-3">
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title className="text-center">
                {t("adminDashboard.insightsManagement.avgResponseTime")}
              </Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={responseTimeData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <CartesianGrid stroke="#ccc" />
                  <Line
                    type="monotone"
                    dataKey="responseTime"
                    stroke="#82ca9d"
                  />
                  <Tooltip />
                  <Legend />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        {/* User Satisfaction */}
        <Col md={6} lg={4} className="mb-3">
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title className="text-center">
                {t("adminDashboard.insightsManagement.userSatisfaction")}
              </Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={satisfactionData}
                    dataKey="value"
                    label={({ name }) => name}
                  >
                    {satisfactionData.map((entry, index) => (
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

        {/* Conversation Outcomes */}
        <Col md={6} lg={4} className="mb-3">
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title className="text-center">
                {t("adminDashboard.insightsManagement.conversationOutcomes")}
              </Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={conversationOutcomeData}
                    dataKey="value"
                    label={({ name }) => name}
                  >
                    {conversationOutcomeData.map((entry, index) => (
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

        {/* Conversation Types */}
        <Col md={6} lg={4} className="mb-3">
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title className="text-center">
                {t("adminDashboard.insightsManagement.conversationTypes")}
              </Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={conversationTypeData}
                    dataKey="value"
                    label={({ name }) => name}
                  >
                    {conversationTypeData.map((entry, index) => (
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
