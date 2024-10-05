// src/pages/chat/Chat.js
import React, { useState, useEffect } from "react";
import Conversation from "../../components/chat/Conversation";
import axiosInstance from "../../axios";
import { Container, Row, Col, Card, Alert, Spinner } from "react-bootstrap";

function Chat() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axiosInstance.get("api/chat");
        console.log("API Response Data:", response.data);
        setConversations(response.data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  // Filter conversations to find those that include the current user
  const userConversations = conversations.filter((conversation) =>
    conversation.users.some((user) => user.id === currentUserId)
  );

  return (
    <Container className="my-4">
      <Row className="mb-4">
        <Col>
          <h2 className="display-6 fw-bold text-center">Inbox</h2>
        </Col>
      </Row>

      {loading ? (
        <Row className="justify-content-center">
          <Spinner animation="border" variant="primary" />
        </Row>
      ) : userConversations.length === 0 ? (
        <Row className="justify-content-center">
          <Col md={6}>
            <Alert variant="warning" className="text-center">
              No conversations yet
            </Alert>
          </Col>
        </Row>
      ) : (
        <Row>
          {userConversations.map((conversation) => (
            <Col key={conversation.id} md={6} lg={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Conversation
                    conversation={conversation}
                    currentUserId={currentUserId}
                  />
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Chat;
