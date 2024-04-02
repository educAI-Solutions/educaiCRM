import React, { useState, useEffect } from "react";
import { Card, ListGroup, Container, Alert } from "react-bootstrap";

function StudentUpcomingClasses() {
  const [upcomingClasses, setUpcomingClasses] = useState([]);

  useEffect(() => {
    // Fetch the upcoming classes from your API here and set the upcomingClasses state
    // Make sure to fetch only the classes that the student has in the upcoming week
  }, []);

  return (
    <Container className="m-2">
      <h2>My Upcoming Classes This Week</h2>
      {upcomingClasses.length === 0 ? (
        <Alert variant="info">You have no upcoming classes this week.</Alert>
      ) : (
        upcomingClasses.map((upcomingClass) => (
          <Card className="mb-3" key={upcomingClass.id}>
            <Card.Header as="h5">{upcomingClass.courseName}</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>Date: {upcomingClass.date}</ListGroup.Item>
              <ListGroup.Item>Time: {upcomingClass.time}</ListGroup.Item>
              <ListGroup.Item>
                Location: {upcomingClass.location}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        ))
      )}
    </Container>
  );
}

export default StudentUpcomingClasses;
