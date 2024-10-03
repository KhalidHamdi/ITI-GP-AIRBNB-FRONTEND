import React, { useEffect, useRef, useState } from "react";
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

  // Create a ref for the message container
  const messageContainerRef = useRef(null);

  useEffect(() => {
    if (conversationId) {
      const wsUrl = `ws://localhost:8000/ws/${conversationId}/`;
      // const wsUrl = `ws://itnb.up.railway.app/ws/${conversationId}/`;
      setSocketUrl(wsUrl);
      console.log(wsUrl);
    }
  }, [conversationId]);

  useEffect(() => {
    const storedUserName = localStorage.getItem("username");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const response = await axiosInstance.get(`api/chat/${conversationId}`);
        const updatedMessages = response.data.messages.map((message) => ({
          ...message,
          isSender: message.created_by.username === userName,
          name: message.created_by.username || "unknown",
        }));
        setMessages(updatedMessages);
      } catch (error) {
        console.error("Error fetching conversation:", error);
      }
    };

    if (conversationId) {
      fetchConversation();
    }
  }, [conversationId, userName]);

  const { sendMessage, readyState } = useWebSocket(socketUrl, {
    onOpen: () => console.log("Connected to WebSocket"),
    onClose: () => console.log("Disconnected from WebSocket"),
    onMessage: (event) => {
      try {
        const newMessage = JSON.parse(event.data);
        newMessage.isSender = newMessage.name === userName;
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    },
    shouldReconnect: (closeEvent) => true,
  });

  const handleSendMessage = () => {
    if (!userName) {
      console.log("Username is not set.");
      return;
    }

    let sentToId = landlordId;
    if (!sentToId && messages.length > 0) {
      const lastMessageWithSentTo = messages.find(
        (message) => message.sent_to && message.sent_to.id
      );

      if (lastMessageWithSentTo) {
        sentToId = lastMessageWithSentTo.sent_to.id;
      }
    }

    if (sentToId) {
      if (readyState === ReadyState.OPEN) {
        const messageData = {
          event: "chat_message",
          data: {
            body: newMessage,
            name: userName || "Anonymous",
            sent_to_id: sentToId,
            conversation_id: conversationId,
          },
        };
        sendMessage(JSON.stringify(messageData)); // Send the message
        setNewMessage("");
      } else {
        console.log("WebSocket is not connected. Current state:", readyState);
      }
    } else {
      console.log(
        "No user selected or available in messages to send a message."
      );
    }
  };

  // New function to handle key down event
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.preventDefault();
      handleSendMessage();
    }
  };

  // Scroll to the last message whenever messages change
  useEffect(() => {
    const container = messageContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight; // Scroll to the bottom
    }
  }, [messages]);

  return (
    <div className="chat-container card">
      <div className="card-bodyy">
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
              {user.username}
            </div>
          ))}
        </div>

        <div className="message-container" ref={messageContainerRef}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={message.isSender ? "sender" : "receiver"}
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
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            className="chat-input"
          />
          <button className="send-button" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConversationDetail;
