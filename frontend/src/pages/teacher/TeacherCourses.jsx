import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { UserContext } from "../../App";
import QRCode from "qrcode.react";

function TeacherClasses() {
  const { t } = useTranslation();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [classes, setClasses] = useState([]);
  const { id } = useContext(UserContext);

  useEffect(() => {
    fetchCourses();
  }, [id]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_ADDRESS_MONGO}/api/courses/get/instructor/${id}`
      );
      setCourses(
        response.data.data.map((course) => ({
          value: course._id,
          label: course.name,
        }))
      );
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleCourseChange = async (selectedOption) => {
    setSelectedCourse(selectedOption);
    if (selectedOption) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_ADDRESS_MONGO}/api/courses/get/${selectedOption.value}`
        );
        setClasses(
          response.data.data.classes.map((cls) => ({
            ...cls,
            qrGenerated: false, // Add a flag to track if QR code has been generated
          }))
        );
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    } else {
      setClasses([]);
    }
  };

  const handleDownload = async (classId) => {
    let surveyId = null;
    // Look up the survey id for the class
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_ADDRESS_MONGO}/api/survey/get/${classId}`
      );
      console.log("Survey response:", response.data);
      surveyId = response.data._id;
    } catch (error) {
      console.error("Error fetching survey id:", error);
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_ADDRESS_STORAGE}/storage/download/qr-code/${surveyId}`,
        { responseType: "blob" }
      );

      // Create a temporary download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `attendance_${classId}.png`); // Example filename
      document.body.appendChild(link);
      link.click();
      link.remove(); // Remove the link element
    } catch (error) {
      console.error("Error downloading justification:", error);
      // Display an error message to the user (e.g., an alert)
    }
  };

  const editTimes = (classId) => {
    console.log("Edit times for class:", classId);
  };

  const editAttendance = (classId) => {
    console.log("Edit attendance for class:", classId);
  };

  const deleteClass = (classId) => {
    console.log("Delete class:", classId);
  };

  return (
    <div>
      <h2>{t("teacherDashboard.classManagement.teacherClassesPage")}</h2>
      <Select
        value={selectedCourse}
        onChange={handleCourseChange}
        options={courses}
        isClearable
        placeholder={t("teacherDashboard.classManagement.selectCourse")}
      />
      {selectedCourse && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>{t("teacherDashboard.classManagement.className")}</th>
              <th>{t("teacherDashboard.classManagement.location")}</th>
              <th>{t("teacherDashboard.classManagement.date")}</th>
              <th>{t("teacherDashboard.classManagement.time")}</th>
              <th>{t("teacherDashboard.classManagement.actions")}</th>
              <th>{t("teacherDashboard.classManagement.generatorqr")}</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls) => (
              <tr key={cls._id}>
                <td>{cls.name}</td>
                <td>{cls.location}</td>
                <td>{new Date(cls.date).toDateString()}</td>
                <td>{cls.startTime}</td>
                <td>
                  <Button variant="primary" onClick={() => editTimes(cls._id)}>
                    {t("teacherDashboard.classManagement.editTimes")}
                  </Button>{" "}
                  <Button
                    variant="secondary"
                    onClick={() => editAttendance(cls._id)}
                  >
                    {t("teacherDashboard.classManagement.editAttendance")}
                  </Button>{" "}
                  <Button variant="danger" onClick={() => deleteClass(cls._id)}>
                    {t("teacherDashboard.classManagement.deleteClass")}
                  </Button>
                </td>
                <td style={{ textAlign: "center" }}>
                  {cls.qrGenerated ? (
                    <Button variant="secondary" disabled>
                      {t("teacherDashboard.classManagement.QRGenerated")}
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={() => handleDownload(cls._id)}
                    >
                      {t("teacherDashboard.classManagement.generateQR")}
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default TeacherClasses;
