import React, { useState } from "react";
import Logo1 from "../img/fotoperfil.png";

function Profile() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    password: "******",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="text-center">
              <h2 className="card-header">Profile Page</h2>
              <img
                src={Logo1}
                alt="Logo"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  marginTop: "20px",
                }}
              />
            </div>
            <div className="card-body">
              {isEditing ? (
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name:
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={user.name}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={user.email}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password:
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={user.password}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">
                      Phone Number:
                    </label>
                    <input
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={user.phoneNumber}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="gender" className="form-label">
                      Gender:
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={user.gender}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="dateOfBirth" className="form-label">
                      Date of Birth:
                    </label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={user.dateOfBirth}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="text-center mt-3">
                    <button
                      type="button"
                      onClick={toggleEdit}
                      className="btn btn-primary"
                    >
                      Save
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <p>Name: {user.name}</p>
                  <p>Email: {user.email}</p>
                  <p>Password: {user.password}</p>
                  <p>Phone Number: {user.phoneNumber}</p>
                  <p>Gender: {user.gender}</p>
                  <p>Date of Birth: {user.dateOfBirth}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body text-center">
              <p>
                <div className="text-center mt-3">
                  <button
                    onClick={toggleEdit}
                    className="btn btn-success w-100"
                  >
                    Edit Profile
                  </button>
                </div>
              </p>
            </div>
          </div>
          {/* Nuevo card para los elementos estéticos */}
          <div className="card mt-3">
            <div className="card-body">
              <p>
                Review your classes here
                <br />
                <b>Courses</b>
              </p>
              <p>
                Check your FAQs Here
                <br />
                <b>FAQ</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
