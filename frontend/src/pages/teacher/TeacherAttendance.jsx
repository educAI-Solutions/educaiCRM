import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../App";

function TeacherAttendance() {
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
      const response = await axios.post(
        "http://localhost:7070/storage/upload/attendance",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const handleDownload = async () => {
    if (!selectedClass) {
      alert("Please select a class");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5050/api/attendance/generate/${selectedClass}`
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "attendance.xlsx");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center mt-5 justify-content-center">
      <h2 className="mb-4">Teacher Attendance Page</h2>
      <select onChange={handleCourseChange}>
        <option value="">Select a course</option>
        {courses.map((course) => (
          <option key={course._id} value={course._id}>
            {course.name}
          </option>
        ))}
      </select>
      <select onChange={(e) => setSelectedClass(e.target.value)}>
        <option value="">Select a class</option>
        {classes.map((cls) => (
          <option key={cls._id} value={cls._id}>
            {cls.name}
          </option>
        ))}
      </select>
      <button onClick={handleDownload} className="btn btn-primary mt-3">
        Download Attendance Excel
      </button>
      <div className="container">
        <div className="input-group mb-3">
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
          />
          <button onClick={handleUpload} className="btn btn-primary mt-3">
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeacherAttendance;
