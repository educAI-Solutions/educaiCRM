import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next"; // Import useTranslation hook from react-i18next
import axios from "axios"; // Import Axios for making HTTP requests

function RecentUsers() {
  const [users, setUsers] = useState([]);
  const { t } = useTranslation(); // Initialize the useTranslation hook
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    // Fetch the users from your API here and set the users state
    try {
      const fetchUsers = async () => {
        const response = await axios.get(
          `http://${process.env.REACT_APP_BACKEND_ADDRESS}:5050/api/user/get-recent`
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
      await axios.delete(
        `http://${process.env.REACT_APP_BACKEND_ADDRESS}:5050/api/auth/delete/${userId}`
      );

      // Update the users state by filtering out the deleted user
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Delete user error:", error);
    }
  };

  const editRole = async () => {
    handleCloseModal();
    const updatedRole = document.getElementById("formRole").value;
    const updatedUser = { ...editingUser, role: updatedRole };
    try {
      // Make an API call to update the user role
      await axios.put(
        `http://${process.env.REACT_APP_BACKEND_ADDRESS}:5050/api/auth/updateRole/${editingUser._id}`,
        updatedUser
      );

      // Update the users state by mapping over the users and updating the user with the new role
      setUsers(
        users.map((user) => (user._id === updatedUser._id ? updatedUser : user))
      );
    } catch (error) {
      console.error("Edit user role error:", error);
    }
  };
  const handleOpenModal = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEditingUser(null);
    setShowModal(false);
  };

  return (
    <div>
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
                <Button variant="primary" onClick={() => handleOpenModal(user)}>
                  {t("adminDashboard.usersManagement.recentTable.edit")}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {t("adminDashboard.usersManagement.modalEditUser.title")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>
                {" "}
                {t("adminDashboard.usersManagement.modalEditUser.username")}
              </Form.Label>
              <Form.Control
                type="text"
                defaultValue={editingUser?.username}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>
                {" "}
                {t("adminDashboard.usersManagement.modalEditUser.email")}
              </Form.Label>
              <Form.Control
                type="email"
                defaultValue={editingUser?.email}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="formRole">
              <Form.Label>
                {" "}
                {t("adminDashboard.usersManagement.modalEditUser.role")}
              </Form.Label>
              <Form.Control as="select" defaultValue={editingUser?.role}>
                <option value="admin">
                  {t("adminDashboard.usersManagement.modalEditUser.admin")}
                </option>
                <option value="teacher">
                  {t("adminDashboard.usersManagement.modalEditUser.teacher")}
                </option>
                <option value="student">
                  {t("adminDashboard.usersManagement.modalEditUser.student")}
                </option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            {t("adminDashboard.usersManagement.modalEditUser.close")}
          </Button>
          <Button variant="primary" onClick={editRole}>
            {t("adminDashboard.usersManagement.modalEditUser.submit")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default RecentUsers;
