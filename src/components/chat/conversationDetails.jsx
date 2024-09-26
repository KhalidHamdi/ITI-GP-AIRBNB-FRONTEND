import React, { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import "./conversationDetails.css";

function ConversationDetail({ conversationId, userName }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socketUrl, setSocketUrl] = useState(null);

  // Set WebSocket URL when the component mounts
  useEffect(() => {
    if (conversationId) {
      setSocketUrl(
        `ws://localhost:8000/ws/${conversationId}/?token=your_jwt_token`
      );
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

  // Function to send a message
  const handleSendMessage = () => {
    const messageData = {
      data: {
        conversation_id: conversationId,
        body: newMessage,
        name: userName, // Your name or sender's name
        sent_to_id: 2, // Dynamic user ID, can be passed as props
      },
    };
    sendMessage(JSON.stringify(messageData));
    setNewMessage("");
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
