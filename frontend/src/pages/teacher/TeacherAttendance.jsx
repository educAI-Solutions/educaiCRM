import React, { useState } from "react";

function TeacherAttendance() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    // Aquí puedes manejar la subida del archivo
    console.log(selectedFile);
  };

  return (
    <div className="d-flex flex-column align-items-center mt-5 justify-content-center">
      <h2 className="mb-4">Teacher Upload Page</h2>
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
