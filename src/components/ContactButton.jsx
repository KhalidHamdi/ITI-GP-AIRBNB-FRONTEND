import React, { useState } from "react";
import LoginModal from "./modals/LoginModal";
import ChatModal from "../pages/landlord/chatmodel";
import axiosInstance from "../axios";

const ContactButton = ({ userId, landlordId }) => {
  const [isChatOpen, setIsChatOpen] = useState(false); // State to manage chat modal
  const [conversationId, setConversationId] = useState(null); // State to store conversation ID
  const loginModal = LoginModal();

  const startConversation = async () => {
    if (userId) {
      try {
        const response = await axiosInstance.get(
          `/api/chat/start/${landlordId}/`
        );

        if (response.data.conversation_id) {
          setConversationId(response.data.conversation_id); // Store conversation ID
          setIsChatOpen(true); // Open chat popup
        }
      } catch (error) {
        console.error("Failed to start conversation:", error);
      }
    } else {
      loginModal.open();
    }
  };

  return (
    <>
      <div
        onClick={startConversation}
        className="btn btn-primary w-100 mb-3"
        style={{ backgroundColor: "#FF385C", borderColor: "#FF385C" }}
      >
        Contact
      </div>
      {isChatOpen && (
        <ChatModal
          conversationId={conversationId}
          landlordId={landlordId}
          onClose={() => setIsChatOpen(false)} // Function to close the modal
        />
      )}
    </>
  );
};

export default ContactButton;
