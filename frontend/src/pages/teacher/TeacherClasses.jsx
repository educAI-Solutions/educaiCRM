import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function TeacherCourses() {
  return (
    <div className="container">
      <h2 className="text-center my-4">Teacher Courses Page</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>Course Name:</label>
                  <input type="text" className="form-control" name="courseName" />
                </div>
                <div className="form-group">
                  <label>Course Code:</label>
                  <input type="text" className="form-control" name="courseCode" />
                </div>
                <div className="form-group">
                  <label>Course Section:</label>
                  <input type="text" className="form-control" name="courseSection" />
                </div>
                <div className="form-group">
                  <label>Programs:</label>
                  <input type="text" className="form-control" name="programs" />
                </div>
                <div className="form-group">
                  <label>Instructor:</label>
                  <input type="text" className="form-control" name="instructor" />
                </div>
                <div className="form-group">
                  <label>Start Date:</label>
                  <input type="date" className="form-control" name="startDate" />
                </div>
                <div className="form-group">
                  <label>End Date:</label>
                  <input type="date" className="form-control" name="endDate" />
                </div>
                <div className="d-flex justify-content-center mt-3">
                  <button type="submit" className="btn btn-primary">Create Course</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center">
              Registered Courses
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}

export default TeacherCourses;