import "./chat.css";
import { Link } from "react-router-dom";

const Conversation = ({ conversation }) => {
  return (
    <div className="conversation">
      <div className="conversationBox">
        <p>
          {conversation.users
            .map((user) => user.username) // Extracting the username from each user object
            .reduce((prev, curr) => [prev, ", ", curr])}{" "}
          {/* To add commas between user names */}
        </p>
        <p className="text-airbnb-dark">
          <Link to={`/conversationDetail/${conversation.id}`}>
            Go to conversation
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Conversation;
