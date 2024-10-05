// src/components/chat/ConversationDetail.js
import React, { useEffect, useRef, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import "./conversationDetails.css";
import axiosInstance from "../../axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import notificationSound from "../../assets/sound/chatnotification.wav";
import { Button, Overlay, Popover } from "react-bootstrap";

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
  const [currentPage, setCurrentPage] = useState(1);
  const messageContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  // Emoji Picker state
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);
  const [emojiAnchor, setEmojiAnchor] = useState(null);

  useEffect(() => {
    if (conversationId) {
      const wsUrl = `ws://localhost:8000/ws/${conversationId}/`;
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

  const fetchConversation = async (page = 1) => {
    try {
      const response = await axiosInstance.get(`api/chat/${conversationId}`, {
        params: { page },
      });
      const updatedMessages = response.data.messages.map((message) => ({
        ...message,
        isSender: message.created_by.username === userName,
        name: message.created_by.username || "unknown",
      }));
      setMessages((prevMessages) =>
        page === 1 ? updatedMessages : [...updatedMessages, ...prevMessages]
      );
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching conversation:", error);
    }
  };

  useEffect(() => {
    if (conversationId) {
      fetchConversation(1);
    }
  }, [conversationId, userName]);

  const handleScroll = async () => {
    const container = messageContainerRef.current;
    if (container.scrollTop === 0 && !isLoading) {
      setIsLoading(true);
      await fetchConversation(currentPage + 1);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const container = messageContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [currentPage]);

  const { sendMessage, readyState } = useWebSocket(socketUrl, {
    onOpen: () => console.log("Connected to WebSocket"),
    onClose: () => console.log("Disconnected from WebSocket"),
    onMessage: (event) => {
      try {
        const newMessageData = JSON.parse(event.data);

        if (newMessageData.type === "message") {
          const newMessage = {
            body: newMessageData.body,
            name: newMessageData.name,
            isSender: newMessageData.name === userName,
          };

          setMessages((prevMessages) => [...prevMessages, newMessage]);

          if (newMessageData.name !== userName) {
            const audio = new Audio(notificationSound);
            audio
              .play()
              .catch((error) => console.error("Audio playback error:", error));
            toast.info(`${newMessageData.name}: ${newMessageData.body}`, {
              position: "top-right",
              autoClose: 5000,
            });
          }
        }
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
        sendMessage(JSON.stringify(messageData));
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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    const container = messageContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  // Handle emoji selection
  const addEmoji = (emoji) => {
    setNewMessage((prevMessage) => prevMessage + emoji.native);
    setShowEmojiPicker(false);
  };

  const toggleEmojiPicker = (event) => {
    setShowEmojiPicker(!showEmojiPicker);
    setEmojiAnchor(event.currentTarget);
  };

  return (
    <div className="chat-container card">
      <div className="card-bodyy">
        <div className="user-list">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => setSelectedUserId(user.id)}
              className={`user-item ${selectedUserId === user.id ? 'active' : ''}`}
            >
              {user.username}
            </div>
          ))}
        </div>

        <div className="message-container" ref={messageContainerRef}>
          {isLoading && (
            <div className="loading-message">
              <div className="spinner"></div> Loading more messages...
            </div>
          )}
          {messages.map((message, index) => (
            <div key={index} className={message.isSender ? "sender" : "receiver"}>
              <div className="message-content">
                <h5>{message.name}</h5>
                <p>{message.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="chat-input-container">
          <div className="input-group">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here..."
              className="form-control chat-input"
            />
            <Button variant="outline-secondary" onClick={toggleEmojiPicker}>
              😊
            </Button>
            <Button className="send-button" onClick={handleSendMessage}>
              Send
            </Button>
          </div>
          <Overlay
            show={showEmojiPicker}
            target={emojiAnchor}
            placement="top"
            containerPadding={20}
            rootClose
            onHide={() => setShowEmojiPicker(false)}
          >
            <Popover id="emoji-popover">
              <Picker onSelect={addEmoji} />
            </Popover>
          </Overlay>
        </div>
      </div>
    </div>
  );
}

export default ConversationDetail;
