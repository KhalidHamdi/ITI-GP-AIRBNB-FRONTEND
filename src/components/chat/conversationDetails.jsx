import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket, { ReadyState } from "react-use-websocket";
import "./conversationDetails.css";

function ConversationDetail({ userName }) {
  const { id: conversationId } = useParams(); // Get conversationId from URL parameters
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socketUrl, setSocketUrl] = useState(null);

  // Set WebSocket URL without the token
  useEffect(() => {
    console.log("conversationId:", conversationId);
    if (conversationId) {
      const wsUrl = `ws://localhost:8000/ws/${conversationId}/`;
      console.log("WebSocket URL:", wsUrl); // Check the URL in the console
      setSocketUrl(wsUrl); // No token for testing
    }
  }, [conversationId]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    onOpen: () => console.log("Connected to WebSocket"),
    onClose: () => console.log("Disconnected from WebSocket"),
    onMessage: (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    },
  });

  // Check if WebSocket is open before sending a message
  const handleSendMessage = () => {
    if (readyState === ReadyState.OPEN) {
      const messageData = {
        data: {
          conversation_id: conversationId,
          body: newMessage,
          name: userName || "Anonymous",
          sent_to_id: 2, // Dynamic user ID, can be passed as props
        },
      };
      console.log("Sending message data:", messageData);
      sendMessage(JSON.stringify(messageData));
      setNewMessage("");
    } else {
      console.log("WebSocket is not connected.");
    }
  };

  return (
    <div className="chat-container">
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
