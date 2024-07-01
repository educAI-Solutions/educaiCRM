import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Pagination,
  Card,
  Modal,
  ListGroup,
  InputGroup,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Select from "react-select";

const AdminPrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [newProgram, setNewProgram] = useState({});
  const [courses, setCourses] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showEditParticipantModal, setShowEditParticipantModal] =
    useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const { t } = useTranslation();

  const handleOpenEditParticipantModal = (program) => {
    setSelectedProgram(program);
    setShowEditParticipantModal(true);
  };
  const handleCloseEditParticipantModal = () => {
    setShowEditParticipantModal(false);
    setSelectedProgram(null);
  };

  const handleParticipantRemove = (participantId) => {
    setSelectedProgram({
      ...selectedProgram,
      participants: selectedProgram.participants.filter(
        (p) => p._id !== participantId
      ),
    });
  };

  const handleParticipantAdd = (participant) => {
    if (!selectedProgram.participants.some((p) => p._id === participant._id)) {
      setSelectedProgram({
        ...selectedProgram,
        participants: [...selectedProgram.participants, participant],
      });
    }
  };

  const handleSearch = async (event) => {
    const query = event.target.value;
    if (query) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_ADDRESS_MONGO}/api/user/get/${query}`
        );
        // Check that the student is not already in the program
        if (
          selectedProgram.participants.some(
            (p) => p._id === response.data.data._id
          )
        ) {
          setSearchResults([]);
          return;
        }

        setSearchResults(response.data.data);
      } catch (error) {
        console.error("Error searching students:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

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
        `${process.env.REACT_APP_BACKEND_ADDRESS_MONGO}/api/programs/get-all`
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
        `${process.env.REACT_APP_BACKEND_ADDRESS_MONGO}/api/courses/get-all`
      );
      if (Array.isArray(response.data.data)) {
        const coursesWithoutProgram = response.data.data.filter(
          (course) => !course.program
        );
        setCourses(coursesWithoutProgram);
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
        `${process.env.REACT_APP_BACKEND_ADDRESS_MONGO}/api/user/get-students`
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
        `${process.env.REACT_APP_BACKEND_ADDRESS_MONGO}/api/programs/delete/${programId}`
      );
      fetchPrograms();
    } catch (error) {
      console.error("Error deleting program:", error);
    }
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_ADDRESS_MONGO}/api/programs/create`,
        newProgram
      );
      setNewProgram({});
      fetchPrograms();
    } catch (error) {
      console.error("Error creating program:", error);
    }
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
              <Card className="justify-content-center" key={program._id}>
                <Card.Body>
                  <h5>{program.name}</h5>
                  <p>{program.description}</p>
                  <Button
                    variant="success"
                    onClick={() => handleOpenEditParticipantModal(program)}
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
            <Form onSubmit={handleCreate}>
              <Form.Group controlId="name">
                <Form.Control
                  name="name"
                  value={newProgram.name || ""}
                  onChange={handleNewProgramChange}
                  placeholder={t(
                    "adminDashboard.programManagement.createForm.name"
                  )}
                  required
                />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Control
                  name="description"
                  value={newProgram.description || ""}
                  onChange={handleNewProgramChange}
                  placeholder={t(
                    "adminDashboard.programManagement.createForm.description"
                  )}
                />
              </Form.Group>

              <Form.Group controlId="courses">
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
              </Form.Group>
              <Form.Group controlId="participants">
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
              </Form.Group>
              <Button type="submit" className="mt-3">
                {t("adminDashboard.programManagement.createForm.submit")}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Row>
      <Modal
        show={showEditParticipantModal}
        onHide={handleCloseEditParticipantModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Participants</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProgram && (
            <>
              <h5>Current Participants</h5>
              <ListGroup>
                {selectedProgram.participants.map((participant) => (
                  <ListGroup.Item key={participant._id}>
                    {participant.username}
                    <Button
                      variant="danger"
                      className="float-right"
                      onClick={() => handleParticipantRemove(participant._id)}
                    >
                      Remove
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <h5 className="mt-3">Add Participants</h5>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Search students"
                  onChange={handleSearch}
                />
              </InputGroup>
              <ListGroup>
                <ListGroup.Item key={searchResults._id}>
                  {searchResults.username} ({searchResults.email})
                  <Button
                    variant="success"
                    className="float-right"
                    onClick={() => handleParticipantAdd(searchResults)}
                    disabled={selectedProgram.participants.some(
                      (p) => p._id === searchResults._id
                    )}
                  >
                    Add
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditParticipantModal}>
            Close
          </Button>
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminPrograms;
