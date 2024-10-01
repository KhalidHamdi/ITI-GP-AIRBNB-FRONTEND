import "./chat.css";
import { Link } from "react-router-dom";

const Conversation = ({ conversation, currentUserId }) => {
  console.log("conversation", conversation);

  // Check if the current user is part of the conversation
  const isCurrentUserPartOfConversation = conversation.users.some(
    (user) => user.id === currentUserId
  );

  if (!isCurrentUserPartOfConversation) {
    return null;
  }

  // Determine sender and receiver based on the current user's ID
  const sender = conversation.users.find((user) => user.id === currentUserId);
  const receiver = conversation.users.find((user) => user.id !== currentUserId);

  return (
    <div className="conversation-container">
      <div className="conversation" key={conversation.id}>
        <div className="conversationBox">
          <h3 className="conversation-title">{receiver.username}</h3>
          <p className="conversation-link">
            <Link to={`/conversationDetail/${conversation.id}`}>
              Go to conversation
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
