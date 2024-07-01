import React, { useState, useEffect } from "react";
import {
  Table,
  Form,
  Button,
  Card,
  Container,
  Row,
  Pagination,
} from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
import { useTranslation } from "react-i18next";

function AdminClasses() {
  const [classes, setClasses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [classForm, setClassForm] = useState({
    name: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    course: "",
    instructors: [],
    participants: [],
  });
  const { t } = useTranslation();

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const classesPerPage = 2;
  const indexOfLastClass = currentPage * classesPerPage;
  const indexOfFirstClass = indexOfLastClass - classesPerPage;
  const currentClasses = classes.slice(indexOfFirstClass, indexOfLastClass);

  useEffect(() => {
    fetchClasses();
    fetchCourses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_ADDRESS_MONGO}/api/classes/get-all`
      );
      if (!Array.isArray(response.data.data)) {
        console.error("Error: received non-array response data");
        setClasses([]);
        return;
      }
      setClasses(response.data.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_ADDRESS_MONGO}/api/courses/get-all`
      );
      if (Array.isArray(response.data.data)) {
        setCourses(response.data.data);
      } else {
        console.error("Error: received non-array response data");
        setCourses([]);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]);
    }
  };

  const handleFormChange = (event) => {
    setClassForm({ ...classForm, [event.target.name]: event.target.value });
  };

  const handleCourseChange = (selectedCourse) => {
    setClassForm({
      ...classForm,
      course: selectedCourse.value,
    });
  };

  const handleCreateClass = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_ADDRESS_MONGO}/api/classes/create`,
        classForm
      );
      fetchClasses();

      // Get the course object from the courses array
      const course = courses.find((course) => course._id === classForm.course);
      // create new notification to send to all students in the course for each student
      for (const participant of course.participants) {
        const notification = {
          recipient: participant,
          subject: `New class: ${classForm.name}`,
          type: "info",
          content: `A new class
          ${classForm.name} has been created for the course ${course.name}.`,
        };
        const notificationResponse = await axios.post(
          `${process.env.REACT_APP_BACKEND_ADDRESS_MONGO}/api/notifications`,
          notification
        );
        try {
          const notificationId = notificationResponse.data.data._id;
          await axios.post(
            `${process.env.REACT_APP_BACKEND_ADDRESS_NOTIFICATIONS}/notifications`,
            {
              id: notificationId,
            }
          );
        } catch (error) {
          console.error("Error sending notification to student:", error);
        }
      }
    } catch (error) {
      console.error("Error creating class:", error);
    }
  };

  const handleEditClass = async (classId) => {
    console.log("Updating class for id:", classId);
  };

  const handleDeleteClass = async (classId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_ADDRESS_MONGO}/api/classes/delete/${classId}`
      );
      fetchClasses();
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  return (
    <Container>
      <Row className="mb-3 text-center">
        <h1>{t("adminDashboard.classManagement.title")}</h1>
      </Row>
      <Card className="shadow mb-3">
        <Card.Body>
          <h2>{t("adminDashboard.classManagement.classList.title")}</h2>
          <Table responsive>
            <thead>
              <tr>
                <th>{t("adminDashboard.classManagement.classList.name")}</th>
                <th>{t("adminDashboard.classManagement.classList.course")}</th>
                <th>{t("adminDashboard.classManagement.classList.date")}</th>
                <th>
                  {t("adminDashboard.classManagement.classList.startTime")}
                </th>
                <th>
                  {t("adminDashboard.classManagement.classList.location")}
                </th>
                <th>{t("adminDashboard.classManagement.classList.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {currentClasses.map((classItem) => (
                <tr key={classItem._id}>
                  <td>{classItem.name}</td>
                  <td>{classItem.course.code}</td>
                  <td>{classItem.date}</td>
                  <td>{classItem.startTime}</td>
                  <td>{classItem.location}</td>
                  <td>
                    <Button onClick={() => handleEditClass(classItem._id)}>
                      {t("adminDashboard.classManagement.classList.edit")}
                    </Button>
                    <Button onClick={() => handleDeleteClass(classItem._id)}>
                      {t("adminDashboard.classManagement.classList.delete")}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            <Pagination>
              {[
                ...Array(Math.ceil(classes.length / classesPerPage)).keys(),
              ].map((number) => (
                <Pagination.Item
                  key={number}
                  active={number + 1 === currentPage}
                  onClick={() => setCurrentPage(number + 1)}
                >
                  {number + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </Table>
        </Card.Body>
      </Card>
      <Card className="mb-4 shadow">
        <Card.Body>
          <h2>{t("adminDashboard.classManagement.createForm.title")}</h2>
          <Form onSubmit={handleCreateClass}>
            <Form.Group controlId="name">
              <Form.Label>
                {t("adminDashboard.classManagement.createForm.name")}
              </Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={classForm.name}
                onChange={handleFormChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="course">
              <Form.Label>
                {t("adminDashboard.classManagement.createForm.course")}
              </Form.Label>
              <Select
                name="course"
                options={courses.map((course) => ({
                  value: course._id,
                  label: course.name,
                }))}
                className="basic-single-select"
                classNamePrefix="select"
                placeholder={t(
                  "adminDashboard.classManagement.createForm.selectCourse"
                )}
                onChange={handleCourseChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="date">
              <Form.Label>
                {t("adminDashboard.classManagement.createForm.date")}
              </Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={classForm.date}
                onChange={handleFormChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="startTime">
              <Form.Label>
                {t("adminDashboard.classManagement.createForm.startTime")}
              </Form.Label>
              <Form.Control
                type="time"
                name="startTime"
                value={classForm.startTime}
                onChange={handleFormChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="endTime">
              <Form.Label>
                {t("adminDashboard.classManagement.createForm.endTime")}
              </Form.Label>
              <Form.Control
                type="time"
                name="endTime"
                value={classForm.endTime}
                onChange={handleFormChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="location">
              <Form.Label>
                {t("adminDashboard.classManagement.createForm.location")}
              </Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={classForm.location}
                onChange={handleFormChange}
                required
              />
            </Form.Group>

            <Button type="submit">
              {t("adminDashboard.classManagement.createForm.submit")}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AdminClasses;
