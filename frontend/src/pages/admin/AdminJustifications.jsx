import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Table, Row, Button, Card, Container } from "react-bootstrap";
import axios from "axios";

function AdminJustifications() {
  const { t } = useTranslation();
  const [justifications, setJustifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchJustifications();
  }, []);

  const fetchJustifications = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_ADDRESS_MONGO}/api/justifications/get-all`
      );
      setJustifications(response.data.data);
    } catch (error) {
      console.error("Error fetching justifications:", error);
    }
  };

  const handleStatusChange = async (justificationId, newState) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_ADDRESS_MONGO}/api/justifications/update/review/${justificationId}`,
        {
          state: newState,
        }
      );
      fetchJustifications();
      // Get the Student's email address from the justification object
      const justification = justifications.find(
        (justification) => justification._id === justificationId
      );
      // save student id
      const studentId = justification.student._id;

      // Create a notification object
      const notification = {
        recipient: studentId,
        subject: `Justification ${newState}`,
        type: "warning",
        content: `Your justification with id ${justificationId} has been ${newState}.`,
      };

      try {
        // Send a POST request to create a new notification
        const notificationResponse = await axios.post(
          `${process.env.REACT_APP_BACKEND_ADDRESS_MONGO}/api/notifications`,
          notification
        );

        if (notificationResponse.status === 201) {
          console.log("Notification created:", notificationResponse.data);
          try {
            // Get the id of the notification created
            const notificationId = notificationResponse.data.data._id;
            const notificationSentResponse = await axios.post(
              `${process.env.REACT_APP_BACKEND_ADDRESS_NOTIFICATIONS}/notifications`,
              {
                id: notificationId,
              }
            );

            if (notificationSentResponse.status === 200) {
              console.log("Notification sent:", notificationSentResponse.data);
            } else {
              console.error(
                "Error creating notification:",
                notificationSentResponse
              );
            }
          } catch (notificationError) {
            console.error(
              "Error sending request to the notifications API:",
              notificationError
            );
          }
        } else {
          console.error("Error creating notification:", notificationResponse);
        }
      } catch (notificationError) {
        console.error(
          "Error sending request to the notifications API:",
          notificationError
        );
      }

      // Send a notification to the Student about the status change
    } catch (error) {
      console.error("Error updating justification status:", error);
    }
  };

  const handleDownload = async (justificationId, fileExtension) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_ADDRESS_STORAGE}/storage/download/justifications/${justificationId}/${fileExtension}`,
        { responseType: "blob" }
      );

      // Create a temporary download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `justification_${justificationId}.${fileExtension}`
      ); // Example filename
      document.body.appendChild(link);
      link.click();
      link.remove(); // Remove the link element
    } catch (error) {
      console.error("Error downloading justification:", error);
      // Display an error message to the user (e.g., an alert)
    }
  };

  const filteredJustifications = justifications.filter((justification) =>
    justification.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Row className="mb-3 text-center">
        <h1>{t("adminDashboard.justificationsManagement.title")}</h1>
      </Row>

      <Card className="shadow">
        <Card.Body>
          <Table responsive>
            <thead>
              <tr>
                <th>
                  {t("adminDashboard.justificationsManagement.tableName")}
                </th>
                <th>
                  {t("adminDashboard.justificationsManagement.tableUsername")}
                </th>
                <th>
                  {t("adminDashboard.justificationsManagement.tableStatus")}
                </th>
                <th>
                  {t("adminDashboard.justificationsManagement.tableDownload")}
                </th>
                <th>
                  {t("adminDashboard.justificationsManagement.tableActions")}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredJustifications.map((justification) => (
                <tr key={justification._id}>
                  <td>{justification.fullname}</td>
                  <td>{justification.student.username}</td>
                  <td>{justification.state}</td>
                  <td>
                    <Button
                      onClick={() =>
                        handleDownload(
                          justification._id,
                          justification.fileExtension
                        )
                      }
                    >
                      {t(
                        "adminDashboard.justificationsManagement.buttonDownload"
                      )}
                    </Button>
                  </td>
                  <td>
                    <Button
                      onClick={() =>
                        handleStatusChange(justification._id, "approved")
                      }
                    >
                      {t(
                        "adminDashboard.justificationsManagement.buttonApprove"
                      )}
                    </Button>
                    <Button
                      onClick={() =>
                        handleStatusChange(justification._id, "rejected")
                      }
                    >
                      {t(
                        "adminDashboard.justificationsManagement.buttonReject"
                      )}
                    </Button>
                    <Button
                      onClick={() =>
                        handleStatusChange(justification._id, "questioned")
                      }
                    >
                      {t(
                        "adminDashboard.justificationsManagement.buttonQuestion"
                      )}
                    </Button>
                    <Button
                      onClick={() =>
                        handleStatusChange(justification._id, "pending")
                      }
                    >
                      {t(
                        "adminDashboard.justificationsManagement.buttonPending"
                      )}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AdminJustifications;
