import Message from "./Message"
import LoadingIndicator from "./LoadingIndicator"

const ChatMessages = ({ messages, loading, messagesEndRef }) => {
  return (
    <div className="messages-container">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}

      {loading && (
        <div className="message assistant">
          <div className="message-avatar">
            <div className="assistant-avatar">AI</div>
          </div>
          <div className="message-content-wrapper">
            <div className="message-header">
              <span className="message-sender">AI Assistant</span>
              <span className="message-time">Now</span>
            </div>
            <div className="message-content">
              <LoadingIndicator />
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  )
}

export default ChatMessages
