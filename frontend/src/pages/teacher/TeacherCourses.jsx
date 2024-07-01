import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next"; // Import useTranslation
import { UserContext } from "../../App";

function TeacherCourses() {
  const { t } = useTranslation(); // Initialize useTranslation
  const [courses, setCourses] = useState([]);
  const { id } = useContext(UserContext);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `https://www.educaiapis.online/mongo_api/api/courses/get/instructor/${id}`
      );
      setCourses(response.data.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const editParticipants = (courseId) => {
    console.log("Edit participants for course:", courseId);
  };

  const editClasses = (courseId) => {
    console.log("Edit classes for course:", courseId);
  };

  const leaveCourse = (courseId) => {
    console.log("Leave course:", courseId);
  };

  return (
    <div>
      <h2>{t("teacherDashboard.courseManagement.teacherCoursesPage")}</h2>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>{t("teacherDashboard.courseManagement.courseName")}</th>
            <th>{t("teacherDashboard.courseManagement.participants")}</th>
            <th>{t("teacherDashboard.courseManagement.classes")}</th>
            <th>{t("teacherDashboard.courseManagement.actions")}</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course._id}>
              <td>{course.name}</td>
              <td>{course.participants.length}</td>
              <td>{course.classes.length}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => editParticipants(course._id)}
                >
                  {t("teacherDashboard.courseManagement.editParticipants")}
                </Button>{" "}
                <Button
                  variant="secondary"
                  onClick={() => editClasses(course._id)}
                >
                  {t("teacherDashboard.courseManagement.editClasses")}
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => leaveCourse(course._id)}
                >
                  {t("teacherDashboard.courseManagement.leaveCourse")}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TeacherCourses;
