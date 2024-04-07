import React, { useState, useEffect } from "react";
import { Card, ListGroup, Container, Alert } from "react-bootstrap";

function StudentCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch the courses from your API here and set the courses state
    // Make sure to fetch only the courses that the student is enrolled in
  }, []);

  return (
    <Container className="m-2">
      <h2>My Courses</h2>
      {courses.length === 0 ? (
        <Alert variant="info">You are not enrolled in any courses.</Alert>
      ) : (
        courses.map((course) => (
          <Card className="mb-3" key={course.id}>
            <Card.Header as="h5">{course.name}</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>Instructor: {course.instructor}</ListGroup.Item>
              <ListGroup.Item>Time: {course.time}</ListGroup.Item>
              <ListGroup.Item>Location: {course.location}</ListGroup.Item>
            </ListGroup>
          </Card>
        ))
      )}
    </Container>
  );
}

export default StudentCourses;
