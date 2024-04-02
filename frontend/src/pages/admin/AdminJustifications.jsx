import React, { useState, useEffect } from "react";
import {
  Table,
  Row,
  Button,
  Card,
  InputGroup,
  FormControl,
  Container,
} from "react-bootstrap";
import axios from "axios";

function AdminJustifications() {
  const [justifications, setJustifications] = useState([]);
  const [selectedJustification, setSelectedJustification] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchJustifications();
  }, []);

  const fetchJustifications = async () => {
    try {
      const response = await axios.get("/api/justifications");
      setJustifications(response.data.data);
    } catch (error) {
      console.error("Error fetching justifications:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = async (justificationId, newStatus) => {
    try {
      await axios.put(`/api/justifications/${justificationId}`, {
        status: newStatus,
      });
      fetchJustifications();
    } catch (error) {
      console.error("Error updating justification status:", error);
    }
  };

  const filteredJustifications = justifications.filter((justification) =>
    justification.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Row className="mb-3 text-center">
        <h1>Justification Management</h1>
      </Row>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search for a justification by its Title or ID"
          aria-label="Search"
          aria-describedby="basic-addon2"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </InputGroup>

      <Card className="shadow">
        <Card.Body>
          <Table responsive>
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJustifications.map((justification) => (
                <tr key={justification._id}>
                  <td>{justification.title}</td>
                  <td>{justification.status}</td>
                  <td>
                    <Button
                      onClick={() =>
                        handleStatusChange(justification._id, "approved")
                      }
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() =>
                        handleStatusChange(justification._id, "rejected")
                      }
                    >
                      Reject
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
