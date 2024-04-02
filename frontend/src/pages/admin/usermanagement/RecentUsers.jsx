import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios"; // Import Axios for making HTTP requests

function RecentUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch the users from your API here and set the users state
    try {
      const fetchUsers = async () => {
        const response = await axios.get(
          "http://127.0.0.1:5050/api/util/fetch-recent-users",
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // setUsers with the response data, specifically the accounts key
        setUsers(response.data.accounts);
      };
      fetchUsers();
    } catch (error) {
      console.error("Fetch users error:", error);
    }
  }, []);

  const deleteUser = (userId) => {
    // Delete the user with the given userId here and update the users state
  };

  const editRole = (userId, newRole) => {
    // Edit the role of the user with the given userId here and update the users state
  };

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.slice(0, 5).map((user, index) => (
          <tr key={user.id}>
            <td>{index + 1}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <Button variant="danger" onClick={() => deleteUser(user.id)}>
                Delete
              </Button>
              <Button
                variant="primary"
                onClick={() => editRole(user.id, "newRole")}
              >
                Edit Role
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default RecentUsers;
