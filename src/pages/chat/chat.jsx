import Conversation from "../../components/chat/conversation";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Chat() {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/chat");
        console.log("API Response Data:", response.data);
        setConversations(response.data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, []);

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
      {Array.isArray(conversations) &&
        conversations.map((conversation) => (
          <Conversation key={conversation.id} conversation={conversation} />
        ))}
    </>
  );
}

export default Chat;
