import React from 'react';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';

function Notifications() {
  const notifications = [
    { id: 1, text: 'Notificación 1', type: 'success', read: false },
    { id: 2, text: 'Notificación 2', type: 'danger', read: false },
    { id: 3, text: 'Notificación 3', type: 'warning', read: false },
    // Agrega más notificaciones aquí
  ];

  const markAsRead = (id) => {
    // Implementa la lógica para marcar la notificación como leída
  };

  const deleteNotification = (id) => {
    // Implementa la lógica para eliminar la notificación
  };

  return (
    <Container fluid className="bg-light min-vh-100 py-5">

      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-center mb-4">Notifications</h2>
            <ListGroup>
              {notifications.map((notification) => (
                <ListGroup.Item
                  key={notification.id}
                  className={`d-flex justify-content-between align-items-center mb-3`}
                >
                  <span>{notification.text}</span>
                  <div>
                    <Button variant="light" style={{ border: '1px solid black' }} onClick={() => markAsRead(notification.id)}>Mark as read</Button>
                    <Button variant="light" style={{ border: '1px solid black' }} onClick={() => deleteNotification(notification.id)}>Delete</Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Notifications;