import "./chat.css";
import { Link } from "react-router-dom";

const Conversation = ({ conversation, currentUserId }) => {
  const isCurrentUserPartOfConversation = conversation.users.some(
    (user) => user.id === currentUserId
  );

  if (!isCurrentUserPartOfConversation) {
    return null;
  }

  return (
    <div className="conversations">
      <div className="conversation" key={conversation.id}>
        <div className="conversationBox">
          <p>
            {conversation.users
              .map((user) => user.username)
              .reduce((prev, curr) => [prev, ", ", curr])}
          </p>
          <p className="text-airbnb-dark">
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
