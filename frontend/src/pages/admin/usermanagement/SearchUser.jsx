import React, { useState } from "react";
import { Table, Form, Button, InputGroup, FormControl } from "react-bootstrap";
import axios from "axios";
import { useTranslation } from "react-i18next";

function SearchUser() {
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const { t } = useTranslation();

  const handleSearch = async (event) => {
    event.preventDefault();
    // Fetch the users from your API here based on the searchTerm and set the users state
    try {
      const response = await axios.get(
        `http://127.0.0.1:5050/api/user/get/${searchTerm}`
      );
      setUser(response.data.data);
    } catch (error) {
      console.error("Fetch users error:", error);
      // Display message if user not found
      setUser(null);
    }
  };

  const deleteUser = async (userId) => {
    try {
      // Make an API call to delete the user
      await axios.delete(`http://localhost:5050/api/auth/delete/${userId}`);

      // Update the users state by filtering out the deleted user
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Delete user error:", error);
    }
  };

  const editUser = (userId) => {
    // Edit the user with the given userId here and update the users state
  };

  return (
    <div>
      <Form onSubmit={handleSearch}>
        <InputGroup className="mb-3 mt-2">
          <FormControl
            placeholder={t(
              "adminDashboard.usersManagement.searchTable.enterUser"
            )}
            aria-label="Search user by username or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline-secondary" type="submit">
            {t("adminDashboard.usersManagement.searchTable.search")}
          </Button>
        </InputGroup>
      </Form>
      {user && (
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>
                {t("adminDashboard.usersManagement.searchTable.username")}
              </th>
              <th>{t("adminDashboard.usersManagement.searchTable.email")}</th>
              <th>{t("adminDashboard.usersManagement.searchTable.role")}</th>
              <th>{t("adminDashboard.usersManagement.searchTable.actions")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Button variant="danger" onClick={() => deleteUser(user._id)}>
                  {t("adminDashboard.usersManagement.searchTable.delete")}
                </Button>
                <Button variant="primary" onClick={() => editUser(user._id)}>
                  {t("adminDashboard.usersManagement.searchTable.edit")}
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
