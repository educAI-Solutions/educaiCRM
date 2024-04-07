import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

function StudentJustificationsReview() {
  const [justifications, setJustifications] = useState([]);

  useEffect(() => {
    // Fetch the justifications from your API here and set the justifications state
    // Make sure to fetch only the justifications that the student has sent
  }, []);

  return (
    <div className="m-2">
      <h2>My Justifications</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {justifications.map((justification) => (
            <tr key={justification.date}>
              <td>{justification.date}</td>
              <td>{justification.reason}</td>
              <td>{justification.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default StudentJustificationsReview;
