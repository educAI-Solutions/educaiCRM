import React from "react";
import {
  Container,
  Row,
  Col,
  Table,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";

const AdminTeachers = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Row className="mb-3">
        <Col>
          <h1>{t("adminDashboard.adminTeachers.title")}</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <InputGroup className="mb-3">
            <FormControl
              placeholder={t("adminDashboard.adminTeachers.searchPlaceholder")}
              aria-label={t("adminDashboard.adminTeachers.searchPlaceholder")}
              aria-describedby="basic-addon1"
            />
            <Button variant="outline-secondary">{t("adminDashboard.adminTeachers.searchButton")}</Button>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table responsive>
            <thead>
              <tr>
                <th>{t("adminDashboard.adminTeachers.fullName")}</th>
                <th>{t("adminDashboard.adminTeachers.username")}</th>
                <th>{t("adminDashboard.adminTeachers.email")}</th>
                <th>{t("adminDashboard.adminTeachers.actions")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John Doe</td>
                <td>johndoe</td>
                <td>john@doe.com</td>
                <td>
                  <Button variant="danger">{t("adminDashboard.adminTeachers.delete")}</Button>
                  <Button variant="primary">{t("adminDashboard.adminTeachers.edit")}</Button>
                </td>
              </tr>
              <tr>
                <td>Jane Doe</td>
                <td>janedoe</td>
                <td>jane@doe.com</td>
                <td>
                  <Button variant="danger">{t("adminDashboard.adminTeachers.delete")}</Button>
                  <Button variant="primary">{t("adminDashboard.adminTeachers.edit")}</Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminTeachers;
