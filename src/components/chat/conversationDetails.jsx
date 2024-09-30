import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import useWebSocket, { ReadyState } from "react-use-websocket";
import "./conversationDetails.css";
import axiosInstance from "../../axios";

function ConversationDetail() {
  const { id: conversationId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socketUrl, setSocketUrl] = useState(null);
  const [userName, setUserName] = useState("Anonymous");
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const location = useLocation();
  const { landlordId } = location.state || {};

  // Set WebSocket URL
  useEffect(() => {
    // console.log("landlordId:", landlordId);
    // console.log("conversationId:", conversationId);

    if (conversationId) {
      const wsUrl = `ws://localhost:8000/ws/${conversationId}/`;
      // console.log("WebSocket URL:", wsUrl);
      setSocketUrl(wsUrl);
    }
  }, [conversationId, landlordId]);

  // Get username from local storage on component mount
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      const fetchedUserName = "User_" + storedUserId.substring(0, 5);
      setUserName(fetchedUserName);
    }
  }, []);

  // Fetch conversation data when the component mounts or conversationId changes
  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const response = await axiosInstance.get(`api/chat/${conversationId}`);
        console.log("Conversation:", response.data);
        setMessages(response.data.messages);
      } catch (error) {
        console.error("Error fetching conversation:", error);
      }
    };

    if (conversationId) {
      fetchConversation();
    }
  }, [conversationId]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    onOpen: () => console.log("Connected to WebSocket"),
    onClose: () => console.log("Disconnected from WebSocket"),
    onMessage: (event) => {
      try {
        const newMessage = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    },
    shouldReconnect: (closeEvent) => true, // Will attempt to reconnect on close
  });

  // Handle sending a message
  const handleSendMessage = () => {
    if (landlordId) {
      if (readyState === ReadyState.OPEN) {
        const messageData = {
          event: "chat_message",
          data: {
            body: newMessage,
            name: userName || "Anonymous",
            sent_to_id: landlordId,
            conversation_id: conversationId,
          },
        };
        console.log("Sending message data:", messageData);
        sendMessage(JSON.stringify(messageData));
        setNewMessage("");
      } else {
        console.log("WebSocket is not connected. Current state:", readyState);
      }
    } else {
      console.log("No user selected. Please select a user to send a message.");
    }
  };

  return (
    <div className="chat-container">
      <div className="user-list">
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => setSelectedUserId(user.id)}
            style={{
              cursor: "pointer",
              padding: "5px",
              backgroundColor:
                selectedUserId === user.id ? "#d1e7dd" : "transparent",
            }}
          >
            {user.name}
          </div>
        ))}
      </div>

      <div className="message-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={message.name === userName ? "sender" : "receiver"}
          >
            <h4>{message.name}</h4>
            <p>{message.body}</p>
          </div>
        ))}
      </div>

      <div className="chat-input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
          className="chat-input"
        />
        <button className="send-button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ConversationDetail;
