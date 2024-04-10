import React, { useState } from "react";
import axios from "axios";

function TeacherAttendance() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
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

  return (
    <div className="d-flex flex-column align-items-center mt-5 justify-content-center">
      <h2 className="mb-4">Teacher Attendance Page</h2>
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
