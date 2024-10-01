import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axios";
import ContactButton from "../../components/ContactButton";
import PropertyList from "../../components/property/propertyList";
import Modal from "react-modal";
import ConversationDetail from "../../components/chat/conversationDetails";
import "./landlord.css";

const LandlordDetailPage = () => {
  const { username } = useParams();
  const [landlord, setLandlord] = useState(null);
  const [userId, setUserId] = useState(null);
  const [landlordId, setLandlordId] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const landlordData = await axiosInstance.get(`/api/auth/${username}`);
        setLandlord(landlordData.data);
        setLandlordId(landlordData.data.id);
        const currentUserId = "3bd4857d-edca-4ab2-b3ac-2c976e5f14f4"; // Replace with actual user ID logic
        setUserId(currentUserId);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [username]);

  if (!landlord) {
    return <div>Loading...</div>;
  }

  const openChatModal = () => {
    setIsChatOpen(true); // Open chat modal
  };

  const closeChatModal = () => {
    setIsChatOpen(false); // Close chat modal
  };

  return (
    <div className="container py-4">
      <div className="row">
        {/* Sidebar for Landlord Info */}
        <aside className="col-md-3 mb-4">
          <div className="card text-center p-4 border-0 shadow-sm">
            <img
              src={
                landlord.avatar ||
                "https://user-images.githubusercontent.com/11250/39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e.jpg"
              }
              alt={landlord.username}
              width="200"
              height="200"
              className="img-fluid rounded mx-auto d-block"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://user-images.githubusercontent.com/11250/39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e.jpg";
              }}
            />

            <h1 className="mt-3 h4">{landlord.username}</h1>

            {userId !== landlordId && (
              <ContactButton
                userId={userId}
                landlordId={landlordId}
                onClick={openChatModal}
              />
            )}
          </div>
        </aside>

        {/* Main Section for Property Listings */}
        <PropertyList landlord_username={username} />

        {/* Modal for Chat */}
        <Modal
          isOpen={isChatOpen}
          onRequestClose={closeChatModal}
          contentLabel="Chat Modal"
          className="chat-modal"
        >
          <button onClick={closeChatModal} className="close-button">
            X
          </button>
          <div className="header">Chat with {landlord.username}</div>
          <div className="modal-content">
            <ConversationDetail
              conversationId={landlordId}
              onClose={closeChatModal}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default LandlordDetailPage;
