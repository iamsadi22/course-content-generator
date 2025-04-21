import { formatTimestamp } from "../utils/helpers"

const Message = ({ message }) => {
  const { role, content, timestamp, isError } = message

  // Handle image content
  const isImageContent = typeof content === "string" && content.startsWith("http") && role === "assistant"

  return (
    <div className={`message ${role} ${isError ? "error" : ""}`}>
      <div className="message-avatar">
        {role === "user" ? <div className="user-avatar">U</div> : <div className="assistant-avatar">AI</div>}
      </div>

      <div className="message-content-wrapper">
        <div className="message-header">
          <span className="message-sender">{role === "user" ? "You" : "AI Assistant"}</span>
          <span className="message-time">{formatTimestamp(timestamp)}</span>
        </div>

        <div className="message-content">
          {isImageContent ? (
            <img src={content || "/placeholder.svg"} alt="Generated" className="generated-image" />
          ) : (
            <div className="text-content">{content}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Message
