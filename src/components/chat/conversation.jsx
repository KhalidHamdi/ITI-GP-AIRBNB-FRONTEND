import "./chat.css";
import { Link } from "react-router-dom";

const Conversation = ({ conversation, currentUserId }) => {
  console.log("conversation", conversation);
  const isCurrentUserPartOfConversation = conversation.users.some(
    (user) => user.id === currentUserId
  );

  if (!isCurrentUserPartOfConversation) {
    return null;
  }

  return (
    <div className="conversation-container">
      <div className="conversation" key={conversation.id}>
        <div className="conversationBox">
          <h3 className="conversation-title">
            {conversation.users[1].username}{" "}
          </h3>
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
