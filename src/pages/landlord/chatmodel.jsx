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
//       overlayClassName="chat-modal-overlay"
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
import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import ConversationDetail from "../../components/chat/popup";
import "./landlord.css";

const ChatModal = ({ conversationId, landlordId, onClose }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const modalRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target) &&
      !event.target.closest(".conversation-detail")
    ) {
      setIsCollapsed(true);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <Modal
      isOpen={!!conversationId}
      onRequestClose={onClose}
      contentLabel="Chat Modal"
      className={`chat-modal ${isCollapsed ? "collapsed" : ""}`}
      overlayClassName="chat-modal-overlay"
    >
      <div ref={modalRef} className="chatheader" onClick={toggleCollapse}>
        <button onClick={onClose} className="close-button">
          X
        </button>
        <h5 style={{ display: "inline" }}>chat</h5>
      </div>
      {/* Keep ConversationDetail mounted and just hide/show it based on collapse state */}
      <div className={`conversation-detail ${isCollapsed ? "hidden" : ""}`}>
        <ConversationDetail
          conversationId={conversationId}
          landlordId={landlordId}
        />
      </div>
    </Modal>
  );
};

export default ChatModal;
