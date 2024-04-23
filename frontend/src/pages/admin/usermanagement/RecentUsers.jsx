import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next"; // Import useTranslation hook from react-i18next
import axios from "axios"; // Import Axios for making HTTP requests

function RecentUsers() {
  const [users, setUsers] = useState([]);
  const { t } = useTranslation(); // Initialize the useTranslation hook

  useEffect(() => {
    // Fetch the users from your API here and set the users state
    try {
      const fetchUsers = async () => {
        const response = await axios.get(
          "http://127.0.0.1:5050/api/user/get-recent"
        );
        // setUsers with the response data, specifically the accounts key
        setUsers(response.data.data);
      };
      fetchUsers();
    } catch (error) {
      console.error("Fetch users error:", error);
      setUsers([]);
    }
  }, []);

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

  const editRole = (userId, newRole) => {
    // Edit the role of the user with the given userId here and update the users state
  };

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>{t("adminDashboard.usersManagement.recentTable.username")}</th>
          <th>{t("adminDashboard.usersManagement.recentTable.email")}</th>
          <th>{t("adminDashboard.usersManagement.recentTable.role")}</th>
          <th>{t("adminDashboard.usersManagement.recentTable.actions")}</th>
        </tr>
      </thead>
      {users.length === 0 && (
        <tbody>
          <tr>
            <td colSpan="5" className="text-center">
              {t("adminDashboard.usersManagement.recentTable.notfound")}
            </td>
          </tr>
        </tbody>
      )}
      <tbody>
        {users.slice(0, 5).map((user, index) => (
          <tr key={user._id}>
            <td>{index + 1}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <Button variant="danger" onClick={() => deleteUser(user._id)}>
                {t("adminDashboard.usersManagement.recentTable.delete")}
              </Button>
              <Button
                variant="primary"
                onClick={() => editRole(user._id, "newRole")}
              >
                {t("adminDashboard.usersManagement.recentTable.edit")}
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default RecentUsers;
