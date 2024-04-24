import React from "react";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next"; // Import useTranslation from react-i18next

function Notifications() {
  const { t } = useTranslation(); // Use the translation function

  const notifications = [
    {
      id: 1,
      text: t("notifications.notification1"),
      type: "success",
      read: false,
    }, // Translate notification text
    {
      id: 2,
      text: t("notifications.notification2"),
      type: "danger",
      read: false,
    },
    {
      id: 3,
      text: t("notifications.notification3"),
      type: "warning",
      read: false,
    },
    // Add more notifications here
  ];

  const markAsRead = (id) => {
    // Implement logic to mark the notification as read
  };

  const deleteNotification = (id) => {
    // Implement logic to delete the notification
  };

  return (
    <Container fluid className="bg-light min-vh-100 py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-center mb-4">{t("notifications.title")}</h2>{" "}
            {/* Translate title */}
            <ListGroup>
              {notifications.map((notification) => (
                <ListGroup.Item
                  key={notification.id}
                  className={`d-flex justify-content-between align-items-center mb-3`}
                >
                  <span>{notification.text}</span>
                  <div>
                    <Button
                      variant="light"
                      style={{ border: "1px solid black" }}
                      onClick={() => markAsRead(notification.id)}
                    >
                      {t("notifications.markAsRead")}
                    </Button>{" "}
                    {/* Translate button text */}
                    <Button
                      variant="light"
                      style={{ border: "1px solid black" }}
                      onClick={() => deleteNotification(notification.id)}
                    >
                      {t("notifications.delete")}
                    </Button>{" "}
                    {/* Translate button text */}
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Notifications;
