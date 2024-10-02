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
      `ws://localhost:8000/ws/06d21566-15f0-4a03-912d-de491c079819/`
    );

    socket.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      const message = messageData.data;

      // Extract user IDs from the conversation object
      const userIds = conversation.users.map((user) => user.id);

      // Check if the current user ID is in the user IDs array
      if (userIds.includes(currentUserId)) {
        // Show toast notification only if the message is sent to the current user
        if (message.sent_to_id === currentUserId) {
          toast(`New message from ${message.name}: ${message.body}`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
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
