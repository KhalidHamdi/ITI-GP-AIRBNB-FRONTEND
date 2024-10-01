// import React, { useEffect, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axiosInstance from "../../axios";
// import Conversation from "../../components/chat/conversation";

// function Chat() {
//   const [conversations, setConversations] = useState([]);
//   const currentUserId = localStorage.getItem("userId");

//   useEffect(() => {
//     const fetchConversations = async () => {
//       try {
//         const response = await axiosInstance.get("api/chat");
//         setConversations(response.data);
//       } catch (error) {
//         console.error("Error fetching conversations:", error);
//       }
//     };

//     fetchConversations();

//     // Simulate receiving a message every 5 seconds
//     const interval = setInterval(() => {
//       // Simulate a new message notification
//       toast("You have a new message!");
//     }, 10000); // Adjust the timing as needed for testing

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <>
//       <h2
//         style={{
//           fontSize: "24px",
//           fontWeight: "bold",
//           margin: "25px",
//         }}
//       >
//         Inbox
//       </h2>

//       {conversations.length === 0 ? (
//         <div className="no-chats" style={{ textAlign: "center" }}>
//           <p>No conversations yet</p>
//         </div>
//       ) : (
//         conversations.map((conversation) => (
//           <Conversation
//             key={conversation.id}
//             conversation={conversation}
//             currentUserId={currentUserId}
//           />
//         ))
//       )}

//       <ToastContainer />
//     </>
//   );
// }

// export default Chat;

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../axios";
import Conversation from "../../components/chat/conversation";

function Chat() {
  const [conversations, setConversations] = useState([]);
  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axiosInstance.get("api/chat");
        setConversations(response.data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();

    // WebSocket setup - make sure to replace 'room_name' with actual conversation ID
    const socket = new WebSocket(
      `ws://localhost:8000/ws/058ee31f-546a-4811-a7e0-edbdf7981066/`
    );

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      // Assuming your message object has senderId, receiverId, and text properties
      if (message.receiverId === currentUserId) {
        toast(`New message from ${message.sender}: ${message.text}`);
      }
    };

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      socket.close(); // Clean up the connection
    };
  }, [currentUserId]);

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

      {conversations.length === 0 ? (
        <div className="no-chats" style={{ textAlign: "center" }}>
          <p>No conversations yet</p>
        </div>
      ) : (
        conversations.map((conversation) => (
          <Conversation
            key={conversation.id}
            conversation={conversation}
            currentUserId={currentUserId}
          />
        ))
      )}

      <ToastContainer />
    </>
  );
}

export default Chat;
