"use client"

const ChatHeader = ({ onClear, showClearButton }) => {
  return (
    <div className="chat-header">
      <div className="logo">
        <span className="logo-text">AI Course Generator</span>
      </div>
      {showClearButton && (
        <button className="clear-button" onClick={onClear}>
          Clear Conversation
        </button>
      )}
    </div>
  )
}

export default ChatHeader
