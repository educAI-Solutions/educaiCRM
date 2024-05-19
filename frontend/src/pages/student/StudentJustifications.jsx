import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
import { useTranslation } from "react-i18next"; // Importar useTranslation de react-i18next
import { UserContext } from "../../App";

function StudentJustifications() {
  const { id } = useContext(UserContext);
  const { t } = useTranslation(); // Usar la función de traducción
  const [classes, setClasses] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [formData, setFormData] = useState({
    student: id,
    classes: [],
    fullname: "",
    rut: "",
    reason: "",
    startDate: "",
    endDate: "",
    file: null,
    fileExtension: "",
    justificationID: "",
  });

  const fetchClasses = async () => {
    try {
      // Send a GET request to the API
      const response = await axios.get(
        `http://localhost:5050/api/classes/get/student/${id}`
      );

      if (response.status === 200) {
        setClasses(response.data.data);
      } else {
        console.error("Error fetching classes:", response);
      }
    } catch (error) {
      console.error("Error sending request to the API:", error);
    }
  };

  useEffect(() => {
    fetchClasses();
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 5 * 1024 * 1024; // 2MB

    if (file.size > maxSize) {
      alert("File is too large, please upload a file smaller than 5MB.");
      e.target.value = ""; // Clear the input
    } else {
      setFormData({
        ...formData,
        file: file,
        fileExtension: file.name.split(".").pop(),
      });
    }
  };

  const handleClassesChange = (selectedOptions) => {
    // save only an array of the selected classes' IDs
    setSelectedClasses(selectedOptions);
    setFormData({
      ...formData,
      classes: selectedOptions.map((cls) => cls.value),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form data:", formData);
    try {
      // Send a POST request to create a new justification and make it wait for the response
      const response = await axios.post(
        "http://localhost:5050/api/justifications/create",
        formData
      );

      if (response.status === 201) {
        // store the justification id from the response
        const justificationId = response.data.data._id;

        // Append to formData the justificationID withour mutating the state
        const newFormData = {
          ...formData,
          justificationID: justificationId,
        };

        try {
          // Send a POST request to the storage API
          const storageResponse = await axios.post(
            "http://localhost:7070/storage/upload/justifications",
            newFormData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (storageResponse.status === 200) {
            console.log("Data stored:", storageResponse.data);
          } else {
            console.error("Error storing data:", storageResponse);
          }

          // Send Notification to the Student that the justification was created and uploaded successfully
          const notification = {
            recipient: id,
            content: `Justificación creada y subida con éxito. ID: ${justificationId}`,
            type: "success",
            subject: "Justificación",
          };

          try {
            // Send a POST request to create a new notification
            const notificationResponse = await axios.post(
              "http://localhost:5050/api/notifications",
              notification
            );

            if (notificationResponse.status === 201) {
              console.log("Notification created:", notificationResponse.data);
            } else {
              console.error(
                "Error creating notification:",
                notificationResponse
              );
            }
          } catch (notificationError) {
            console.error(
              "Error sending request to the notifications API:",
              notificationError
            );
          }
        } catch (storageError) {
          console.error(
            "Error sending request to the storage API:",
            storageError
          );
        }
      } else {
        console.error("Error creating justification:", response);
      }
    } catch (error) {
      console.error("Error sending request to the API:", error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={10} md={8} lg={6}>
          <div className="p-4 shadow-lg rounded bg-light">
            <h2 className="text-center mb-4">
              {t(
                "studentDashboard.justificationManagement.studentJustification"
              )}
            </h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formFullName">
                <Form.Label>
                  {t("studentDashboard.justificationManagement.fullName")}
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t(
                    "studentDashboard.justificationManagement.enterFullName"
                  )}
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formRut">
                <Form.Label>
                  {t("studentDashboard.justificationManagement.rut")}
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t(
                    "studentDashboard.justificationManagement.enterRut"
                  )}
                  name="rut"
                  value={formData.rut}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formReason">
                <Form.Label>
                  {t("studentDashboard.justificationManagement.reason")}
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder={t(
                    "studentDashboard.justificationManagement.enterReason"
                  )}
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formClasses">
                <Form.Label>
                  {t("studentDashboard.justificationManagement.selectClasses")}
                </Form.Label>
                <Select
                  isMulti
                  value={selectedClasses}
                  onChange={handleClassesChange}
                  options={classes.map((cls) => ({
                    value: cls._id,
                    label: cls.name,
                  }))}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formStartDate">
                <Form.Label>
                  {t("studentDashboard.justificationManagement.startDate")}
                </Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formEndDate">
                <Form.Label>
                  {t("studentDashboard.justificationManagement.endDate")}
                </Form.Label>
                <Form.Control
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formJustificationFile">
                <Form.Label>
                  {t(
                    "studentDashboard.justificationManagement.justificationDocument"
                  )}
                </Form.Label>
                <Form.Control
                  type="file"
                  name="justificationFile"
                  onChange={handleFileChange}
                />
              </Form.Group>
              <div className="text-center">
                <br />
                <Button variant="primary" type="submit">
                  {t(
                    "studentDashboard.justificationManagement.submitJustification"
                  )}
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default StudentJustifications;
