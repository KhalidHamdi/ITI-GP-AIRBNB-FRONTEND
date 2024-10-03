import Conversation from "../../components/chat/conversation";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios";

function Chat() {
  const [conversations, setConversations] = useState([]);
  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axiosInstance.get("api/chat");
        console.log("API Response Data:", response.data);
        setConversations(response.data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, []);

  // Filter conversations to find those that include the current user
  const userConversations = conversations.filter((conversation) =>
    conversation.users.some((user) => user.id === currentUserId)
  );

  return (
    <>
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          margin: "25px",
        }}
      >
        Inbox
      </h2>

      {userConversations.length === 0 ? (
        <div
          className="no-chats"
          style={{
            textAlign: "center",
            color: "#930c0c",
            fontSize: "18px",
            fontWeight: "normal",
            margin: "20px 0",
          }}
        >
          <p>No conversations yet</p>
        </div>
      ) : (
        userConversations.map((conversation) => (
          <Conversation
            key={conversation.id}
            conversation={conversation}
            currentUserId={currentUserId}
          />
        ))
      )}
    </>
  );
}

export default Chat;
