import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Table,
  Form,
  Button,
  Card,
  Row,
  Col,
  Container,
  Pagination,
} from "react-bootstrap";
import Select from "react-select";
import axios from "axios";

function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [courseForm, setCourseForm] = useState({
    name: "",
    code: "",
    section: "",
    program: null,
    instructors: [],
    participants: [],
    startDate: "",
    endDate: "",
  });
  const [programs, setPrograms] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const { t } = useTranslation();

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 2;
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  useEffect(() => {
    fetchCourses();
    fetchPrograms();
    fetchInstructors();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `http://${process.env.REACT_APP_BACKEND_ADDRESS}:5050/api/courses/get-all`
      );
      setCourses(response.data.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchPrograms = async () => {
    try {
      const response = await axios.get(
        `http://${process.env.REACT_APP_BACKEND_ADDRESS}:5050/api/programs/get-all`
      );
      if (Array.isArray(response.data.data)) {
        setPrograms(response.data.data);
      } else {
        console.error("Error: received non-array response data");
        setPrograms([]);
      }
    } catch (error) {
      console.error("Error fetching programs:", error);
      setPrograms([]);
    }
  };

  const fetchInstructors = async () => {
    try {
      const response = await axios.get(
        `http://${process.env.REACT_APP_BACKEND_ADDRESS}:5050/api/user/get-teachers`
      );
      if (Array.isArray(response.data.data)) {
        setInstructors(response.data.data);
      } else {
        console.error("Error: received non-array response data");
        setInstructors([]);
      }
    } catch (error) {
      console.error("Error fetching instructors:", error);
      setInstructors([]);
    }
  };

  const handleFormChange = (event) => {
    setCourseForm({ ...courseForm, [event.target.name]: event.target.value });
  };

  const handleProgramChange = (selectedProgram) => {
    setCourseForm({
      ...courseForm,
      program: selectedProgram.value,
    });
  };

  const handleInstructorsChange = (selectedInstructors) => {
    setCourseForm({
      ...courseForm,
      instructors: selectedInstructors.map((instructor) => instructor.value),
    });
  };

  const handleCreateCourse = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        `http://${process.env.REACT_APP_BACKEND_ADDRESS}:5050/api/courses/create`,
        courseForm
      );
      fetchCourses();
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(
        `http://${process.env.REACT_APP_BACKEND_ADDRESS}:5050/api/courses/delete/${courseId}`
      );
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleEditCourse = async (courseId) => {
    console.log("Edit course with id:", courseId);
  };

  return (
    <Container>
      <div>
        <Row className="mb-3 text-center">
          <h1>{t("adminDashboard.courseManagement.title")}</h1>
        </Row>
        <Row className="justify-content-center mt-3 mb-3">
          <Col md={8}>
            <Card className="shadow">
              <Card.Body>
                <h2>{t("adminDashboard.courseManagement.courseList.title")}</h2>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>
                        {t("adminDashboard.courseManagement.courseList.name")}
                      </th>
                      <th>
                        {t("adminDashboard.courseManagement.courseList.code")}
                      </th>
                      <th>
                        {t(
                          "adminDashboard.courseManagement.courseList.section"
                        )}
                      </th>
                      <th>
                        {t(
                          "adminDashboard.courseManagement.courseList.actions"
                        )}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCourses.map((course) => (
                      <tr key={course._id}>
                        <td>{course.name}</td>
                        <td>{course.code}</td>
                        <td>{course.section}</td>
                        <td>
                          <Button onClick={() => handleEditCourse(course._id)}>
                            {t(
                              "adminDashboard.courseManagement.courseList.edit"
                            )}
                          </Button>
                          <Button
                            onClick={() => handleDeleteCourse(course._id)}
                          >
                            {t(
                              "adminDashboard.courseManagement.courseList.delete"
                            )}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <Pagination>
                    {[
                      ...Array(
                        Math.ceil(courses.length / coursesPerPage)
                      ).keys(),
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
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="shadow">
              <Card.Body>
                <h2>{t("adminDashboard.courseManagement.createForm.title")}</h2>
                <Form onSubmit={handleCreateCourse}>
                  <Form.Group controlId="name">
                    <Form.Label>
                      {t("adminDashboard.courseManagement.createForm.name")}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={courseForm.name}
                      onChange={handleFormChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="code">
                    <Form.Label>
                      {t("adminDashboard.courseManagement.createForm.code")}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="code"
                      value={courseForm.code}
                      onChange={handleFormChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>
                      {t("adminDashboard.courseManagement.createForm.section")}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="section"
                      value={courseForm.section}
                      onChange={handleFormChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>
                      {t("adminDashboard.courseManagement.createForm.program")}
                    </Form.Label>
                    <Select
                      name="programs"
                      // show the options plus the none option
                      options={[
                        {
                          value: null,
                          label: t(
                            "adminDashboard.courseManagement.createForm.noneProgram"
                          ),
                        },
                        ...programs.map((program) => ({
                          value: program._id,
                          label: program.name,
                        })),
                      ]}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      placeholder={t(
                        "adminDashboard.courseManagement.createForm.selectProgram"
                      )} // show the options plus the none option
                      onChange={handleProgramChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>
                      {t(
                        "adminDashboard.courseManagement.createForm.instructors"
                      )}
                    </Form.Label>
                    <Select
                      isMulti
                      name="instructors"
                      options={instructors.map((instructor) => ({
                        value: instructor._id,
                        label: instructor.username,
                      }))}
                      className="basic-single-select"
                      classNamePrefix="select"
                      placeholder={t(
                        "adminDashboard.courseManagement.createForm.selectInstructors"
                      )} // show the options plus the none option
                      onChange={handleInstructorsChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="startDate">
                    <Form.Label>
                      {t(
                        "adminDashboard.courseManagement.createForm.startDate"
                      )}
                    </Form.Label>
                    <Form.Control
                      type="date"
                      name="startDate"
                      value={courseForm.startDate}
                      onChange={handleFormChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="endDate">
                    <Form.Label>
                      {t("adminDashboard.courseManagement.createForm.endDate")}
                    </Form.Label>
                    <Form.Control
                      type="date"
                      name="endDate"
                      value={courseForm.endDate}
                      onChange={handleFormChange}
                      required
                    />
                  </Form.Group>

                  <Button type="submit" className="mt-3">
                    {t("adminDashboard.courseManagement.createForm.submit")}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default AdminCourses;
