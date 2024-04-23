import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Pagination,
  Card,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Select from "react-select";

const AdminPrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [newProgram, setNewProgram] = useState({});
  const [courses, setCourses] = useState([]);
  const [participants, setParticipants] = useState([]);
  const { t } = useTranslation();

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const programsPerPage = 2;
  const indexOfLastProgram = currentPage * programsPerPage;
  const indexOfFirstProgram = indexOfLastProgram - programsPerPage;
  const currentPrograms = programs.slice(
    indexOfFirstProgram,
    indexOfLastProgram
  );

  useEffect(() => {
    fetchPrograms();
    fetchCourses();
    fetchParticipants();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5050/api/programs/get-all"
      );
      if (response.data.success && Array.isArray(response.data.data)) {
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

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5050/api/courses/get-all"
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

  const fetchParticipants = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5050/api/user/get-students"
      );
      if (Array.isArray(response.data.data)) {
        setParticipants(response.data.data);
      } else {
        console.error("Error: received non-array response data");
        setParticipants([]);
      }
    } catch (error) {
      console.error("Error fetching participants:", error);
      setParticipants([]);
    }
  };

  const handleNewProgramChange = (event) => {
    setNewProgram({
      ...newProgram,
      [event.target.name]: event.target.value,
    });
  };

  const handleCourseChange = (selectedCourses) => {
    if (selectedCourses.some((course) => course.value === "none")) {
      setNewProgram({
        ...newProgram,
        courses: [],
      });
    } else {
      setNewProgram({
        ...newProgram,
        courses: selectedCourses.map((course) => course.value),
      });
    }
  };

  const handleParticipantChange = (selectedParticipants) => {
    setNewProgram({
      ...newProgram,
      participants: selectedParticipants.map(
        (participant) => participant.value
      ),
    });
  };

  const handleDelete = async (programId) => {
    try {
      await axios.delete(
        `http://localhost:5050/api/programs/delete/${programId}`
      );
      fetchPrograms();
    } catch (error) {
      console.error("Error deleting program:", error);
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post("http://localhost:5050/api/programs/create", newProgram);
      setNewProgram({});
      fetchPrograms();
    } catch (error) {
      console.error("Error creating program:", error);
    }
  };

  const handleEditCourses = (programId) => {
    console.log("Edit courses for program:", programId);
  };

  const handleEditParticipants = (programId) => {
    console.log("Edit participants for program:", programId);
  };

  return (
    <Container>
      <Row className="mb-3 text-center">
        <Col>
          <h1>{t("adminDashboard.programManagement.title")}</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Card className="shadow">
          <Card.Body>
            {currentPrograms.map((program) => (
              <Card className="justify-content-center">
                <Card.Body>
                  <h5>{program.name}</h5>
                  <p>{program.description}</p>
                  <Button
                    variant="primary"
                    onClick={() => handleEditCourses(program._id)}
                  >
                    {t("adminDashboard.programManagement.editCourses")}
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => handleEditParticipants(program._id)}
                  >
                    {t("adminDashboard.programManagement.editParticipants")}
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(program._id)}
                  >
                    {t("adminDashboard.programManagement.delete")}
                  </Button>
                </Card.Body>
              </Card>
            ))}
            <Pagination>
              {[
                ...Array(Math.ceil(programs.length / programsPerPage)).keys(),
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
          </Card.Body>
        </Card>
      </Row>
      <Row className="my-3">
        <Card>
          <Card.Body>
            <h2>{t("adminDashboard.programManagement.createForm.title")}</h2>
            <Form.Control
              name="name"
              value={newProgram.name || ""}
              onChange={handleNewProgramChange}
              placeholder={t(
                "adminDashboard.programManagement.createForm.name"
              )}
              required
            />
            <Form.Control
              name="description"
              value={newProgram.description || ""}
              onChange={handleNewProgramChange}
              placeholder={t(
                "adminDashboard.programManagement.createForm.description"
              )}
            />
            <Select
              isMulti
              name="courses"
              options={[
                {
                  value: "none",
                  label: t(
                    "adminDashboard.programManagement.createForm.noneCourse"
                  ),
                },
                ...courses.map((course) => ({
                  value: course._id,
                  label: `${course.name} - Section:${course.section}`,
                })),
              ]}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleCourseChange}
              placeholder={t(
                "adminDashboard.programManagement.createForm.enterCourses"
              )}
              required
            />
            <Select
              isMulti
              name="participants"
              options={participants.map((participant) => ({
                value: participant._id,
                label: participant.username,
              }))}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleParticipantChange}
              placeholder={t(
                "adminDashboard.programManagement.createForm.enterParticipants"
              )}
              required
            />
            <Button variant="primary" onClick={handleCreate}>
              {t("adminDashboard.programManagement.createForm.submit")}
            </Button>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default AdminPrograms;
