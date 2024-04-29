import React, { useState } from "react";
import {
  Table,
  Form,
  Button,
  InputGroup,
  FormControl,
  Modal,
} from "react-bootstrap";
import axios from "axios";
import { useTranslation } from "react-i18next";

function SearchUser() {
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

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

  const editRole = async () => {
    handleCloseModal();
    const updatedRole = document.getElementById("formRole").value;
    const updatedUser = { ...editingUser, role: updatedRole };
    try {
      // Make an API call to update the user role
      await axios.put(
        `http://localhost:5050/api/auth/updateRole/${editingUser._id}`,
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
                <Button variant="primary" onClick={() => handleOpenModal(user)}>
                  {t("adminDashboard.usersManagement.searchTable.edit")}
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      )}
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

export default SearchUser;
