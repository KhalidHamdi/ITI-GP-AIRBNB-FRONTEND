import React from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "./modals/LoginModal";
import axiosInstance from "../axios";

const ContactButton = ({ userId, landlordId }) => {
  const loginModal = LoginModal();
  const navigate = useNavigate();

  const startConversation = async () => {
    if (userId) {
      try {
        const response = await axiosInstance.get(
          `/api/chat/start/${landlordId}/`
        );

        if (response.data.conversation_id) {
          // Navigate to inbox with the conversation ID
          navigate(`/inbox/${response.data.conversation_id}`);
        }
      } catch (error) {
        console.error("Failed to start conversation:", error);
      }
    } else {
      // Open login modal if the user is not authenticated
      loginModal.open();
    }
  };

  return (
    <div
      onClick={startConversation}
      className="btn btn-primary w-100 mb-3"
      style={{ backgroundColor: "#FF385C", borderColor: "#FF385C" }}
    >
      Contact
    </div>
  );
};

export default ContactButton;
