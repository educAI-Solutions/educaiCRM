import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { UserContext } from "../../App";

function TeacherAttendance() {
  const { t } = useTranslation();
  const { id } = useContext(UserContext);

  // State variables with clearer names
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [courses, setCourses] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // For loading states
  const [statusMessage, setStatusMessage] = useState(null); // For feedback messages

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_ADDRESS_MONGO}/api/courses/get/instructor/${id}`
        );
        setCourses(response.data.data);
      } catch (error) {
        console.error("Fetch courses error:", error);
        setStatusMessage(
          t("teacherDashboard.attendanceManagement.fetchCoursesError")
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []); // Empty dep

  const handleCourseChange = async (e) => {
    setSelectedClassId(null); // Reset class selection when the course changes
    setIsLoading(true);
    try {
      const courseId = e.target.value;
      setSelectedCourseId(courseId);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_ADDRESS_MONGO}/api/courses/get/${courseId}`
      );
      setClasses(response.data.data.classes);
    } catch (error) {
      console.error("Error fetching classes:", error);
      setStatusMessage(
        t("teacherDashboard.attendanceManagement.fetchClassesError")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedClassId || !selectedFile) {
      setStatusMessage(
        t("teacherDashboard.attendanceManagement.selectClassAndFile")
      );
      return;
    }

    setIsLoading(true);
    setStatusMessage(null); // Clear any previous messages

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // Send the file for parsing first
      const parseResponse = await axios.post(
        `${process.env.REACT_APP_BACKEND_ADDRESS_MONGO}/api/attendance/upload/${selectedClassId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (parseResponse.data.success) {
        formData.append("classId", selectedClassId);
        const uploadResponse = await axios.post(
          `${process.env.REACT_APP_BACKEND_ADDRESS_STORAGE}/storage/upload/attendance`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log(uploadResponse.data);
        setStatusMessage(
          t("teacherDashboard.attendanceManagement.uploadSuccess")
        );
      } else {
        setStatusMessage(parseResponse.data.error);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setStatusMessage(t("teacherDashboard.attendanceManagement.uploadError"));
    } finally {
      setIsLoading(false);
    }
  };
  const handleDownload = async () => {
    if (!selectedClassId) {
      alert(t("teacher.Dashboard.selectClass"));
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_ADDRESS_MONGO}/api/attendance/generate/${selectedClassId}`,
        { responseType: "arraybuffer" }
      );

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Correct MIME type
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
      setStatusMessage(
        t("teacherDashboard.attendanceManagement.downloadError")
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      {" "}
      {/* Added container for basic styling */}
      <h2 className="mb-4 text-center">
        {t("teacherDashboard.attendanceManagement.title")}
      </h2>
      <div className="row mb-3">
        <div className="col">
          <select onChange={handleCourseChange} className="form-select">
            {" "}
            {/* form-select for styling */}
            <option value="">
              {t("teacherDashboard.attendanceManagement.selectCourse")}
            </option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col">
          <select
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="form-select"
          >
            <option value="">
              {t("teacherDashboard.attendanceManagement.selectClass")}
            </option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        onClick={handleDownload}
        className="btn btn-primary"
        disabled={isLoading}
      >
        {isLoading
          ? t("teacherDashboard.attendanceManagement.loading")
          : t("teacherDashboard.attendanceManagement.downloadExcel")}
      </button>
      <div className="input-group mt-3">
        <input
          type="file"
          className="form-control"
          onChange={handleFileChange}
        />
        <button
          onClick={handleUpload}
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading
            ? t("teacherDashboard.attendanceManagement.loading")
            : t("teacherDashboard.attendanceManagement.upload")}
        </button>
      </div>
      {statusMessage && (
        <div className="alert alert-info mt-3">
          {" "}
          {/* Or alert-danger for errors */}
          {statusMessage}
        </div>
      )}
    </div>
  );
}

export default TeacherAttendance;
