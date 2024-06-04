import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { UserContext } from "../../App";
import QRCode from 'qrcode.react';

function TeacherClasses() {
  const { t } = useTranslation();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [classes, setClasses] = useState([]);
  const { id } = useContext(UserContext);
  const [qrCodes, setQrCodes] = useState({});

  useEffect(() => {
    fetchCourses();
  }, [id]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5050/api/courses/get/instructor/${id}`
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
          `http://localhost:5050/api/courses/get/${selectedOption.value}`
        );
        setClasses(response.data.data.classes);
        setQrCodes({});
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    } else {
      setClasses([]);
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

  const toggleQRCode = (classId) => {
    setQrCodes((prevQrCodes) => ({
      ...prevQrCodes,
      [classId]: prevQrCodes[classId] ? null : Math.random().toString(36).substring(7),
    }));
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
              <th>
                {t("teacherDashboard.classManagement.generatorqr")}
              </th>
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
                <td style={{ textAlign: 'center' }}>
                  {qrCodes[cls._id] ? (
                    <>
                      <QRCode value={qrCodes[cls._id]} />
                      <hr />
                      <Button variant="danger" onClick={() => toggleQRCode(cls._id)}>
                        {t("teacherDashboard.classManagement.closeQR")}
                      </Button>
                    </>
                  ) : (
                    <Button variant="primary" onClick={() => toggleQRCode(cls._id)}>
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
