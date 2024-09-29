import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket, { ReadyState } from "react-use-websocket";
import "./conversationDetails.css";

function ConversationDetail() {
  const { id: conversationId } = useParams(); // Get conversationId from URL parameters
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socketUrl, setSocketUrl] = useState(null);
  const [userName, setUserName] = useState("Anonymous"); // Default username
  const [users, setUsers] = useState([]); // To store users for selection
  const [selectedUserId, setSelectedUserId] = useState(null); // Store the ID of the selected user

  // Set WebSocket URL
  useEffect(() => {
    console.log("conversationId:", conversationId);
    if (conversationId) {
      const wsUrl = `ws://localhost:8000/ws/${conversationId}/`;
      console.log("WebSocket URL:", wsUrl); // Check the URL in the console
      setSocketUrl(wsUrl);
    }
  }, [conversationId]);

  // Get username from local storage on component mount
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    // Fetch username based on stored userId
    if (storedUserId) {
      const fetchedUserName = "User_" + storedUserId.substring(0, 5); // Mocked username
      setUserName(fetchedUserName);
    }
  }, []);

  // Fetch users for selection
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/users/"); // Replace with your API endpoint for users
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const userData = await response.json();
        setUsers(userData); // Assume the response is an array of users
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

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
  });

  const saveMessageToDatabase = async (messageData) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/chat/messages/save/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(messageData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save message");
      }

      const data = await response.json();
      console.log("Message saved:", data);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  };

  // Check if WebSocket is open before sending a message
  const handleSendMessage = () => {
    if (readyState === ReadyState.OPEN) {
      const messageData = {
        data: {
          conversation_id: conversationId,
          body: newMessage,
          name: userName || "Anonymous", // Use retrieved username
          sent_to_id: selectedUserId, // Use selected user ID
        },
      };
      console.log("Sending message data:", messageData);
      sendMessage(JSON.stringify(messageData));
      setNewMessage(""); // Clear input after sending
      saveMessageToDatabase(messageData.data);
    } else {
      console.log(
        "WebSocket is not connected or no user selected. Current state:",
        readyState
      );
    }
  };

  return (
    <div className="chat-container">
      <div className="user-list">
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => setSelectedUserId(user.id)} // Set selected user ID
            style={{
              cursor: "pointer",
              padding: "5px",
              backgroundColor:
                selectedUserId === user.id ? "#d1e7dd" : "transparent",
            }}
          >
            {user.name} {/* Display user name */}
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
