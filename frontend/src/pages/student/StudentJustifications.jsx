import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
import { UserContext } from "../../App";

function StudentJustifications() {
  const { id } = useContext(UserContext);
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
  });

  useEffect(() => {
    fetchClasses();
  }, []);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
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

    // add to the formdata the fileExtension if it exists
    if (formData.file) {
      const fileExtension = formData.file.name.split(".").pop();
      setFormData({ ...formData, fileExtension: fileExtension });
    }

    try {
      // Send a POST request to create a new justification
      const response = await axios.post(
        "http://localhost:5050/api/justifications/create",
        formData
      );

      if (response.status === 201) {
        console.log("Justification created:", response.data);
        // store the justification id from the response
        const justificationId = response.data.data._id;
        // append it to the form data
        setFormData({ ...formData, justificationID: justificationId });

        try {
          // Send a POST request to the storage API
          console.log("Uploading file:", formData);
          const storageResponse = await axios.post(
            "http://localhost:7070/storage/upload/justifications",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log("Storage response:", storageResponse);

          if (storageResponse.status === 200) {
            console.log("Data stored:", storageResponse.data);
          } else {
            console.error("Error storing data:", storageResponse);
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
            <h2 className="text-center mb-4">Student Justification</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formFullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your full name"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formRut">
                <Form.Label>RUT</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your RUT"
                  name="rut"
                  value={formData.rut}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formReason">
                <Form.Label>Reason</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter your reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formClasses">
                <Form.Label>Select Classes</Form.Label>
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
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formEndDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formJustificationFile">
                <Form.Label>Justification Document</Form.Label>
                <Form.Control
                  type="file"
                  name="justificationFile"
                  onChange={handleFileChange}
                />
              </Form.Group>
              <div className="text-center">
                <br />
                <Button variant="primary" type="submit">
                  Submit Justification
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
