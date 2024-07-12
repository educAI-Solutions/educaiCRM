import React, { useState, useEffect } from "react";
import { Form, Button, Card, Alert, ListGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import axios from "axios";

function AdminConfiguration() {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_ADDRESS_CHROMA}/documents`
      );
      setDocuments(response.data.documents);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setUploadMessage(t("adminDashboard.adminConfiguration.selectFileMessage"));
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    let uploadUrl = `${process.env.REACT_APP_BACKEND_ADDRESS_CHROMA}/upload`;
    if (selectedFile.type === "application/pdf") {
      uploadUrl += "/pdf";
    } else if (
      selectedFile.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      uploadUrl += "/docx";
    } else {
      setUploadMessage(t("adminDashboard.adminConfiguration.unsupportedFormatMessage"));
      return;
    }

    try {
      const response = await axios.post(uploadUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadMessage(response.data.message);
      fetchDocuments();
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadMessage(t("adminDashboard.adminConfiguration.uploadFailMessage"));
    }
  };

  const handleDeleteAll = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_ADDRESS_CHROMA}/delete`
      );
      setDeleteMessage(response.data.message);
      fetchDocuments();
    } catch (error) {
      console.error("Error deleting all documents:", error);
      setDeleteMessage(t("adminDashboard.adminConfiguration.deleteAllFailMessage"));
    }
  };

  const handleDeleteDocument = async (docId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_ADDRESS_CHROMA}/delete/${docId}`
      );
      setDeleteMessage(response.data.message);
      fetchDocuments();
    } catch (error) {
      console.error("Error deleting document:", error);
      setDeleteMessage(t("adminDashboard.adminConfiguration.deleteFailMessage"));
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center pt-4"
      style={{ height: "70vh" }}
    >
      <Card style={{ width: "60rem" }} className="shadow">
        <Card.Body>
          <h2>{t("adminDashboard.adminConfiguration.title")}</h2>
          <Form onSubmit={handleUpload}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>{t("adminDashboard.adminConfiguration.uploadLabel")}</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              {t("adminDashboard.adminConfiguration.uploadButton")}
            </Button>
          </Form>

          {uploadMessage && <Alert className="mt-3">{uploadMessage}</Alert>}

          {deleteMessage && <Alert className="mt-3">{deleteMessage}</Alert>}

          <ListGroup className="mt-3">
            {documents.map((doc) => (
              <ListGroup.Item key={doc._id}>
                {doc.filename}
                <Button
                  variant="danger"
                  size="sm"
                  className="float-end"
                  onClick={() => handleDeleteDocument(doc._id)}
                >
                  {t("adminDashboard.adminConfiguration.deleteButton")}
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <Button variant="danger" className="mt-3" onClick={handleDeleteAll}>
            {t("adminDashboard.adminConfiguration.deleteAllButton")}
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AdminConfiguration;
