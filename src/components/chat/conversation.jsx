// src/components/chat/Conversation.js
import React from "react";
import { ListGroup, Badge, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const Conversation = ({ conversation, currentUserId }) => {
  const isCurrentUserPartOfConversation = conversation.users.some(
    (user) => user.id === currentUserId
  );

  if (!isCurrentUserPartOfConversation) {
    return null;
  }

  const sender = conversation.users.find((user) => user.id === currentUserId);
  const receiver = conversation.users.find((user) => user.id !== currentUserId);

  return (
    <ListGroup variant="flush">
      <ListGroup.Item className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <Image
            src={receiver?.avatar || "/default-avatar.png"}
            roundedCircle
            width={50}
            height={50}
            className="me-3"
          />
          <div>
            <h5 className="mb-1">{receiver?.username || "Unknown User"}</h5>
            <small className="text-muted">
              {/* Display last message preview */}
              {conversation.messages.length > 0
                ? conversation.messages[conversation.messages.length - 1].body
                : "No messages yet"}
            </small>
          </div>
        </div>
        {conversation.unreadCount > 0 && (
          <Badge bg="primary" pill>
            {conversation.unreadCount}
          </Badge>
        )}
      </ListGroup.Item>
      <ListGroup.Item className="text-end">
        <Link to={`/conversationDetail/${conversation.id}`}>Go to conversation</Link>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default Conversation;
