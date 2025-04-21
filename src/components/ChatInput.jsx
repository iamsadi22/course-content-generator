"use client"

const ChatInput = ({ onSendMessage, loading, generationType, promptText, setPromptText }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!loading && promptText.trim()) {
      onSendMessage(promptText)
    }
  }

  const placeholder =
    generationType === "text" ? "Type your prompt for text generation..." : "Describe the image you want to generate..."

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <textarea
        className="message-input"
        value={promptText}
        onChange={(e) => setPromptText(e.target.value)}
        placeholder={placeholder}
        disabled={loading}
        rows={1}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e)
          }
        }}
      />
      <button
        type="submit"
        className={`send-button ${loading ? "disabled" : ""}`}
        disabled={loading || !promptText.trim()}
      >
        {loading ? (
          <span className="loading-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        )}
      </button>
    </form>
  )
}

export default ChatInput
