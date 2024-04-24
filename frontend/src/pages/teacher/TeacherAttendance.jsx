import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next"; // Importamos useTranslation
import { UserContext } from "../../App";

function TeacherAttendance() {
  const { t } = useTranslation(); // Inicializamos useTranslation
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [classes, setClasses] = useState([]);
  const [courses, setCourses] = useState([]);
  const { id } = useContext(UserContext);

  useEffect(() => {
    fetchCoursesInstructor();
  }, []);

  const fetchCoursesInstructor = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5050/api/courses/get/instructor/${id}`
      );
      setCourses(response.data.data);
    } catch (error) {
      console.error("Fetch courses error:", error);
      setCourses([]);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCourseChange = async (e) => {
    try {
      const response = await axios.get(
        `http://localhost:5050/api/courses/get/${e.target.value}`
      );
      setClasses(response.data.data.classes);
    } catch (error) {
      console.error("Error fetching classes:", error);
      setClasses([]);
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // First, send the file to the endpoint that parses the Excel data
      const parseResponse = await axios.post(
        `http://localhost:5050/api/attendance/upload/${selectedClass}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // If the parsing is successful, upload the file
      if (parseResponse.data.success) {
        formData.append("classId", selectedClass);
        const uploadResponse = await axios.post(
          "http://localhost:7070/storage/upload/attendance",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(uploadResponse.data);
      } else {
        console.error("Parse error:", parseResponse.data.error);
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const handleDownload = async () => {
    if (!selectedClass) {
      alert(t("teacher.Dashboard.selectClass")); // Usamos la función t() para traducir el texto
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5050/api/attendance/generate/${selectedClass}`,
        { responseType: "arraybuffer" }
      );
      const blob = new Blob([response.data], {
        type: "application/vnd.excel",
      });
      const filename = "attendance.xlsx";
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center mt-5 justify-content-center">
      <h2 className="mb-4">
        {t("teacherDashboard.attendanceManagement.title")}
      </h2>{" "}
      {/* Traducimos el título */}
      <select onChange={handleCourseChange}>
        <option value="">
          {t("teacherDashboard.attendanceManagement.selectCourse")}
        </option>{" "}
        {/* Traducimos las opciones del select */}
        {courses.map((course) => (
          <option key={course._id} value={course._id}>
            {course.name}
          </option>
        ))}
      </select>
      <select onChange={(e) => setSelectedClass(e.target.value)}>
        <option value="">
          {t("teacherDashboard.attendanceManagement.selectClass")}
        </option>{" "}
        {/* Traducimos las opciones del select */}
        {classes.map((cls) => (
          <option key={cls._id} value={cls._id}>
            {cls.name}
          </option>
        ))}
      </select>
      <button onClick={handleDownload} className="btn btn-primary mt-3">
        {t("teacherDashboard.attendanceManagement.downloadExcel")}{" "}
        {/* Traducimos el texto del botón */}
      </button>
      <div className="container">
        <div className="input-group mb-3">
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
          />
          <button onClick={handleUpload} className="btn btn-primary mt-3">
            {t("teacherDashboard.attendanceManagement.upload")}{" "}
            {/* Traducimos el texto del botón */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeacherAttendance;
