import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const [justifications, setJustifications] = useState([]);
  const [selectedJustification, setSelectedJustification] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchJustifications();
  }, []);

  const fetchJustifications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5050/api/justifications/get-all"
      );
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
    justification.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Row className="mb-3 text-center">
        <h1>{t("adminDashboard.justificationsManagement.title")}</h1>
      </Row>
      <InputGroup className="mb-3">
        <FormControl
          placeholder={t(
            "adminDashboard.justificationsManagement.searchPlaceholder"
          )}
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
                <th>
                  {t("adminDashboard.justificationsManagement.tableTitle")}
                </th>
                <th>
                  {t("adminDashboard.justificationsManagement.tableStatus")}
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
                  <td>{justification.state}</td>
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
