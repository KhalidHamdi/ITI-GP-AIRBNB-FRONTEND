import "./conversationDetails.css";
import useWebSocket, { ReadyState } from "react-use-websocket";
function ConversationDetail() {
  return (
    <>
      <div className="chat-container">
        <div className="message-container">
          <div className="receiver">
            <h4>David</h4>
            <p>
              I will receive this from you Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Natus cupiditate sed molestiae neque
              maxime inventore esse minus voluptas impedit, dolorum ullam nisi
              voluptatibus sapiente eligendi ab debitis, est ipsam eaque.
            </p>
          </div>
          <div className="sender">
            <h4>Jon Doe</h4>
            <p>
              I will send you this Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Natus maxime ducimus voluptatibus culpa quod
              perferendis tempora vero doloremque est tenetur molestiae voluptas
              quia, excepturi commodi sapiente a ipsa cupiditate vitae.
            </p>
          </div>
        </div>

        <div className="chat-input-container">
          <input
            type="text"
            placeholder="Type your message here..."
            className="chat-input"
          />
          <button className="send-button">Send</button>
        </div>
      </div>
    </>
  );
}

export default ConversationDetail;
