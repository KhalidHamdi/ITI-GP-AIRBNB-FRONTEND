// import React from "react";
// import Modal from "react-modal";
// import ConversationDetail from "../../components/chat/popup";
// import "./landlord.css";

// const ChatModal = ({ conversationId, landlordId, onClose }) => {
//   return (
//     <Modal
//       isOpen={!!conversationId}
//       onRequestClose={onClose}
//       contentLabel="Chat Modal"
//       className="chat-modal"
//     >
//       <button onClick={onClose} className="close-button">
//         X
//       </button>
//       <ConversationDetail
//         conversationId={conversationId}
//         landlordId={landlordId}
//       />
//     </Modal>
//   );
// };

// export default ChatModal;
////////////////////////////////////////////////////////////////////////////////////
import React from "react";
import Modal from "react-modal";
import ConversationDetail from "../../components/chat/popup";
import "./landlord.css";

const ChatModal = ({ conversationId, landlordId, onClose }) => {
  return (
    <Modal
      isOpen={!!conversationId}
      onRequestClose={onClose}
      contentLabel="Chat Modal"
      className="chat-modal"
      overlayClassName="chat-modal-overlay"
    >
      <button onClick={onClose} className="close-button">
        X
      </button>
      <ConversationDetail
        conversationId={conversationId}
        landlordId={landlordId}
      />
    </Modal>
  );
};

export default ChatModal;
