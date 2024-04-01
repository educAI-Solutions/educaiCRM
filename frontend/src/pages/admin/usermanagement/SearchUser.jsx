import React, { useState } from "react";
import { Table, Form, Button, InputGroup, FormControl } from "react-bootstrap";
import axios from "axios";

function SearchUser() {
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    // Fetch the users from your API here based on the searchTerm and set the users state
    try {
      const response = await axios.get(
        `http://127.0.0.1:5050/api/util/fetch-user`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: { searchTerm },
        }
      );
      setUser(response.data.account);
    } catch (error) {
      console.error("Fetch users error:", error);
      // Display message if user not found
      setUser(null);
    }
  };

  const deleteUser = (userId) => {
    // Delete the user with the given userId here and update the users state
  };

  const editUser = (userId) => {
    // Edit the user with the given userId here and update the users state
  };

  return (
    <div>
      <Form onSubmit={handleSearch}>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search user by username or email"
            aria-label="Search user by username or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline-secondary" type="submit">
            Search
          </Button>
        </InputGroup>
      </Form>
      {user && (
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <Button variant="danger" onClick={() => deleteUser(user.id)}>
                  Delete
                </Button>
                <Button variant="primary" onClick={() => editUser(user.id)}>
                  Edit User
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default SearchUser;
